<script>
import { onMounted,ref } from 'vue';
import NotificationHandler from '../../components/NotificationHandler.vue'
import {showMoney} from '../../helpers/money'

export default {
  components: {
    NotificationHandler
  },
  methods:{
    showMoney,
    updateLoanValue(event) {
      this.formattedLoanValue = showMoney(event.target.value)
   }
  },
  setup() {
    const convenantData = ref([]);
    const institutionData = ref([]);
    const dataLoaded = ref(false);
    const loanValue = ref("")
    const parcelSelected = ref(0)
    const covenantSelected = ref("")
    const institutionSelected = ref("")
    const formattedLoanValue = ref("")

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
      formattedLoanValue,
    };
  }
};
</script>

<template>    
    <form >
    <p>
      <label class="hidden-visually">Digite o valor do emprestimo: </label>
    </p>
    <div class="input-prefix">
    <label class="prefix"> {{ formattedLoanValue }}</label>
    <input type="number" class="text transparent-input" v-model="loanValue" @input="updateLoanValue">
</div>

        <!-- ParcelsDropDown -->
        <div>
        <div> Selecione o número de parcelas: </div>  
        <select v-model="parcelSelected" class="custom-input">
          <option v-for="option in [36,48,60,72,84]">
              {{ option }}
          </option>
        </select>   
      </div>    
      
      <!-- Displaying fetched data -->
      <div>
      <div v-if="dataLoaded">
        <div>Selecione o convênio:</div>        
        <select v-model="covenantSelected" class="custom-input">
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
        <select v-model="institutionSelected" class="custom-input"> 
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
      :parcela=parcelSelected
      />  
    
</template>

<style scoped>
.custom-input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

.prefix {
    position: absolute;
    color: black;
    padding: 8px;
}

.transparent-input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    background-color: transparent; /* Set the background color to transparent */
    color: #ffffff; /* Text color */
    width: 100%;
    caret-color: black; /* Set the caret color to red */  
  }
</style>