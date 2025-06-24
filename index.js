const slider = document.getElementById('dataSize');
        const sizeDisplay = document.getElementById('currentSize');
        const tableBody = document.getElementById('tableBody');
        const barGraph = document.getElementById('barGraph');
        const realWorldDiv = document.getElementById('realWorldExamples');
        
        function calculateBigO(n) {
            return {
                'O(1)': { ops: 1, name: 'Constant', example: 'Array access', color: '#4ecdc4' },
                'O(log n)': { ops: Math.log2(n), name: 'Logarithmic', example: 'Binary search', color: '#45b7d1' },
                'O(n)': { ops: n, name: 'Linear', example: 'Simple search', color: '#96ceb4' },
                'O(n log n)': { ops: n * Math.log2(n), name: 'Linearithmic', example: 'Merge sort', color: '#ffeaa7' },
                'O(n²)': { ops: n * n, name: 'Quadratic', example: 'Bubble sort', color: '#fab1a0' },
                'O(2ⁿ)': { ops: Math.min(Math.pow(2, Math.min(n, 20)), 999999999), name: 'Exponential', example: 'Recursive fibonacci', color: '#e17055' }
            };
        }
        
        function formatNumber(num) {
            if (num < 1000) return Math.round(num).toString();
            if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
            if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
            return (num / 1000000000).toFixed(1) + 'B';
        }
        
        function getPerformanceRating(ops, n) {
            if (ops <= 1) return '🚀 Excellent';
            if (ops <= Math.log2(n) * 2) return '✅ Very Good';
            if (ops <= n) return '👍 Good';
            if (ops <= n * Math.log2(n)) return '⚠️ Acceptable';
            if (ops <= n * n / 10) return '🐌 Slow';
            return '💀 Very Slow';
        }
        
        function updateVisualization() {
            const n = parseInt(slider.value);
            sizeDisplay.textContent = n;
            
            const results = calculateBigO(n);
            
            // Update table
            tableBody.innerHTML = '';
            Object.entries(results).forEach(([bigO, data]) => {
                const row = tableBody.insertRow();
                row.innerHTML = `
                    <td><strong>${bigO}</strong></td>
                    <td>${data.name}</td>
                    <td>${formatNumber(data.ops)}</td>
                    <td>${data.example}</td>
                    <td>${getPerformanceRating(data.ops, n)}</td>
                `;
            });
            
            // Update bar graph
            const maxOps = Math.max(...Object.values(results).map(r => r.ops));
            barGraph.innerHTML = '';
            
            Object.entries(results).forEach(([bigO, data]) => {
                const bar = document.createElement('div');
                bar.className = 'bar';
                const height = Math.max((data.ops / maxOps) * 250, 5);
                bar.style.height = height + 'px';
                bar.style.background = `linear-gradient(to top, ${data.color}, ${data.color}aa)`;
                
                const label = document.createElement('div');
                label.className = 'bar-label';
                label.textContent = bigO;
                
                const value = document.createElement('div');
                value.className = 'bar-value';
                value.textContent = formatNumber(data.ops);
                
                bar.appendChild(label);
                bar.appendChild(value);
                barGraph.appendChild(bar);
            });
            
            // Update real-world examples
            updateRealWorldExamples(n);
        }
        
        function updateRealWorldExamples(n) {
            const examples = [
                {
                    title: `Searching ${n} contacts on your phone`,
                    o1: `Hash lookup: Instant! (${formatNumber(1)} operation)`,
                    on: `Linear search: Up to ${formatNumber(n)} checks`,
                    on2: `Compare all pairs: ${formatNumber(n*n)} comparisons - Don't do this!`
                },
                {
                    title: `Sorting ${n} photos by date`,
                    ologn: `Quick sort: ~${formatNumber(n * Math.log2(n))} operations`,
                    on2: `Bubble sort: ${formatNumber(n*n)} operations - Very slow for large albums!`
                },
                {
                    title: `Finding a book in ${n} books`,
                    ologn: `Organized library: ~${Math.ceil(Math.log2(n))} steps using binary search`,
                    on: `Random pile: Up to ${n} books to check`
                }
            ];
            
            realWorldDiv.innerHTML = examples.map(ex => `
                <div class="example-box">
                    <h3>${ex.title}</h3>
                    ${ex.o1 ? `<p><strong>Best:</strong> ${ex.o1}</p>` : ''}
                    ${ex.ologn ? `<p><strong>Smart approach:</strong> ${ex.ologn}</p>` : ''}
                    ${ex.on ? `<p><strong>Simple approach:</strong> ${ex.on}</p>` : ''}
                    ${ex.on2 ? `<p><strong>Avoid:</strong> ${ex.on2}</p>` : ''}
                </div>
            `).join('');
        }
        
        slider.addEventListener('input', updateVisualization);
        updateVisualization(); // Initial load