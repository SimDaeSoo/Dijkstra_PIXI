import MapGenerator from './classes/MapGenerator';

const mapGenerator: MapGenerator = new MapGenerator();
mapGenerator.initialize({ seed: '', size: { width: 80, height: 20 } });
mapGenerator.generateArrayMap();