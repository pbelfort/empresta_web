<template>
        <div>
      <!-- Displaying fetched data -->
      <div v-if="dataLoaded">
        <div>Selecione a quantidade de parcelas: {{ selectedParcels }}</div>        
        <select v-model="selectedParcels">
          <option v-for="option in fetchedData" :value="option.chave">
              {{ option.valor }}
          </option>
        </select>   
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fetchedData: [],
        dataLoaded: false 
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        try {
          const response = await fetch('http://192.168.0.102:8000/api/convenio');
          const data = await response.json();
          this.fetchedData = data; // Store fetched data in variable
          this.dataLoaded = true; // Set dataLoaded flag to true
          console.log(data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    }
  };
  </script>