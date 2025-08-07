/*
Function to detect whether the dependency structure contains any cycles, where an item indirectly or directly depends on itself.(optional)

const deps = {
  A: { id: 1, dependsOn: [ { id: 2 } ] },
  B: { id: 2, dependsOn: [ { id: 3 } ] },
  C: { id: 3, dependsOn: [ { id: 1 } ] }
}
Answer: true

If there’s cycle, Find the Cycle Path 
Answer:  [‘A’, ‘B’ , ‘C ‘, ‘ A’]

*/

function hasCycle(deps) {
  const visited = new Set();
  const recursionStack = new Set();
  const cyclePaths = [];

  function dfs(node, path) {
    if (recursionStack.has(node)) {
      // Found a cycle - get the cycle portion of the path
      const cycleStart = path.indexOf(node);
      const cycle = path.slice(cycleStart);
      cycle.push(node); // Complete the cycle
      cyclePaths.push(cycle); // Store node names (A, B, C, A)
      return true;
    }

    if (visited.has(node)) return false;

    visited.add(node);
    recursionStack.add(node);
    path.push(node);

    const dependencies = deps[node]?.dependsOn || [];
    for (const dep of dependencies) {
      const depNode = Object.keys(deps).find(key => deps[key].id === dep.id);
      if (dfs(depNode, [...path])) {
        return true;
      }
    }

    recursionStack.delete(node);
    return false;
  }

  for (const node of Object.keys(deps)) {
    if (dfs(node, [])) {
      break;
    }
  }

  return {
    hasCycle: cyclePaths.length > 0,
    cycles: cyclePaths
  };
}

// Example usage:
const deps = {
  A: { id: 1, dependsOn: [ { id: 2 } ] },
  B: { id: 2, dependsOn: [ { id: 3 } ] },
  C: { id: 3, dependsOn: [ { id: 1 } ] }
};

const result = hasCycle(deps);
console.log('Has cycle:', result.hasCycle); // true
console.log('Cycle path:', result.cycles[0].join(' → ')); // "A → B → C → A"

//Time Complexity = O(V+E)