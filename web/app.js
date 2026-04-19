const regions = [
  'manhattan', 'brooklyn', 'queens', 'bronx', 'staten_island', 'long_island', 'nassau', 'suffolk'
];

const environments = [
  'prison_exterior_minimum', 'prison_exterior_maximum', 'prison_interior_cellblock', 'prison_interior_booking',
  'prison_interior_visitation', 'airport_exterior_terminal', 'airport_exterior_runway', 'airport_exterior_hangar',
  'airport_terminal_interior', 'airport_security_checkpoint', 'airport_baggage_claim',
  'plane_interior_commercial', 'plane_interior_private_jet', 'plane_interior_cargo', 'cockpit_interior'
];

const fallbackPrompts = [
  'Brooklyn mixed urban block', 'Queens airport corridor', 'Bronx apartment zone',
  'Long Island suburban commercial strip', 'prison exterior maximum security',
  'prison cellblock interior', 'prison booking interior', 'airport terminal interior',
  'airport baggage claim', 'commercial plane interior', 'private jet interior', 'cargo plane interior'
];

const state = {
  transitions: ['terminal_entry_A', 'jetbridge_A']
};

const form = document.getElementById('configForm');
const regionSelect = document.getElementById('region');
const environmentSelect = document.getElementById('environment');
const interiorSelect = document.getElementById('interior');
const moduleClassSelect = document.getElementById('moduleClass');
const transitionInput = document.getElementById('transitionInput');
const transitionList = document.getElementById('transitionList');
const jsonOutput = document.getElementById('jsonOutput');
const exportName = document.getElementById('exportName');

function populateSelect(select, values, selected) {
  values.forEach((value) => {
    const opt = document.createElement('option');
    opt.value = value;
    opt.textContent = value;
    if (value === selected) opt.selected = true;
    select.appendChild(opt);
  });
}

populateSelect(regionSelect, regions, 'queens');
populateSelect(environmentSelect, environments, 'airport_terminal_interior');

function updateModuleClassOptions() {
  const interior = interiorSelect.value === 'true';
  const classes = interior
    ? ['interior', 'vehicle_interior']
    : ['main_exterior', 'special_exterior'];

  moduleClassSelect.innerHTML = '';
  populateSelect(moduleClassSelect, classes, classes[0]);
}

function renderTransitions() {
  transitionList.innerHTML = '';
  state.transitions.forEach((node, index) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = '✕';
    btn.style.marginLeft = '8px';
    btn.style.padding = '2px 6px';
    btn.style.fontSize = '11px';
    btn.addEventListener('click', () => {
      state.transitions.splice(index, 1);
      renderTransitions();
      renderOutput();
    });
    li.textContent = node;
    li.appendChild(btn);
    transitionList.appendChild(li);
  });
}

function suggestExportName(environment) {
  if (environment.includes('airport_terminal')) return 'airport_terminal_interior_scene.fbx';
  if (environment.includes('prison_interior_cellblock')) return 'prison_cellblock_scene.gltf';
  if (environment.includes('plane_interior_private_jet')) return 'private_jet_interior_scene.fbx';
  if (environment.includes('airport_exterior')) return 'queens_airport_exterior_master.fbx';
  if (environment.includes('prison_exterior')) return 'prison_exterior_max_master.fbx';
  return `${environment}_scene.fbx`;
}

function buildConfig() {
  const data = new FormData(form);
  return {
    name: data.get('name'),
    region_preset: data.get('region_preset'),
    environment_type: data.get('environment_type'),
    interior: data.get('interior') === 'true',
    security_level: data.get('security_level'),
    density_level: data.get('density_level'),
    grime_level: data.get('grime_level'),
    transit_intensity: data.get('transit_intensity'),
    building_style: data.get('building_style'),
    landmark_style: data.get('landmark_style'),
    module_class: data.get('module_class'),
    stream_group: data.get('stream_group'),
    transition_nodes: [...state.transitions]
  };
}

function renderOutput() {
  const config = buildConfig();
  jsonOutput.textContent = JSON.stringify(config, null, 2);
  exportName.textContent = suggestExportName(config.environment_type);
}

document.getElementById('addTransition').addEventListener('click', () => {
  const value = transitionInput.value.trim();
  if (!value) return;
  if (!state.transitions.includes(value)) {
    state.transitions.push(value);
    renderTransitions();
    renderOutput();
  }
  transitionInput.value = '';
});

interiorSelect.addEventListener('change', () => {
  updateModuleClassOptions();
  renderOutput();
});

form.addEventListener('input', renderOutput);
environmentSelect.addEventListener('change', renderOutput);

const chips = document.getElementById('promptChips');
fallbackPrompts.forEach((prompt) => {
  const chip = document.createElement('button');
  chip.type = 'button';
  chip.textContent = prompt;
  chip.addEventListener('click', () => {
    transitionInput.value = prompt.toLowerCase().replace(/\s+/g, '_').slice(0, 28);
  });
  chips.appendChild(chip);
});

document.getElementById('generateBtn').addEventListener('click', renderOutput);

document.getElementById('downloadBtn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(buildConfig(), null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${buildConfig().name || 'forge_module'}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
});

updateModuleClassOptions();
renderTransitions();
renderOutput();
