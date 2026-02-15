window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch06',
    number: 6,
    title: 'Marchenko-Pastur Law',
    subtitle: 'Spectral distribution of sample covariance matrices',
    sections: [
        // ============================================================
        // SECTION 1: The High-Dimensional Regime
        // ============================================================
        {
            id: 'ch06-sec01',
            title: 'The High-Dimensional Regime',
            content: `
                <h2>The High-Dimensional Regime &mdash; \\(p/n \\to \\gamma\\)</h2>

                <p>Classical multivariate statistics operates under the assumption that the number of observations \\(n\\) vastly exceeds the dimension \\(p\\) of the data. In this comfortable regime, the <strong>sample covariance matrix</strong> is an excellent estimator of the population covariance. But what happens when \\(p\\) is comparable to, or even larger than, \\(n\\)?</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 6.1 (Sample Covariance Matrix)</div>
                    <div class="env-body">
                        <p>Let \\(x_1, \\ldots, x_n \\in \\mathbb{R}^p\\) be i.i.d. random vectors with mean zero and covariance \\(\\Sigma\\). The <strong>sample covariance matrix</strong> is</p>
                        \\[S_n = \\frac{1}{n} \\sum_{i=1}^n x_i x_i^\\top = \\frac{1}{n} X^\\top X,\\]
                        <p>where \\(X\\) is the \\(n \\times p\\) data matrix with rows \\(x_i^\\top\\).</p>
                    </div>
                </div>

                <p>When \\(\\Sigma = I_p\\) (the identity), so that entries of \\(X\\) are i.i.d. standard Gaussians, \\(S_n\\) is called a <strong>Wishart matrix</strong> (up to scaling). In the classical regime \\(p\\) fixed, \\(n \\to \\infty\\), the law of large numbers gives \\(S_n \\to \\Sigma\\) almost surely. But the high-dimensional regime tells a completely different story.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 6.2 (Proportional Growth Regime)</div>
                    <div class="env-body">
                        <p>We say that \\(p\\) and \\(n\\) grow in the <strong>proportional growth regime</strong> if</p>
                        \\[\\frac{p}{n} \\to \\gamma \\in (0, \\infty)\\]
                        <p>as \\(n \\to \\infty\\). The parameter \\(\\gamma\\) is called the <strong>aspect ratio</strong>. When \\(\\gamma &gt; 1\\), we have more variables than observations.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Why High Dimensions Distort Everything</div>
                    <div class="env-body">
                        <p>When \\(p \\approx n\\), the data matrix \\(X\\) is nearly square. The sample covariance \\(\\frac{1}{n}X^\\top X\\) has \\(p\\) eigenvalues, but they are estimated from only \\(n\\) samples. Each eigenvalue is estimated with an effective sample size of roughly \\(n/p = 1/\\gamma\\), which is a constant &mdash; far from the \\(n \\to \\infty\\) needed for consistency.</p>
                        <p>The result is dramatic: even when the true covariance is \\(\\Sigma = I_p\\), the sample eigenvalues do <em>not</em> cluster near 1. Instead they <em>spread out</em> over an interval determined by \\(\\gamma\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 6.3 (Empirical Spectral Distribution)</div>
                    <div class="env-body">
                        <p>For a \\(p \\times p\\) symmetric matrix \\(A\\) with eigenvalues \\(\\lambda_1, \\ldots, \\lambda_p\\), the <strong>empirical spectral distribution (ESD)</strong> is</p>
                        \\[\\mu_A = \\frac{1}{p} \\sum_{i=1}^p \\delta_{\\lambda_i},\\]
                        <p>where \\(\\delta_x\\) is a point mass at \\(x\\). The ESD is a probability measure on \\(\\mathbb{R}\\) that captures the bulk behavior of the eigenvalues.</p>
                    </div>
                </div>

                <p>The central question of this chapter: what is the limit of the ESD of \\(S_n = \\frac{1}{n}X^\\top X\\) as \\(p, n \\to \\infty\\) with \\(p/n \\to \\gamma\\)?</p>

                <div class="env-block example">
                    <div class="env-title">Example 6.4 (Low vs. High Dimensions)</div>
                    <div class="env-body">
                        <p><strong>Low-dimensional case:</strong> \\(p = 5\\), \\(n = 10{,}000\\). The sample eigenvalues are \\(\\{0.998, 1.001, 0.999, 1.002, 1.000\\}\\) &mdash; tightly concentrated near 1.</p>
                        <p><strong>High-dimensional case:</strong> \\(p = 500\\), \\(n = 1{,}000\\) (so \\(\\gamma = 0.5\\)). The sample eigenvalues range from approximately 0.09 to 2.91, with most clustered in a band far from the true eigenvalue of 1.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Ubiquity of the Regime)</div>
                    <div class="env-body">
                        <p>The regime \\(p/n \\to \\gamma\\) arises naturally in many modern applications:</p>
                        <ul>
                            <li><strong>Finance:</strong> portfolio with \\(p = 500\\) assets and \\(n = 1{,}000\\) daily returns (\\(\\gamma = 0.5\\))</li>
                            <li><strong>Genomics:</strong> \\(p = 20{,}000\\) genes and \\(n = 200\\) patients (\\(\\gamma = 100\\))</li>
                            <li><strong>Signal processing:</strong> \\(p\\) antennas, \\(n\\) time snapshots</li>
                            <li><strong>Machine learning:</strong> \\(p\\) features, \\(n\\) training samples</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-mp-law"></div>
            `,
            visualizations: [
                {
                    id: 'viz-mp-law',
                    title: 'Marchenko-Pastur Law: Eigenvalue Histogram vs. Theoretical Density',
                    description: 'Generate an n x p Gaussian matrix X, form the sample covariance (1/n)X&#x1D40;X, and compare the eigenvalue histogram to the Marchenko-Pastur density. Adjust n and p to see how the aspect ratio gamma = p/n controls the shape.',
                    setup: function(container, controls) {
                        var canvasWidth = 700;
                        var canvasHeight = 420;
                        var viz = new VizEngine(container, { width: canvasWidth, height: canvasHeight, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var paramN = 200;
                        var paramP = 100;

                        // Simple seeded PRNG (Mulberry32)
                        function mulberry32(a) {
                            return function() {
                                a |= 0; a = a + 0x6D2B79F5 | 0;
                                var t = Math.imul(a ^ a >>> 15, 1 | a);
                                t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
                                return ((t ^ t >>> 14) >>> 0) / 4294967296;
                            };
                        }

                        // Box-Muller transform for Gaussian
                        function randn(rng) {
                            var u1 = rng(), u2 = rng();
                            while (u1 === 0) u1 = rng();
                            return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
                        }

                        // Compute eigenvalues of a symmetric matrix using Jacobi iteration
                        function jacobiEigenvalues(A, maxIter) {
                            var n = A.length;
                            maxIter = maxIter || 100;
                            // Copy matrix
                            var S = [];
                            for (var i = 0; i < n; i++) {
                                S[i] = [];
                                for (var j = 0; j < n; j++) {
                                    S[i][j] = A[i][j];
                                }
                            }
                            for (var iter = 0; iter < maxIter; iter++) {
                                // Find largest off-diagonal element
                                var maxVal = 0, pi = 0, qi = 1;
                                for (var ii = 0; ii < n; ii++) {
                                    for (var jj = ii + 1; jj < n; jj++) {
                                        if (Math.abs(S[ii][jj]) > maxVal) {
                                            maxVal = Math.abs(S[ii][jj]);
                                            pi = ii; qi = jj;
                                        }
                                    }
                                }
                                if (maxVal < 1e-10) break;
                                // Compute rotation
                                var theta;
                                if (Math.abs(S[pi][pi] - S[qi][qi]) < 1e-15) {
                                    theta = Math.PI / 4;
                                } else {
                                    theta = 0.5 * Math.atan2(2 * S[pi][qi], S[pi][pi] - S[qi][qi]);
                                }
                                var c = Math.cos(theta), s = Math.sin(theta);
                                // Apply Givens rotation
                                for (var k = 0; k < n; k++) {
                                    var Skp = S[k][pi], Skq = S[k][qi];
                                    S[k][pi] = c * Skp + s * Skq;
                                    S[k][qi] = -s * Skp + c * Skq;
                                }
                                for (var k = 0; k < n; k++) {
                                    var Spk = S[pi][k], Sqk = S[qi][k];
                                    S[pi][k] = c * Spk + s * Sqk;
                                    S[qi][k] = -s * Spk + c * Sqk;
                                }
                            }
                            var evals = [];
                            for (var i = 0; i < n; i++) evals.push(S[i][i]);
                            return evals.sort(function(a, b) { return a - b; });
                        }

                        // Marchenko-Pastur density
                        function mpDensity(x, gamma) {
                            var lambdaPlus = (1 + Math.sqrt(gamma)) * (1 + Math.sqrt(gamma));
                            var lambdaMinus = (1 - Math.sqrt(gamma)) * (1 - Math.sqrt(gamma));
                            if (x < lambdaMinus || x > lambdaPlus) return 0;
                            return Math.sqrt((lambdaPlus - x) * (x - lambdaMinus)) / (2 * Math.PI * gamma * x);
                        }

                        var cachedEigenvalues = null;
                        var cachedSeed = 42;

                        function generateAndCompute() {
                            var n = paramN;
                            var p = paramP;
                            var dim = Math.min(p, n);
                            var rng = mulberry32(cachedSeed);

                            // Generate p x n Gaussian matrix
                            var X = [];
                            for (var i = 0; i < p; i++) {
                                X[i] = [];
                                for (var j = 0; j < n; j++) {
                                    X[i][j] = randn(rng);
                                }
                            }

                            // Form sample covariance (1/n) X X^T (p x p) or (1/n) X^T X (n x n)
                            // We compute the smaller one for efficiency
                            if (p <= n) {
                                // (1/n) X X^T is p x p
                                var C = [];
                                for (var i = 0; i < p; i++) {
                                    C[i] = [];
                                    for (var j = 0; j < p; j++) {
                                        var s = 0;
                                        for (var k = 0; k < n; k++) s += X[i][k] * X[j][k];
                                        C[i][j] = s / n;
                                    }
                                }
                                cachedEigenvalues = jacobiEigenvalues(C, 200);
                            } else {
                                // (1/n) X^T X is n x n, has same nonzero eigenvalues as (1/n) XX^T
                                // plus (p - n) zeros
                                var C = [];
                                for (var i = 0; i < n; i++) {
                                    C[i] = [];
                                    for (var j = 0; j < n; j++) {
                                        var s = 0;
                                        for (var k = 0; k < p; k++) s += X[k][i] * X[k][j];
                                        C[i][j] = s / n;
                                    }
                                }
                                var nonzeroEvals = jacobiEigenvalues(C, 200);
                                // Prepend (p - n) zeros
                                cachedEigenvalues = [];
                                for (var z = 0; z < p - n; z++) cachedEigenvalues.push(0);
                                for (var i = 0; i < nonzeroEvals.length; i++) cachedEigenvalues.push(nonzeroEvals[i]);
                            }
                        }

                        function draw() {
                            var gamma = paramP / paramN;
                            var evals = cachedEigenvalues;
                            if (!evals) return;

                            viz.clear();
                            var margin = { left: 60, right: 30, top: 40, bottom: 50 };
                            var plotW = canvasWidth - margin.left - margin.right;
                            var plotH = canvasHeight - margin.top - margin.bottom;

                            var lambdaPlus = (1 + Math.sqrt(gamma)) * (1 + Math.sqrt(gamma));
                            var lambdaMinus = (1 - Math.sqrt(gamma)) * (1 - Math.sqrt(gamma));

                            // Determine histogram range
                            var xMin = 0;
                            var xMax = Math.max(lambdaPlus * 1.3, evals[evals.length - 1] * 1.1);
                            if (xMax < 0.5) xMax = 0.5;

                            // Build histogram
                            var nBins = Math.min(50, Math.max(15, Math.round(Math.sqrt(evals.length))));
                            var binWidth = (xMax - xMin) / nBins;
                            var bins = [];
                            for (var b = 0; b < nBins; b++) bins[b] = 0;
                            // Separate zero eigenvalues when gamma > 1
                            var zeroCount = 0;
                            for (var i = 0; i < evals.length; i++) {
                                if (evals[i] < 1e-8) {
                                    zeroCount++;
                                    continue;
                                }
                                var idx = Math.floor((evals[i] - xMin) / binWidth);
                                if (idx >= 0 && idx < nBins) bins[idx]++;
                            }
                            // Convert to density: count / (total * binWidth)
                            var total = evals.length;
                            var maxDens = 0;
                            var binDensity = [];
                            for (var b = 0; b < nBins; b++) {
                                binDensity[b] = bins[b] / (total * binWidth);
                                if (binDensity[b] > maxDens) maxDens = binDensity[b];
                            }

                            // Compute MP density curve
                            var mpCurve = [];
                            var nCurvePoints = 300;
                            var maxMPDens = 0;
                            for (var i = 0; i <= nCurvePoints; i++) {
                                var x = xMin + (xMax - xMin) * i / nCurvePoints;
                                var d = mpDensity(x, gamma);
                                mpCurve.push({ x: x, d: d });
                                if (d > maxMPDens) maxMPDens = d;
                            }

                            // Handle atom at zero for gamma > 1
                            var atomHeight = 0;
                            if (gamma > 1) {
                                atomHeight = 1 - 1 / gamma;
                            }

                            var yMax = Math.max(maxDens, maxMPDens) * 1.15;
                            if (yMax < 0.01) yMax = 1;

                            // Draw axes
                            ctx.strokeStyle = '#4a4a7a';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(margin.left, margin.top);
                            ctx.lineTo(margin.left, margin.top + plotH);
                            ctx.lineTo(margin.left + plotW, margin.top + plotH);
                            ctx.stroke();

                            // X-axis ticks
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            var xStep = Math.pow(10, Math.floor(Math.log10(xMax / 4)));
                            if (xMax / xStep > 10) xStep *= 2;
                            if (xMax / xStep < 3) xStep *= 0.5;
                            for (var xt = 0; xt <= xMax; xt += xStep) {
                                var sx = margin.left + (xt - xMin) / (xMax - xMin) * plotW;
                                ctx.fillText(xt.toFixed(1), sx, margin.top + plotH + 6);
                                ctx.strokeStyle = '#1a1a40';
                                ctx.beginPath();
                                ctx.moveTo(sx, margin.top);
                                ctx.lineTo(sx, margin.top + plotH);
                                ctx.stroke();
                            }
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('\u03bb', margin.left + plotW / 2, margin.top + plotH + 28);

                            // Y-axis label
                            ctx.save();
                            ctx.translate(16, margin.top + plotH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Density', 0, 0);
                            ctx.restore();

                            // Draw histogram bars
                            for (var b = 0; b < nBins; b++) {
                                if (binDensity[b] < 1e-12) continue;
                                var bx = margin.left + (xMin + b * binWidth - xMin) / (xMax - xMin) * plotW;
                                var bw = binWidth / (xMax - xMin) * plotW;
                                var bh = binDensity[b] / yMax * plotH;
                                ctx.fillStyle = 'rgba(88, 166, 255, 0.35)';
                                ctx.fillRect(bx, margin.top + plotH - bh, bw, bh);
                                ctx.strokeStyle = 'rgba(88, 166, 255, 0.6)';
                                ctx.lineWidth = 1;
                                ctx.strokeRect(bx, margin.top + plotH - bh, bw, bh);
                            }

                            // Draw atom at zero indicator if gamma > 1
                            if (gamma > 1 && zeroCount > 0) {
                                var atomFrac = zeroCount / total;
                                var arrowX = margin.left + 4;
                                var arrowTop = margin.top + 20;
                                ctx.fillStyle = 'rgba(248, 81, 73, 0.8)';
                                ctx.beginPath();
                                ctx.moveTo(arrowX, arrowTop);
                                ctx.lineTo(arrowX - 6, arrowTop + 14);
                                ctx.lineTo(arrowX + 6, arrowTop + 14);
                                ctx.closePath();
                                ctx.fill();
                                ctx.fillStyle = viz.colors.red;
                                ctx.font = 'bold 11px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'top';
                                ctx.fillText('Atom at 0: ' + atomFrac.toFixed(2), arrowX + 10, arrowTop);
                                ctx.fillText('(1-1/\u03b3 = ' + atomHeight.toFixed(2) + ')', arrowX + 10, arrowTop + 14);
                            }

                            // Draw MP density curve
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= nCurvePoints; i++) {
                                var px = margin.left + (mpCurve[i].x - xMin) / (xMax - xMin) * plotW;
                                var py = margin.top + plotH - mpCurve[i].d / yMax * plotH;
                                if (mpCurve[i].d > 1e-10) {
                                    if (!started) { ctx.moveTo(px, py); started = true; }
                                    else ctx.lineTo(px, py);
                                }
                            }
                            ctx.stroke();

                            // Mark support edges
                            ctx.setLineDash([4, 4]);
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 1;
                            var sxMinus = margin.left + (lambdaMinus - xMin) / (xMax - xMin) * plotW;
                            var sxPlus = margin.left + (lambdaPlus - xMin) / (xMax - xMin) * plotW;
                            ctx.beginPath(); ctx.moveTo(sxMinus, margin.top); ctx.lineTo(sxMinus, margin.top + plotH); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(sxPlus, margin.top); ctx.lineTo(sxPlus, margin.top + plotH); ctx.stroke();
                            ctx.setLineDash([]);

                            // Labels for edges
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('(1-\u221a\u03b3)\u00b2=' + lambdaMinus.toFixed(2), sxMinus, margin.top - 2);
                            ctx.fillText('(1+\u221a\u03b3)\u00b2=' + lambdaPlus.toFixed(2), sxPlus, margin.top - 2);

                            // Legend
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            var legX = margin.left + plotW - 200, legY = margin.top + 16;
                            ctx.fillStyle = 'rgba(88, 166, 255, 0.5)';
                            ctx.fillRect(legX, legY, 14, 10);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('Sample eigenvalues', legX + 20, legY + 10);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(legX, legY + 24); ctx.lineTo(legX + 14, legY + 24); ctx.stroke();
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('MP density f\u03b3(\u03bb)', legX + 20, legY + 29);

                            // Title info
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('n = ' + paramN + ',  p = ' + paramP + ',  \u03b3 = p/n = ' + (paramP / paramN).toFixed(3), margin.left + 8, margin.top + plotH + 36);
                        }

                        VizEngine.createSlider(controls, 'n', 20, 400, paramN, 10, function(v) {
                            paramN = Math.round(v);
                            generateAndCompute();
                            draw();
                        });
                        VizEngine.createSlider(controls, 'p', 10, 400, paramP, 10, function(v) {
                            paramP = Math.round(v);
                            generateAndCompute();
                            draw();
                        });
                        VizEngine.createButton(controls, 'Resample', function() {
                            cachedSeed = Math.floor(Math.random() * 100000);
                            generateAndCompute();
                            draw();
                        });

                        generateAndCompute();
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(X\\) be an \\(n \\times p\\) matrix with i.i.d. \\(\\mathcal{N}(0,1)\\) entries and let \\(S = \\frac{1}{n}X^\\top X\\). How many nonzero eigenvalues does \\(S\\) have when \\(p &gt; n\\)? Explain why.',
                    hint: 'What is the rank of \\(X^\\top X\\) in terms of the rank of \\(X\\)?',
                    solution: 'The matrix \\(X\\) has rank at most \\(\\min(n, p) = n\\) when \\(p &gt; n\\). Since \\(\\operatorname{rank}(X^\\top X) = \\operatorname{rank}(X) = n\\) almost surely, the \\(p \\times p\\) matrix \\(S = \\frac{1}{n}X^\\top X\\) has exactly \\(n\\) nonzero eigenvalues and \\(p - n\\) zero eigenvalues. In the ESD, this means a fraction \\(1 - n/p = 1 - 1/\\gamma\\) of the mass sits at zero.'
                }
            ]
        },
        // ============================================================
        // SECTION 2: Marchenko-Pastur Distribution
        // ============================================================
        {
            id: 'ch06-sec02',
            title: 'Marchenko-Pastur Distribution',
            content: `
                <h2>The Marchenko-Pastur Distribution</h2>

                <p>The <strong>Marchenko-Pastur law</strong>, discovered by Vladimir Marchenko and Leonid Pastur in 1967, describes the limiting spectral distribution of sample covariance matrices in the proportional growth regime. It is the covariance analogue of Wigner's semicircle law.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 6.5 (Marchenko-Pastur Law)</div>
                    <div class="env-body">
                        <p>Let \\(X\\) be an \\(n \\times p\\) matrix with i.i.d. entries having mean 0, variance 1, and finite fourth moment. Suppose \\(p/n \\to \\gamma \\in (0, \\infty)\\). Then the empirical spectral distribution of</p>
                        \\[S_n = \\frac{1}{n}X^\\top X\\]
                        <p>converges weakly, almost surely, to the <strong>Marchenko-Pastur distribution</strong> \\(\\mu_\\gamma\\) defined by:</p>
                        \\[\\mathrm{d}\\mu_\\gamma(\\lambda) = \\left(1 - \\frac{1}{\\gamma}\\right)^+ \\delta_0(\\mathrm{d}\\lambda) \\;+\\; f_\\gamma(\\lambda)\\,\\mathrm{d}\\lambda,\\]
                        <p>where the continuous density is</p>
                        \\[f_\\gamma(\\lambda) = \\frac{\\sqrt{(\\lambda_+ - \\lambda)(\\lambda - \\lambda_-)}}{2\\pi \\gamma \\lambda} \\cdot \\mathbf{1}_{[\\lambda_-, \\lambda_+]}(\\lambda),\\]
                        <p>with edges</p>
                        \\[\\lambda_\\pm = (1 \\pm \\sqrt{\\gamma})^2.\\]
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Structure of the Law)</div>
                    <div class="env-body">
                        <p>The MP distribution has two components:</p>
                        <ul>
                            <li><strong>Continuous part:</strong> The density \\(f_\\gamma\\) is supported on \\([\\lambda_-, \\lambda_+]\\). This describes the bulk of the nonzero eigenvalues.</li>
                            <li><strong>Atom at zero:</strong> When \\(\\gamma &gt; 1\\) (more variables than observations), there is a point mass of weight \\(1 - 1/\\gamma\\) at zero, corresponding to the \\(p - n\\) zero eigenvalues of the rank-deficient sample covariance.</li>
                        </ul>
                        <p>The notation \\((x)^+ = \\max(x, 0)\\) ensures the atom vanishes when \\(\\gamma \\leq 1\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 6.6 (Key Values of \\(\\gamma\\))</div>
                    <div class="env-body">
                        <p>Let us examine the MP support \\([\\lambda_-, \\lambda_+]\\) for several aspect ratios:</p>
                        <ul>
                            <li>\\(\\gamma = 0.1\\): \\(\\lambda_- \\approx 0.37\\), \\(\\lambda_+ \\approx 1.83\\). Eigenvalues mildly spread.</li>
                            <li>\\(\\gamma = 0.5\\): \\(\\lambda_- \\approx 0.09\\), \\(\\lambda_+ \\approx 2.91\\). Significant spread.</li>
                            <li>\\(\\gamma = 1.0\\): \\(\\lambda_- = 0\\), \\(\\lambda_+ = 4\\). Support reaches down to 0 (phase transition!).</li>
                            <li>\\(\\gamma = 2.0\\): \\(\\lambda_- \\approx 0.17\\), \\(\\lambda_+ \\approx 5.83\\). Atom at 0 carries weight \\(1/2\\).</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: The Phase Transition at \\(\\gamma = 1\\)</div>
                    <div class="env-body">
                        <p>At \\(\\gamma = 1\\) (square data matrix), the lower edge \\(\\lambda_- = (1 - 1)^2 = 0\\) touches zero and the density \\(f_1(\\lambda) = \\frac{\\sqrt{4 - \\lambda}}{2\\pi\\lambda^{1/2}}\\) diverges like \\(\\lambda^{-1/2}\\) near zero. This is a <strong>phase transition</strong>:</p>
                        <ul>
                            <li>For \\(\\gamma &lt; 1\\): the density is bounded and vanishes at both edges.</li>
                            <li>For \\(\\gamma = 1\\): the density diverges at the lower edge (square-root singularity).</li>
                            <li>For \\(\\gamma &gt; 1\\): a discrete atom forms at zero, and the continuous part is again bounded on \\([\\lambda_-, \\lambda_+]\\) with \\(\\lambda_- &gt; 0\\).</li>
                        </ul>
                    </div>
                </div>

                <h3>Moments of the Marchenko-Pastur Distribution</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 6.7 (Moments of \\(\\mu_\\gamma\\))</div>
                    <div class="env-body">
                        <p>The \\(k\\)-th moment of the Marchenko-Pastur distribution is given by</p>
                        \\[m_k = \\int \\lambda^k \\,\\mathrm{d}\\mu_\\gamma(\\lambda) = \\sum_{j=0}^{k-1} \\frac{1}{j+1}\\binom{k}{j}\\binom{k-1}{j} \\gamma^j,\\]
                        <p>where the coefficients involve the <strong>Narayana numbers</strong> \\(N(k, j+1) = \\frac{1}{k}\\binom{k}{j}\\binom{k}{j+1}\\). In particular:</p>
                        <ul>
                            <li>\\(m_1 = 1\\) (the mean is always 1, matching \\(\\mathbb{E}[\\mathrm{tr}(S_n)/p]\\))</li>
                            <li>\\(m_2 = 1 + \\gamma\\) (the variance is \\(\\gamma\\))</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (of \\(m_1 = 1\\) and \\(m_2 = 1 + \\gamma\\))</div>
                    <div class="env-body">
                        <p>For the first moment: \\(\\mathbb{E}[\\frac{1}{p}\\operatorname{tr}(S_n)] = \\frac{1}{p}\\operatorname{tr}(\\mathbb{E}[S_n]) = \\frac{1}{p}\\operatorname{tr}(I_p) = 1\\).</p>
                        <p>For the second moment: \\(\\frac{1}{p}\\operatorname{tr}(S_n^2) = \\frac{1}{pn^2}\\sum_{i,j}(X^\\top X)_{ij}^2\\). A moment computation using independence of entries yields</p>
                        \\[\\mathbb{E}\\!\\left[\\frac{1}{p}\\operatorname{tr}(S_n^2)\\right] = 1 + \\frac{p}{n} \\to 1 + \\gamma,\\]
                        <p>confirming that the variance of \\(\\mu_\\gamma\\) is \\(m_2 - m_1^2 = \\gamma\\).</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <h3>General Population Covariance</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 6.8 (Generalized Marchenko-Pastur Law)</div>
                    <div class="env-body">
                        <p>If the population covariance is \\(\\Sigma \\neq I_p\\), and the spectral distribution of \\(\\Sigma\\) converges to a law \\(H\\), then the ESD of \\(S_n = \\frac{1}{n}X\\Sigma X^\\top\\) converges to a deterministic law \\(\\mu\\) whose Stieltjes transform \\(m(z)\\) satisfies the <strong>Marchenko-Pastur equation</strong>:</p>
                        \\[m(z) = \\int \\frac{1}{\\tau(1 - \\gamma - \\gamma z\\, m(z)) - z} \\,\\mathrm{d}H(\\tau).\\]
                        <p>When \\(H = \\delta_1\\) (i.e., \\(\\Sigma = I_p\\)), this reduces to the standard MP law.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Verify that the Marchenko-Pastur density \\(f_\\gamma\\) integrates to \\(\\min(1, 1/\\gamma)\\) over its support. Why is this the correct normalization?',
                    hint: 'The total measure of \\(\\mu_\\gamma\\) must be 1. When \\(\\gamma &gt; 1\\), the atom at zero carries mass \\(1 - 1/\\gamma\\), so the continuous part must integrate to \\(1/\\gamma\\).',
                    solution: 'The total mass of \\(\\mu_\\gamma\\) is 1. The atom at zero has mass \\((1 - 1/\\gamma)^+ = \\max(0, 1 - 1/\\gamma)\\). When \\(\\gamma \\leq 1\\), there is no atom, so \\(\\int f_\\gamma = 1\\). When \\(\\gamma &gt; 1\\), the atom has mass \\(1 - 1/\\gamma\\), so \\(\\int f_\\gamma = 1 - (1 - 1/\\gamma) = 1/\\gamma\\). In both cases, \\(\\int f_\\gamma = \\min(1, 1/\\gamma)\\). This is correct because the fraction of nonzero eigenvalues is \\(\\min(n, p)/p = \\min(1, 1/\\gamma)\\).'
                },
                {
                    question: 'Compute the MP support edges \\(\\lambda_\\pm\\) when \\(\\gamma = 1/4\\). If you observe a sample eigenvalue at \\(\\lambda = 2.5\\), what can you conclude?',
                    hint: 'Compute \\((1 \\pm \\sqrt{1/4})^2 = (1 \\pm 1/2)^2\\). Compare 2.5 to \\(\\lambda_+\\).',
                    solution: 'We have \\(\\lambda_- = (1 - 1/2)^2 = 1/4 = 0.25\\) and \\(\\lambda_+ = (1 + 1/2)^2 = 9/4 = 2.25\\). A sample eigenvalue at 2.5 exceeds \\(\\lambda_+ = 2.25\\), which lies outside the MP support. Under the null hypothesis \\(\\Sigma = I_p\\), no eigenvalues should appear beyond \\(\\lambda_+\\) (in the limit). This is evidence that the corresponding population eigenvalue is &gt; 1, i.e., there is a signal (spike) in that direction. This is the basis for the BBP (Baik-Ben Arous-Peche) transition studied in the next chapter.'
                }
            ]
        },
        // ============================================================
        // SECTION 3: Stieltjes Transform Method
        // ============================================================
        {
            id: 'ch06-sec03',
            title: 'Stieltjes Transform Method',
            content: `
                <h2>The Stieltjes Transform Method</h2>

                <p>The standard approach to proving the Marchenko-Pastur law uses the <strong>Stieltjes transform</strong>, which converts the problem of characterizing a probability measure into analyzing a complex-analytic function.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 6.9 (Stieltjes Transform)</div>
                    <div class="env-body">
                        <p>The <strong>Stieltjes transform</strong> of a probability measure \\(\\mu\\) on \\(\\mathbb{R}\\) is</p>
                        \\[m_\\mu(z) = \\int_{\\mathbb{R}} \\frac{1}{\\lambda - z} \\,\\mathrm{d}\\mu(\\lambda), \\qquad z \\in \\mathbb{C}^+ := \\{z \\in \\mathbb{C} : \\operatorname{Im}(z) &gt; 0\\}.\\]
                        <p>The function \\(m_\\mu : \\mathbb{C}^+ \\to \\mathbb{C}^-\\) is analytic and maps the upper half-plane to the lower half-plane.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 6.10 (Stieltjes Inversion Formula)</div>
                    <div class="env-body">
                        <p>The measure \\(\\mu\\) can be recovered from its Stieltjes transform via</p>
                        \\[\\mathrm{d}\\mu(\\lambda) = -\\frac{1}{\\pi} \\lim_{\\eta \\downarrow 0} \\operatorname{Im}\\, m_\\mu(\\lambda + i\\eta) \\,\\mathrm{d}\\lambda.\\]
                        <p>In particular, the Stieltjes transform uniquely determines the measure.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Why the Stieltjes Transform?</div>
                    <div class="env-body">
                        <p>The Stieltjes transform of the ESD of \\(S_n\\) has a natural algebraic expression:</p>
                        \\[m_n(z) = \\frac{1}{p}\\operatorname{tr}(S_n - zI)^{-1} = \\frac{1}{p}\\sum_{i=1}^p \\frac{1}{\\lambda_i - z}.\\]
                        <p>This is the (normalized) trace of a resolvent, which is amenable to matrix identities. The key idea: show \\(m_n(z) \\to m(z)\\) for all \\(z \\in \\mathbb{C}^+\\), then invoke uniqueness and continuity theorems to conclude weak convergence of measures.</p>
                    </div>
                </div>

                <h3>Proof Sketch of the Marchenko-Pastur Law</h3>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>We outline the proof in four steps, taking \\(\\Sigma = I_p\\) for simplicity.</p>

                        <p><strong>Step 1: Resolvent identity.</strong> Write \\(S_n = \\frac{1}{n}X^\\top X\\) and let \\(R(z) = (S_n - zI_p)^{-1}\\). Using the matrix identity for rank-one updates, removing the \\(k\\)-th row of \\(X\\):</p>
                        \\[\\frac{1}{\\lambda_i - z} = \\text{(function of all other rows)},\\]
                        <p>one derives a <strong>self-consistent equation</strong> for the Stieltjes transform.</p>

                        <p><strong>Step 2: Concentration.</strong> Show that \\(m_n(z) - \\mathbb{E}[m_n(z)] \\to 0\\) almost surely. This follows from concentration inequalities (e.g., the bounded differences inequality or Gaussian Poincare) since each entry of \\(X\\) affects \\(m_n(z)\\) by \\(O(1/n)\\).</p>

                        <p><strong>Step 3: Fixed-point equation.</strong> Taking expectations and using the leave-one-out structure, one shows that \\(\\bar{m}(z) = \\mathbb{E}[m_n(z)]\\) approximately satisfies</p>
                        \\[\\bar{m}(z) = \\frac{1}{-z + \\gamma/(1 + \\bar{m}(z))}.\\]
                        <p>More precisely, the error vanishes as \\(n, p \\to \\infty\\).</p>

                        <p><strong>Step 4: Solving the fixed-point equation.</strong> Setting \\(m = m_\\gamma(z)\\) and rearranging:</p>
                        \\[m = \\frac{1}{-z + \\frac{\\gamma}{1 + m}},\\]
                        <p>which gives the quadratic</p>
                        \\[\\gamma z m^2 + (z - \\gamma + 1)m + 1 = 0.\\]
                        <p>Solving and choosing the root with \\(\\operatorname{Im}(m) &lt; 0\\) for \\(z \\in \\mathbb{C}^+\\):</p>
                        \\[m_\\gamma(z) = \\frac{-(z - \\gamma + 1) + \\sqrt{(z - \\gamma + 1)^2 - 4\\gamma z}}{2\\gamma z}.\\]
                        <p>Applying the Stieltjes inversion formula recovers the MP density \\(f_\\gamma\\).</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 6.11 (MP Fixed-Point Equation, Companion Form)</div>
                    <div class="env-body">
                        <p>The Stieltjes transform \\(m = m_\\gamma(z)\\) of the MP law equivalently satisfies the <strong>companion Stieltjes transform</strong> relation. Define \\(\\underline{m}(z) = -\\frac{1-\\gamma}{z} + \\gamma\\, m(z)\\), the Stieltjes transform of the companion distribution (the ESD of \\(\\frac{1}{n}XX^\\top\\)). Then:</p>
                        \\[\\underline{m}(z) = \\frac{1}{-z(1 + \\gamma \\underline{m}(z))}, \\qquad z = -\\frac{1}{\\underline{m}} + \\frac{\\gamma}{1 + \\underline{m}}.\\]
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Universality)</div>
                    <div class="env-body">
                        <p>The MP law depends on the entries of \\(X\\) only through their mean (0) and variance (1). It holds for <em>any</em> entry distribution with finite fourth moment &mdash; Gaussian, Bernoulli \\(\\pm 1\\), uniform, etc. This is a manifestation of <strong>universality</strong> in random matrix theory. Stronger versions require only finite \\(2+\\varepsilon\\) moments (Bai and Silverstein, 1998).</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Starting from the fixed-point equation \\(m = \\frac{1}{-z + \\gamma/(1+m)}\\), derive the quadratic \\(\\gamma z m^2 + (z - \\gamma + 1)m + 1 = 0\\). Then show that for \\(z = \\lambda \\in \\mathbb{R}\\), \\(\\lambda \\in [\\lambda_-, \\lambda_+]\\), the discriminant is negative, confirming that \\(m\\) has a nonzero imaginary part (hence a density exists).',
                    hint: 'Multiply both sides by \\(-z + \\gamma/(1+m)\\) and expand. For the discriminant, compute \\(\\Delta = (\\lambda - \\gamma + 1)^2 - 4\\gamma\\lambda\\) and factor it as \\((\\lambda - \\lambda_+)(\\lambda - \\lambda_-)\\).',
                    solution: 'From \\(m(-z + \\gamma/(1+m)) = 1\\), expand: \\(-mz + \\gamma m/(1+m) = 1\\). Multiply through by \\((1+m)\\): \\(-mz(1+m) + \\gamma m = 1+m\\), giving \\(-mz - m^2 z + \\gamma m = 1 + m\\). Rearranging: \\(\\gamma z m^2 + (z - \\gamma + 1)m + 1 = 0\\) (after multiplying by \\(-1\\) and collecting terms with \\(z m^2\\)). The discriminant is \\(\\Delta = (z - \\gamma + 1)^2 - 4\\gamma z = z^2 - 2z(\\gamma + 1) + (\\gamma - 1)^2 = (z - \\lambda_+)(z - \\lambda_-)\\) where \\(\\lambda_\\pm = (1 \\pm \\sqrt{\\gamma})^2\\). For real \\(z = \\lambda \\in (\\lambda_-, \\lambda_+)\\), one factor is positive and the other negative, so \\(\\Delta &lt; 0\\) and \\(m\\) has nonzero imaginary part, confirming a density \\(f_\\gamma(\\lambda) = -\\frac{1}{\\pi}\\operatorname{Im}(m_\\gamma(\\lambda + i0^+)) &gt; 0\\).'
                }
            ]
        },
        // ============================================================
        // SECTION 4: Implications for PCA
        // ============================================================
        {
            id: 'ch06-sec04',
            title: 'Implications for PCA',
            content: `
                <h2>Implications for PCA &mdash; Eigenvalue Bias</h2>

                <p>Principal Component Analysis (PCA) relies on sample eigenvalues to estimate the variance explained by each principal direction. The Marchenko-Pastur law reveals that in high dimensions, sample eigenvalues are <strong>fundamentally biased</strong> estimators of population eigenvalues.</p>

                <h3>The Problem: Eigenvalue Spreading</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 6.12 (Eigenvalue Inconsistency)</div>
                    <div class="env-body">
                        <p>Suppose \\(\\Sigma = I_p\\) (all population eigenvalues equal to 1) and \\(p/n \\to \\gamma \\in (0, \\infty)\\). Then the sample eigenvalues \\(\\hat{\\lambda}_1 \\geq \\cdots \\geq \\hat{\\lambda}_p\\) of \\(S_n = \\frac{1}{n}X^\\top X\\) satisfy:</p>
                        <ul>
                            <li>\\(\\hat{\\lambda}_1 \\to (1 + \\sqrt{\\gamma})^2 &gt; 1\\) almost surely (largest eigenvalue overshoots)</li>
                            <li>\\(\\hat{\\lambda}_p \\to (1 - \\sqrt{\\gamma})^2 &lt; 1\\) almost surely when \\(\\gamma &lt; 1\\) (smallest eigenvalue undershoots)</li>
                            <li>\\(\\hat{\\lambda}_{p-n+1} \\to 0\\) when \\(\\gamma &gt; 1\\) (spurious zero eigenvalues)</li>
                        </ul>
                        <p>No individual sample eigenvalue converges to the true value 1.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Why Eigenvalues Spread</div>
                    <div class="env-body">
                        <p>Think of the \\(n\\) data vectors as \\(n\\) points in \\(\\mathbb{R}^p\\). When \\(p\\) is large relative to \\(n\\), these points are nearly orthogonal (recall the concentration of angles from Chapter 3). The sample covariance "sees" the random orientations of these nearly-orthogonal vectors and mistakes them for genuine structure. Directions that happen to align with more data points get inflated eigenvalues; directions with fewer data points get deflated ones.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-eigenvalue-bias"></div>

                <h3>Quantifying the Bias</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 6.13 (Eigenvalue Bias Formula)</div>
                    <div class="env-body">
                        <p>Under \\(\\Sigma = I_p\\) and \\(p/n \\to \\gamma\\), the expected value of the \\(k\\)-th order statistic \\(\\hat{\\lambda}_{(k)}\\) (in bulk) is approximately given by the quantile function of the MP law. More precisely, if \\(\\hat{\\lambda}_{(\\lfloor tp \\rfloor)}\\) denotes the \\(t\\)-quantile of the ESD, then</p>
                        \\[\\hat{\\lambda}_{(\\lfloor tp \\rfloor)} \\to F_\\gamma^{-1}(t),\\]
                        <p>where \\(F_\\gamma\\) is the CDF of the MP distribution. The bias of the \\(k\\)-th eigenvalue is thus \\(F_\\gamma^{-1}(k/p) - 1\\), which is large when \\(\\gamma\\) is not small.</p>
                    </div>
                </div>

                <h3>Consequences for PCA Practice</h3>

                <div class="env-block remark">
                    <div class="env-title">Remark (When Does PCA Fail?)</div>
                    <div class="env-body">
                        <p>Consider the common PCA task of identifying which eigenvalues are "significant" (above the noise floor). The naive rule "keep eigenvalues &gt; 1" fails catastrophically in high dimensions because:</p>
                        <ul>
                            <li>Under the null \\(\\Sigma = I_p\\), the largest sample eigenvalue is \\(\\approx (1 + \\sqrt{\\gamma})^2\\), which can be much larger than 1. For \\(\\gamma = 1\\), the largest eigenvalue is approximately 4.</li>
                            <li>Even the median sample eigenvalue deviates from 1 when \\(\\gamma\\) is moderate.</li>
                        </ul>
                        <p>The <strong>correct threshold</strong> for significance should be based on the MP upper edge \\(\\lambda_+ = (1 + \\sqrt{\\gamma})^2\\), not on the population eigenvalue itself.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 6.14 (Financial Covariance Estimation)</div>
                    <div class="env-body">
                        <p>A portfolio manager estimates the covariance of \\(p = 500\\) stocks using \\(n = 1000\\) daily returns (\\(\\gamma = 0.5\\)). The MP support is \\([0.086, 2.914]\\). If the true covariance were \\(\\sigma^2 I_p\\), the sample eigenvalues would range from \\(0.086\\sigma^2\\) to \\(2.914\\sigma^2\\) &mdash; a factor of 34 between the largest and smallest! This makes the sample covariance matrix nearly useless for portfolio optimization without correction (shrinkage, random matrix cleaning, etc.).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 6.15 (Ledoit-Wolf Optimal Shrinkage)</div>
                    <div class="env-body">
                        <p>The <strong>Ledoit-Wolf linear shrinkage estimator</strong> of \\(\\Sigma\\) is</p>
                        \\[\\hat{\\Sigma}^{\\mathrm{LW}} = \\alpha^* I_p + (1 - \\alpha^*) S_n,\\]
                        <p>where the optimal shrinkage intensity \\(\\alpha^* \\in [0, 1]\\) minimizes the Frobenius loss \\(\\|\\hat{\\Sigma} - \\Sigma\\|_F^2\\). In the proportional regime with \\(\\Sigma = I_p\\), the optimal intensity satisfies \\(\\alpha^* \\to \\gamma/(1+\\gamma)\\) as \\(p/n \\to \\gamma\\). For \\(\\gamma = 1\\), this gives \\(\\alpha^* = 1/2\\): equal weight to the identity and the sample covariance.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-eigenvalue-bias',
                    title: 'Eigenvalue Bias: True vs. Sample Eigenvalues',
                    description: 'All population eigenvalues are 1, but sample eigenvalues spread across the Marchenko-Pastur support. Watch the spreading grow as the aspect ratio gamma increases from 0.1 to 2.',
                    setup: function(container, controls) {
                        var canvasWidth = 700;
                        var canvasHeight = 400;
                        var viz = new VizEngine(container, { width: canvasWidth, height: canvasHeight, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var gammaVal = 0.5;
                        var animating = false;
                        var animTime = 0;
                        var animDir = 1;

                        // MP density
                        function mpDensity(x, gamma) {
                            var lp = (1 + Math.sqrt(gamma)) * (1 + Math.sqrt(gamma));
                            var lm = (1 - Math.sqrt(gamma)) * (1 - Math.sqrt(gamma));
                            if (x < lm || x > lp) return 0;
                            return Math.sqrt((lp - x) * (x - lm)) / (2 * Math.PI * gamma * x);
                        }

                        // Generate approximate MP quantiles using inverse CDF sampling
                        function mpQuantiles(gamma, numQ) {
                            var lp = (1 + Math.sqrt(gamma)) * (1 + Math.sqrt(gamma));
                            var lm = (1 - Math.sqrt(gamma)) * (1 - Math.sqrt(gamma));
                            // Numerical integration for CDF
                            var nPts = 2000;
                            var dx = (lp - lm) / nPts;
                            var cdf = [0];
                            var xs = [lm];
                            for (var i = 1; i <= nPts; i++) {
                                var x = lm + i * dx;
                                xs.push(x);
                                cdf.push(cdf[i - 1] + mpDensity(x - dx / 2, gamma) * dx);
                            }
                            // Normalize
                            var total = cdf[nPts];
                            for (var i = 0; i <= nPts; i++) cdf[i] /= total;
                            // Invert for quantiles
                            var quantiles = [];
                            for (var q = 0; q < numQ; q++) {
                                var target = (q + 0.5) / numQ;
                                // Binary search
                                var lo = 0, hi = nPts;
                                while (lo < hi - 1) {
                                    var mid = (lo + hi) >> 1;
                                    if (cdf[mid] < target) lo = mid;
                                    else hi = mid;
                                }
                                quantiles.push(xs[hi]);
                            }
                            return quantiles;
                        }

                        function draw() {
                            var gamma = gammaVal;
                            var lp = (1 + Math.sqrt(gamma)) * (1 + Math.sqrt(gamma));
                            var lm = (1 - Math.sqrt(gamma)) * (1 - Math.sqrt(gamma));

                            viz.clear();
                            var margin = { left: 50, right: 30, top: 50, bottom: 60 };
                            var plotW = canvasWidth - margin.left - margin.right;
                            var plotH = canvasHeight - margin.top - margin.bottom;

                            var xMin = 0;
                            var xMax = Math.max(lp * 1.3, 4.5);

                            // Background: draw the MP density as a filled area
                            var nCurve = 400;
                            var maxD = 0;
                            var curvePts = [];
                            for (var i = 0; i <= nCurve; i++) {
                                var x = xMin + (xMax - xMin) * i / nCurve;
                                var d = mpDensity(x, gamma);
                                curvePts.push({ x: x, d: d });
                                if (d > maxD) maxD = d;
                            }
                            var yMax = maxD * 1.15;
                            if (yMax < 0.01) yMax = 1;

                            // Draw MP density as filled area
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= nCurve; i++) {
                                var px = margin.left + (curvePts[i].x - xMin) / (xMax - xMin) * plotW;
                                var py = margin.top + plotH - curvePts[i].d / yMax * plotH;
                                if (curvePts[i].d > 1e-10) {
                                    if (!started) { ctx.moveTo(px, margin.top + plotH); ctx.lineTo(px, py); started = true; }
                                    else ctx.lineTo(px, py);
                                } else if (started) {
                                    ctx.lineTo(px, margin.top + plotH);
                                    started = false;
                                }
                            }
                            if (started) {
                                // close the bottom
                                ctx.lineTo(margin.left + (lp - xMin) / (xMax - xMin) * plotW, margin.top + plotH);
                            }
                            ctx.closePath();
                            ctx.fillStyle = 'rgba(240, 136, 62, 0.15)';
                            ctx.fill();
                            ctx.strokeStyle = 'rgba(240, 136, 62, 0.8)';
                            ctx.lineWidth = 2;
                            // Redraw the curve outline
                            ctx.beginPath();
                            started = false;
                            for (var i = 0; i <= nCurve; i++) {
                                var px = margin.left + (curvePts[i].x - xMin) / (xMax - xMin) * plotW;
                                var py = margin.top + plotH - curvePts[i].d / yMax * plotH;
                                if (curvePts[i].d > 1e-10) {
                                    if (!started) { ctx.moveTo(px, py); started = true; }
                                    else ctx.lineTo(px, py);
                                }
                            }
                            ctx.stroke();

                            // Draw axes
                            ctx.strokeStyle = '#4a4a7a';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(margin.left, margin.top);
                            ctx.lineTo(margin.left, margin.top + plotH);
                            ctx.lineTo(margin.left + plotW, margin.top + plotH);
                            ctx.stroke();

                            // X-axis
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var xt = 0; xt <= xMax; xt += 0.5) {
                                var sx = margin.left + (xt - xMin) / (xMax - xMin) * plotW;
                                if (xt === 0 || xt % 1 === 0) {
                                    ctx.fillText(xt.toFixed(0), sx, margin.top + plotH + 6);
                                }
                            }
                            ctx.fillText('\u03bb', margin.left + plotW / 2, margin.top + plotH + 22);

                            // Draw true eigenvalue line at lambda = 1
                            var trueX = margin.left + (1 - xMin) / (xMax - xMin) * plotW;
                            ctx.setLineDash([6, 3]);
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(trueX, margin.top);
                            ctx.lineTo(trueX, margin.top + plotH);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('True \u03bb = 1', trueX, margin.top - 4);

                            // Draw sample eigenvalue dots (MP quantiles)
                            var numDots = 40;
                            var quantiles = mpQuantiles(gamma, numDots);
                            var dotY = margin.top + plotH + 40;
                            for (var i = 0; i < quantiles.length; i++) {
                                var dx = margin.left + (quantiles[i] - xMin) / (xMax - xMin) * plotW;
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath();
                                ctx.arc(dx, dotY, 4, 0, Math.PI * 2);
                                ctx.fill();
                            }
                            // Label the dot strip
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Sample \u03bb', margin.left - 6, dotY);

                            // Mark edges
                            ctx.setLineDash([3, 3]);
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 1;
                            var exMinus = margin.left + (lm - xMin) / (xMax - xMin) * plotW;
                            var exPlus = margin.left + (lp - xMin) / (xMax - xMin) * plotW;
                            ctx.beginPath(); ctx.moveTo(exMinus, margin.top); ctx.lineTo(exMinus, margin.top + plotH); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(exPlus, margin.top); ctx.lineTo(exPlus, margin.top + plotH); ctx.stroke();
                            ctx.setLineDash([]);

                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('\u03bb\u208B=' + lm.toFixed(2), exMinus, margin.top + plotH + 6);
                            ctx.fillText('\u03bb\u208A=' + lp.toFixed(2), exPlus, margin.top + plotH + 6);

                            // Info
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('\u03b3 = ' + gamma.toFixed(2) + '    Support: [' + lm.toFixed(3) + ', ' + lp.toFixed(3) + ']', margin.left + 8, margin.top + 10);

                            // Bias arrows
                            var biasLeft = 1 - lm;
                            var biasRight = lp - 1;
                            ctx.fillStyle = viz.colors.red;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            if (gamma < 1) {
                                ctx.fillText('Bias: \u2212' + biasLeft.toFixed(2), (trueX + exMinus) / 2, margin.top + 30);
                            }
                            ctx.fillText('Bias: +' + biasRight.toFixed(2), (trueX + exPlus) / 2, margin.top + 30);
                        }

                        var gammaSlider = VizEngine.createSlider(controls, '\u03b3', 0.05, 3.0, gammaVal, 0.05, function(v) {
                            gammaVal = v;
                            if (!animating) draw();
                        });

                        VizEngine.createButton(controls, 'Animate \u03b3', function() {
                            if (animating) {
                                animating = false;
                                viz.stopAnimation();
                                return;
                            }
                            animating = true;
                            animTime = gammaVal;
                            viz.animate(function() {
                                animTime += animDir * 0.008;
                                if (animTime >= 3.0) { animTime = 3.0; animDir = -1; }
                                if (animTime <= 0.05) { animTime = 0.05; animDir = 1; }
                                gammaVal = animTime;
                                gammaSlider.value = gammaVal;
                                gammaSlider.dispatchEvent(new Event('input'));
                                draw();
                            });
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Suppose all population eigenvalues are 1 and \\(\\gamma = p/n = 1\\). Compute the ratio of the largest to smallest (nonzero) sample eigenvalue in the limit. What does this say about the condition number of \\(S_n\\)?',
                    hint: 'Use the Bai-Yin theorem: \\(\\hat{\\lambda}_1 \\to (1+\\sqrt{\\gamma})^2\\) and \\(\\hat{\\lambda}_p \\to (1-\\sqrt{\\gamma})^2\\). What happens when \\(\\gamma = 1\\)?',
                    solution: 'When \\(\\gamma = 1\\), the largest eigenvalue converges to \\((1+1)^2 = 4\\) and the smallest eigenvalue converges to \\((1-1)^2 = 0\\). The condition number \\(\\kappa(S_n) = \\hat{\\lambda}_1/\\hat{\\lambda}_p \\to \\infty\\). The sample covariance matrix becomes singular in the limit! This means that even though \\(\\Sigma = I_p\\) is perfectly conditioned (\\(\\kappa(\\Sigma) = 1\\)), the sample covariance is arbitrarily ill-conditioned. Numerical computations with \\(S_n\\) (e.g., inverting it for Mahalanobis distance or portfolio optimization) become unreliable.'
                }
            ]
        },
        // ============================================================
        // SECTION 5: Edge Statistics — Bai-Yin Theorem
        // ============================================================
        {
            id: 'ch06-sec05',
            title: 'Edge Statistics',
            content: `
                <h2>Edge Statistics &mdash; The Bai-Yin Theorem</h2>

                <p>While the Marchenko-Pastur law describes the <em>bulk</em> of the eigenvalue distribution, applications in hypothesis testing and signal detection require precise knowledge of the <em>extreme</em> eigenvalues. The Bai-Yin theorem pins down their almost sure limits.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 6.16 (Bai-Yin, 1993)</div>
                    <div class="env-body">
                        <p>Let \\(X\\) be an \\(n \\times p\\) matrix with i.i.d. entries having mean 0, variance 1, and <strong>finite fourth moment</strong>. Suppose \\(p/n \\to \\gamma \\in (0, \\infty)\\). Then the extreme eigenvalues of \\(S_n = \\frac{1}{n}X^\\top X\\) satisfy:</p>
                        \\[\\lambda_{\\max}(S_n) \\xrightarrow{\\text{a.s.}} (1 + \\sqrt{\\gamma})^2, \\qquad \\lambda_{\\min}^+(S_n) \\xrightarrow{\\text{a.s.}} (1 - \\sqrt{\\gamma})^2,\\]
                        <p>where \\(\\lambda_{\\min}^+\\) denotes the smallest <em>nonzero</em> eigenvalue. When \\(\\gamma &gt; 1\\), \\(\\lambda_{\\min}(S_n) = 0\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Necessity of the Fourth Moment Condition)</div>
                    <div class="env-body">
                        <p>The finite fourth moment condition \\(\\mathbb{E}[X_{ij}^4] &lt; \\infty\\) is <strong>necessary</strong> for the Bai-Yin theorem. If entries have heavy tails (infinite fourth moment), the largest eigenvalue can grow faster than \\((1 + \\sqrt{\\gamma})^2\\). Soshnikov (2004) showed that for entries in the domain of attraction of an \\(\\alpha\\)-stable law with \\(\\alpha &lt; 4\\), the largest eigenvalue has a different scaling.</p>
                    </div>
                </div>

                <h3>Fluctuations: Tracy-Widom Law</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 6.17 (Tracy-Widom Fluctuations at the Edge)</div>
                    <div class="env-body">
                        <p>Under Gaussian entries (\\(X_{ij} \\sim \\mathcal{N}(0,1)\\)), the centered and rescaled largest eigenvalue converges in distribution:</p>
                        \\[\\frac{\\lambda_{\\max}(S_n) - \\mu_{n,p}}{\\sigma_{n,p}} \\xrightarrow{d} \\mathrm{TW}_1,\\]
                        <p>where \\(\\mathrm{TW}_1\\) is the <strong>Tracy-Widom distribution</strong> of type 1, and the centering/scaling are</p>
                        \\[\\mu_{n,p} = \\left(\\sqrt{n-\\tfrac{1}{2}} + \\sqrt{p-\\tfrac{1}{2}}\\right)^2/n, \\quad \\sigma_{n,p} = \\frac{\\mu_{n,p}^{1/3}}{n}\\left(\\frac{1}{\\sqrt{n-\\tfrac{1}{2}}} + \\frac{1}{\\sqrt{p-\\tfrac{1}{2}}}\\right)^{1/3}.\\]
                        <p>The TW distribution has support on all of \\(\\mathbb{R}\\) but decays very rapidly: its right tail satisfies \\(\\mathbb{P}(\\mathrm{TW}_1 &gt; s) \\sim \\exp(-\\tfrac{2}{3}s^{3/2})\\) for large \\(s\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Why Tracy-Widom?</div>
                    <div class="env-body">
                        <p>The Tracy-Widom distribution plays the role for extreme eigenvalues that the Gaussian plays for sums: it is a <em>universal</em> limit distribution. Just as the CLT says that sums of i.i.d. variables converge to a Gaussian regardless of the underlying distribution, the largest eigenvalue of many random matrix ensembles converges to Tracy-Widom regardless of the entry distribution.</p>
                        <p>The rate of convergence is \\(n^{-2/3}\\) (not \\(n^{-1/2}\\) as for CLT). The TW distribution is <em>not</em> Gaussian: it is skewed to the left, reflecting the hard upper edge of the MP support.</p>
                    </div>
                </div>

                <h3>Application: Hypothesis Testing for Signals</h3>

                <div class="env-block example">
                    <div class="env-title">Example 6.18 (Roy's Largest Root Test)</div>
                    <div class="env-body">
                        <p>Consider testing \\(H_0: \\Sigma = \\sigma^2 I_p\\) vs. \\(H_1: \\Sigma\\) has at least one eigenvalue different from \\(\\sigma^2\\). The test statistic is the largest eigenvalue \\(\\hat{\\lambda}_1\\) of \\(S_n / \\hat{\\sigma}^2\\). Under \\(H_0\\):</p>
                        \\[\\hat{\\lambda}_1 \\approx (1 + \\sqrt{\\gamma})^2 + \\sigma_{n,p} \\cdot W, \\qquad W \\sim \\mathrm{TW}_1.\\]
                        <p>Reject \\(H_0\\) at level \\(\\alpha\\) if \\(\\hat{\\lambda}_1 &gt; (1+\\sqrt{\\gamma})^2 + \\sigma_{n,p} \\cdot q_{1-\\alpha}^{\\mathrm{TW}}\\), where \\(q_{1-\\alpha}^{\\mathrm{TW}}\\) is the \\((1-\\alpha)\\) quantile of Tracy-Widom. For \\(\\alpha = 0.05\\), \\(q_{0.95}^{\\mathrm{TW}} \\approx 0.9794\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 6.19 (Geman, 1980 &mdash; No Eigenvalues Outside the Support)</div>
                    <div class="env-body">
                        <p>Under the null \\(\\Sigma = I_p\\) with finite fourth moment entries and \\(p/n \\to \\gamma\\), for any \\(\\varepsilon &gt; 0\\),</p>
                        \\[\\mathbb{P}\\!\\left(\\lambda_{\\max}(S_n) &gt; (1 + \\sqrt{\\gamma})^2 + \\varepsilon\\right) \\to 0.\\]
                        <p>Combined with the Bai-Yin lower bound, this confirms that eigenvalues <strong>do not escape</strong> the MP support under the null hypothesis.</p>
                    </div>
                </div>

                <h3>Summary: Key Quantities</h3>

                <div class="env-block remark">
                    <div class="env-title">Summary Table</div>
                    <div class="env-body">
                        <p>For \\(S_n = \\frac{1}{n}X^\\top X\\) with \\(\\Sigma = I_p\\) and \\(p/n \\to \\gamma\\):</p>
                        <table style="width:100%; border-collapse:collapse; margin:12px 0;">
                            <tr style="border-bottom:2px solid #30363d;">
                                <th style="text-align:left; padding:8px; color:#f0f6fc;">Quantity</th>
                                <th style="text-align:center; padding:8px; color:#f0f6fc;">Limit</th>
                                <th style="text-align:center; padding:8px; color:#f0f6fc;">Scale of fluctuations</th>
                            </tr>
                            <tr style="border-bottom:1px solid #21262d;">
                                <td style="padding:8px;">Bulk ESD</td>
                                <td style="text-align:center; padding:8px;">Marchenko-Pastur \\(\\mu_\\gamma\\)</td>
                                <td style="text-align:center; padding:8px;">\\(O(n^{-1})\\)</td>
                            </tr>
                            <tr style="border-bottom:1px solid #21262d;">
                                <td style="padding:8px;">\\(\\lambda_{\\max}\\)</td>
                                <td style="text-align:center; padding:8px;">\\((1 + \\sqrt{\\gamma})^2\\)</td>
                                <td style="text-align:center; padding:8px;">\\(O(n^{-2/3})\\), TW</td>
                            </tr>
                            <tr style="border-bottom:1px solid #21262d;">
                                <td style="padding:8px;">\\(\\lambda_{\\min}^+\\)</td>
                                <td style="text-align:center; padding:8px;">\\((1 - \\sqrt{\\gamma})^2\\)</td>
                                <td style="text-align:center; padding:8px;">\\(O(n^{-2/3})\\), TW</td>
                            </tr>
                            <tr>
                                <td style="padding:8px;">Mean (\\(m_1\\))</td>
                                <td style="text-align:center; padding:8px;">1</td>
                                <td style="text-align:center; padding:8px;">&mdash;</td>
                            </tr>
                            <tr>
                                <td style="padding:8px;">Variance (\\(m_2 - m_1^2\\))</td>
                                <td style="text-align:center; padding:8px;">\\(\\gamma\\)</td>
                                <td style="text-align:center; padding:8px;">&mdash;</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Looking Ahead: Chapter 7</div>
                    <div class="env-body">
                        <p>What happens when \\(\\Sigma \\neq I_p\\)? If \\(\\Sigma\\) has a few eigenvalues (spikes) well above 1, do the corresponding sample eigenvalues escape the MP bulk? The answer, given by the <strong>Baik-Ben Arous-Peche (BBP) phase transition</strong>, is the subject of Chapter 7: spikes above \\(1 + \\sqrt{\\gamma}\\) create outlier eigenvalues, while spikes below this threshold are invisible to PCA.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Consider the Bai-Yin theorem. If \\(X\\) has i.i.d. \\(\\mathcal{N}(0,1)\\) entries and \\(\\gamma = p/n = 4\\), what is the almost sure limit of the largest eigenvalue of \\(S_n = \\frac{1}{n}X^\\top X\\)? What fraction of eigenvalues are exactly zero?',
                    hint: 'The largest eigenvalue converges to \\((1 + \\sqrt{\\gamma})^2\\). The fraction of zero eigenvalues when \\(\\gamma &gt; 1\\) is \\(1 - 1/\\gamma\\).',
                    solution: 'With \\(\\gamma = 4\\), we have \\(\\lambda_{\\max} \\to (1 + \\sqrt{4})^2 = (1 + 2)^2 = 9\\). The true eigenvalue is 1, so the largest sample eigenvalue overshoots by a factor of 9. The smallest nonzero eigenvalue converges to \\((1 - 2)^2 = 1\\). The fraction of zero eigenvalues is \\(1 - 1/4 = 3/4\\), since \\(\\operatorname{rank}(X^\\top X) \\leq n = p/4\\). So 75% of the eigenvalue mass sits at zero, and the remaining 25% spreads over \\([1, 9]\\). The condition number of the nonzero part is \\(9/1 = 9\\).'
                },
                {
                    question: 'Using the Tracy-Widom test at significance level \\(\\alpha = 0.05\\), determine whether a largest sample eigenvalue of \\(\\hat{\\lambda}_1 = 3.2\\) is significant when \\(n = 200\\) and \\(p = 100\\). (Use the approximation \\(q_{0.95}^{\\mathrm{TW}} \\approx 0.98\\) and the simplified centering \\(\\mu \\approx (1+\\sqrt{\\gamma})^2\\).)',
                    hint: 'Compute \\(\\gamma = p/n\\), then the MP upper edge \\((1+\\sqrt{\\gamma})^2\\), and compare \\(\\hat{\\lambda}_1\\) to the threshold.',
                    solution: 'We have \\(\\gamma = 100/200 = 0.5\\), so the MP upper edge is \\((1+\\sqrt{0.5})^2 = (1 + 0.707)^2 \\approx 2.914\\). The TW scaling is approximately \\(\\sigma \\approx n^{-2/3}(1+\\sqrt{\\gamma})^{4/3}(1/\\sqrt{\\gamma} + 1)^{1/3}/n^{1/3}\\). For a rough check: \\(\\sigma \\approx 0.16\\) for these parameters. The threshold is \\(2.914 + 0.16 \\times 0.98 \\approx 3.07\\). Since \\(\\hat{\\lambda}_1 = 3.2 &gt; 3.07\\), we reject \\(H_0\\) at the 5% level &mdash; there is evidence of a spike (signal) in the data.'
                }
            ]
        }
    ]
});
