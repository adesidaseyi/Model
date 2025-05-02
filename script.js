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

modelViewer.addEventListener("load", () => {

  const material = modelViewer.model.materials[0];

  const originalBaseTexture = material.pbrMetallicRoughness['baseColorTexture'].texture;

  const createAndApplyTexture = async (channel, event) => {
    // Clears the texture
    if (event.target.value == "None") {
      if (channel.includes('base')) {
        material.pbrMetallicRoughness[channel].setTexture(originalBaseTexture);
      }
      else {
        material[channel].setTexture(null);
      }
    }

    // Creates a new texture.
    const texture = await modelViewer.createTexture(event.target.value);
    // Applies the new texture to the specified channel.
    if (channel.includes('base') || channel.includes('metallic')) {
      material.pbrMetallicRoughness[channel].setTexture(texture);
    }
    else {
      material[channel].setTexture(texture);
    }
  }

  // Normals
  document.querySelector('#normals2').addEventListener('input', (event) => {
      createAndApplyTexture('normalTexture', event);
    });

  // Diffuse
  document.querySelector('#diffuse').addEventListener('input', (event) => {
      createAndApplyTexture('baseColorTexture', event);
  });

});