const container = document.getElementById("container");

// CONFIGURATION
// We set the transition to 0.5s, so we must wait at least 600ms to see it finish clearly.
const speed = 600; 
const transitionSpeed = "1.0s"; // CSS transition speed

function generate() {
    container.innerHTML = "";
    for (let i = 0; i < 30; i++) {
        let height = Math.floor(Math.random() * 300) + 20;
        let bar = document.createElement("div");
        
        bar.classList.add("bar");
        bar.style.height = height + "px";
        
        // --- THIS IS THE KEY CHANGE ---
        // This adds smooth animation to height changes and color changes
        bar.style.transition = `height ${transitionSpeed} ease, background-color ${transitionSpeed} ease`;
        // ------------------------------

        container.appendChild(bar);
    } 
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// BUBBLE SORT 
async function bubble() {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";
            
            // Wait to see the red selection
            await sleep(speed);

            let val1 = parseInt(bars[j].style.height);
            let val2 = parseInt(bars[j + 1].style.height);

            if (val1 > val2) {
                // The transition property handles the smooth movement here
                bars[j].style.height = val2 + "px";
                bars[j + 1].style.height = val1 + "px";
                
                // Wait for the swap animation to finish
                await sleep(speed);
            }
            
            bars[j].style.backgroundColor = "#00bcd4";
            bars[j + 1].style.backgroundColor = "#00bcd4";
        }
        bars[bars.length - i - 1].style.backgroundColor = "green";
    }
}

// SELECTION SORT
async function selection() {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
        let min_idx = i;
        bars[i].style.backgroundColor = "red";

        for (let j = i + 1; j < bars.length; j++) {
            bars[j].style.backgroundColor = "red";
            
            await sleep(speed / 2); // Check faster, swap slower

            let val1 = parseInt(bars[j].style.height);
            let val2 = parseInt(bars[min_idx].style.height);

            if (val1 < val2) {
                if(min_idx !== i) bars[min_idx].style.backgroundColor = "#00bcd4";
                min_idx = j;
            } else {
                bars[j].style.backgroundColor = "#00bcd4";
            }
        }

        let temp = bars[min_idx].style.height;
        bars[min_idx].style.height = bars[i].style.height;
        bars[i].style.height = temp;
        
        // Wait for swap animation
        await sleep(speed);
        
        bars[min_idx].style.backgroundColor = "#00bcd4";
        bars[i].style.backgroundColor = "green";
    }
}

// INSERTION SORT
async function insertion() {
    let bars = document.getElementsByClassName("bar");
    for (let i = 1; i < bars.length; i++) {
        let key = parseInt(bars[i].style.height);
        let height = bars[i].style.height;
        let j = i - 1;
        
        bars[i].style.backgroundColor = "red";
        await sleep(speed);

        while (j >= 0 && parseInt(bars[j].style.height) > key) {
            bars[j].style.backgroundColor = "red";
            
            // Allow the bar to slide up
            bars[j + 1].style.height = bars[j].style.height;
            j = j - 1;
            
            await sleep(speed);
            
            for(let k = 0; k <= i; k++) bars[k].style.backgroundColor = "green";
        }
        bars[j + 1].style.height = height;
        await sleep(speed); // Wait for insertion animation
    }
}

// HEAP SORT
async function heap() {
    let bars = document.getElementsByClassName("bar");
    let n = bars.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(bars, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        let temp = bars[0].style.height;
        bars[0].style.height = bars[i].style.height;
        bars[i].style.height = temp;
        
        bars[i].style.backgroundColor = "green";
        await heapify(bars, i, 0);
    }
    bars[0].style.backgroundColor = "green";
}

async function heapify(bars, n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && parseInt(bars[l].style.height) > parseInt(bars[largest].style.height))
        largest = l;

    if (r < n && parseInt(bars[r].style.height) > parseInt(bars[largest].style.height))
        largest = r;

    if (largest != i) {
        bars[i].style.backgroundColor = "red";
        bars[largest].style.backgroundColor = "red";
        
        await sleep(speed);

        let temp = bars[i].style.height;
        bars[i].style.height = bars[largest].style.height;
        bars[largest].style.height = temp;
        
        await sleep(speed);

        bars[i].style.backgroundColor = "#00bcd4";
        bars[largest].style.backgroundColor = "#00bcd4";

        await heapify(bars, n, largest);
    }
}

// MERGE SORT
async function runMerge() {
    let bars = document.getElementsByClassName("bar");
    await mergeSort(bars, 0, bars.length - 1);
}

async function mergeSort(bars, l, r) {
    if (l >= r) return;
    let m = l + Math.floor((r - l) / 2);
    await mergeSort(bars, l, m);
    await mergeSort(bars, m + 1, r);
    await merge(bars, l, m, r);
}

async function merge(bars, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;
    let L = [], R = [];

    for (let i = 0; i < n1; i++) L.push(bars[l + i].style.height);
    for (let j = 0; j < n2; j++) R.push(bars[m + 1 + j].style.height);

    let i = 0, j = 0, k = l;
    
    while (i < n1 && j < n2) {
        bars[k].style.backgroundColor = "red";
        await sleep(speed); 
        
        if (parseInt(L[i]) <= parseInt(R[j])) {
            bars[k].style.height = L[i];
            i++;
        } else {
            bars[k].style.height = R[j];
            j++;
        }
        // Wait for the height change to animate
        await sleep(speed);
        
        bars[k].style.backgroundColor = "green"; 
        k++;
    }

    while (i < n1) {
        bars[k].style.height = L[i];
        bars[k].style.backgroundColor = "green";
        i++; k++;
        await sleep(speed);
    }

    while (j < n2) {
        bars[k].style.height = R[j];
        bars[k].style.backgroundColor = "green";
        j++; k++;
        await sleep(speed);
    }
}

// QUICK SORT
async function runQuick() {
    let bars = document.getElementsByClassName("bar");
    await quickSort(bars, 0, bars.length - 1);
}

async function quickSort(bars, low, high) {
    if (low < high) {
        let pi = await partition(bars, low, high);
        await quickSort(bars, low, pi - 1);
        await quickSort(bars, pi + 1, high);
    }
}

async function partition(bars, low, high) {
    let pivot = parseInt(bars[high].style.height);
    bars[high].style.backgroundColor = "red"; 
    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {
        let curr = parseInt(bars[j].style.height);
        
        if (curr < pivot) {
            i++;
            let temp = bars[i].style.height;
            bars[i].style.height = bars[j].style.height;
            bars[j].style.height = temp;
            
            bars[i].style.backgroundColor = "orange";
            if (i != j) bars[j].style.backgroundColor = "orange";
            
            await sleep(speed);
        }
    }
    let temp = bars[i + 1].style.height;
    bars[i + 1].style.height = bars[high].style.height;
    bars[high].style.height = temp;
    await sleep(speed); // Wait for pivot swap

    for (let k = low; k <= high; k++) bars[k].style.backgroundColor = "green";
    
    return (i + 1);
}

generate();