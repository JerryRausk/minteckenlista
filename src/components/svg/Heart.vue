<template>
  <svg
    viewBox="0 0 96 96"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    fill="#000000"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <defs>
        <clipPath id="clip-heart">
          <rect width="96" height="96"></rect>
        </clipPath>
      </defs>
      <g id="heart" clip-path="url(#clip-heart)">
        <g id="pills" transform="translate(-116 -232)">
          <g id="Group_150" data-name="Group 150">
            <path
              id="Path_180"
              data-name="Path 180"
              d="M164,247.762c-.092-.1-.184-.194-.276-.286A25.568,25.568,0,1,0,127.5,283.57c.1.1.2.2.316.3h0L164,320l36.224-36.093-.041-.041c.112-.092.214-.194.316-.3a25.568,25.568,0,1,0-36.223-36.094C164.184,247.568,164.092,247.66,164,247.762Z"
              :fill="fillColor"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="5"
            ></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
</template>
<script setup lang="ts">
defineProps<{
  fillColor: string;
}>();
</script>
