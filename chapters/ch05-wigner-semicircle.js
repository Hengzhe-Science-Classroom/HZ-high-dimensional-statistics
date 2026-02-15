window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch05',
    number: 5,
    title: 'Wigner Matrices & Semicircle Law',
    subtitle: 'Spectral distributions of random symmetric matrices',
    sections: [
        // ============================================================
        // SECTION 1: Random Matrix Ensembles
        // ============================================================
        {
            id: 'ch05-sec01',
            title: 'Random Matrix Ensembles',
            content: `
                <h2>Random Matrix Ensembles</h2>

                <p>Random matrix theory is one of the most beautiful areas of modern mathematics, sitting at the crossroads of probability, combinatorics, and mathematical physics. The central question is deceptively simple: <em>what do the eigenvalues of a large random matrix look like?</em></p>

                <p>We begin by defining the fundamental object of study in this chapter.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 5.1 (Wigner Matrix)</div>
                    <div class="env-body">
                        <p>A <strong>Wigner matrix</strong> of size \\(n\\) is a real symmetric random matrix \\(W_n = (w_{ij})_{1 \\le i,j \\le n}\\) such that:</p>
                        <ol>
                            <li>The entries \\(\\{w_{ij} : 1 \\le i \\le j \\le n\\}\\) are independent.</li>
                            <li>The diagonal entries \\(w_{ii}\\) are i.i.d. with mean \\(0\\) and finite variance.</li>
                            <li>The off-diagonal entries \\(w_{ij}\\) (\\(i &lt; j\\)) are i.i.d. with mean \\(0\\) and variance \\(\\sigma^2\\).</li>
                            <li>The matrix is completed by symmetry: \\(w_{ji} = w_{ij}\\).</li>
                        </ol>
                        <p>The <strong>normalized Wigner matrix</strong> is \\(X_n = \\frac{1}{\\sigma\\sqrt{n}} W_n\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why Normalize by \\(\\sqrt{n}\\)?</div>
                    <div class="env-body">
                        <p>Without normalization, the eigenvalues of \\(W_n\\) grow like \\(\\sqrt{n}\\). To see this heuristically, note that each row of \\(W_n\\) is a random vector in \\(\\mathbb{R}^n\\) whose norm is \\(\\|\\text{row}\\| \\approx \\sigma\\sqrt{n}\\) by concentration. The operator norm (largest eigenvalue) scales similarly. The normalization \\(X_n = W_n / (\\sigma\\sqrt{n})\\) keeps the spectrum on a bounded interval as \\(n \\to \\infty\\), allowing us to talk about a limiting distribution.</p>
                    </div>
                </div>

                <p>The most important special case arises when the entries are Gaussian.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 5.2 (Gaussian Orthogonal Ensemble, GOE)</div>
                    <div class="env-body">
                        <p>The <strong>Gaussian Orthogonal Ensemble</strong> \\(\\operatorname{GOE}(n)\\) is the Wigner matrix with:</p>
                        <ul>
                            <li>Off-diagonal entries: \\(w_{ij} \\sim N(0,1)\\) for \\(i &lt; j\\), with \\(w_{ji} = w_{ij}\\).</li>
                            <li>Diagonal entries: \\(w_{ii} \\sim N(0,2)\\).</li>
                        </ul>
                        <p>Equivalently, \\(\\operatorname{GOE}(n)\\) can be constructed as \\(W = \\frac{1}{\\sqrt{2}}(A + A^\\top)\\) where \\(A\\) has i.i.d. \\(N(0,1)\\) entries. The probability density on the space of \\(n \\times n\\) real symmetric matrices is</p>
                        \\[p(W) \\propto \\exp\\!\\left(-\\frac{n}{4}\\operatorname{tr}(W^2)\\right).\\]
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">The Name "Orthogonal"</div>
                    <div class="env-body">
                        <p>The GOE is called "orthogonal" because its distribution is invariant under orthogonal conjugation: if \\(W \\sim \\operatorname{GOE}(n)\\) and \\(O \\in O(n)\\) is any orthogonal matrix, then \\(O^\\top W O\\) has the same distribution as \\(W\\). This follows from the fact that \\(\\operatorname{tr}((O^\\top W O)^2) = \\operatorname{tr}(W^2)\\). There are complex and quaternionic analogues: the <strong>GUE</strong> (Gaussian Unitary Ensemble) and <strong>GSE</strong> (Gaussian Symplectic Ensemble).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 5.3 (GOE Joint Eigenvalue Density)</div>
                    <div class="env-body">
                        <p>Let \\(\\lambda_1 &gt; \\lambda_2 &gt; \\cdots &gt; \\lambda_n\\) be the ordered eigenvalues of \\(W \\sim \\operatorname{GOE}(n)\\). Their joint density on the ordered simplex \\(\\{\\lambda_1 &gt; \\cdots &gt; \\lambda_n\\}\\) is</p>
                        \\[p(\\lambda_1, \\ldots, \\lambda_n) = C_n \\prod_{i &lt; j} |\\lambda_i - \\lambda_j| \\cdot \\exp\\!\\left(-\\frac{n}{4}\\sum_{i=1}^n \\lambda_i^2\\right),\\]
                        <p>where \\(C_n\\) is a normalizing constant.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Eigenvalue Repulsion</div>
                    <div class="env-body">
                        <p>The factor \\(\\prod_{i &lt; j} |\\lambda_i - \\lambda_j|\\) in the joint density is crucial: it penalizes configurations where eigenvalues are close together. This phenomenon is called <strong>eigenvalue repulsion</strong>. Unlike independent random variables that can cluster freely, eigenvalues of random matrices actively repel each other. This is one of the most striking features of random matrix theory and has deep connections to electrostatics (the eigenvalues behave like charged particles on a line).</p>
                    </div>
                </div>

                <h3>Other Wigner Ensembles</h3>

                <p>The power of Wigner's theory is that the limiting spectral behavior does <em>not</em> depend on the specific distribution of the entries. We can take:</p>
                <ul>
                    <li><strong>Bernoulli-Wigner:</strong> \\(w_{ij} \\in \\{-1, +1\\}\\) with equal probability (for \\(i &lt; j\\)).</li>
                    <li><strong>Uniform-Wigner:</strong> \\(w_{ij} \\sim \\text{Uniform}(-\\sqrt{3}, \\sqrt{3})\\) (so that \\(\\operatorname{Var}(w_{ij}) = 1\\)).</li>
                    <li><strong>Sparse Wigner:</strong> \\(w_{ij} = \\xi_{ij} \\cdot z_{ij}\\) where \\(\\xi_{ij} \\sim \\text{Bernoulli}(p_n)\\) and \\(z_{ij}\\) has variance \\(1/p_n\\).</li>
                </ul>
                <p>As we shall see, the semicircle law holds for all of these ensembles under mild moment conditions.</p>

                <div class="env-block example">
                    <div class="env-title">Example 5.4 (Constructing a GOE Matrix)</div>
                    <div class="env-body">
                        <p>To construct a sample from \\(\\operatorname{GOE}(3)\\), we might draw:</p>
                        \\[A = \\begin{pmatrix} 0.31 & -1.07 & 0.55 \\\\ 0.42 & -0.83 & 1.22 \\\\ -0.64 & 0.19 & -0.45 \\end{pmatrix}\\]
                        <p>and form \\(W = \\frac{1}{\\sqrt{2}}(A + A^\\top)\\). The result is a real symmetric matrix whose eigenvalues exhibit the repulsion described above. For a \\(3 \\times 3\\) matrix, the effect is subtle, but it becomes dramatic as \\(n\\) grows.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: []
        },

        // ============================================================
        // SECTION 2: Empirical Spectral Distribution
        // ============================================================
        {
            id: 'ch05-sec02',
            title: 'Empirical Spectral Distribution',
            content: `
                <h2>Empirical Spectral Distribution</h2>

                <p>To study the collective behavior of eigenvalues, we introduce the empirical spectral distribution (ESD) -- a random probability measure that summarizes the entire spectrum of a matrix in a single object.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 5.5 (Empirical Spectral Distribution)</div>
                    <div class="env-body">
                        <p>Let \\(A\\) be an \\(n \\times n\\) symmetric matrix with eigenvalues \\(\\lambda_1, \\ldots, \\lambda_n\\). The <strong>empirical spectral distribution</strong> (ESD) of \\(A\\) is the probability measure</p>
                        \\[\\mu_A = \\frac{1}{n}\\sum_{i=1}^n \\delta_{\\lambda_i},\\]
                        <p>where \\(\\delta_x\\) denotes the Dirac measure at \\(x\\). The corresponding distribution function is</p>
                        \\[F_A(x) = \\frac{1}{n} \\#\\{i : \\lambda_i \\le x\\} = \\frac{1}{n}\\sum_{i=1}^n \\mathbf{1}_{\\{\\lambda_i \\le x\\}}.\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">The ESD as a Histogram</div>
                    <div class="env-body">
                        <p>The ESD is simply the normalized histogram of eigenvalues. Each eigenvalue gets weight \\(1/n\\), so the total mass is 1. When we bin the eigenvalues into intervals and plot the bar chart, we get an approximation to the ESD's density (if it exists). As \\(n \\to \\infty\\), this histogram typically converges to a smooth, deterministic curve -- the limiting spectral distribution.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 5.6 (Stieltjes Transform)</div>
                    <div class="env-body">
                        <p>The <strong>Stieltjes transform</strong> of a probability measure \\(\\mu\\) on \\(\\mathbb{R}\\) is the function</p>
                        \\[s_\\mu(z) = \\int \\frac{1}{\\lambda - z}\\, d\\mu(\\lambda), \\quad z \\in \\mathbb{C} \\setminus \\mathbb{R}.\\]
                        <p>For the ESD of a matrix \\(A\\), this becomes</p>
                        \\[s_{\\mu_A}(z) = \\frac{1}{n}\\sum_{i=1}^n \\frac{1}{\\lambda_i - z} = \\frac{1}{n}\\operatorname{tr}\\bigl((A - zI)^{-1}\\bigr).\\]
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Why the Stieltjes Transform?</div>
                    <div class="env-body">
                        <p>The Stieltjes transform is the analytic workhorse of random matrix theory because:</p>
                        <ol>
                            <li>It uniquely determines the measure \\(\\mu\\) (Stieltjes-Perron inversion formula).</li>
                            <li>Convergence of Stieltjes transforms implies weak convergence of measures.</li>
                            <li>The trace form \\(\\frac{1}{n}\\operatorname{tr}((A-zI)^{-1})\\) is amenable to analytic computation.</li>
                        </ol>
                    </div>
                </div>

                <h3>Moments of the ESD</h3>

                <p>An alternative approach to studying the ESD uses its moments.</p>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 5.7 (Moments and Traces)</div>
                    <div class="env-body">
                        <p>The \\(k\\)-th moment of the ESD of a matrix \\(A\\) equals the normalized trace of \\(A^k\\):</p>
                        \\[\\int x^k\\, d\\mu_A(x) = \\frac{1}{n}\\sum_{i=1}^n \\lambda_i^k = \\frac{1}{n}\\operatorname{tr}(A^k).\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>By definition of the ESD,</p>
                        \\[\\int x^k\\, d\\mu_A(x) = \\int x^k \\cdot \\frac{1}{n}\\sum_{i=1}^n \\delta_{\\lambda_i}(dx) = \\frac{1}{n}\\sum_{i=1}^n \\lambda_i^k.\\]
                        <p>Since \\(A\\) is symmetric, it has a spectral decomposition \\(A = U \\Lambda U^\\top\\), so \\(A^k = U \\Lambda^k U^\\top\\) and \\(\\operatorname{tr}(A^k) = \\operatorname{tr}(\\Lambda^k) = \\sum_i \\lambda_i^k\\).</p>
                        <div class="qed">&square;</div>
                    </div>
                </div>

                <p>This identity is the key link: to study the ESD of a random matrix, we compute \\(\\mathbb{E}[\\frac{1}{n}\\operatorname{tr}(X_n^k)]\\) and show that these moments converge to those of a known distribution. This is the <strong>moment method</strong> that we will develop in Section 4.</p>

                <div class="viz-placeholder" data-viz="viz-semicircle"></div>

                <div class="env-block example">
                    <div class="env-title">Example 5.8 (ESD of a Diagonal Matrix)</div>
                    <div class="env-body">
                        <p>If \\(A = \\operatorname{diag}(1, 2, 2, 3)\\), then the ESD is</p>
                        \\[\\mu_A = \\frac{1}{4}\\delta_1 + \\frac{2}{4}\\delta_2 + \\frac{1}{4}\\delta_3.\\]
                        <p>The distribution function is a step function with jumps of size \\(1/4\\) at \\(x = 1\\), \\(2/4\\) at \\(x = 2\\), and \\(1/4\\) at \\(x = 3\\). The second moment is \\(\\frac{1}{4}(1 + 4 + 4 + 9) = \\frac{18}{4} = 4.5\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-semicircle',
                    title: 'Wigner Semicircle Law: Eigenvalue Histogram vs. Semicircle Density',
                    description: 'Generate an n x n Wigner matrix with N(0, 1/n) entries, compute its eigenvalues, and overlay the histogram with the semicircle density. Increase n to see convergence.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 420, scale: 1, originX: 350, originY: 380 });
                        var ctx = viz.ctx;

                        var currentN = 50;
                        var eigenvalues = [];
                        var entryType = 0; // 0 = Gaussian, 1 = Bernoulli

                        // Box-Muller transform for normal random variables
                        function randn() {
                            var u = 0, v = 0;
                            while (u === 0) u = Math.random();
                            while (v === 0) v = Math.random();
                            return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
                        }

                        // Generate symmetric Wigner matrix with variance 1/n
                        function generateWigner(n, type) {
                            var M = [];
                            for (var i = 0; i < n; i++) {
                                M[i] = new Float64Array(n);
                            }
                            for (var i = 0; i < n; i++) {
                                for (var j = i; j < n; j++) {
                                    var val;
                                    if (type === 0) {
                                        val = randn() / Math.sqrt(n);
                                    } else {
                                        val = (Math.random() < 0.5 ? -1 : 1) / Math.sqrt(n);
                                    }
                                    M[i][j] = val;
                                    M[j][i] = val;
                                }
                            }
                            return M;
                        }

                        // Jacobi eigenvalue algorithm for symmetric matrices
                        function jacobiEigen(A, n) {
                            // Work on a copy
                            var S = [];
                            for (var i = 0; i < n; i++) {
                                S[i] = new Float64Array(n);
                                for (var j = 0; j < n; j++) S[i][j] = A[i][j];
                            }

                            var maxIter = 100 * n;
                            for (var iter = 0; iter < maxIter; iter++) {
                                // Find largest off-diagonal
                                var p = 0, q = 1, maxVal = 0;
                                for (var i = 0; i < n; i++) {
                                    for (var j = i + 1; j < n; j++) {
                                        if (Math.abs(S[i][j]) > maxVal) {
                                            maxVal = Math.abs(S[i][j]);
                                            p = i; q = j;
                                        }
                                    }
                                }
                                if (maxVal < 1e-10) break;

                                // Compute rotation
                                var theta;
                                if (Math.abs(S[p][p] - S[q][q]) < 1e-15) {
                                    theta = Math.PI / 4;
                                } else {
                                    theta = 0.5 * Math.atan2(2 * S[p][q], S[p][p] - S[q][q]);
                                }
                                var c = Math.cos(theta), s = Math.sin(theta);

                                // Apply rotation
                                for (var i = 0; i < n; i++) {
                                    if (i === p || i === q) continue;
                                    var sip = S[i][p], siq = S[i][q];
                                    S[i][p] = c * sip + s * siq;
                                    S[p][i] = S[i][p];
                                    S[i][q] = -s * sip + c * siq;
                                    S[q][i] = S[i][q];
                                }
                                var spp = S[p][p], sqq = S[q][q], spq = S[p][q];
                                S[p][p] = c * c * spp + 2 * s * c * spq + s * s * sqq;
                                S[q][q] = s * s * spp - 2 * s * c * spq + c * c * sqq;
                                S[p][q] = 0;
                                S[q][p] = 0;
                            }

                            var eigs = [];
                            for (var i = 0; i < n; i++) eigs.push(S[i][i]);
                            return eigs.sort(function(a, b) { return a - b; });
                        }

                        function computeEigenvalues() {
                            var M = generateWigner(currentN, entryType);
                            eigenvalues = jacobiEigen(M, currentN);
                        }

                        // Semicircle density: rho(x) = (1/(2*pi)) * sqrt(4 - x^2) for |x| <= 2
                        function semicircleDensity(x) {
                            if (x < -2 || x > 2) return 0;
                            return (1 / (2 * Math.PI)) * Math.sqrt(4 - x * x);
                        }

                        var nSlider = VizEngine.createSlider(controls, 'n', 1, 4, 1.7, 0.01, function(v) {
                            currentN = Math.round(Math.pow(10, v));
                            if (currentN < 5) currentN = 5;
                            if (currentN > 800) currentN = 800;
                            computeEigenvalues();
                        });
                        // Override the display to show n value
                        var nDisplay = nSlider.nextElementSibling;
                        nDisplay.textContent = currentN;

                        VizEngine.createButton(controls, 'Gaussian', function() { entryType = 0; computeEigenvalues(); });
                        VizEngine.createButton(controls, 'Bernoulli', function() { entryType = 1; computeEigenvalues(); });
                        VizEngine.createButton(controls, 'Resample', function() { computeEigenvalues(); });

                        computeEigenvalues();

                        function draw() {
                            viz.clear();

                            var W = viz.width, H = viz.height;
                            var plotLeft = 60, plotRight = W - 30;
                            var plotTop = 30, plotBottom = H - 50;
                            var plotW = plotRight - plotLeft;
                            var plotH = plotBottom - plotTop;

                            // x-range: [-3, 3]
                            var xMin = -3, xMax = 3;
                            function xToScreen(x) { return plotLeft + (x - xMin) / (xMax - xMin) * plotW; }
                            // y-range: [0, yMax]
                            var yMax = 0.45;
                            function yToScreen(y) { return plotBottom - (y / yMax) * plotH; }

                            // Update n display
                            nDisplay.textContent = currentN;

                            // Draw axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(plotLeft, plotBottom);
                            ctx.lineTo(plotRight, plotBottom);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(plotLeft, plotBottom);
                            ctx.lineTo(plotLeft, plotTop);
                            ctx.stroke();

                            // X-axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var x = -3; x <= 3; x++) {
                                var sx = xToScreen(x);
                                ctx.fillText(x.toString(), sx, plotBottom + 6);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(sx, plotBottom);
                                ctx.lineTo(sx, plotTop);
                                ctx.stroke();
                            }

                            // Y-axis labels
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var y = 0; y <= yMax; y += 0.1) {
                                var sy = yToScreen(y);
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(y.toFixed(1), plotLeft - 6, sy);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(plotLeft, sy);
                                ctx.lineTo(plotRight, sy);
                                ctx.stroke();
                            }

                            // Draw histogram of eigenvalues
                            var numBins = Math.max(15, Math.min(60, Math.round(Math.sqrt(currentN) * 1.5)));
                            var binWidth = (xMax - xMin) / numBins;
                            var bins = new Array(numBins).fill(0);

                            for (var i = 0; i < eigenvalues.length; i++) {
                                var bin = Math.floor((eigenvalues[i] - xMin) / binWidth);
                                if (bin >= 0 && bin < numBins) bins[bin]++;
                            }

                            // Convert counts to density
                            for (var i = 0; i < numBins; i++) {
                                bins[i] = bins[i] / (eigenvalues.length * binWidth);
                            }

                            // Draw bars
                            ctx.fillStyle = viz.colors.blue + '55';
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 1;
                            for (var i = 0; i < numBins; i++) {
                                if (bins[i] === 0) continue;
                                var bx = xToScreen(xMin + i * binWidth);
                                var bw = xToScreen(xMin + (i + 1) * binWidth) - bx;
                                var by = yToScreen(bins[i]);
                                var bh = plotBottom - by;
                                ctx.fillRect(bx, by, bw, bh);
                                ctx.strokeRect(bx, by, bw, bh);
                            }

                            // Draw semicircle density curve
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;
                            for (var px = 0; px <= plotW; px++) {
                                var x = xMin + (px / plotW) * (xMax - xMin);
                                var y = semicircleDensity(x);
                                var sx = plotLeft + px;
                                var sy = yToScreen(y);
                                if (y > 0) {
                                    if (!started) { ctx.moveTo(sx, sy); started = true; }
                                    else ctx.lineTo(sx, sy);
                                }
                            }
                            ctx.stroke();

                            // Fill under semicircle
                            ctx.fillStyle = viz.colors.orange + '18';
                            ctx.beginPath();
                            ctx.moveTo(xToScreen(-2), plotBottom);
                            for (var px = 0; px <= plotW; px++) {
                                var x = xMin + (px / plotW) * (xMax - xMin);
                                var y = semicircleDensity(x);
                                if (y > 0) ctx.lineTo(plotLeft + px, yToScreen(y));
                            }
                            ctx.lineTo(xToScreen(2), plotBottom);
                            ctx.closePath();
                            ctx.fill();

                            // Legend
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(plotRight - 190, plotTop + 8, 12, 12);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Eigenvalue histogram', plotRight - 174, plotTop + 14);

                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            ctx.moveTo(plotRight - 190, plotTop + 30);
                            ctx.lineTo(plotRight - 178, plotTop + 30);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Semicircle density', plotRight - 174, plotTop + 30);

                            // Info text
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            var label = entryType === 0 ? 'Gaussian' : 'Bernoulli';
                            ctx.fillText('n = ' + currentN + '  (' + label + ' entries)', plotLeft + 5, plotTop + 5);

                            // X-axis label
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Eigenvalue', (plotLeft + plotRight) / 2, H - 8);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: []
        },

        // ============================================================
        // SECTION 3: The Semicircle Law
        // ============================================================
        {
            id: 'ch05-sec03',
            title: 'The Semicircle Law',
            content: `
                <h2>The Semicircle Law</h2>

                <p>We now state the main result of this chapter: Wigner's semicircle law. It asserts that the empirical spectral distribution of a normalized Wigner matrix converges to a universal limiting distribution -- the <strong>semicircle distribution</strong> -- regardless of the specific entry distribution.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 5.9 (Semicircle Distribution)</div>
                    <div class="env-body">
                        <p>The <strong>semicircle distribution</strong> (or Wigner semicircle distribution) is the probability distribution on \\([-2, 2]\\) with density</p>
                        \\[\\rho_{\\mathrm{sc}}(x) = \\frac{1}{2\\pi}\\sqrt{4 - x^2}, \\quad x \\in [-2, 2].\\]
                        <p>Its distribution function is</p>
                        \\[F_{\\mathrm{sc}}(x) = \\frac{1}{2} + \\frac{x\\sqrt{4-x^2}}{4\\pi} + \\frac{1}{\\pi}\\arcsin\\!\\left(\\frac{x}{2}\\right), \\quad x \\in [-2, 2].\\]
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Why "Semicircle"?</div>
                    <div class="env-body">
                        <p>The density \\(\\rho_{\\mathrm{sc}}(x) = \\frac{1}{2\\pi}\\sqrt{4 - x^2}\\) is proportional to \\(\\sqrt{4 - x^2}\\), which is the equation of the upper half of the circle \\(x^2 + y^2 = 4\\). The graph of the density is literally a semicircle (scaled to integrate to 1).</p>
                    </div>
                </div>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 5.10 (Moments of the Semicircle)</div>
                    <div class="env-body">
                        <p>The moments of the semicircle distribution are given by Catalan numbers:</p>
                        \\[m_k = \\int_{-2}^{2} x^k \\rho_{\\mathrm{sc}}(x)\\, dx = \\begin{cases} 0 & \\text{if } k \\text{ is odd}, \\\\ C_{k/2} & \\text{if } k \\text{ is even}, \\end{cases}\\]
                        <p>where \\(C_m = \\frac{1}{m+1}\\binom{2m}{m}\\) is the \\(m\\)-th Catalan number. The first few even moments are:</p>
                        \\[m_0 = 1, \\quad m_2 = 1, \\quad m_4 = 2, \\quad m_6 = 5, \\quad m_8 = 14, \\quad m_{10} = 42.\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Odd moments vanish by symmetry since \\(\\rho_{\\mathrm{sc}}\\) is symmetric about \\(0\\). For even moments, use the substitution \\(x = 2\\sin\\theta\\):</p>
                        \\[m_{2m} = \\frac{1}{2\\pi}\\int_{-2}^{2} x^{2m} \\sqrt{4 - x^2}\\, dx = \\frac{2^{2m+2}}{2\\pi}\\int_{-\\pi/2}^{\\pi/2} \\sin^{2m}\\theta \\cos^2\\theta\\, d\\theta.\\]
                        <p>Using the beta function identity</p>
                        \\[\\int_{-\\pi/2}^{\\pi/2} \\sin^{2m}\\theta \\cos^2\\theta\\, d\\theta = \\frac{\\pi}{2^{2m+2}} \\cdot \\frac{(2m)!}{m!(m+1)!},\\]
                        <p>we obtain \\(m_{2m} = \\frac{(2m)!}{m!(m+1)!} = C_m\\).</p>
                        <div class="qed">&square;</div>
                    </div>
                </div>

                <p>Now we state the main theorem.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 5.11 (Wigner's Semicircle Law)</div>
                    <div class="env-body">
                        <p>Let \\(W_n\\) be a sequence of \\(n \\times n\\) Wigner matrices with off-diagonal variance \\(\\sigma^2\\), and let \\(X_n = \\frac{1}{\\sigma\\sqrt{n}} W_n\\). Let \\(\\mu_{X_n}\\) denote the ESD of \\(X_n\\). Then as \\(n \\to \\infty\\),</p>
                        \\[\\mu_{X_n} \\xrightarrow{\\text{weakly}} \\mu_{\\mathrm{sc}} \\quad \\text{almost surely},\\]
                        <p>where \\(\\mu_{\\mathrm{sc}}\\) is the semicircle distribution. Equivalently, for every bounded continuous function \\(f : \\mathbb{R} \\to \\mathbb{R}\\),</p>
                        \\[\\frac{1}{n}\\sum_{i=1}^n f(\\lambda_i(X_n)) \\xrightarrow{n \\to \\infty} \\int_{-2}^{2} f(x) \\rho_{\\mathrm{sc}}(x)\\, dx \\quad \\text{a.s.}\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">The Universality Phenomenon</div>
                    <div class="env-body">
                        <p>The semicircle law is a <strong>universality result</strong>: the limiting spectral distribution depends only on the first two moments of the entries (mean 0, variance \\(\\sigma^2\\)), not on the specific distribution. Whether we use Gaussian, Bernoulli, uniform, or any other mean-zero, finite-variance distribution, we always get the semicircle. This is analogous to the Central Limit Theorem, where the sum of i.i.d. random variables always converges to a Gaussian regardless of the individual distribution.</p>
                    </div>
                </div>

                <h3>Convergence of Key Functionals</h3>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 5.12 (Edge Convergence)</div>
                    <div class="env-body">
                        <p>Under the hypotheses of Theorem 5.11,</p>
                        \\[\\lambda_{\\max}(X_n) \\xrightarrow{\\text{a.s.}} 2, \\quad \\lambda_{\\min}(X_n) \\xrightarrow{\\text{a.s.}} -2.\\]
                        <p>More precisely, the largest and smallest eigenvalues of \\(X_n\\) converge almost surely to the edges of the semicircle support. Under additional moment conditions (finite fourth moment), the operator norm satisfies \\(\\|X_n\\| \\to 2\\) a.s.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark on Moment Conditions</div>
                    <div class="env-body">
                        <p>The semicircle law in the <em>expected</em> sense (convergence of \\(\\mathbb{E}[\\mu_{X_n}]\\)) requires only a second moment condition. Almost sure convergence requires a finite fourth moment: \\(\\mathbb{E}[w_{12}^4] &lt; \\infty\\). The edge convergence result \\(\\lambda_{\\max} \\to 2\\) a.s. also requires a fourth moment. Without these conditions, the law may still hold in probability but not almost surely.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 5.13 (Stieltjes Transform of the Semicircle)</div>
                    <div class="env-body">
                        <p>The Stieltjes transform of the semicircle distribution satisfies the quadratic equation</p>
                        \\[s(z) = \\frac{-z + \\sqrt{z^2 - 4}}{2}, \\quad z \\in \\mathbb{C}^+,\\]
                        <p>which is the unique solution of \\(s^2 + zs + 1 = 0\\) with \\(\\operatorname{Im}(s) &lt; 0\\) when \\(\\operatorname{Im}(z) &gt; 0\\). The density is recovered via</p>
                        \\[\\rho_{\\mathrm{sc}}(x) = \\frac{1}{\\pi}\\lim_{\\eta \\downarrow 0} \\operatorname{Im}\\, s(x + i\\eta) = \\frac{1}{2\\pi}\\sqrt{4 - x^2}.\\]
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Verify that the semicircle density integrates to 1. <em>Hint:</em> Use the substitution \\(x = 2\\sin\\theta\\).',
                    hint: 'With \\(x = 2\\sin\\theta\\), we have \\(dx = 2\\cos\\theta\\, d\\theta\\) and \\(\\sqrt{4 - x^2} = 2\\cos\\theta\\). The integral becomes \\(\\frac{1}{2\\pi}\\int_{-\\pi/2}^{\\pi/2} 4\\cos^2\\theta\\, d\\theta\\).',
                    solution: 'Substituting \\(x = 2\\sin\\theta\\): \\[\\int_{-2}^{2} \\frac{1}{2\\pi}\\sqrt{4 - x^2}\\, dx = \\frac{1}{2\\pi}\\int_{-\\pi/2}^{\\pi/2} 2\\cos\\theta \\cdot 2\\cos\\theta\\, d\\theta = \\frac{2}{\\pi}\\int_{-\\pi/2}^{\\pi/2} \\cos^2\\theta\\, d\\theta = \\frac{2}{\\pi} \\cdot \\frac{\\pi}{2} = 1.\\]'
                },
                {
                    question: 'Compute the variance (second moment) of the semicircle distribution. Interpret the result in terms of the eigenvalues of \\(X_n\\).',
                    hint: 'The second moment is \\(m_2 = C_1 = 1\\). Since the mean is \\(0\\), the variance equals the second moment.',
                    solution: 'By Lemma 5.10, \\(m_2 = C_1 = \\frac{1}{2}\\binom{2}{1} = 1\\). Since \\(m_1 = 0\\), the variance is \\(\\sigma^2 = m_2 - m_1^2 = 1\\). In terms of eigenvalues: \\(\\frac{1}{n}\\sum_i \\lambda_i^2(X_n) \\to 1\\), which by the trace identity means \\(\\frac{1}{n}\\operatorname{tr}(X_n^2) = \\frac{1}{n}\\|X_n\\|_F^2 \\to 1\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Proof via Moment Method
        // ============================================================
        {
            id: 'ch05-sec04',
            title: 'Proof via Moment Method',
            content: `
                <h2>Proof via the Moment Method</h2>

                <p>We now prove Wigner's semicircle law (in the expected, or "in probability," sense) using the <strong>moment method</strong>. The strategy is:</p>
                <ol>
                    <li>Show that the expected \\(k\\)-th moment of the ESD converges to the \\(k\\)-th moment of the semicircle distribution.</li>
                    <li>Since the semicircle is determined by its moments (it has compact support), this implies weak convergence.</li>
                </ol>

                <h3>The Trace Expansion</h3>

                <p>Let \\(X_n = \\frac{1}{\\sqrt{n}} W_n\\) where \\(W_n\\) has i.i.d. entries with mean 0 and variance 1 (we set \\(\\sigma = 1\\) for simplicity). The \\(k\\)-th moment of the ESD is</p>
                \\[\\frac{1}{n}\\operatorname{tr}(X_n^k) = \\frac{1}{n^{1+k/2}}\\operatorname{tr}(W_n^k) = \\frac{1}{n^{1+k/2}} \\sum_{i_1, i_2, \\ldots, i_k = 1}^{n} w_{i_1 i_2} w_{i_2 i_3} \\cdots w_{i_k i_1}.\\]

                <div class="env-block definition">
                    <div class="env-title">Definition 5.14 (Closed Walk)</div>
                    <div class="env-body">
                        <p>A <strong>closed walk</strong> of length \\(k\\) on \\([n] = \\{1, 2, \\ldots, n\\}\\) is a sequence \\((i_1, i_2, \\ldots, i_k)\\) of elements of \\([n]\\) (repetitions allowed). The walk visits vertices \\(i_1 \\to i_2 \\to \\cdots \\to i_k \\to i_1\\), and the edges traversed are \\(\\{i_1, i_2\\}, \\{i_2, i_3\\}, \\ldots, \\{i_k, i_1\\}\\).</p>
                    </div>
                </div>

                <p>The expected moment becomes:</p>
                \\[\\mathbb{E}\\left[\\frac{1}{n}\\operatorname{tr}(X_n^k)\\right] = \\frac{1}{n^{1+k/2}} \\sum_{(i_1, \\ldots, i_k)} \\mathbb{E}[w_{i_1 i_2} w_{i_2 i_3} \\cdots w_{i_k i_1}].\\]

                <div class="env-block lemma">
                    <div class="env-title">Lemma 5.15 (Vanishing Expectation Criterion)</div>
                    <div class="env-body">
                        <p>Since the entries \\(w_{ij}\\) are independent with mean 0, the expectation \\(\\mathbb{E}[w_{i_1 i_2} \\cdots w_{i_k i_1}]\\) is zero unless every distinct edge \\(\\{i_t, i_{t+1}\\}\\) appears at least twice in the walk.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>If some edge \\(\\{a, b\\}\\) appears exactly once, then by independence, the expectation factors as \\(\\mathbb{E}[w_{ab}] \\cdot (\\text{other terms}) = 0\\), since \\(\\mathbb{E}[w_{ab}] = 0\\).</p>
                        <div class="qed">&square;</div>
                    </div>
                </div>

                <h3>Counting Dominant Walks</h3>

                <p>A closed walk of length \\(k\\) traverses at most \\(k\\) edges. For the expectation to be nonzero, each edge must appear at least twice, so there are at most \\(k/2\\) distinct edges. This immediately implies:</p>
                <ul>
                    <li>Odd moments: if \\(k\\) is odd, we cannot have every edge appearing at least twice (since \\(k/2\\) is not an integer), so \\(\\mathbb{E}[\\frac{1}{n}\\operatorname{tr}(X_n^k)] = 0\\).</li>
                    <li>Even moments: for \\(k = 2m\\), the dominant contribution comes from walks where each edge appears <strong>exactly twice</strong> (with exactly \\(m\\) distinct edges).</li>
                </ul>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 5.16 (Moment Convergence)</div>
                    <div class="env-body">
                        <p>For \\(k = 2m\\), the number of closed walks of length \\(2m\\) on \\([n]\\) in which each edge appears exactly twice and which visit exactly \\(m+1\\) distinct vertices is</p>
                        \\[C_m \\cdot n^{m+1} + O(n^m),\\]
                        <p>where \\(C_m = \\frac{1}{m+1}\\binom{2m}{m}\\) is the \\(m\\)-th Catalan number. Therefore,</p>
                        \\[\\mathbb{E}\\left[\\frac{1}{n}\\operatorname{tr}(X_n^{2m})\\right] = \\frac{1}{n^{1+m}} \\cdot C_m \\cdot n^{m+1} + O(n^{-1}) = C_m + O(n^{-1}) \\xrightarrow{n \\to \\infty} C_m.\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why Catalan Numbers?</div>
                    <div class="env-body">
                        <p>The dominant walks are precisely <strong>tree walks</strong> (or Dyck paths). A walk on \\(m+1\\) vertices with \\(m\\) edges, where each edge is traversed exactly twice (once in each direction), traces out a tree. The walk can be encoded as a Dyck path of length \\(2m\\): going "up" when traversing an edge for the first time and "down" when traversing it for the second time. The number of Dyck paths of length \\(2m\\) is exactly \\(C_m\\)!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-moments"></div>

                <h3>The Full Proof Sketch</h3>

                <div class="env-block proof">
                    <div class="env-title">Proof of Theorem 5.11 (Convergence in Expectation)</div>
                    <div class="env-body">
                        <p><strong>Step 1.</strong> Write \\(\\mathbb{E}[\\frac{1}{n}\\operatorname{tr}(X_n^{2m})] = \\frac{1}{n^{1+m}} \\sum_{\\mathbf{i}} \\mathbb{E}[\\prod_t w_{i_t i_{t+1}}]\\), summing over all closed walks \\(\\mathbf{i} = (i_1, \\ldots, i_{2m})\\).</p>

                        <p><strong>Step 2.</strong> By Lemma 5.15, only walks where every edge appears \\(\\ge 2\\) times contribute. Since the walk has \\(2m\\) steps and at most \\(m\\) distinct edges, a walk visiting \\(v\\) vertices has at most \\(v - 1 + (m - v + 1) = m\\) distinct edges and contributes a factor of \\(n^v\\) (from choosing the vertices).</p>

                        <p><strong>Step 3.</strong> A walk with \\(m\\) distinct edges, each appearing exactly twice, must visit exactly \\(m + 1\\) vertices (it traces a tree). This gives \\(n^{m+1}\\) choices, contributing \\(n^{m+1}/n^{1+m} = 1\\) to the normalized moment. The number of such combinatorial trees is \\(C_m\\).</p>

                        <p><strong>Step 4.</strong> Walks with fewer than \\(m\\) distinct edges visit at most \\(m\\) vertices, contributing \\(O(n^m / n^{1+m}) = O(n^{-1})\\), which vanishes.</p>

                        <p><strong>Step 5.</strong> Therefore \\(\\mathbb{E}[\\frac{1}{n}\\operatorname{tr}(X_n^{2m})] \\to C_m = m_{2m}(\\mu_{\\mathrm{sc}})\\). Since the semicircle distribution has compact support \\([-2,2]\\), it is determined by its moments (Carleman's condition). By the method of moments, \\(\\mathbb{E}[\\mu_{X_n}] \\Rightarrow \\mu_{\\mathrm{sc}}\\).</p>
                        <div class="qed">&square;</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">From Expectation to Almost Sure Convergence</div>
                    <div class="env-body">
                        <p>The proof above shows convergence in expectation. To upgrade to almost sure convergence, one needs to control the variance of the moments, showing \\(\\operatorname{Var}(\\frac{1}{n}\\operatorname{tr}(X_n^{2m})) \\to 0\\) fast enough for a Borel-Cantelli argument. Under the fourth moment condition \\(\\mathbb{E}[w_{12}^4] &lt; \\infty\\), one can show the variance decays as \\(O(n^{-2})\\), which suffices.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 5.17 (The Second Moment, \\(k = 2\\))</div>
                    <div class="env-body">
                        <p>For \\(k = 2\\), we compute:</p>
                        \\[\\mathbb{E}\\!\\left[\\frac{1}{n}\\operatorname{tr}(X_n^2)\\right] = \\frac{1}{n^2} \\sum_{i,j=1}^n \\mathbb{E}[w_{ij}^2].\\]
                        <p>There are \\(n\\) diagonal terms with \\(\\mathbb{E}[w_{ii}^2]\\) and \\(n(n-1)\\) off-diagonal terms with \\(\\mathbb{E}[w_{ij}^2] = 1\\). The total is \\(\\frac{1}{n^2}(n \\cdot \\mathbb{E}[w_{11}^2] + n(n-1)) = 1 + O(1/n) \\to 1 = C_1\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 5.18 (The Fourth Moment, \\(k = 4\\))</div>
                    <div class="env-body">
                        <p>For \\(k = 4\\), we need walks \\((i_1, i_2, i_3, i_4)\\) where each edge appears at least twice. The walks that contribute at leading order are the tree walks on 3 vertices with 2 edges, each traversed twice. There are exactly \\(C_2 = 2\\) such walk patterns, matching the Catalan number. For example, on vertices \\(\\{a, b, c\\}\\): the walk \\(a \\to b \\to a \\to c \\to a\\) and \\(a \\to b \\to c \\to b \\to a\\) (up to relabeling). So \\(\\mathbb{E}[\\frac{1}{n}\\operatorname{tr}(X_n^4)] \\to 2 = C_2\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-moments',
                    title: 'Moment Method: Catalan Numbers from Closed Walks',
                    description: 'Visualize the closed walks of length 2k that contribute to the moment computation. The number of non-crossing pair partitions equals the Catalan number C_k.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 440, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var currentK = 2; // 2k = walk length, so k=2 means walks of length 4

                        VizEngine.createButton(controls, 'k = 1 (C\u2081=1)', function() { currentK = 1; });
                        VizEngine.createButton(controls, 'k = 2 (C\u2082=2)', function() { currentK = 2; });
                        VizEngine.createButton(controls, 'k = 3 (C\u2083=5)', function() { currentK = 3; });
                        VizEngine.createButton(controls, 'k = 4 (C\u2084=14)', function() { currentK = 4; });

                        // Catalan numbers
                        var catalans = [1, 1, 2, 5, 14, 42, 132];

                        // Generate all non-crossing pair partitions of [2k]
                        // A non-crossing partition pairs 2k elements such that no two pairs cross
                        function generateNonCrossingPartitions(k) {
                            var n = 2 * k;
                            var result = [];

                            function backtrack(pairs, used, start) {
                                if (pairs.length === k) {
                                    result.push(pairs.slice());
                                    return;
                                }
                                // Find first unused position
                                var first = -1;
                                for (var i = start; i < n; i++) {
                                    if (!used[i]) { first = i; break; }
                                }
                                if (first === -1) return;

                                // Try pairing 'first' with each later unused position
                                for (var j = first + 1; j < n; j++) {
                                    if (used[j]) continue;
                                    // Check non-crossing: no existing pair (a,b) with a < first < b < j or first < a < j < b
                                    var crosses = false;
                                    for (var p = 0; p < pairs.length; p++) {
                                        var a = pairs[p][0], b = pairs[p][1];
                                        if ((a < first && first < b && b < j) || (first < a && a < j && j < b)) {
                                            crosses = true;
                                            break;
                                        }
                                    }
                                    if (crosses) continue;

                                    used[first] = true;
                                    used[j] = true;
                                    pairs.push([first, j]);
                                    backtrack(pairs, used, first + 1);
                                    pairs.pop();
                                    used[first] = false;
                                    used[j] = false;
                                }
                            }

                            var used = new Array(n).fill(false);
                            backtrack([], used, 0);
                            return result;
                        }

                        function draw(t) {
                            viz.clear();

                            var W = viz.width, H = viz.height;
                            var k = currentK;
                            var n = 2 * k;
                            var catalan = catalans[k];

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Non-crossing pair partitions of [' + n + '] (walks of length ' + n + ')', W / 2, 10);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('C' + k + ' = ' + catalan + ' partitions', W / 2, 34);

                            var partitions = generateNonCrossingPartitions(k);

                            // Layout partitions in a grid
                            var cols = Math.min(partitions.length, k <= 2 ? partitions.length : 5);
                            var rows = Math.ceil(partitions.length / cols);
                            var cellW = Math.min(140, (W - 40) / cols);
                            var cellH = Math.min(140, (H - 80) / rows);
                            var startX = (W - cols * cellW) / 2;
                            var startY = 60;

                            // Animate: highlight one partition at a time
                            var activeIdx = Math.floor((t / 1500) % partitions.length);

                            for (var pi = 0; pi < partitions.length; pi++) {
                                var partition = partitions[pi];
                                var col = pi % cols;
                                var row = Math.floor(pi / cols);
                                var cx = startX + col * cellW + cellW / 2;
                                var cy = startY + row * cellH + cellH / 2;
                                var radius = Math.min(cellW, cellH) * 0.32;

                                var isActive = (pi === activeIdx);

                                // Draw background circle for each partition
                                ctx.strokeStyle = isActive ? viz.colors.teal + 'aa' : viz.colors.grid;
                                ctx.lineWidth = isActive ? 2 : 1;
                                ctx.beginPath();
                                ctx.arc(cx, cy, radius, 0, Math.PI * 2);
                                ctx.stroke();
                                if (isActive) {
                                    ctx.fillStyle = viz.colors.teal + '15';
                                    ctx.fill();
                                }

                                // Draw points on circle
                                var pts = [];
                                for (var i = 0; i < n; i++) {
                                    var angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
                                    var px = cx + radius * Math.cos(angle);
                                    var py = cy + radius * Math.sin(angle);
                                    pts.push([px, py]);

                                    ctx.fillStyle = isActive ? viz.colors.white : viz.colors.text;
                                    ctx.beginPath();
                                    ctx.arc(px, py, isActive ? 4 : 3, 0, Math.PI * 2);
                                    ctx.fill();

                                    // Label
                                    var lx = cx + (radius + 12) * Math.cos(angle);
                                    var ly = cy + (radius + 12) * Math.sin(angle);
                                    ctx.fillStyle = isActive ? viz.colors.white : viz.colors.text;
                                    ctx.font = (isActive ? '11' : '9') + 'px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText((i + 1).toString(), lx, ly);
                                }

                                // Draw arcs for each pair
                                var pairColors = [viz.colors.blue, viz.colors.orange, viz.colors.teal, viz.colors.purple, viz.colors.green, viz.colors.pink, viz.colors.yellow];
                                for (var j = 0; j < partition.length; j++) {
                                    var a = partition[j][0], b = partition[j][1];
                                    var color = pairColors[j % pairColors.length];

                                    // Draw chord
                                    ctx.strokeStyle = isActive ? color : color + '66';
                                    ctx.lineWidth = isActive ? 2.5 : 1.5;
                                    ctx.beginPath();
                                    ctx.moveTo(pts[a][0], pts[a][1]);
                                    // Draw as quadratic curve through center for visual clarity
                                    var midX = (pts[a][0] + pts[b][0]) / 2;
                                    var midY = (pts[a][1] + pts[b][1]) / 2;
                                    var dx = midX - cx, dy = midY - cy;
                                    var dist = Math.sqrt(dx * dx + dy * dy);
                                    if (dist < 1) dist = 1;
                                    var controlX = cx + dx * 0.3;
                                    var controlY = cy + dy * 0.3;
                                    ctx.quadraticCurveTo(controlX, controlY, pts[b][0], pts[b][1]);
                                    ctx.stroke();
                                }

                                // Partition index
                                ctx.fillStyle = isActive ? viz.colors.orange : viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText('#' + (pi + 1), cx, cy + radius + 16);
                            }

                            // Explanation text at bottom
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('Each partition corresponds to a tree-walk pattern. The pair (i,j) means steps i and j traverse the same edge.', W / 2, H - 10);

                            // Show Catalan number sequence
                            ctx.fillStyle = viz.colors.muted;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('Catalan sequence: 1, 1, 2, 5, 14, 42, 132, ...', 15, H - 10);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Enumerate all closed walks of length 4 on the vertex set \\(\\{1, 2, 3\\}\\) where each edge appears exactly twice. Verify that there are \\(C_2 = 2\\) distinct walk patterns.',
                    hint: 'A walk \\((i_1, i_2, i_3, i_4)\\) closes as \\(i_4 \\to i_1\\). Each of the 4 edges \\(\\{i_1,i_2\\}, \\{i_2,i_3\\}, \\{i_3,i_4\\}, \\{i_4,i_1\\}\\) must appear exactly twice, so there are exactly 2 distinct edges.',
                    solution: 'The two walk patterns are: (1) \\(a \\to b \\to a \\to b \\to a\\), which goes back and forth on a single edge (but this uses only 1 distinct edge traversed 4 times, not 2 edges each twice). The correct patterns on 3 vertices with 2 distinct edges each traversed twice are: (1) \\(a \\to b \\to a \\to c \\to a\\) (star pattern) and (2) \\(a \\to b \\to c \\to b \\to a\\) (path pattern). These correspond to the two non-crossing pair partitions of \\(\\{1,2,3,4\\}\\): \\(\\{\\{1,2\\},\\{3,4\\}\\}\\) and \\(\\{\\{1,4\\},\\{2,3\\}\\}\\). Hence \\(C_2 = 2\\).'
                },
                {
                    question: 'Show that for odd \\(k\\), we have \\(\\mathbb{E}[\\frac{1}{n}\\operatorname{tr}(X_n^k)] = 0\\) for all \\(n\\). Does this also hold without taking expectations?',
                    hint: 'For odd \\(k\\), consider the parity constraint on edge multiplicities. Without expectations, think about whether \\(X_n\\) has any symmetry in its eigenvalues.',
                    solution: 'For odd \\(k\\), the walk has an odd number of steps. For the expectation to be nonzero, every edge must appear \\(\\ge 2\\) times. But if there are \\(e\\) distinct edges each appearing \\(\\ge 2\\) times, the total number of steps is \\(\\ge 2e\\), which is even. An odd number of steps cannot be decomposed this way, so all expectations vanish. Without expectations, \\(\\frac{1}{n}\\operatorname{tr}(X_n^k)\\) is generally not zero for a single realization: it equals \\(\\frac{1}{n}\\sum_i \\lambda_i^k\\), which need not vanish. However, as \\(n \\to \\infty\\), it converges to the \\(k\\)-th moment of the semicircle, which is 0 for odd \\(k\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 5: Beyond the Semicircle
        // ============================================================
        {
            id: 'ch05-sec05',
            title: 'Beyond the Semicircle',
            content: `
                <h2>Beyond the Semicircle: Fluctuations and Universality</h2>

                <p>The semicircle law describes the <em>bulk</em> behavior of eigenvalues: the macroscopic shape of the spectral distribution. But what about the <em>fine structure</em>? In this section, we explore the fluctuations around the semicircle law, the behavior of extreme eigenvalues, and the remarkable universality phenomena that extend far beyond the GOE.</p>

                <h3>Rate of Convergence</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 5.19 (Kolmogorov-Smirnov Convergence Rate)</div>
                    <div class="env-body">
                        <p>Under appropriate moment conditions, the empirical spectral distribution \\(F_{X_n}\\) converges to the semicircle CDF \\(F_{\\mathrm{sc}}\\) at rate</p>
                        \\[\\sup_x |F_{X_n}(x) - F_{\\mathrm{sc}}(x)| = O\\!\\left(\\frac{1}{n}\\right)\\]
                        <p>almost surely. This is much faster than the \\(O(1/\\sqrt{n})\\) rate of the classical CLT.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why So Fast?</div>
                    <div class="env-body">
                        <p>The rapid \\(O(1/n)\\) convergence rate is a consequence of eigenvalue repulsion. The eigenvalues are not independent: they repel each other, which creates a much more regular spacing than you would see from \\(n\\) independent random variables. The eigenvalue repulsion essentially "smooths out" the empirical distribution much faster than independence would allow.</p>
                    </div>
                </div>

                <h3>Edge Fluctuations: Tracy-Widom Distribution</h3>

                <p>While the bulk eigenvalues converge to the semicircle on the scale \\(O(1)\\), the largest eigenvalue converges to the edge \\(2\\) at a much finer scale.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 5.20 (Tracy-Widom Law for the Largest Eigenvalue)</div>
                    <div class="env-body">
                        <p>For the GOE (and, by universality, for general Wigner matrices with a finite fourth moment),</p>
                        \\[\\frac{\\lambda_{\\max}(X_n) - 2}{n^{-2/3}} \\xrightarrow{d} \\mathrm{TW}_1,\\]
                        <p>where \\(\\mathrm{TW}_1\\) is the Tracy-Widom distribution of type 1. Key facts about \\(\\mathrm{TW}_1\\):</p>
                        <ul>
                            <li>It is <strong>not Gaussian</strong> -- it has a skewed, asymmetric shape.</li>
                            <li>Mean \\(\\approx -1.2065\\), standard deviation \\(\\approx 1.268\\).</li>
                            <li>The left tail decays as \\(\\exp(-c|x|^{3/2})\\) and the right tail as \\(\\exp(-cx^{3/2})\\).</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">The Scale \\(n^{-2/3}\\)</div>
                    <div class="env-body">
                        <p>The scale \\(n^{-2/3}\\) for the fluctuation of \\(\\lambda_{\\max}\\) is intermediate between the "bulk" scale \\(O(1)\\) (where the semicircle law lives) and the "typical spacing" scale \\(O(1/n)\\) between neighboring eigenvalues. The exponent \\(2/3\\) is characteristic of the Kardar-Parisi-Zhang (KPZ) universality class and appears in diverse areas: longest increasing subsequences, directed polymers, and stochastic growth models.</p>
                    </div>
                </div>

                <h3>Local Eigenvalue Statistics</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 5.21 (Eigenvalue Spacing Distribution)</div>
                    <div class="env-body">
                        <p>After "unfolding" the eigenvalues to have unit average spacing, define the <strong>normalized spacings</strong></p>
                        \\[s_i = n \\rho_{\\mathrm{sc}}(\\lambda_i)(\\lambda_{i+1} - \\lambda_i).\\]
                        <p>The distribution of these spacings reveals the <em>local</em> correlations between neighboring eigenvalues.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 5.22 (Wigner Surmise for GOE)</div>
                    <div class="env-body">
                        <p>The spacing distribution for the GOE is approximately given by the <strong>Wigner surmise</strong>:</p>
                        \\[p(s) \\approx \\frac{\\pi s}{2} \\exp\\!\\left(-\\frac{\\pi s^2}{4}\\right).\\]
                        <p>This vanishes linearly as \\(s \\to 0\\), reflecting eigenvalue repulsion: the probability of finding two eigenvalues very close together is proportional to their distance. Compare this with independent eigenvalues, which would give the Poisson distribution \\(p(s) = e^{-s}\\).</p>
                    </div>
                </div>

                <h3>Universality</h3>

                <p>One of the deepest results in random matrix theory is <strong>universality</strong>: the local statistics (spacing distribution, Tracy-Widom fluctuations) of Wigner matrices are the same as those of the GOE, regardless of the entry distribution.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 5.23 (Erdos-Schlein-Yau / Tao-Vu Universality)</div>
                    <div class="env-body">
                        <p>Let \\(X_n\\) be a Wigner matrix whose entries have mean 0, variance 1, and all moments bounded. Then the local eigenvalue statistics of \\(X_n\\) (in the bulk and at the edge) are identical to those of the GOE. In particular:</p>
                        <ol>
                            <li>The bulk spacing distribution converges to the Wigner surmise.</li>
                            <li>The largest eigenvalue fluctuation converges to Tracy-Widom.</li>
                            <li>The \\(k\\)-point correlation functions converge to those of the GOE.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Analogy with the CLT</div>
                    <div class="env-body">
                        <p>The universality results for random matrices parallel the Central Limit Theorem in remarkable ways:</p>
                        <table style="width:100%; font-size:0.9rem; border-collapse:collapse; margin-top:8px;">
                            <tr style="border-bottom:1px solid #30363d;">
                                <th style="text-align:left; padding:4px 8px; color:var(--text-bright);">Aspect</th>
                                <th style="text-align:left; padding:4px 8px; color:var(--text-bright);">CLT</th>
                                <th style="text-align:left; padding:4px 8px; color:var(--text-bright);">Random Matrices</th>
                            </tr>
                            <tr style="border-bottom:1px solid #21262d;">
                                <td style="padding:4px 8px;">Object</td>
                                <td style="padding:4px 8px;">Sum of i.i.d. r.v.'s</td>
                                <td style="padding:4px 8px;">Eigenvalues of Wigner matrix</td>
                            </tr>
                            <tr style="border-bottom:1px solid #21262d;">
                                <td style="padding:4px 8px;">Macro limit</td>
                                <td style="padding:4px 8px;">Gaussian</td>
                                <td style="padding:4px 8px;">Semicircle</td>
                            </tr>
                            <tr style="border-bottom:1px solid #21262d;">
                                <td style="padding:4px 8px;">Input needed</td>
                                <td style="padding:4px 8px;">Mean 0, variance \\(\\sigma^2\\)</td>
                                <td style="padding:4px 8px;">Mean 0, variance \\(\\sigma^2\\)</td>
                            </tr>
                            <tr>
                                <td style="padding:4px 8px;">Fluctuations</td>
                                <td style="padding:4px 8px;">Gaussian (\\(n^{-1/2}\\))</td>
                                <td style="padding:4px 8px;">Tracy-Widom (\\(n^{-2/3}\\))</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <h3>Beyond Wigner: A Preview</h3>

                <p>The semicircle law is just the beginning. In the next chapters, we will see:</p>
                <ul>
                    <li><strong>Chapter 6:</strong> The Marchenko-Pastur law for sample covariance matrices \\(X^\\top X / n\\), where \\(X\\) is \\(n \\times p\\) with \\(p/n \\to \\gamma\\).</li>
                    <li><strong>Chapter 7:</strong> Spiked models, where a low-rank signal is added to a random matrix, and the BBP phase transition determines when the signal eigenvalue "pops out" of the bulk.</li>
                </ul>
                <p>These results form the foundation of modern high-dimensional statistics, where the dimension \\(p\\) is comparable to or exceeds the sample size \\(n\\).</p>

                <div class="env-block remark">
                    <div class="env-title">Historical Note</div>
                    <div class="env-body">
                        <p>Eugene Wigner introduced random matrices in 1955 to model the energy levels of heavy nuclei. He observed that the spacing distribution of nuclear energy levels matched the predictions of random matrix theory remarkably well. The semicircle law was proved by Wigner in 1958. The Tracy-Widom distribution was discovered by Craig Tracy and Harold Widom in 1994. The universality results of Erdos-Schlein-Yau and Tao-Vu were established around 2010-2012, representing a culmination of decades of work.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'The Tracy-Widom distribution has a right tail that decays as \\(\\exp(-c x^{3/2})\\). Compare this with the Gaussian tail \\(\\exp(-cx^2)\\). Which one has a heavier right tail? What does this say about the probability of seeing an unusually large eigenvalue?',
                    hint: 'Compare the exponents: \\(x^{3/2}\\) vs. \\(x^2\\) for large \\(x\\). Which grows faster?',
                    solution: 'For large \\(x\\), \\(x^2 &gt; x^{3/2}\\), so \\(\\exp(-cx^{3/2}) &gt; \\exp(-cx^2)\\). This means the Tracy-Widom distribution has a <strong>heavier right tail</strong> than the Gaussian. The largest eigenvalue of a random matrix is more likely to exceed its mean by a large amount than a Gaussian random variable would be. This reflects the fact that eigenvalues, while exhibiting repulsion, can still occasionally produce large fluctuations at the spectral edge.'
                },
                {
                    question: 'Consider the Wigner surmise \\(p(s) = \\frac{\\pi s}{2} e^{-\\pi s^2/4}\\). Verify that it integrates to 1 and compute its mean \\(\\mathbb{E}[s]\\).',
                    hint: 'For normalization, use the substitution \\(u = \\pi s^2/4\\). For the mean, use \\(\\int_0^\\infty s^2 e^{-\\alpha s^2} ds = \\frac{\\sqrt{\\pi}}{4\\alpha^{3/2}}\\).',
                    solution: 'Normalization: \\(\\int_0^\\infty \\frac{\\pi s}{2} e^{-\\pi s^2/4}\\, ds\\). Let \\(u = \\pi s^2/4\\), so \\(du = \\pi s/2\\, ds\\). Then \\(\\int_0^\\infty e^{-u}\\, du = 1\\). For the mean: \\(\\mathbb{E}[s] = \\int_0^\\infty \\frac{\\pi s^2}{2} e^{-\\pi s^2/4}\\, ds = \\frac{\\pi}{2} \\cdot \\frac{\\sqrt{\\pi}}{4(\\pi/4)^{3/2}} = \\frac{\\pi}{2} \\cdot \\frac{\\sqrt{\\pi}}{4} \\cdot \\frac{8}{\\pi^{3/2}} = 1\\). So the mean spacing is exactly 1, consistent with the unit-spacing normalization.'
                }
            ]
        }
    ]
});
