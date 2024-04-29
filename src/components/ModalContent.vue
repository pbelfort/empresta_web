<script setup>
import { defineProps, defineEmits } from 'vue';
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
                    <CloseCircleIcon /> 
                </base-button>
<div v-if="items.BMG !=null">
  <h4>BMG Loan Data</h4>
  <table border="1">
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
        <td>{{ loan.valor_parcela }}</td>
        <td>{{ loan.convenio }}</td>
      </tr>
    </tbody>
  </table>
</div>
<div v-else>
      <!-- Display a message if items.BMG is undefined or empty -->
      <p>No BMG items available.</p>
    </div>
    

<div v-if="items.PAN != null">
  <h4>PAN Loan Data</h4>
  <table border="1">
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
        <td>{{ loan.valor_parcela }}</td>
        <td>{{ loan.convenio }}</td>
      </tr>
    </tbody>
  </table>
</div>
<div v-else>
      <!-- Display a message if items.BMG is undefined or empty -->
      <p>No PAN items available.</p>
    </div>

<div v-if="items.OLE != null">
  <h4>OLE Loan Data</h4>
  <table border="1">
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
        <td>{{ loan.valor_parcela }}</td>
        <td>{{ loan.convenio }}</td>
      </tr>
    </tbody>
  </table>
</div>
<div v-else>
      <!-- Display a message if items.BMG is undefined or empty -->
      <p>No OLE items available.</p>
    </div>
</div>
</template>