import {
    BITO_USER_ID as bitoUserId,
    U_ID as uId,
    EMAIL as email,
    AUTHORIZATION as Authorization
} from '@/config/chatgpt.js';

export default function getAnswer(prompt = '', contexts = [], obj = {
    start: () => {},
    success: () => {}, 
    error: () => {}, 
    complete: () => {},
}) {
    if (!prompt) {
        return;
    }

    var newSessionGUID = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)),
        QuesGUID = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)),
        body = {
            prompt,
            uId,
            ideName: 'Chrome',
            bitoUserId,
            email,
            requestId: QuesGUID,
            stream: true,
            context: [
                {
                    'question': 'Hello, who are you?',
                    'answer': 'I am an AI created by Bito. How can I help you today?'
                },
                ...contexts,
            ],
            sessionId: newSessionGUID
        },
        fetchOPt = {
            method: 'POST',
            headers: {
                Authorization,
                'Content-Type': 'application/json',
                'X-ClientInfo': `Win32 Gecko 20030107#Chrome#3.0#${bitoUserId}`,
            },
            body: JSON.stringify(body),
            redirect: 'follow',
            // signal: {
            //     aborted: false,
            //     onabort: null,
            //     reason: undefined,
            // },
        };

    var tempContext_ = '',
        ctxToPassNew = [],
        chunkReciedMain = [],
        relString = "<<this0is1a2no3use4str5spliter>>";

    obj?.start();

    fetch('https://bitoai.bito.co/ai/v2/chat/', fetchOPt)
        .then(response => {
            if (!response.ok) {
                response.text().then(res => {
                    // console.log(res);

                    // console.error(res);

                    obj?.error(res);

                    obj?.complete();
                });
                return;
            }

            var reader = response.body.getReader();
            var decoder = new TextDecoder();

            return new ReadableStream({
                start(controller) {
                    function push() {
                        reader.read().then(({ done, value }) => {
                            if (done) {
                                controller.close();

                                ctxToPassNew.push(tempContext_);

                                obj?.complete();

                                return;
                            }

                            var valuedata = decoder.decode(value),
                                answerContext_ = '';

                            if (valuedata.startsWith('data:') || true) {
                                chunkReciedMain.push(valuedata);
                                
                                var chunkData = chunkReciedMain.join('');
                                var chunkArray = chunkData.replaceAll(/( *)data:( *)/gm, relString).split(relString).filter(r => r);
                                var dataReceivedTillNow = "";

                                chunkArray.forEach(chunkVal_ => {
                                    try {
                                        var jsonData = JSON.parse(chunkVal_);

                                        if (jsonData['choices'] !== undefined && jsonData['choices'].length > 0) {
                                            var Text_ = jsonData.choices[0].text;

                                            dataReceivedTillNow += Text_;
                                            tempContext_ += Text_;
                                            answerContext_ += Text_;
                                        }

                                    } catch (err) {
                                        //Check if DONE is received 
                                        if (chunkVal_.trim() == "[DONE]") {
                                            // console.log("Finished Loading")
                                        } else {
                                            console.log("Error Occured!!!!", err, "Value Data =>", chunkVal_, "<=");
                                        }
                                    }
                                });

                                obj?.success(dataReceivedTillNow);
                            };

                            push();
                        });
                    };

                    push();
                },
            });
        })
        .catch(() => {
            obj?.error('请求失败');

            obj?.complete();
        });
}