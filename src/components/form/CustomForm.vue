<script>
import { onMounted,ref } from 'vue';
import NotificationHandler from '../../components/NotificationHandler.vue'

export default {
  components: {
    NotificationHandler
  },
  setup() {
    const convenantData = ref([]);
    const institutionData = ref([]);
    const dataLoaded = ref(false);
    const loanValue = ref("")
    const parcelSelected = ref(0)
    const covenantSelected = ref("")
    const institutionSelected = ref("")



    const fetchData = async () => {
      try {
        const getArguments = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
        var response = await fetch('http://192.168.0.102:8000/api/convenio',
                                    getArguments,
                                  );
        var data = await response.json();
        convenantData.value = data;

        response = await fetch('http://192.168.0.102:8000/api/instituicao',
                                getArguments,
                              );
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
      loanValue,
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
        <input v-model="loanValue" type="number" />  

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
    
    <NotificationHandler 
      :valorEmprestimo="loanValue" 
      :instituicoes=[institutionSelected] 
      :convenios=[covenantSelected]
      :institutionSelected=[institutionSelected]      
      />  
    
</template>
