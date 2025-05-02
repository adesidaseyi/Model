// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};

const modelViewer = document.querySelector("model-viewer#color");


// COLOURS
document.querySelector('#color-controls').addEventListener('click', (event) => {
  const colorString = event.target.dataset.color;
  const [material] = modelViewer.model.materials;
  material.pbrMetallicRoughness.setBaseColorFactor(colorString);
});


// CAMERA VIEWS
const annotationClicked = (annotation) => {
  let dataset = annotation.dataset;
  modelViewer.cameraTarget = dataset.target;
  modelViewer.cameraOrbit = dataset.orbit;
  modelViewer.fieldOfView = '45deg';
}

modelViewer.querySelectorAll('button').forEach((hotspot) => {
  hotspot.addEventListener('click', () => annotationClicked(hotspot));
});


// TEXTURES
const textureName = document.querySelector('#texture-name');
const imageName = document.querySelector('#image-name');

modelViewer.addEventListener("load", () => {

  const material = modelViewer.model.materials[0];

  const createAndApplyTexture = async (channel, event) => {
    if (event.target.value == "None") {
      // Clears the texture.
      material[channel].setTexture(null);
      // Display the names values
      textureName.innerText = "None";
      imageName.innerText = "None";
    } else if (event.target.value) {
      // Creates a new texture.
      const texture = await modelViewer.createTexture(event.target.value);
      // Set the texture name
      texture.name = event.target.options[event.target.selectedIndex].text.replace(/ /g, "_").toLowerCase();
      // Applies the new texture to the specified channel.
      material[channel].setTexture(texture);
      // Display the names values
      textureName.innerText = texture.name;
      imageName.innerText = texture.source.name;
    }
  }

  document.querySelector('#normals2').addEventListener('input', (event) => {
    createAndApplyTexture('normalTexture', event);
  });
});

/*
document.querySelector('#texture-panel').addEventListener('click', async (event) => {
const testMaterial = modelViewer.model.materials[0]; // Or use .find(m => m.name === 'YourMaterialName')
const testTexture = await modelViewer.createTexture('New-MTN-Logo.jpg');
testMaterial.pbrMetallicRoughness.setBaseColorTexture(testTexture);
});*/