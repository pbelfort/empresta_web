<script setup>
import { ref } from 'vue'
import ModalContent from './ModalContent.vue';
const isOpen = ref(false)

</script>

<template>
    <div class = "root">
        <button @click="isOpen = true"> Simular </button>
        <teleport to="body">
            <div class="modal" v-if="isOpen">
                <modal-content 
                @close="isOpen = false"
                    title="opaaa"
                    msg="maooe"
                    :items="[{'Apple':'0','Amor':1}, 'Banana', 'Orange']"
                />
            </div>
        </teleport>   
    </div>
</template>

<style> 
.root{
    position: absolute;
}

.modal{
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal > div {
    background-color: blanchedalmond;
    padding: 60px;
    border-radius: 10px;
}

</style>