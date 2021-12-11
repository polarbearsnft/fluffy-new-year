<template>
<div class="w-full max-w-s">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="collection">Collection</label>
      <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="collection" v-model="collection">
        <option v-for="option in collectionOptions" :value="option.value" :key="option.id">
          {{ option.text }}
        </option>
      </select>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="tokenID">Token ID</label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="tokenID" v-model="tokenID">
    </div>
    <label class="block text-gray-700 text-sm font-bold mb-2" for="collection">Accesories</label>
    <div class="mx-auto max-w-sm text-center flex flex-wrap justify-center">
      <div class="flex items-center mr-4 mb-4">
        <label class="inline-flex items-center mt-3">
          <input class="form-checkbox h-5 w-5 text-fluffy" type="checkbox" v-model="glasses"><span class="ml-2 text-gray-700">Glasses</span>
        </label>
      </div>
      <div class="flex items-center mr-4 mb-4">
        <label class="inline-flex items-center mt-3">
          <input class="form-checkbox h-5 w-5 text-fluffy" type="checkbox" v-model="lights"><span class="ml-2 text-gray-700">Lights</span>
        </label>
      </div>
      <div class="flex items-center mr-4 mb-4">
        <label class="inline-flex items-center mt-3">
          <input class="form-checkbox h-5 w-5 text-fluffy" type="radio" name="blows" v-model="blows" :value="1"><span class="ml-2 text-gray-700">Closed Blow</span>
        </label>
      </div>
      <div class="flex items-center mr-4 mb-4">
        <label class="inline-flex items-center mt-3">
          <input class="form-checkbox h-5 w-5 text-fluffy" type="radio" name="blows" v-model="blows" :value="2"><span class="ml-2 text-gray-700">Open Blow  </span>
        </label>
      </div>
    </div>
    <div class="mb-4">
      <button class="bg-fluffy hover:bg-fluffy-darker text-black w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="resetProperties">Reset</button>
    </div>
    <div class="mb-4">
      <button class="bg-fluffy hover:bg-fluffy-darker text-black w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="getImage">Generate Image</button>
    </div>
    <div class="flex items-center mb-4 min-w-full">
      <img class="w-full" :src="imageURL" crossorigin="anonymous">
    </div>
    <div class="flex items-center">
      <a class="bg-fluffy hover:bg-fluffy-darker text-center text-black w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline" :href="imageURL" download="fluffy.png"> Download </a>
    </div>
  </form>
</div>

</template>

<script>
import { ref } from "vue";
import mergeImages from "merge-images";
import axios from "axios";

export default {
  setup() {
    const imageURL = ref('/placeholder.png')

    const collection = ref(1)

    const collectionOptions = ref([
      { id: 1, text: 'Fluffy Polar Bears - FPB', value: 1 },
      { id: 2, text: 'Fluffy Polar Bears Special Editions - FPB#99', value: 2 },
    ])

    const tokenID = ref(1)

    const glasses = ref(false)

    const blows = ref(0)

    const lights = ref(false)

    const resetProperties = () => {
      glasses.value = false
      blows.value = 0
      lights.value = false
    }

    const getImage = () => {
      imageURL.value = '/spinner.svg'
      let baseURL = "https://fpb.mypinata.cloud/ipfs/"
      if (collection.value == 1) {
        baseURL += "QmUE6w9xCi7ZHFfUziEcuhYrsPrMaRuRyREJBAzihDbH8L/"
      } else {
        baseURL += "QmbBTdjjk791nk1bCAfZZ1XmwN3JwFzBVnxkKNa9rMwMtp/"
      }
      baseURL += tokenID.value + ".png"

      console.log(blows.value);

      let imageArray = [ baseURL ]
      if (glasses.value) {
        imageArray.push('/layer-2022.png')
      }

      if (lights.value) {
        imageArray.push('/layer-lights.png')
      }

      if (blows.value == 1) {
        imageArray.push('/layer-blow1.png')
      } else if (blows.value == 2) {
        imageArray.push('/layer-blow2.png')
      }

      mergeImages(imageArray, {
        crossOrigin: 'anonymous'
      })
        .then(base64 => {
          imageURL.value = base64
        })
    }

    return{
      imageURL,
      collection,
      collectionOptions,
      tokenID,
      glasses,
      blows,
      lights,
      resetProperties,
      getImage,
    }
  },
}
</script>

<style scoped>
input[type="checkbox"],
input[type="radio"]{
  box-shadow: 0 0 0 0;
  transition: background .2s,
  transform .2s;
}

input[type="checkbox"],
input[type="radio"]{
  transform: scale(1.2);
}

</style>