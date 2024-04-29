<script setup>
import { ref, defineProps } from 'vue'
import ModalContent from './ModalContent.vue';

const isOpen = ref(false)
const responseData = ref();

const props = defineProps({
    valorEmprestimo: Number,
    instituicoes: Array,
    convenios: Array,
    parcela: Number
})

async function simulate() {
    const postArguments = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            {
             "valor_emprestimo":props.valorEmprestimo ?? 0,
             "instituicoes":(props.instituicoes == "" || props.instituicoes == null) ? [] : props.instituicoes,
             "convenios": (props.convenios == "" || props.convenios == null) ? [] : props.convenios,
             "parcela": (props.parcela == "" || props.parcela == null) ? 0 : props.parcela,
            })
        }
    var response = await fetch('http://192.168.0.102:8000/api/simular',
                                postArguments
                                  );
        var data = await response.json();
        responseData.value = data;
}

</script>
<template>
    <div class = "root">
        <button class="custom-button" @click="isOpen = true, simulate()"> Simular </button>
        <teleport to="body">

        
            <div class="modal" v-if="isOpen">
                <modal-content 
                @close="isOpen = false"
                    :title="loanValue"
                    msg="maooe"
                    :items="responseData"
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
    background-color: mediumseagreen;
    padding: 60px;
    border-radius: 10px;
}

.custom-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: mediumseagreen;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

</style>