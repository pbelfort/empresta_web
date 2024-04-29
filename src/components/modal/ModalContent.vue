<script setup>
import { defineProps, defineEmits, computed  } from 'vue';
import CloseCircleIcon from 'vue-material-design-icons/CloseCircle.vue';

defineProps({
    items: {
      type: Array,
      default: () => []
    }
})

defineEmits("close")
</script>

<template>        
  <div>                
    <base-button @click="$emit('close')" > 
      <CloseCircleIcon class="secondary" /> 
    </base-button>
    
    <div v-if="items.BMG ==null && items.PAN ==null && items.OLE ==null" class="secondary">
      <p>Aguarde</p>
      <p>Estamos tentando buscar as informações da simulação!</p>
      <br/>
      <div class="loader loader-margin"></div>
      <br/>
      <p>Talvez não obtemos nenhum resultado.</p>
      <p>Tente selecionar novos termos para simular.</p>
    </div>
    <div v-else class="secondary">

      <!--BMG Simulation-->
      <div v-if="items.BMG !=null" class="secondary">
        <div>
          <h2>
          <img alt="Vue logo" src="../../assets/banco_bmg.png" width="30" height="30" />
          Simulação BMG
          </h2>
        </div>
        <table border="1" id="simulations">
          <thead>
            <tr>
              <th>Parcelas</th>
              <th>Taxa (%)</th>
              <th>Valor da Parcela (R$)</th>
              <th>Convênio</th>
            </tr>
          </thead>
          <tbody>
            <!-- Loop through each loan object in the BMG array -->
            <tr v-for="(loan, index) in items.BMG" :key="index">
              <td>{{ loan.parcelas }}</td>
              <td>{{ loan.taxa }}</td>
              <td>{{ String(loan.valor_parcela).replace('.',',') }}</td>
              <td>{{ loan.convenio }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="secondary">
        <p>Não encontrei simulações no banco BMG com os filtros selecionados.</p>
      </div>

      <!--PAN Simulation--> 
      <div v-if="items.PAN != null" class="secondary">
        <div>
          <h2>
          <img alt="Vue logo" src="../../assets/banco_pan.png" width="30" height="30" />
          Simulação PAN
          </h2>
        </div>
        <table border="1" id="simulations">
          <thead>
            <tr>
              <th>Parcelas</th>
              <th>Taxa (%)</th>
              <th>Valor da Parcela (R$)</th>
              <th>Convênio</th>
            </tr>
          </thead>
          <tbody>
            <!-- Loop through each loan object in the BMG array -->
            <tr v-for="(loan, index) in items.PAN" :key="index">
              <td>{{ loan.parcelas }}</td>
              <td>{{ loan.taxa }}</td>
              <td>{{ String(loan.valor_parcela).replace('.',',') }}</td>
              <td>{{ loan.convenio }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="secondary">
        <p>Não encontrei simulações no banco PAN com os filtros selecionados.</p>
      </div>

       <!--OLE Simulation--> 
      <div v-if="items.OLE != null" class="secondary">
        <div>
          <h2>
          <img alt="Vue logo" src="../../assets/banco_ole.png" width="30" height="30" />        
          Simulação OLE
          </h2>
        </div>
        <table border="1" id="simulations">
          <thead>
            <tr>
              <th>Parcelas</th>
              <th>Taxa (%)</th>
              <th>Valor da Parcela (R$)</th>
              <th>Convênio</th>
            </tr>
          </thead>
          <tbody>
            <!-- Loop through each loan object in the BMG array -->
            <tr v-for="(loan, index) in items.OLE" :key="index">
              <td>{{ loan.parcelas }}</td>
              <td>{{ loan.taxa }}</td>
              <td>{{ String(loan.valor_parcela).replace('.',',') }}</td>
              <td>{{ loan.convenio }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="secondary">
        <p>Não encontrei simulações no banco OLE com os filtros selecionados.</p>
      </div>
    </div>
  </div>
</template>

<style> 
#simulations {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#simulations td, #simulations th {
  border: 1px solid #ddd;
  padding: 8px;
}

#simulations tr:nth-child(even){background-color: #f69907;}

#simulations tr:hover {background-color: #ac6903;}

#simulations th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #6ebc6f;
  color: #fdfdc8;
}

.loader-margin{
  margin: auto;
}

</style>