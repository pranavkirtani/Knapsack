'use strict'
class Organizer{

//knapsack 0/1 algorithm
 organize(items,sessionTime){
     sessionTime=sessionTime*60;//conversion to minutes
     //start
     var item   = 0,
      weight = 0,
      maxBefore = 0,
      maxAfter  = 0,
      numOfItems = items.length,
      matrixWeight = new Array(numOfItems+1),
      matrixToKeep = new Array(numOfItems+1),
      solutionSet  = [];
     var capacity=sessionTime;
 
  for(let item = 0; item < numOfItems + 1; item++){
    matrixWeight[item] = new Array(capacity+1);
    matrixToKeep[item]   = new Array(capacity+1);
  }
 
  for (let item = 0; item <= numOfItems; item++){
    for (let weight = 0; weight <= capacity; weight++){
 
      if (item === 0 || weight === 0){
        matrixWeight[item][weight] = 0;
      }
 
      else if (items[item-1].getDuration() <= weight){
        maxAfter = items[item-1].getDuration() + matrixWeight[item-1][weight-items[item-1].getDuration()];
        maxBefore = matrixWeight[item-1][weight];
 
        // Update the matrices
        if(maxAfter > maxBefore){
          matrixWeight[item][weight]  = maxAfter;
          matrixToKeep[item][weight]    = 1;
        }
        else{
          matrixWeight[item][weight]  = maxBefore;
          matrixToKeep[item][weight]    = 0;
        }
      }
      else{
        matrixWeight[item][weight] = matrixWeight[item-1][weight];
      }
    }
  }
 

  weight = capacity;
  item   = numOfItems;
  for(item; item > 0; item--){
    if(matrixToKeep[item][weight] === 1){
      solutionSet.push(items[item - 1]);
        items[item-1].isDone=true;
      weight = weight - items[item - 1].getDuration();
    }
  }

     
     return items;
}
}



module.exports=Organizer;