<template>
    <el-drawer
    title="全部对话"
    :visible.sync="visibleController"
    direction="rtl"
    :size="250"
    >
        <div class="scroll-warpper">
            <list-scene 
                @shift="$emit('shift', $event)"
                @del="$emit('del', $event)"
            ></list-scene>
        </div>
    </el-drawer>
</template>

<script>
import ListScene from './list-scene.vue';

export default {
    components: {
        ListScene,
    },
    data() {
        return {
            visibleController: false,
        };
    },
    methods: {
        open() {
            this.visibleController = true;
            
            this.$store.dispatch('scene/queryScene');
        },
        close() {
            this.visibleController = false;
        },
    },
    created() {
        
    },
};
</script>

<style lang="scss" scoped>
.scroll-warpper{
    overflow: hidden;
    overflow-y: auto;
    padding: 0 20px 20px;
}
</style>