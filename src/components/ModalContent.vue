<script setup>
import { defineProps, defineEmits } from 'vue';
import CloseCircleIcon from 'vue-material-design-icons/CloseCircle.vue';

defineProps({
    title: String,
    msg: String,
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
                    <CloseCircleIcon/> 
                </base-button>
                <h2>
                    {{title}}
                </h2>
                <p>
                    {{msg}}
                </p>
                <ul>
                    <li v-for="item in items" :key="item">
                        {{ item }}
                    </li>
                </ul>
            </div>
    </template>

