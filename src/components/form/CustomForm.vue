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
   },
   clearInput() {
      this.loanValue =''; 
      this.parcelSelected =''; 
      this.covenantSelected =''; 
      this.institutionSelected =''; 
      this.formattedLoanValue='';
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

    async function fetchDataFromApi(url){
      const getArguments = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      const baseURL = 'http://192.168.0.102:8000/api/'
      return await fetch(baseURL+url,getArguments);
    }

    const fetchData = async () => {
      try {

        var response = await fetchDataFromApi('convenio');
        var data = await response.json();
        convenantData.value = data;

        response = await fetchDataFromApi('instituicao');

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
    <h2>
      <label class="hidden-visually secondary">Digite o valor do emprestimo: </label>
    </h2>
    <div class="input-prefix">
      <label class="prefix"> {{ formattedLoanValue }}</label>
      <input type="number" class="text transparent-input" v-model="loanValue" @input="updateLoanValue">
    </div>
    <!-- ParcelsDropDown -->
    <div>
      <div class="secondary">
        <h2>Selecione o número de parcelas:
        </h2>
      </div>  
      <select v-model="parcelSelected" class="custom-input">
        <option v-for="option in [36,48,60,72,84]">
          {{ option }}
        </option>
      </select>   
    </div>    
      <!-- Displaying fetched data -->
      <div>
        <div class="secondary">
          <h2>Selecione o convênio:
          </h2>
        </div>      
        <div v-if="dataLoaded">
          <select v-model="covenantSelected" class="custom-input">
            <option v-for="option in convenantData" :value="option.chave">
                {{ option.valor }}
            </option>
          </select>   
        </div>
        <div v-else>
          <div class="loader"></div>
        </div>
    </div>
    <div>
      <!-- Displaying fetched data -->
      <div class="secondary">
        <h2>Selecione a instituição financeira:
        </h2>
      </div>    
      <div v-if="dataLoaded">    
        <select v-model="institutionSelected" class="custom-input"> 
          <option v-for="option in institutionData" :value="option.chave">
              {{ option.valor }}
          </option>
        </select>   
      </div>
      <div v-else>
        <div class="loader"></div>
      </div>
    </div>
  </form>

  <div>
    <button class="transparent-button" @click="clearInput">Limpar todos os campos</button>
  </div>

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
.transparent-button {
    padding: 0px 0px; /* Add padding to the button */  
    font-size: 16px;
    border: solid transparent; /* Set border to transparent */
    background-color: transparent; /* Set background color to transparent */
    color: #fdfdc8; /* Text color */
    cursor: pointer; /* Set cursor to pointer on hover */
}
.transparent-input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    background-color: #ffffff;
    color: #ffffff; /* Text color */
    width: 100%;
    caret-color: black; /* Set the caret color to red */  
  }
</style>