import MapGenerator from './classes/MapGenerator';

const mapGenerator: MapGenerator = new MapGenerator();
mapGenerator.initialize({ seed: '', size: { width: 40, height: 40 }, density: 0.4 });
const mapA = mapGenerator.generateArrayMap();

mapGenerator.initialize({ seed: '', size: { width: 40, height: 40 }, density: 0.4 });
const mapB = mapGenerator.generateArrayMap();

// mapGenerator.merge(mapA, mapB);