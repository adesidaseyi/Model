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
const modelViewerColor = document.querySelector("model-viewer#color");

document.querySelector('#color-controls').addEventListener('click', (event) => {
  const colorString = event.target.dataset.color;
  const [material] = modelViewerColor.model.materials;
  material.pbrMetallicRoughness.setBaseColorFactor(colorString);
});

/*
                  <button class="view-button" slot="hotspot-10" data-position="0.02610224m 0.01458751m -0.004978945m" data-normal="-0.602551m 0.7856147m -0.1405055m" data-orbit="-78.89725deg 77.17752deg 0.08451112m" data-target="0.02610223m 0.0145875m -0.004978945m">
                    Treasure
                  </button>
                  <button class="view-button" slot="hotspot-11" data-position="-0.1053838m 0.01610652m 0.1076345m" data-normal="-0.624763m 0.5176854m 0.5845283m" data-orbit="10.89188deg 119.9775deg 0.03543022m" data-target="-0.1053838m 0.01610652m 0.1076345m">
                    Desperation
                  </button>
                </model-viewer>

                <script type="module">
                  const modelViewer2 = document.querySelector("#hotspot-camera-view-demo");
                  const annotationClicked = (annotation) => {
                    let dataset = annotation.dataset;
                    modelViewer2.cameraTarget = dataset.target;
                    modelViewer2.cameraOrbit = dataset.orbit;
                    modelViewer2.fieldOfView = '45deg';
                  }

                  modelViewer2.querySelectorAll('button').forEach((hotspot) => {
                    hotspot.addEventListener('click', () => annotationClicked(hotspot));
                  });
*/