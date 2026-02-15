window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch15',
    number: 15,
    title: 'High-Dimensional PCA',
    subtitle: 'Sparse PCA and the computational-statistical gap',
    sections: [
        // ============================================================
        // SECTION 1: PCA Failure in High Dimensions
        // ============================================================
        {
            id: 'ch15-sec01',
            title: 'PCA Failure in High Dimensions',
            content: `
                <h2>PCA Failure in High Dimensions</h2>

                <p>Principal Component Analysis (PCA) is perhaps the most widely used tool for dimensionality reduction. Given \\(n\\) observations \\(X_1, \\ldots, X_n \\in \\mathbb{R}^p\\) from a distribution with covariance \\(\\Sigma\\), PCA extracts the leading eigenvectors of \\(\\Sigma\\) to identify the directions of greatest variability. In classical statistics where \\(p\\) is fixed and \\(n \\to \\infty\\), sample PCA is consistent. But when the dimension \\(p\\) grows with (or exceeds) the sample size \\(n\\), the picture changes dramatically.</p>

                <h3>The Spiked Covariance Model</h3>

                <p>To make the discussion precise, consider the <strong>spiked covariance model</strong> introduced by Johnstone (2001). This model captures the situation where a few leading eigenvalues of \\(\\Sigma\\) are separated from the bulk.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 15.1 (Spiked Covariance Model)</div>
                    <div class="env-body">
                        <p>Let \\(v \\in \\mathbb{R}^p\\) be a unit vector. The <strong>rank-one spiked covariance model</strong> specifies:</p>
                        \\[\\Sigma = I_p + \\lambda \\, v v^\\top\\]
                        <p>where \\(\\lambda &gt; 0\\) is the <strong>spike strength</strong>. The population covariance has eigenvalue \\(1 + \\lambda\\) in the direction \\(v\\) and eigenvalue \\(1\\) in the remaining \\(p - 1\\) directions. The data are generated as \\(X_i \\sim \\mathcal{N}(0, \\Sigma)\\) independently.</p>
                    </div>
                </div>

                <p>In this model, the "signal" is entirely contained in the direction \\(v\\), and \\(\\lambda\\) controls the signal-to-noise ratio. The goal is to estimate \\(v\\) (or the subspace it spans) from the sample covariance matrix</p>
                \\[\\hat{\\Sigma} = \\frac{1}{n} \\sum_{i=1}^n X_i X_i^\\top.\\]

                <h3>Classical Consistency</h3>

                <p>When \\(p\\) is fixed and \\(n \\to \\infty\\), classical random matrix theory tells us that \\(\\hat{\\Sigma} \\to \\Sigma\\) almost surely (by the law of large numbers), and consequently the sample eigenvectors converge to the population eigenvectors. This is the regime where PCA "just works."</p>

                <h3>High-Dimensional Inconsistency</h3>

                <p>The situation is fundamentally different when \\(p/n \\to \\gamma \\in (0, \\infty)\\). In this regime, the Marchenko-Pastur law (Chapter 6) shows that the bulk eigenvalues of \\(\\hat{\\Sigma}\\) spread over \\([(1 - \\sqrt{\\gamma})^2, (1 + \\sqrt{\\gamma})^2]\\), and the BBP (Baik-Ben Arous-P\\'{e}ch\\'{e}) phase transition (Chapter 7) dictates whether the spike eigenvalue separates from the bulk.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 15.1 (BBP Phase Transition for Eigenvectors)</div>
                    <div class="env-body">
                        <p>Consider the spiked covariance model with \\(p/n \\to \\gamma &gt; 0\\). Let \\(\\hat{v}_1\\) denote the leading eigenvector of \\(\\hat{\\Sigma}\\). Then:</p>
                        <ol>
                            <li>If \\(\\lambda \\leq \\sqrt{\\gamma}\\), the spike eigenvalue does not separate from the bulk, and
                            \\[|\\langle \\hat{v}_1, v \\rangle|^2 \\xrightarrow{a.s.} 0.\\]
                            The sample PC1 is <strong>asymptotically orthogonal</strong> to the true signal direction.</li>
                            <li>If \\(\\lambda &gt; \\sqrt{\\gamma}\\), the spike eigenvalue separates, and
                            \\[|\\langle \\hat{v}_1, v \\rangle|^2 \\xrightarrow{a.s.} \\frac{1 - \\gamma/\\lambda^2}{1 + \\gamma/\\lambda} \\in (0, 1).\\]
                            The sample PC1 is <strong>biased</strong> toward the bulk but not orthogonal.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Think of it this way: the sample covariance matrix \\(\\hat{\\Sigma}\\) is the sum of the true covariance \\(\\Sigma\\) and a random "noise" matrix \\(\\hat{\\Sigma} - \\Sigma\\). When \\(p\\) is comparable to \\(n\\), this noise matrix has operator norm of order \\(\\sqrt{p/n} = \\sqrt{\\gamma}\\). If the spike \\(\\lambda\\) is smaller than this noise level, the noise overwhelms the signal and the leading sample eigenvector points in a random direction.</p>
                        <p>Even above the threshold, the cosine between \\(\\hat{v}_1\\) and \\(v\\) is strictly less than 1 -- it never fully recovers the signal direction. This <strong>eigenvalue shrinkage</strong> and <strong>eigenvector inconsistency</strong> are hallmarks of high-dimensional PCA.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 15.1 (Numerical Illustration)</div>
                    <div class="env-body">
                        <p>Suppose \\(p = 500\\), \\(n = 100\\), so \\(\\gamma = p/n = 5\\). Then \\(\\sqrt{\\gamma} \\approx 2.24\\). For the sample PC1 to have any alignment with the truth, we need \\(\\lambda &gt; 2.24\\). Even with \\(\\lambda = 3\\) (a substantial spike), the asymptotic squared cosine is:</p>
                        \\[|\\langle \\hat{v}_1, v \\rangle|^2 \\approx \\frac{1 - 5/9}{1 + 5/3} = \\frac{4/9}{8/3} = \\frac{4}{24} = \\frac{1}{6} \\approx 0.167\\]
                        <p>This means the angle between the sample and true PC1 is about \\(\\arccos(1/\\sqrt{6}) \\approx 66^\\circ\\) -- far from the perfect alignment that classical theory would suggest.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-pca-fail"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The phase transition at \\(\\lambda = \\sqrt{\\gamma}\\) is sharp: below it, sample PCA carries zero information about the signal; above it, partial (but biased) recovery is possible. This motivates the search for methods that can do better, particularly when the signal eigenvector has additional structure such as <strong>sparsity</strong>.</p>
                    </div>
                </div>

                <h3>Why Does Standard PCA Fail?</h3>

                <p>The core issue is the <strong>curse of dimensionality</strong> for covariance estimation. The sample covariance \\(\\hat{\\Sigma}\\) has \\(p(p+1)/2\\) free parameters, but only \\(np\\) data points. When \\(p &gt; n\\), \\(\\hat{\\Sigma}\\) is rank-deficient (rank at most \\(n\\)), and the estimation error in operator norm satisfies</p>
                \\[\\|\\hat{\\Sigma} - \\Sigma\\|_{\\text{op}} \\asymp \\sqrt{\\frac{p}{n}}\\]
                <p>which does not vanish unless \\(p/n \\to 0\\). Without structural assumptions (such as sparsity, low rank, or bandedness), consistent estimation of \\(\\Sigma\\) is impossible when \\(p \\asymp n\\).</p>
            `,
            visualizations: [
                {
                    id: 'viz-pca-fail',
                    title: 'PCA Failure in High Dimensions',
                    description: 'The spiked covariance model with p=500 and varying n. The sample PC1 is nearly orthogonal to the true spike direction when n is small relative to p. Adjust n and the spike strength to see the BBP phase transition.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 420, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var p = 500;
                        var nVal = 100;
                        var lambdaVal = 2.0;
                        var trialAngles = [];
                        var numTrials = 40;

                        var sliderN = VizEngine.createSlider(controls, 'n', 20, 500, nVal, 10, function(v) {
                            nVal = Math.round(v);
                            runTrials();
                        });
                        var sliderLambda = VizEngine.createSlider(controls, 'Spike strength', 0.5, 6.0, lambdaVal, 0.1, function(v) {
                            lambdaVal = parseFloat(v);
                            runTrials();
                        });

                        // Simple random normal via Box-Muller
                        function randn() {
                            var u = 0, v = 0;
                            while (u === 0) u = Math.random();
                            while (v === 0) v = Math.random();
                            return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
                        }

                        // Power iteration to find leading eigenvector of a symmetric matrix (p x p stored as flat array)
                        function leadingEigenvec(mat, dim, iters) {
                            var vec = new Float64Array(dim);
                            for (var i = 0; i < dim; i++) vec[i] = randn();
                            // Normalize
                            var norm = 0;
                            for (var i = 0; i < dim; i++) norm += vec[i] * vec[i];
                            norm = Math.sqrt(norm);
                            for (var i = 0; i < dim; i++) vec[i] /= norm;

                            for (var it = 0; it < iters; it++) {
                                var newVec = new Float64Array(dim);
                                for (var i = 0; i < dim; i++) {
                                    var s = 0;
                                    for (var j = 0; j < dim; j++) {
                                        s += mat[i * dim + j] * vec[j];
                                    }
                                    newVec[i] = s;
                                }
                                norm = 0;
                                for (var i = 0; i < dim; i++) norm += newVec[i] * newVec[i];
                                norm = Math.sqrt(norm);
                                if (norm < 1e-15) break;
                                for (var i = 0; i < dim; i++) vec[i] = newVec[i] / norm;
                            }
                            return vec;
                        }

                        function runSingleTrial(pDim, n, lam) {
                            // True spike direction: e_1
                            // Generate X_i ~ N(0, I + lam * e1 e1^T)
                            // X_i = Z_i + sqrt(lam) * z_i * e_1 where Z_i ~ N(0, I_p), z_i ~ N(0,1)
                            // Sample covariance: (1/n) X X^T

                            // For efficiency, use a reduced dimension approach
                            // Compute (1/n) X^T X (n x n matrix), find leading eigvec, then map back
                            // Actually, compute X^T X / n where X is n x p

                            // Build data matrix (n x pDim)
                            // To keep computation feasible, we use pDim
                            var sqrtLam = Math.sqrt(lam);

                            // Gram matrix G = X X^T / n (n x n)
                            var G = new Float64Array(n * n);
                            // X_i has components: X_ij = Z_ij + sqrt(lam)*z_i * delta_{j,1}
                            // X_i . X_k = sum_j X_ij X_kj
                            // We compute this stochastically

                            // Generate the data compactly: store z_i (spike component) and compute Gram
                            var z = new Float64Array(n);
                            for (var i = 0; i < n; i++) z[i] = randn();

                            // G_{ik} = (1/n) * [sum_j Z_ij Z_kj + sqrtLam * z_i * sum_j delta_{j1} Z_kj + sqrtLam * z_k * sum_j Z_ij delta_{j1} + lam * z_i * z_k]
                            // For large p, sum_j Z_ij Z_kj ~ N(0, p) for i != k, and ~ p + something for i == k
                            // We approximate: generate Z as n x p, then compute Gram

                            // For performance with p=500, n up to 500, direct computation is feasible
                            var X = new Float64Array(n * pDim);
                            for (var i = 0; i < n; i++) {
                                for (var j = 0; j < pDim; j++) {
                                    X[i * pDim + j] = randn();
                                }
                                // Add spike: X_{i,0} += sqrt(lam) * z_i
                                X[i * pDim + 0] += sqrtLam * z[i];
                            }

                            // Compute sample covariance's leading eigenvector
                            // Use the dual trick: (1/n) X X^T is n x n, find its eigvec w, then v = X^T w / ||X^T w||
                            if (n <= pDim) {
                                // Build n x n Gram
                                for (var i = 0; i < n; i++) {
                                    for (var k = i; k < n; k++) {
                                        var s = 0;
                                        for (var j = 0; j < pDim; j++) {
                                            s += X[i * pDim + j] * X[k * pDim + j];
                                        }
                                        G[i * n + k] = s / n;
                                        G[k * n + i] = s / n;
                                    }
                                }
                                var w = leadingEigenvec(G, n, 30);

                                // Map back: v_hat = X^T w / || X^T w ||
                                var vHat = new Float64Array(pDim);
                                for (var j = 0; j < pDim; j++) {
                                    var s = 0;
                                    for (var i = 0; i < n; i++) {
                                        s += X[i * pDim + j] * w[i];
                                    }
                                    vHat[j] = s;
                                }
                                var nrm = 0;
                                for (var j = 0; j < pDim; j++) nrm += vHat[j] * vHat[j];
                                nrm = Math.sqrt(nrm);
                                if (nrm < 1e-15) return 90;
                                // cos angle = |vHat[0]| / nrm (since true direction is e_1)
                                var cosAngle = Math.abs(vHat[0]) / nrm;
                                return Math.acos(Math.min(cosAngle, 1)) * 180 / Math.PI;
                            } else {
                                // p < n, build p x p sample covariance directly
                                var S = new Float64Array(pDim * pDim);
                                for (var j1 = 0; j1 < pDim; j1++) {
                                    for (var j2 = j1; j2 < pDim; j2++) {
                                        var s = 0;
                                        for (var i = 0; i < n; i++) {
                                            s += X[i * pDim + j1] * X[i * pDim + j2];
                                        }
                                        S[j1 * pDim + j2] = s / n;
                                        S[j2 * pDim + j1] = s / n;
                                    }
                                }
                                var vHat = leadingEigenvec(S, pDim, 30);
                                var cosAngle = Math.abs(vHat[0]);
                                return Math.acos(Math.min(cosAngle, 1)) * 180 / Math.PI;
                            }
                        }

                        function runTrials() {
                            trialAngles = [];
                            // Use reduced p for speed in interactive setting
                            var pEff = Math.min(p, 200);
                            var nEff = Math.min(nVal, 300);
                            var numT = Math.min(numTrials, 20);
                            for (var t = 0; t < numT; t++) {
                                trialAngles.push(runSingleTrial(pEff, nEff, lambdaVal));
                            }
                            draw();
                        }

                        function draw() {
                            viz.clear();
                            var W = viz.width, H = viz.height;
                            var gamma = p / nVal;
                            var threshold = Math.sqrt(gamma);

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Angle Between Sample PC1 and True Spike Direction', W / 2, 24);

                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.muted;
                            ctx.fillText('p = ' + p + ', n = ' + nVal + ', \u03b3 = p/n = ' + gamma.toFixed(2) + ', threshold \u221a\u03b3 = ' + threshold.toFixed(2), W / 2, 44);

                            // Plot area
                            var left = 80, right = W - 40, top = 65, bottom = H - 55;
                            var plotW = right - left, plotH = bottom - top;

                            // Background
                            ctx.fillStyle = '#0a0a1a';
                            ctx.fillRect(left, top, plotW, plotH);

                            // Y axis: angle 0 to 90 degrees
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(left, top);
                            ctx.lineTo(left, bottom);
                            ctx.lineTo(right, bottom);
                            ctx.stroke();

                            // Y ticks
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var deg = 0; deg <= 90; deg += 15) {
                                var yy = bottom - (deg / 90) * plotH;
                                ctx.fillText(deg + '\u00b0', left - 8, yy);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(left, yy);
                                ctx.lineTo(right, yy);
                                ctx.stroke();
                            }

                            // Y label
                            ctx.save();
                            ctx.translate(18, (top + bottom) / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Angle (degrees)', 0, 0);
                            ctx.restore();

                            // Draw theoretical prediction (BBP)
                            var bbpAngles = [];
                            var lamRange = [];
                            for (var ll = 0.1; ll <= 6.5; ll += 0.05) {
                                lamRange.push(ll);
                                if (ll <= threshold) {
                                    bbpAngles.push(90);
                                } else {
                                    var cos2 = (1 - gamma / (ll * ll)) / (1 + gamma / ll);
                                    if (cos2 < 0) cos2 = 0;
                                    if (cos2 > 1) cos2 = 1;
                                    bbpAngles.push(Math.acos(Math.sqrt(cos2)) * 180 / Math.PI);
                                }
                            }

                            // X-axis: spike strength lambda from 0 to 6
                            var xMin = 0, xMax = 6.5;
                            function toX(lam) { return left + ((lam - xMin) / (xMax - xMin)) * plotW; }
                            function toY(deg) { return bottom - (deg / 90) * plotH; }

                            // X ticks
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = viz.colors.text;
                            for (var ll = 0; ll <= 6; ll += 1) {
                                ctx.fillText(ll.toFixed(0), toX(ll), bottom + 6);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(toX(ll), top);
                                ctx.lineTo(toX(ll), bottom);
                                ctx.stroke();
                            }
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('Spike strength \u03bb', (left + right) / 2, bottom + 28);

                            // Draw threshold line
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            ctx.moveTo(toX(threshold), top);
                            ctx.lineTo(toX(threshold), bottom);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            ctx.fillStyle = viz.colors.red;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('\u221a\u03b3 = ' + threshold.toFixed(2), toX(threshold) + 4, top + 8);
                            ctx.fillText('(BBP threshold)', toX(threshold) + 4, top + 22);

                            // Draw BBP theoretical curve
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i < lamRange.length; i++) {
                                var xx = toX(lamRange[i]);
                                var yy = toY(bbpAngles[i]);
                                if (i === 0) ctx.moveTo(xx, yy);
                                else ctx.lineTo(xx, yy);
                            }
                            ctx.stroke();

                            // Draw trial points
                            if (trialAngles.length > 0) {
                                for (var t = 0; t < trialAngles.length; t++) {
                                    var xx = toX(lambdaVal) + (Math.random() - 0.5) * 8;
                                    var yy = toY(trialAngles[t]);
                                    ctx.fillStyle = viz.colors.orange + 'cc';
                                    ctx.beginPath();
                                    ctx.arc(xx, yy, 5, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                // Mean angle
                                var meanAngle = trialAngles.reduce(function(a, b) { return a + b; }, 0) / trialAngles.length;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Mean angle: ' + meanAngle.toFixed(1) + '\u00b0', toX(lambdaVal) + 14, toY(meanAngle));

                                // Current lambda indicator
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath();
                                ctx.moveTo(toX(lambdaVal), top);
                                ctx.lineTo(toX(lambdaVal), bottom);
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }

                            // Legend
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillRect(right - 180, top + 8, 14, 3);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('BBP theory', right - 162, top + 14);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(right - 173, top + 30, 4, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('Simulation', right - 162, top + 34);

                            // Region labels
                            if (threshold < xMax) {
                                ctx.fillStyle = viz.colors.red + '44';
                                ctx.fillRect(left, top, toX(threshold) - left, plotH);

                                ctx.fillStyle = viz.colors.red;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('PCA fails', (left + toX(threshold)) / 2, bottom - 14);
                                ctx.fillText('(\u03bb \u2264 \u221a\u03b3)', (left + toX(threshold)) / 2, bottom - 2);
                            }
                        }

                        runTrials();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'In the spiked covariance model with \\(\\Sigma = I_p + \\lambda v v^\\top\\), compute the signal-to-noise ratio in terms of the operator norm of the perturbation \\(\\lambda v v^\\top\\) and the noise level \\(\\|\\hat{\\Sigma} - \\Sigma\\|_{\\text{op}}\\). For what values of \\(\\lambda\\) does the SNR exceed 1 when \\(p/n \\to \\gamma\\)?',
                    hint: 'The perturbation has operator norm \\(\\lambda\\). The noise level is \\(\\|\\hat{\\Sigma} - \\Sigma\\|_{\\text{op}} \\asymp \\sqrt{p/n} = \\sqrt{\\gamma}\\). The SNR is the ratio of these two quantities.',
                    solution: 'The signal is the rank-one perturbation \\(\\lambda v v^\\top\\) with operator norm \\(\\lambda\\). The noise in the sample covariance satisfies \\(\\|\\hat{\\Sigma} - \\Sigma\\|_{\\text{op}} \\asymp \\sqrt{\\gamma}\\) (this follows from Marchenko-Pastur). The SNR is therefore \\(\\text{SNR} = \\lambda / \\sqrt{\\gamma}\\). The SNR exceeds 1 precisely when \\(\\lambda > \\sqrt{\\gamma}\\), which is exactly the BBP threshold. This gives a natural interpretation: sample PCA can detect the spike if and only if its magnitude exceeds the noise floor of the sample covariance.'
                }
            ]
        },
        // ============================================================
        // SECTION 2: Davis-Kahan Sin Theta Theorem
        // ============================================================
        {
            id: 'ch15-sec02',
            title: 'Davis-Kahan Sin \u03b8 Theorem',
            content: `
                <h2>Davis-Kahan Sin \\(\\theta\\) Theorem</h2>

                <p>The BBP phase transition provides asymptotic limits for the angle between sample and population eigenvectors in the spiked model. But for practical finite-sample analysis, we need <strong>non-asymptotic perturbation bounds</strong>. The Davis-Kahan theorem is the foundational tool for this purpose.</p>

                <h3>Setup: Perturbation of Symmetric Matrices</h3>

                <p>Let \\(A\\) and \\(\\hat{A}\\) be \\(p \\times p\\) real symmetric matrices, where we think of \\(A\\) as the "truth" and \\(\\hat{A} = A + E\\) as a perturbation with \\(E = \\hat{A} - A\\). Both matrices have real eigenvalues and orthonormal eigenvectors. The question is: how much do the eigenvectors of \\(\\hat{A}\\) differ from those of \\(A\\)?</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 15.2 (Canonical Angle Between Subspaces)</div>
                    <div class="env-body">
                        <p>Let \\(U\\) and \\(\\hat{U}\\) be subspaces of \\(\\mathbb{R}^p\\) with the same dimension \\(r\\). The <strong>canonical angles</strong> \\(\\theta_1, \\ldots, \\theta_r \\in [0, \\pi/2]\\) between \\(U\\) and \\(\\hat{U}\\) are defined by the singular values of \\(P_U P_{\\hat{U}}\\), where \\(P_U\\) and \\(P_{\\hat{U}}\\) are orthogonal projections. Specifically, if \\(\\sigma_1 \\geq \\cdots \\geq \\sigma_r\\) are the singular values of \\(\\hat{U}^\\top U\\) (where we abuse notation using matrix representatives), then \\(\\theta_i = \\arccos(\\sigma_i)\\).</p>
                        <p>For rank-one subspaces (i.e., comparing two unit vectors \\(v\\) and \\(\\hat{v}\\)), the single canonical angle is simply</p>
                        \\[\\theta(v, \\hat{v}) = \\arccos |\\langle v, \\hat{v} \\rangle|.\\]
                        <p>The quantity \\(\\sin \\theta(v, \\hat{v}) = \\sqrt{1 - \\langle v, \\hat{v} \\rangle^2}\\) measures the distance between the subspaces spanned by \\(v\\) and \\(\\hat{v}\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 15.2 (Davis-Kahan Sin \\(\\theta\\) Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(A\\) and \\(\\hat{A} = A + E\\) be \\(p \\times p\\) real symmetric matrices. Let \\(\\lambda_1 \\geq \\cdots \\geq \\lambda_p\\) be the eigenvalues of \\(A\\), and suppose we are interested in the eigenspace corresponding to eigenvalues \\(\\lambda_j, j \\in S\\) for some index set \\(S \\subseteq \\{1, \\ldots, p\\}\\). Let \\(U\\) be the corresponding eigenspace of \\(A\\), and let \\(\\hat{U}\\) be the eigenspace of \\(\\hat{A}\\) for the corresponding eigenvalues.</p>
                        <p>Define the <strong>eigengap</strong></p>
                        \\[\\delta = \\min_{j \\in S, \\, k \\notin S} |\\lambda_j - \\lambda_k|.\\]
                        <p>Then</p>
                        \\[\\|\\sin \\Theta(U, \\hat{U})\\|_F \\leq \\frac{\\|E\\|_F}{\\delta}, \\qquad \\|\\sin \\Theta(U, \\hat{U})\\|_{\\text{op}} \\leq \\frac{\\|E\\|_{\\text{op}}}{\\delta}\\]
                        <p>where \\(\\sin \\Theta(U, \\hat{U})\\) is the diagonal matrix of sines of canonical angles.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch (Rank-One Case)</div>
                    <div class="env-body">
                        <p>For simplicity, consider the case where \\(S = \\{1\\}\\), so we are tracking the leading eigenvector. Let \\(v_1\\) be the leading eigenvector of \\(A\\) with eigenvalue \\(\\lambda_1\\), and \\(\\hat{v}_1\\) the leading eigenvector of \\(\\hat{A}\\). Write \\(\\hat{v}_1 = \\alpha v_1 + \\beta w\\) where \\(w \\perp v_1\\) and \\(\\alpha^2 + \\beta^2 = 1\\).</p>
                        <p>From the eigenequation \\(\\hat{A} \\hat{v}_1 = \\hat{\\lambda}_1 \\hat{v}_1\\), projecting onto the orthogonal complement of \\(v_1\\):</p>
                        \\[P_{v_1^\\perp} \\hat{A} \\hat{v}_1 = \\hat{\\lambda}_1 \\beta w\\]
                        <p>The left side is \\(P_{v_1^\\perp}(A + E)(\\alpha v_1 + \\beta w)\\). Since \\(A v_1 = \\lambda_1 v_1\\) lies in the span of \\(v_1\\), and \\(P_{v_1^\\perp} A w = P_{v_1^\\perp} A w\\) has eigenvalues \\(\\lambda_2, \\ldots, \\lambda_p\\), we get after careful analysis:</p>
                        \\[|\\beta| = \\sin \\theta \\leq \\frac{\\|E\\|_{\\text{op}}}{\\hat{\\lambda}_1 - \\lambda_2}\\]
                        <p>By Weyl's inequality, \\(|\\hat{\\lambda}_1 - \\lambda_1| \\leq \\|E\\|_{\\text{op}}\\), so \\(\\hat{\\lambda}_1 - \\lambda_2 \\geq \\lambda_1 - \\lambda_2 - \\|E\\|_{\\text{op}} = \\delta - \\|E\\|_{\\text{op}}\\). When \\(\\|E\\|_{\\text{op}} \\ll \\delta\\), the bound becomes approximately \\(\\sin \\theta \\leq \\|E\\|_{\\text{op}} / \\delta\\).</p>
                        <div class="qed">\u220e</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The Davis-Kahan bound has a beautiful interpretation: the angular deviation of the eigenvector is controlled by the ratio of the perturbation size to the eigengap. If the gap \\(\\delta\\) between the target eigenvalue and the rest of the spectrum is large, the eigenvector is <strong>stable</strong> under perturbation. If the gap is small, even a tiny perturbation can rotate the eigenvector significantly.</p>
                        <p>This is analogous to the condition number in linear systems: well-separated eigenvalues correspond to well-conditioned eigenvectors.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-davis-kahan"></div>

                <h3>Application to Spiked Model</h3>

                <div class="env-block example">
                    <div class="env-title">Example 15.2 (Davis-Kahan for Spiked Covariance)</div>
                    <div class="env-body">
                        <p>In the spiked covariance model \\(\\Sigma = I_p + \\lambda v v^\\top\\), the eigenvalues are \\(1 + \\lambda\\) (with eigenvector \\(v\\)) and \\(1\\) (with multiplicity \\(p-1\\)). So the eigengap is \\(\\delta = \\lambda\\). Applying Davis-Kahan with \\(E = \\hat{\\Sigma} - \\Sigma\\):</p>
                        \\[\\sin \\theta(\\hat{v}_1, v) \\leq \\frac{\\|\\hat{\\Sigma} - \\Sigma\\|_{\\text{op}}}{\\lambda}.\\]
                        <p>Since \\(\\|\\hat{\\Sigma} - \\Sigma\\|_{\\text{op}} = O_P(\\sqrt{p/n})\\), this gives</p>
                        \\[\\sin \\theta(\\hat{v}_1, v) = O_P\\!\\left(\\frac{\\sqrt{p/n}}{\\lambda}\\right).\\]
                        <p>This bound is meaningful (i.e., less than 1) only when \\(\\lambda \\gg \\sqrt{p/n}\\), consistent with the BBP threshold.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Weyl's Inequality)</div>
                    <div class="env-body">
                        <p>A companion result to Davis-Kahan is <strong>Weyl's inequality</strong>: for symmetric \\(A, \\hat{A} = A + E\\),</p>
                        \\[|\\hat{\\lambda}_j - \\lambda_j| \\leq \\|E\\|_{\\text{op}} \\quad \\text{for all } j = 1, \\ldots, p.\\]
                        <p>This controls eigenvalue perturbation, while Davis-Kahan controls eigenvector perturbation. Together they provide a complete finite-sample toolkit for PCA analysis.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-davis-kahan',
                    title: 'Davis-Kahan Sin \u03b8 Bound',
                    description: 'Perturb a 2x2 symmetric matrix A by adding noise E. Compare the actual angle between eigenvectors of A and A+E with the Davis-Kahan upper bound ||E||/\u03b4. Adjust the eigengap and perturbation strength.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 420, scale: 60, originX: 220, originY: 250 });
                        var ctx = viz.ctx;

                        var eigengap = 3.0;
                        var perturbStr = 0.5;

                        var sliderGap = VizEngine.createSlider(controls, 'Eigengap \u03b4', 0.3, 6.0, eigengap, 0.1, function(v) {
                            eigengap = parseFloat(v);
                            draw();
                        });
                        var sliderPert = VizEngine.createSlider(controls, '||E||', 0.1, 4.0, perturbStr, 0.1, function(v) {
                            perturbStr = parseFloat(v);
                            draw();
                        });

                        function eigen2x2(a, b, d) {
                            // Eigenvalues of [[a, b],[b, d]]
                            var tr = a + d;
                            var det = a * d - b * b;
                            var disc = tr * tr - 4 * det;
                            if (disc < 0) disc = 0;
                            var sq = Math.sqrt(disc);
                            var l1 = (tr + sq) / 2;
                            var l2 = (tr - sq) / 2;

                            // Eigenvectors
                            var v1, v2;
                            if (Math.abs(b) > 1e-10) {
                                v1 = [l1 - d, b];
                                v2 = [l2 - d, b];
                            } else {
                                v1 = a >= d ? [1, 0] : [0, 1];
                                v2 = a >= d ? [0, 1] : [1, 0];
                            }
                            // Normalize
                            var n1 = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
                            var n2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
                            v1 = [v1[0] / n1, v1[1] / n1];
                            v2 = [v2[0] / n2, v2[1] / n2];

                            return { vals: [l1, l2], vecs: [v1, v2] };
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // A = diag(eigengap + 1, 1), so lambda1 = eigengap+1, lambda2 = 1, gap = eigengap
                            var lam1 = eigengap + 1;
                            var lam2 = 1;

                            // Perturbation: symmetric with given operator norm
                            // E = perturbStr * [[cos(2*phi), sin(2*phi)], [sin(2*phi), -cos(2*phi)]] has eigenvalues +/- perturbStr
                            var phi = 0.7; // fixed direction for the perturbation
                            var c2 = Math.cos(2 * phi), s2 = Math.sin(2 * phi);
                            var E = [[perturbStr * c2, perturbStr * s2], [perturbStr * s2, -perturbStr * c2]];

                            // A + E
                            var Ahat = [[lam1 + E[0][0], E[0][1]], [E[1][0], lam2 + E[1][1]]];

                            // Eigenvectors of A: e1=[1,0], e2=[0,1]
                            var eigA = { vals: [lam1, lam2], vecs: [[1, 0], [0, 1]] };
                            var eigAhat = eigen2x2(Ahat[0][0], Ahat[0][1], Ahat[1][1]);

                            // True eigenvector of A (leading)
                            var v = eigA.vecs[0];
                            // Leading eigenvector of A+E
                            var vhat = eigAhat.vecs[0];

                            // Make sure vhat points in the same half-plane as v
                            if (v[0] * vhat[0] + v[1] * vhat[1] < 0) {
                                vhat = [-vhat[0], -vhat[1]];
                            }

                            // Actual angle
                            var cosA = Math.abs(v[0] * vhat[0] + v[1] * vhat[1]);
                            if (cosA > 1) cosA = 1;
                            var actualAngle = Math.acos(cosA);
                            var actualSinTheta = Math.sin(actualAngle);

                            // Davis-Kahan bound
                            var dkBound = perturbStr / eigengap;
                            var dkAngle = Math.asin(Math.min(dkBound, 1));

                            // Draw unit circle for reference
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, viz.scale * 2.5, 0, Math.PI * 2);
                            ctx.stroke();

                            // Draw eigenvectors of A
                            viz.drawVector(0, 0, v[0] * 2.5, v[1] * 2.5, viz.colors.blue, 'v (true)', 3);
                            viz.drawVector(0, 0, eigA.vecs[1][0] * 2, eigA.vecs[1][1] * 2, viz.colors.blue + '66', '', 1.5);

                            // Draw eigenvectors of A+E
                            viz.drawVector(0, 0, vhat[0] * 2.5, vhat[1] * 2.5, viz.colors.orange, 'v\u0302 (estimated)', 3);
                            viz.drawVector(0, 0, eigAhat.vecs[1][0] * 2, eigAhat.vecs[1][1] * 2, viz.colors.orange + '66', '', 1.5);

                            // Draw angle arc between v and vhat
                            var arcR = viz.scale * 1.8;
                            var startAngle = Math.atan2(v[1], v[0]);
                            var endAngle = Math.atan2(vhat[1], vhat[0]);
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, arcR, -endAngle, -startAngle);
                            ctx.stroke();

                            // Draw Davis-Kahan bound arc
                            if (dkBound < 1) {
                                var boundAngle1 = startAngle + dkAngle;
                                var boundAngle2 = startAngle - dkAngle;
                                ctx.strokeStyle = viz.colors.red + '88';
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([4, 4]);
                                // Draw the bound region lines
                                var bx1 = Math.cos(boundAngle1) * 2.5;
                                var by1 = Math.sin(boundAngle1) * 2.5;
                                var bx2 = Math.cos(boundAngle2) * 2.5;
                                var by2 = Math.sin(boundAngle2) * 2.5;
                                viz.drawSegment(0, 0, bx1, by1, viz.colors.red + '44', 1, true);
                                viz.drawSegment(0, 0, bx2, by2, viz.colors.red + '44', 1, true);
                                ctx.setLineDash([]);
                            }

                            // Info panel on the right side
                            var infoX = 440, infoY = 40;
                            ctx.fillStyle = '#0c0c20cc';
                            ctx.fillRect(infoX - 10, infoY - 10, 260, 210);
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(infoX - 10, infoY - 10, 260, 210);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Matrix A:', infoX, infoY + 6);

                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('\u03bb\u2081 = ' + lam1.toFixed(1) + ', \u03bb\u2082 = ' + lam2.toFixed(1), infoX, infoY + 26);
                            ctx.fillText('Eigengap \u03b4 = ' + eigengap.toFixed(1), infoX, infoY + 46);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.fillText('Perturbation E:', infoX, infoY + 72);

                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('||E||_op = ' + perturbStr.toFixed(1), infoX, infoY + 92);

                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.fillText('Actual sin \u03b8 = ' + actualSinTheta.toFixed(4), infoX, infoY + 120);
                            ctx.fillText('Actual \u03b8 = ' + (actualAngle * 180 / Math.PI).toFixed(2) + '\u00b0', infoX, infoY + 140);

                            ctx.fillStyle = viz.colors.red;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.fillText('DK bound: sin \u03b8 \u2264 ' + dkBound.toFixed(4), infoX, infoY + 166);
                            if (dkBound < 1) {
                                ctx.fillText('DK bound: \u03b8 \u2264 ' + (dkAngle * 180 / Math.PI).toFixed(2) + '\u00b0', infoX, infoY + 186);
                            } else {
                                ctx.fillText('DK bound: trivial (\u2265 1)', infoX, infoY + 186);
                            }

                            // Tightness indicator
                            var tight = dkBound > 0.001 ? (actualSinTheta / dkBound * 100).toFixed(0) : 'N/A';
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('Tightness: ' + tight + '%', infoX, infoY + 206);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(A = \\text{diag}(5, 3, 1)\\) and let \\(E\\) be a symmetric perturbation with \\(\\|E\\|_{\\text{op}} = 0.5\\). Use the Davis-Kahan theorem to bound the sine of the angle between the leading eigenvector of \\(A\\) and that of \\(A + E\\).',
                    hint: 'Identify the eigengap \\(\\delta\\) for the leading eigenvalue of \\(A\\). The gap is the distance from \\(\\lambda_1 = 5\\) to the nearest other eigenvalue \\(\\lambda_2 = 3\\).',
                    solution: 'The eigenvalues of \\(A\\) are \\(\\lambda_1 = 5\\), \\(\\lambda_2 = 3\\), \\(\\lambda_3 = 1\\). The eigengap for the leading eigenvalue is \\(\\delta = \\lambda_1 - \\lambda_2 = 5 - 3 = 2\\). By the Davis-Kahan theorem, \\(\\sin \\theta \\leq \\|E\\|_{\\text{op}} / \\delta = 0.5 / 2 = 0.25\\). Therefore \\(\\theta \\leq \\arcsin(0.25) \\approx 14.5^\\circ\\). The leading eigenvector is relatively stable because the eigengap is large compared to the perturbation.'
                }
            ]
        },
        // ============================================================
        // SECTION 3: Sparse PCA
        // ============================================================
        {
            id: 'ch15-sec03',
            title: 'Sparse PCA',
            content: `
                <h2>Sparse PCA: Formulation and SDP Relaxation</h2>

                <p>We have seen that standard PCA fails in high dimensions when \\(p \\gg n\\), because the noise in the sample covariance overwhelms the signal. The key insight for overcoming this barrier is <strong>structural assumptions</strong>: if the leading eigenvector is sparse, we can estimate it at much lower sample complexity.</p>

                <h3>The Sparse Spiked Model</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 15.3 (Sparse PCA Model)</div>
                    <div class="env-body">
                        <p>Consider the spiked covariance model \\(\\Sigma = I_p + \\lambda v v^\\top\\) where the leading eigenvector \\(v \\in \\mathbb{R}^p\\) is <strong>\\(s\\)-sparse</strong>: at most \\(s\\) entries of \\(v\\) are nonzero, i.e., \\(\\|v\\|_0 \\leq s\\). The parameter space is</p>
                        \\[\\Theta(s, \\lambda) = \\{v \\in \\mathbb{R}^p : \\|v\\| = 1, \\|v\\|_0 \\leq s\\}\\]
                        <p>with \\(s \\ll p\\). The goal is to recover the support \\(S = \\{j : v_j \\neq 0\\}\\) and/or estimate \\(v\\) consistently.</p>
                    </div>
                </div>

                <p>Sparsity is a natural assumption in many applications: in genomics, only a small subset of genes may drive a phenotypic pattern; in finance, a risk factor may load on only a few assets; in neuroscience, a brain activation pattern may be localized to a few regions.</p>

                <h3>The Combinatorial Problem</h3>

                <p>The natural approach to sparse PCA is to solve the optimization problem:</p>
                \\[\\max_{v \\in \\mathbb{R}^p} \\; v^\\top \\hat{\\Sigma} v \\quad \\text{subject to} \\quad \\|v\\| = 1, \\; \\|v\\|_0 \\leq s.\\]

                <p>This is a nonconvex optimization problem (the sparsity constraint \\(\\|v\\|_0 \\leq s\\) is nonconvex). In fact, it is NP-hard in general, as it requires searching over all \\(\\binom{p}{s}\\) possible support sets.</p>

                <div class="env-block remark">
                    <div class="env-title">Remark (Combinatorial Explosion)</div>
                    <div class="env-body">
                        <p>For \\(p = 1000\\) and \\(s = 10\\), the number of support sets is \\(\\binom{1000}{10} \\approx 2.63 \\times 10^{23}\\). Even at \\(10^9\\) evaluations per second, exhaustive search would take about \\(8 \\times 10^6\\) years. Efficient algorithms are essential.</p>
                    </div>
                </div>

                <h3>SDP Relaxation (d'Aspremont et al., 2007)</h3>

                <p>A powerful approach is to lift the problem to a <strong>semidefinite program</strong> (SDP). The key idea: for a unit vector \\(v\\), the rank-one matrix \\(V = v v^\\top\\) satisfies \\(V \\succeq 0\\), \\(\\text{tr}(V) = 1\\), and \\(\\text{rank}(V) = 1\\). Dropping the rank constraint gives a convex relaxation.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 15.4 (SDP Relaxation for Sparse PCA)</div>
                    <div class="env-body">
                        <p>The SDP relaxation for sparse PCA maximizes the variance \\(v^\\top \\hat{\\Sigma} v = \\text{tr}(\\hat{\\Sigma} V)\\) over the convex set:</p>
                        \\[\\max_{V \\in \\mathbb{R}^{p \\times p}} \\; \\text{tr}(\\hat{\\Sigma} V) \\quad \\text{subject to} \\quad V \\succeq 0, \\; \\text{tr}(V) = 1, \\; \\|V\\|_1 \\leq s\\]
                        <p>where \\(\\|V\\|_1 = \\sum_{i,j} |V_{ij}|\\) is the elementwise \\(\\ell_1\\) norm, which serves as a convex proxy for sparsity. Alternatively, one can penalize:</p>
                        \\[\\max_{V \\succeq 0, \\, \\text{tr}(V)=1} \\; \\text{tr}(\\hat{\\Sigma} V) - \\rho \\|V\\|_1\\]
                        <p>where \\(\\rho &gt; 0\\) is a regularization parameter.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 15.3 (SDP Consistency for Sparse PCA)</div>
                    <div class="env-body">
                        <p>Under the sparse spiked covariance model with \\(\\|v\\|_0 = s\\), the SDP relaxation \\(\\hat{V}\\) satisfies</p>
                        \\[\\|\\hat{V} - v v^\\top\\|_F^2 = O_P\\!\\left(\\frac{s \\log p}{n}\\right)\\]
                        <p>provided \\(\\lambda \\gg \\sqrt{s \\log p / n}\\). In particular, the SDP is consistent whenever \\(s \\log p = o(n)\\), which allows \\(p\\) to be exponentially larger than \\(n\\) as long as \\(s\\) is sufficiently small.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Compare the rate \\(s \\log p / n\\) for sparse PCA with the rate \\(p/n\\) for standard PCA. When \\(s \\ll p\\), the sparse rate can be much smaller. The factor \\(\\log p\\) is the "price of not knowing the support" -- if we knew which \\(s\\) coordinates were active, we could estimate the eigenvector in the \\(s\\)-dimensional subspace at rate \\(s/n\\). The \\(\\log p\\) factor pays for searching over \\(\\binom{p}{s}\\) possible supports.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-sparse-pca"></div>

                <h3>Other Convex Relaxations</h3>

                <p>Several variants of the SDP approach have been proposed:</p>
                <ul>
                    <li><strong>DSPCA</strong> (d'Aspremont et al., 2007): Direct SDP with \\(\\ell_1\\) penalization on \\(V\\).</li>
                    <li><strong>Fantope projection</strong> (Vu and Lei, 2013): Projects onto the Fantope \\(\\{V : 0 \\preceq V \\preceq I, \\text{tr}(V) = r\\}\\) for rank-\\(r\\) sparse PCA.</li>
                    <li><strong>Convex sparse PCA</strong> (Vu et al., 2013): Uses nuclear norm plus \\(\\ell_1\\) penalization.</li>
                </ul>

                <p>All of these relaxations achieve the minimax rate \\(s \\log p / n\\) under appropriate conditions, but the SDP can be computationally expensive (typically \\(O(p^{3.5})\\) per iteration), motivating faster iterative methods.</p>
            `,
            visualizations: [
                {
                    id: 'viz-sparse-pca',
                    title: 'Sparse PCA: Support Recovery',
                    description: 'Compare vanilla PCA, sparse PCA (thresholded), and the true sparse loading vector. The heatmap shows how sparsity helps recover the true support in high dimensions.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 420, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var pDim = 60;
                        var nVal = 80;
                        var sVal = 6;
                        var lamVal = 3.0;

                        var sliderS = VizEngine.createSlider(controls, 'Sparsity s', 2, 20, sVal, 1, function(v) {
                            sVal = Math.round(v);
                            recompute();
                        });
                        var sliderLam2 = VizEngine.createSlider(controls, 'Spike \u03bb', 0.5, 6.0, lamVal, 0.1, function(v) {
                            lamVal = parseFloat(v);
                            recompute();
                        });
                        VizEngine.createButton(controls, 'Resample', function() {
                            recompute();
                        });

                        var trueV = [];
                        var pcaV = [];
                        var sparsePcaV = [];

                        function randn() {
                            var u = 0, v = 0;
                            while (u === 0) u = Math.random();
                            while (v === 0) v = Math.random();
                            return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
                        }

                        function recompute() {
                            // True sparse eigenvector: first s entries are 1/sqrt(s), rest are 0
                            trueV = new Float64Array(pDim);
                            var norm = Math.sqrt(sVal);
                            for (var i = 0; i < sVal && i < pDim; i++) trueV[i] = 1.0 / norm;

                            // Generate data: X_i = Z_i + sqrt(lambda) * <Z_i,v> * v  (simplified)
                            var sqrtLam = Math.sqrt(lamVal);
                            var X = [];
                            for (var i = 0; i < nVal; i++) {
                                var row = new Float64Array(pDim);
                                for (var j = 0; j < pDim; j++) row[j] = randn();
                                // Add spike
                                var proj = 0;
                                for (var j = 0; j < pDim; j++) proj += row[j] * trueV[j];
                                var spike_component = randn() * sqrtLam;
                                for (var j = 0; j < pDim; j++) {
                                    row[j] += spike_component * trueV[j];
                                }
                                X.push(row);
                            }

                            // Compute sample covariance (only need a few things)
                            // Use power iteration on X^T X / n for leading eigenvector
                            // Gram matrix approach: G = X X^T / n (nVal x nVal)
                            var G = new Float64Array(nVal * nVal);
                            for (var i = 0; i < nVal; i++) {
                                for (var k = i; k < nVal; k++) {
                                    var s = 0;
                                    for (var j = 0; j < pDim; j++) s += X[i][j] * X[k][j];
                                    G[i * nVal + k] = s / nVal;
                                    G[k * nVal + i] = s / nVal;
                                }
                            }

                            // Power iteration on G
                            var w = new Float64Array(nVal);
                            for (var i = 0; i < nVal; i++) w[i] = randn();
                            var wNorm = 0;
                            for (var i = 0; i < nVal; i++) wNorm += w[i] * w[i];
                            wNorm = Math.sqrt(wNorm);
                            for (var i = 0; i < nVal; i++) w[i] /= wNorm;

                            for (var it = 0; it < 40; it++) {
                                var newW = new Float64Array(nVal);
                                for (var i = 0; i < nVal; i++) {
                                    var s = 0;
                                    for (var k = 0; k < nVal; k++) s += G[i * nVal + k] * w[k];
                                    newW[i] = s;
                                }
                                wNorm = 0;
                                for (var i = 0; i < nVal; i++) wNorm += newW[i] * newW[i];
                                wNorm = Math.sqrt(wNorm);
                                if (wNorm < 1e-15) break;
                                for (var i = 0; i < nVal; i++) w[i] = newW[i] / wNorm;
                            }

                            // Map back: pcaV = X^T w / ||X^T w||
                            pcaV = new Float64Array(pDim);
                            for (var j = 0; j < pDim; j++) {
                                var s = 0;
                                for (var i = 0; i < nVal; i++) s += X[i][j] * w[i];
                                pcaV[j] = s;
                            }
                            var pcaNorm = 0;
                            for (var j = 0; j < pDim; j++) pcaNorm += pcaV[j] * pcaV[j];
                            pcaNorm = Math.sqrt(pcaNorm);
                            for (var j = 0; j < pDim; j++) pcaV[j] /= pcaNorm;

                            // Sign correction
                            var dot = 0;
                            for (var j = 0; j < pDim; j++) dot += pcaV[j] * trueV[j];
                            if (dot < 0) {
                                for (var j = 0; j < pDim; j++) pcaV[j] = -pcaV[j];
                            }

                            // Sparse PCA via iterative thresholding (simplified)
                            // Hard threshold pcaV to keep top s entries
                            sparsePcaV = new Float64Array(pDim);
                            var absVals = [];
                            for (var j = 0; j < pDim; j++) absVals.push({ idx: j, val: Math.abs(pcaV[j]) });
                            absVals.sort(function(a, b) { return b.val - a.val; });

                            for (var k = 0; k < sVal && k < pDim; k++) {
                                sparsePcaV[absVals[k].idx] = pcaV[absVals[k].idx];
                            }
                            // Re-normalize
                            var spNorm = 0;
                            for (var j = 0; j < pDim; j++) spNorm += sparsePcaV[j] * sparsePcaV[j];
                            spNorm = Math.sqrt(spNorm);
                            if (spNorm > 1e-15) {
                                for (var j = 0; j < pDim; j++) sparsePcaV[j] /= spNorm;
                            }

                            draw();
                        }

                        function draw() {
                            viz.clear();
                            var W = viz.width, H = viz.height;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Loading Vectors: Truth vs PCA vs Sparse PCA', W / 2, 22);

                            // Three heatmap bars
                            var barLeft = 60, barRight = W - 30;
                            var barW = barRight - barLeft;
                            var cellW = barW / pDim;
                            var barH = 40;
                            var gap = 22;
                            var startY = 55;

                            var vectors = [
                                { label: 'True v (s-sparse)', data: trueV, color: viz.colors.green },
                                { label: 'Vanilla PCA', data: pcaV, color: viz.colors.blue },
                                { label: 'Sparse PCA (thresholded)', data: sparsePcaV, color: viz.colors.orange }
                            ];

                            // Find max absolute value for color scaling
                            var maxAbs = 0;
                            for (var k = 0; k < vectors.length; k++) {
                                for (var j = 0; j < pDim; j++) {
                                    var a = Math.abs(vectors[k].data[j] || 0);
                                    if (a > maxAbs) maxAbs = a;
                                }
                            }
                            if (maxAbs < 0.01) maxAbs = 1;

                            for (var k = 0; k < vectors.length; k++) {
                                var y0 = startY + k * (barH + gap);

                                // Label
                                ctx.fillStyle = vectors[k].color;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(vectors[k].label, barLeft, y0 - 4);

                                // Heatmap cells
                                for (var j = 0; j < pDim; j++) {
                                    var val = vectors[k].data[j] || 0;
                                    var intensity = Math.abs(val) / maxAbs;

                                    if (val > 0) {
                                        var r = Math.round(40 + 200 * intensity);
                                        var g = Math.round(40 + 100 * intensity);
                                        var b = 40;
                                        ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
                                    } else if (val < 0) {
                                        var r = 40;
                                        var g = Math.round(40 + 80 * intensity);
                                        var b = Math.round(40 + 200 * intensity);
                                        ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
                                    } else {
                                        ctx.fillStyle = '#151525';
                                    }

                                    ctx.fillRect(barLeft + j * cellW, y0, Math.max(cellW - 0.5, 1), barH);
                                }

                                // Border
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(barLeft, y0, barW, barH);
                            }

                            // X-axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var tickStep = pDim <= 60 ? 10 : 20;
                            var lastBarY = startY + 2 * (barH + gap) + barH;
                            for (var j = 0; j <= pDim; j += tickStep) {
                                ctx.fillText(j, barLeft + j * cellW, lastBarY + 14);
                            }
                            ctx.fillText('Coordinate index j', (barLeft + barRight) / 2, lastBarY + 30);

                            // Compute cosines
                            var cosPCA = 0, cosSparse = 0;
                            for (var j = 0; j < pDim; j++) {
                                cosPCA += (pcaV[j] || 0) * (trueV[j] || 0);
                                cosSparse += (sparsePcaV[j] || 0) * (trueV[j] || 0);
                            }

                            // Support recovery
                            var trueSupport = new Set();
                            for (var j = 0; j < pDim; j++) if (Math.abs(trueV[j] || 0) > 1e-10) trueSupport.add(j);
                            var sparseSupport = new Set();
                            for (var j = 0; j < pDim; j++) if (Math.abs(sparsePcaV[j] || 0) > 1e-10) sparseSupport.add(j);
                            var correct = 0;
                            trueSupport.forEach(function(j) { if (sparseSupport.has(j)) correct++; });

                            // Stats panel
                            var statsY = lastBarY + 48;
                            ctx.fillStyle = '#0c0c20cc';
                            ctx.fillRect(barLeft - 10, statsY - 6, barW + 20, 90);
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.strokeRect(barLeft - 10, statsY - 6, barW + 20, 90);

                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';

                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('Vanilla PCA: cos(\u03b8) = ' + Math.abs(cosPCA).toFixed(4) +
                                         ', angle = ' + (Math.acos(Math.min(Math.abs(cosPCA), 1)) * 180 / Math.PI).toFixed(1) + '\u00b0',
                                         barLeft, statsY + 12);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Sparse PCA:  cos(\u03b8) = ' + Math.abs(cosSparse).toFixed(4) +
                                         ', angle = ' + (Math.acos(Math.min(Math.abs(cosSparse), 1)) * 180 / Math.PI).toFixed(1) + '\u00b0',
                                         barLeft, statsY + 32);

                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('Support recovery: ' + correct + '/' + trueSupport.size + ' correct (' +
                                         (trueSupport.size > 0 ? (correct / trueSupport.size * 100).toFixed(0) : 'N/A') + '%)',
                                         barLeft, statsY + 52);

                            ctx.fillStyle = viz.colors.muted;
                            ctx.fillText('p = ' + pDim + ', n = ' + nVal + ', s = ' + sVal + ', \u03bb = ' + lamVal.toFixed(1) +
                                         ', effective rate: s\u00b7log(p)/n = ' + (sVal * Math.log(pDim) / nVal).toFixed(3),
                                         barLeft, statsY + 72);
                        }

                        recompute();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the SDP relaxation for sparse PCA is a relaxation of the original combinatorial problem. That is, for any feasible \\(v\\) of the sparse PCA problem with \\(\\|v\\| = 1\\) and \\(\\|v\\|_0 \\leq s\\), the matrix \\(V = v v^\\top\\) is feasible for the SDP.',
                    hint: 'Check that \\(V = vv^\\top\\) satisfies all the SDP constraints: positive semidefiniteness, trace, and the \\(\\ell_1\\) bound. For the \\(\\ell_1\\) bound, use \\(\\|vv^\\top\\|_1 = \\|v\\|_1^2\\) and the relationship between \\(\\ell_0\\), \\(\\ell_1\\), and \\(\\ell_2\\) norms.',
                    solution: 'Let \\(v\\) satisfy \\(\\|v\\| = 1\\) and \\(\\|v\\|_0 \\leq s\\). Set \\(V = vv^\\top\\). Then: (1) \\(V \\succeq 0\\) since \\(V = vv^\\top\\) is positive semidefinite. (2) \\(\\text{tr}(V) = \\text{tr}(vv^\\top) = v^\\top v = 1\\). (3) \\(\\|V\\|_1 = \\sum_{i,j}|v_i||v_j| = \\|v\\|_1^2\\). By Cauchy-Schwarz applied to the \\(s\\) nonzero entries, \\(\\|v\\|_1 \\leq \\sqrt{s} \\|v\\| = \\sqrt{s}\\), so \\(\\|V\\|_1 \\leq s\\). Moreover, \\(\\text{tr}(\\hat{\\Sigma} V) = v^\\top \\hat{\\Sigma} v\\), matching the original objective. Thus the SDP relaxation is indeed a relaxation: its optimum is at least as large as the combinatorial optimum.'
                }
            ]
        },
        // ============================================================
        // SECTION 4: Algorithms for Sparse PCA
        // ============================================================
        {
            id: 'ch15-sec04',
            title: 'Algorithms for Sparse PCA',
            content: `
                <h2>Algorithms for Sparse PCA</h2>

                <p>While the SDP relaxation is statistically optimal, its computational cost of \\(O(p^{3.5})\\) or more per iteration makes it impractical for large-scale problems. Several faster algorithms have been developed, trading some statistical efficiency for computational tractability.</p>

                <h3>Iterative Thresholding (Truncated Power Method)</h3>

                <p>The simplest and most natural algorithm for sparse PCA is the <strong>truncated power method</strong>, which alternates between power iteration and hard thresholding.</p>

                <div class="env-block definition">
                    <div class="env-title">Algorithm 15.1 (Truncated Power Method)</div>
                    <div class="env-body">
                        <p><strong>Input:</strong> Sample covariance \\(\\hat{\\Sigma}\\), sparsity level \\(s\\), number of iterations \\(T\\).</p>
                        <ol>
                            <li>Initialize \\(v^{(0)}\\) (e.g., random unit vector or leading eigenvector of \\(\\hat{\\Sigma}\\)).</li>
                            <li>For \\(t = 0, 1, \\ldots, T-1\\):</li>
                        </ol>
                        <p style="padding-left:40px;">(a) <strong>Power step:</strong> \\(\\tilde{v} = \\hat{\\Sigma} v^{(t)}\\)</p>
                        <p style="padding-left:40px;">(b) <strong>Threshold:</strong> \\(\\hat{v} = \\mathcal{H}_s(\\tilde{v})\\), where \\(\\mathcal{H}_s\\) keeps only the \\(s\\) largest entries in absolute value and sets the rest to zero.</p>
                        <p style="padding-left:40px;">(c) <strong>Normalize:</strong> \\(v^{(t+1)} = \\hat{v} / \\|\\hat{v}\\|\\)</p>
                        <p><strong>Output:</strong> \\(v^{(T)}\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 15.4 (Convergence of Truncated Power Method)</div>
                    <div class="env-body">
                        <p>Suppose \\(\\Sigma = I_p + \\lambda v v^\\top\\) with \\(\\|v\\|_0 = s\\) and \\(\\lambda \\geq C \\sqrt{s \\log p / n}\\) for a sufficiently large constant \\(C\\). If the initialization \\(v^{(0)}\\) satisfies \\(|\\langle v^{(0)}, v \\rangle| \\geq c\\) for some constant \\(c &gt; 0\\), then after \\(T = O(\\log(p/\\epsilon))\\) iterations, the truncated power method outputs \\(v^{(T)}\\) satisfying</p>
                        \\[\\|v^{(T)} - v\\| \\leq \\epsilon + O\\!\\left(\\sqrt{\\frac{s \\log p}{n \\lambda^2}}\\right)\\]
                        <p>with high probability. The per-iteration cost is \\(O(np)\\), making the total cost \\(O(np \\log p)\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The truncated power method combines two complementary operations: (1) the power step \\(\\hat{\\Sigma} v\\) amplifies the signal component (because \\(\\hat{\\Sigma}\\) has its largest eigenvalue in the spike direction), and (2) the thresholding step \\(\\mathcal{H}_s\\) suppresses noise by enforcing sparsity. Each iteration strengthens the signal and weakens the noise, leading to geometric convergence.</p>
                    </div>
                </div>

                <h3>Diagonal Thresholding</h3>

                <p>An even simpler approach uses only the <strong>diagonal</strong> of \\(\\hat{\\Sigma}\\):</p>

                <div class="env-block definition">
                    <div class="env-title">Algorithm 15.2 (Diagonal Thresholding)</div>
                    <div class="env-body">
                        <p><strong>Input:</strong> Sample covariance \\(\\hat{\\Sigma}\\), sparsity level \\(s\\).</p>
                        <ol>
                            <li>Compute diagonal entries \\(d_j = \\hat{\\Sigma}_{jj}\\) for \\(j = 1, \\ldots, p\\).</li>
                            <li>Select \\(\\hat{S} = \\{j : d_j \\text{ is among the top } s \\text{ values}\\}\\).</li>
                            <li>Compute the leading eigenvector of the \\(s \\times s\\) submatrix \\(\\hat{\\Sigma}_{\\hat{S}, \\hat{S}}\\).</li>
                        </ol>
                        <p><strong>Output:</strong> The estimated sparse eigenvector (zero-padded to \\(\\mathbb{R}^p\\)).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>Diagonal thresholding exploits the fact that under the spiked model \\(\\Sigma = I_p + \\lambda v v^\\top\\), the diagonal entries satisfy \\(\\Sigma_{jj} = 1 + \\lambda v_j^2\\). So the coordinates in the support of \\(v\\) have larger diagonal entries. This approach has cost \\(O(np + s^3)\\) and achieves the optimal rate under certain conditions on the minimum nonzero entry of \\(v\\).</p>
                    </div>
                </div>

                <h3>Covariance Thresholding (Krauthgamer, Nadler, and Vilenchik, 2015)</h3>

                <p>A more refined approach thresholds the <strong>off-diagonal</strong> entries of \\(\\hat{\\Sigma}\\):</p>
                \\[\\hat{\\Sigma}^{\\text{thr}}_{ij} = \\hat{\\Sigma}_{ij} \\cdot \\mathbb{1}(|\\hat{\\Sigma}_{ij}| &gt; \\tau) \\quad \\text{for } i \\neq j\\]
                <p>for a threshold \\(\\tau \\asymp \\sqrt{\\log p / n}\\), then computes the leading eigenvector of \\(\\hat{\\Sigma}^{\\text{thr}}\\). This approach achieves the optimal rate \\(s \\log p / n\\) and is particularly effective when the spike is "spread out" within its support.</p>

                <h3>Comparison of Methods</h3>

                <p>The following table summarizes the key methods:</p>

                <table style="width:100%; border-collapse:collapse; margin:16px 0; font-size:0.9rem;">
                    <tr style="border-bottom:2px solid #30363d;">
                        <th style="text-align:left; padding:8px; color:#f0f6fc;">Method</th>
                        <th style="text-align:left; padding:8px; color:#f0f6fc;">Rate</th>
                        <th style="text-align:left; padding:8px; color:#f0f6fc;">Cost</th>
                        <th style="text-align:left; padding:8px; color:#f0f6fc;">Conditions</th>
                    </tr>
                    <tr style="border-bottom:1px solid #21262d;">
                        <td style="padding:8px; color:#58a6ff;">SDP relaxation</td>
                        <td style="padding:8px;">\\(s \\log p / n\\)</td>
                        <td style="padding:8px;">\\(O(p^{3.5})\\)</td>
                        <td style="padding:8px;">General</td>
                    </tr>
                    <tr style="border-bottom:1px solid #21262d;">
                        <td style="padding:8px; color:#58a6ff;">Truncated power</td>
                        <td style="padding:8px;">\\(s \\log p / n\\)</td>
                        <td style="padding:8px;">\\(O(np \\log p)\\)</td>
                        <td style="padding:8px;">Good initialization</td>
                    </tr>
                    <tr style="border-bottom:1px solid #21262d;">
                        <td style="padding:8px; color:#58a6ff;">Diagonal thresh.</td>
                        <td style="padding:8px;">\\(s \\log p / n\\)</td>
                        <td style="padding:8px;">\\(O(np + s^3)\\)</td>
                        <td style="padding:8px;">Min. entry condition</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; color:#58a6ff;">Covariance thresh.</td>
                        <td style="padding:8px;">\\(s \\log p / n\\)</td>
                        <td style="padding:8px;">\\(O(p^2)\\)</td>
                        <td style="padding:8px;">General</td>
                    </tr>
                </table>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Consider the truncated power method with \\(\\hat{\\Sigma} = I_p + \\lambda v v^\\top + E\\) where \\(v = (1/\\sqrt{2}, 1/\\sqrt{2}, 0, \\ldots, 0)^\\top\\) and \\(s = 2\\). Starting from \\(v^{(0)} = e_1 = (1, 0, \\ldots, 0)^\\top\\), compute one iteration of the truncated power method (ignoring \\(E\\)).',
                    hint: 'First compute \\(\\tilde{v} = (I + \\lambda v v^\\top) e_1\\). Then apply hard thresholding \\(\\mathcal{H}_2\\) to keep the 2 largest entries, and normalize.',
                    solution: 'We have \\(\\tilde{v} = (I + \\lambda v v^\\top) e_1 = e_1 + \\lambda v (v^\\top e_1) = e_1 + \\lambda v \\cdot \\frac{1}{\\sqrt{2}} = (1 + \\frac{\\lambda}{2}) e_1 + \\frac{\\lambda}{2} e_2\\) (using \\(v = (1/\\sqrt{2}, 1/\\sqrt{2}, 0, \\ldots)^\\top\\)). The two largest entries (in absolute value) are the first two: \\(\\tilde{v}_1 = 1 + \\lambda/2\\) and \\(\\tilde{v}_2 = \\lambda/2\\). All other entries are zero, so \\(\\mathcal{H}_2(\\tilde{v}) = \\tilde{v}\\). Normalizing: \\(\\|\\tilde{v}\\| = \\sqrt{(1 + \\lambda/2)^2 + (\\lambda/2)^2}\\). For \\(\\lambda = 2\\): \\(v^{(1)} \\propto (2, 1, 0, \\ldots)^\\top\\), so \\(v^{(1)} = (2/\\sqrt{5}, 1/\\sqrt{5}, 0, \\ldots)^\\top\\). The inner product with the truth is \\(\\langle v^{(1)}, v \\rangle = (2 + 1)/(\\sqrt{5} \\cdot \\sqrt{2}) = 3/\\sqrt{10} \\approx 0.949\\), a significant improvement over the initial \\(\\langle e_1, v \\rangle = 1/\\sqrt{2} \\approx 0.707\\).'
                }
            ]
        },
        // ============================================================
        // SECTION 5: Computational-Statistical Gap
        // ============================================================
        {
            id: 'ch15-sec05',
            title: 'Computational-Statistical Gap',
            content: `
                <h2>The Computational-Statistical Gap</h2>

                <p>One of the most profound phenomena in high-dimensional statistics is the <strong>computational-statistical gap</strong>: there exist regimes where a statistical problem is information-theoretically solvable (enough data exists to solve the problem in principle) but no known polynomial-time algorithm can solve it. Sparse PCA provides one of the cleanest examples of this phenomenon.</p>

                <h3>Three Regimes for Sparse PCA Detection</h3>

                <p>Consider the <strong>detection</strong> (hypothesis testing) version of sparse PCA: given data \\(X_1, \\ldots, X_n \\in \\mathbb{R}^p\\), distinguish between</p>
                \\[H_0: X_i \\sim \\mathcal{N}(0, I_p) \\qquad \\text{versus} \\qquad H_1: X_i \\sim \\mathcal{N}(0, I_p + \\lambda v v^\\top)\\]
                <p>where \\(v\\) is \\(s\\)-sparse and unknown. The question is: how large must \\(\\lambda\\) be for reliable detection?</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 15.5 (Information-Theoretic Limit)</div>
                    <div class="env-body">
                        <p>The sparse PCA detection problem has the following minimax structure. Let \\(\\gamma = p/n\\).</p>
                        <ol>
                            <li><strong>Information-theoretic lower bound:</strong> If \\(\\lambda \\ll \\sqrt{s \\log(ep/s) / n}\\), then no test (even with unlimited computation) can reliably distinguish \\(H_0\\) from \\(H_1\\). This follows from Fano's inequality or the chi-squared method.</li>
                            <li><strong>Information-theoretic upper bound:</strong> If \\(\\lambda \\gg \\sqrt{s \\log(ep/s) / n}\\), a scan statistic (examining all \\(\\binom{p}{s}\\) subsets of size \\(s\\)) achieves reliable detection. But this requires exponential \\(\\binom{p}{s}\\) computation.</li>
                        </ol>
                        <p>Thus the information-theoretic detection threshold is \\(\\lambda^* \\asymp \\sqrt{s \\log(ep/s)/n}\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 15.6 (Computational Lower Bound, Conditional)</div>
                    <div class="env-body">
                        <p>Under the <strong>planted clique hypothesis</strong> (or related hardness assumptions), no polynomial-time algorithm can solve the sparse PCA detection problem when</p>
                        \\[\\lambda \\ll \\sqrt{\\frac{s^2}{n}} \\quad \\text{(or equivalently, } \\lambda \\ll s / \\sqrt{n} \\text{)}.\\]
                        <p>The best known polynomial-time algorithms (SDP, covariance thresholding) succeed when \\(\\lambda \\gg \\sqrt{s^2 / n}\\), matching this conjectured computational threshold.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 15.5 (The Three Regimes)</div>
                    <div class="env-body">
                        <p>For \\(s^2 \\ll p\\), three distinct regimes emerge:</p>
                        <ol>
                            <li><strong>Impossible regime</strong> (\\(\\lambda \\ll \\sqrt{s \\log p / n}\\)): Detection is information-theoretically impossible. No method, regardless of computation, can distinguish the hypotheses.</li>
                            <li><strong>Hard regime</strong> (\\(\\sqrt{s \\log p / n} \\ll \\lambda \\ll s/\\sqrt{n}\\)): Detection is information-theoretically possible but (conjecturally) computationally intractable. There exists a test with exponential-time computation, but no known polynomial-time test succeeds.</li>
                            <li><strong>Easy regime</strong> (\\(\\lambda \\gg s/\\sqrt{n}\\)): Detection is both information-theoretically possible and computationally tractable. Polynomial-time algorithms (SDP, thresholding) succeed.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The gap between the information-theoretic and computational thresholds is</p>
                        \\[\\frac{s/\\sqrt{n}}{\\sqrt{s \\log p / n}} = \\sqrt{\\frac{s}{\\log p}}.\\]
                        <p>When \\(s \\gg \\log p\\), this ratio is large, meaning there is a wide regime where "enough information" exists in the data but we cannot access it efficiently. This is analogous to NP-hard optimization problems where optimal solutions exist but we cannot find them in polynomial time.</p>
                        <p>The hard regime is the statistical analog of a "computational barrier": nature provides information, but extracting it efficiently seems to require exponential work.</p>
                    </div>
                </div>

                <h3>The Planted Clique Connection</h3>

                <p>The computational hardness evidence comes from a reduction to the <strong>planted clique problem</strong>: given a random graph \\(G(n, 1/2)\\) with a planted clique of size \\(k\\), find the clique. Finding a planted clique of size \\(k = o(\\sqrt{n})\\) is widely conjectured to require exponential time. Berthet and Rigollet (2013) showed that a polynomial-time algorithm for sparse PCA detection below the \\(s/\\sqrt{n}\\) threshold would imply a polynomial-time algorithm for planted clique, contradicting the conjecture.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 15.7 (Reduction from Planted Clique, Berthet-Rigollet 2013)</div>
                    <div class="env-body">
                        <p>Suppose there exists a polynomial-time test for the sparse PCA detection problem that succeeds whenever \\(\\lambda \\geq C \\cdot (s \\log p / n)^{1/2}\\) for any constant \\(C &gt; 0\\). Then there exists a polynomial-time algorithm that solves the planted clique problem for cliques of size \\(k = o(\\sqrt{n})\\), refuting the planted clique hypothesis.</p>
                    </div>
                </div>

                <h3>Minimax Rates for Estimation</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 15.8 (Minimax Rate for Sparse PCA Estimation)</div>
                    <div class="env-body">
                        <p>For the sparse spiked covariance model with parameters \\((s, \\lambda, p, n)\\):</p>
                        <ol>
                            <li><strong>Minimax rate:</strong> The minimax risk for estimating the spike direction satisfies
                            \\[\\inf_{\\hat{v}} \\sup_{v \\in \\Theta(s,\\lambda)} \\mathbb{E}\\left[\\sin^2 \\theta(\\hat{v}, v)\\right] \\asymp \\min\\!\\left(1, \\, \\frac{s \\log(ep/s)}{n \\lambda^2}\\right)\\]
                            where the infimum is over all estimators.</li>
                            <li><strong>Polynomial-time minimax rate:</strong> Among polynomial-time estimators (assuming the planted clique hypothesis), the minimax risk is conjectured to be
                            \\[\\asymp \\min\\!\\left(1, \\, \\frac{s^2}{n \\lambda^2}\\right).\\]</li>
                        </ol>
                        <p>The ratio of rates is again \\(s / \\log(ep/s)\\), reflecting the computational-statistical gap for estimation.</p>
                    </div>
                </div>

                <h3>Broader Implications</h3>

                <p>The computational-statistical gap in sparse PCA is not an isolated phenomenon. Similar gaps have been identified in:</p>
                <ul>
                    <li><strong>Community detection</strong> in stochastic block models</li>
                    <li><strong>Sparse regression</strong> (detection of \\(s\\)-sparse signals in high dimensions)</li>
                    <li><strong>Submatrix detection</strong> (planted dense submatrix problem)</li>
                    <li><strong>Tensor PCA</strong> (finding a spike in a random tensor)</li>
                </ul>

                <p>These gaps challenge the classical statistical paradigm where "more data always helps." In the computational-statistical gap, more data does help <em>in principle</em>, but we cannot efficiently exploit it. Understanding and closing (or proving inherent) these gaps remains a central open problem in modern statistics and theoretical computer science.</p>

                <div class="env-block remark">
                    <div class="env-title">Remark (Open Questions)</div>
                    <div class="env-body">
                        <p>Several fundamental questions remain open:</p>
                        <ol>
                            <li>Can the planted clique hypothesis (or a similar assumption) be proven unconditionally? Currently, computational lower bounds rely on <em>conjectures</em> about computational hardness.</li>
                            <li>Are there intermediate algorithms (e.g., running in time \\(n^{\\log n}\\)) that can bridge the gap?</li>
                            <li>Can the Sum-of-Squares (SoS) hierarchy provide tighter computational lower bounds for sparse PCA?</li>
                            <li>What is the precise role of the \\(\\log p\\) factor: does it separate the statistical and computational rates, or is it an artifact of current techniques?</li>
                        </ol>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Suppose \\(p = 10000\\), \\(n = 1000\\), and \\(s = 50\\). Compute the information-theoretic threshold and the computational threshold for the spike strength \\(\\lambda\\). What is the size of the computational-statistical gap?',
                    hint: 'The information-theoretic threshold is \\(\\lambda^* \\asymp \\sqrt{s \\log(p/s) / n}\\) and the computational threshold is \\(\\lambda^{\\text{comp}} \\asymp s/\\sqrt{n}\\). Compute both and take their ratio.',
                    solution: 'Information-theoretic threshold: \\(\\lambda^* \\asymp \\sqrt{s \\log(p/s)/n} = \\sqrt{50 \\cdot \\log(200) / 1000} = \\sqrt{50 \\cdot 5.30 / 1000} = \\sqrt{0.265} \\approx 0.515\\). Computational threshold: \\(\\lambda^{\\text{comp}} \\asymp s/\\sqrt{n} = 50/\\sqrt{1000} = 50/31.62 \\approx 1.58\\). The gap ratio is \\(\\lambda^{\\text{comp}}/\\lambda^* \\approx 1.58/0.515 \\approx 3.07\\). Equivalently, \\(\\sqrt{s/\\log(p/s)} = \\sqrt{50/5.30} \\approx 3.07\\). There is a factor of about 3 between the information-theoretic and computational thresholds. Signals with \\(\\lambda \\in (0.515, 1.58)\\) can in principle be detected, but not by any known polynomial-time algorithm.'
                }
            ]
        }
    ]
});
