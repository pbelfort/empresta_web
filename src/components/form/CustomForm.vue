<script>
import { onMounted,ref } from 'vue';

export default {
  setup() {
    const convenantData = ref([]);
    const institutionData = ref([]);
    const dataLoaded = ref(false);
    const newItem = ref("")
    const parcelSelected = ref(0)
    const covenantSelected = ref("")
    const institutionSelected = ref("")



    const fetchData = async () => {
      try {
        var response = await fetch('http://192.168.0.102:8000/api/convenio');
        var data = await response.json();
        convenantData.value = data;

        response = await fetch('http://192.168.0.102:8000/api/instituicao');
        data = await response.json();
        institutionData.value = data;


        dataLoaded.value = true;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    onMounted(fetchData);

    return {
      convenantData,
      institutionData,
      dataLoaded,
      newItem,
      parcelSelected,
      covenantSelected,
      institutionSelected,
    };
  }
};
</script>

<template>
    
    <form >
        <p>
        <label class="hidden-visually">Digite o valor do emprestimo: </label>
        </p>
        <input v-model="newItem" type="number" />  

        <!-- ParcelsDropDown -->
        <div>
        <div> Selecione o número de parcelas: </div>  
        <select v-model="parcelSelected">
          <option v-for="option in [36,48,60,72,84]">
              {{ option }}
          </option>
        </select>   
      </div>    
      
      <!-- Displaying fetched data -->
      <div>
      <div v-if="dataLoaded">
        <div>Selecione o convênio:</div>        
        <select v-model="covenantSelected">
          <option v-for="option in convenantData" :value="option.chave">
              {{ option.valor }}
          </option>
        </select>   
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>

    <div>
      <!-- Displaying fetched data -->
      <div v-if="dataLoaded">
        <div>Selecione a instituição financeira:</div>        
        <select v-model="institutionSelected"> 
          <option v-for="option in institutionData" :value="option.chave">
              {{ option.valor }}
          </option>
        </select>   
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>

        

    </form>
    
    <div>{{ newItem }}</div>
    <div>{{ parcelSelected }}</div>
    <div>{{ covenantSelected }}</div>
    <div>{{ institutionSelected }}</div>

    
</template>
