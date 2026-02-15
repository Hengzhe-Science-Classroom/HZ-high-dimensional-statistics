window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch16',
    number: 16,
    title: 'Covariance & Graphical Models',
    subtitle: 'Structured estimation of covariance and precision matrices',
    sections: [
        // ============================================================
        // SECTION 1: Covariance Estimation in High Dimensions
        // ============================================================
        {
            id: 'ch16-sec01',
            title: 'Covariance Estimation in High Dimensions',
            content: `
                <h2>Covariance Estimation in High Dimensions</h2>

                <p>The covariance matrix \\(\\Sigma = \\mathbb{E}[(X - \\mu)(X - \\mu)^T]\\) of a random vector \\(X \\in \\mathbb{R}^p\\) is a fundamental object in multivariate statistics. In classical statistics, where the number of observations \\(n\\) vastly exceeds the dimension \\(p\\), the sample covariance matrix is a reliable estimator. But in high dimensions, where \\(p\\) may be comparable to or even exceed \\(n\\), the situation changes dramatically.</p>

                <h3>The Sample Covariance Matrix</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.1 (Sample Covariance Matrix)</div>
                    <div class="env-body">
                        <p>Given i.i.d. observations \\(X_1, \\ldots, X_n \\in \\mathbb{R}^p\\) with mean \\(\\mu\\) and covariance \\(\\Sigma\\), the <strong>sample covariance matrix</strong> is
                        \\[\\hat{\\Sigma}_n = \\frac{1}{n} \\sum_{i=1}^n (X_i - \\bar{X})(X_i - \\bar{X})^T\\]
                        where \\(\\bar{X} = \\frac{1}{n}\\sum_{i=1}^n X_i\\) is the sample mean.</p>
                    </div>
                </div>

                <p>When \\(p\\) is fixed and \\(n \\to \\infty\\), the law of large numbers guarantees that \\(\\hat{\\Sigma}_n \\to \\Sigma\\) element-wise. However, the high-dimensional regime reveals a fundamental problem.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 16.2 (Inconsistency of Sample Covariance)</div>
                    <div class="env-body">
                        <p>Let \\(X_1, \\ldots, X_n \\overset{\\text{i.i.d.}}{\\sim} N(0, I_p)\\). If \\(p/n \\to \\gamma \\in (0, \\infty)\\), then the sample covariance matrix \\(\\hat{\\Sigma}_n\\) is <strong>inconsistent</strong> in the operator norm:
                        \\[\\|\\hat{\\Sigma}_n - I_p\\|_{\\text{op}} \\xrightarrow{\\text{a.s.}} \\sqrt{\\gamma} + \\text{higher order terms} &gt; 0\\]
                        In particular, when \\(p &gt; n\\), the matrix \\(\\hat{\\Sigma}_n\\) is rank-deficient (rank at most \\(n\\)) and hence singular.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The sample covariance has \\(p(p+1)/2\\) free parameters but only \\(np\\) data points. When \\(p \\gg n\\), there are far more parameters than observations, making consistent estimation impossible without structural assumptions. This is a direct manifestation of the <em>curse of dimensionality</em> applied to second-order statistics.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Marchenko-Pastur Connection)</div>
                    <div class="env-body">
                        <p>The eigenvalue distribution of \\(\\hat{\\Sigma}_n\\) under \\(\\Sigma = I_p\\) follows the Marchenko-Pastur law (Chapter 6). The bulk eigenvalues spread over \\([(1-\\sqrt{\\gamma})^2, (1+\\sqrt{\\gamma})^2]\\), so even the identity covariance produces eigenvalues far from 1 when \\(\\gamma\\) is not negligible.</p>
                    </div>
                </div>

                <h3>Structural Assumptions and Sparsity</h3>

                <p>To make high-dimensional covariance estimation tractable, we impose structural assumptions on \\(\\Sigma\\). The most common assumption is <strong>sparsity</strong>: most entries of \\(\\Sigma\\) (or its inverse \\(\\Sigma^{-1}\\)) are zero or negligible.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.3 (Sparsity Classes for Covariance Matrices)</div>
                    <div class="env-body">
                        <p>For \\(0 \\leq q &lt; 1\\) and \\(s_0(p) &gt; 0\\), define the class of approximately sparse covariance matrices:
                        \\[\\mathcal{U}_q(s_0) = \\left\\{\\Sigma \\succ 0 : \\max_{j} \\sum_{k=1}^p |\\sigma_{jk}|^q \\leq s_0 \\right\\}\\]
                        When \\(q = 0\\), this counts the maximum number of nonzero entries in any row. When \\(0 &lt; q &lt; 1\\), it measures approximate sparsity by controlling the \\(\\ell_q\\) "norm" of each row.</p>
                    </div>
                </div>

                <h3>Thresholding Estimators</h3>

                <p>The simplest approach to exploiting sparsity is <strong>thresholding</strong>: set small entries of \\(\\hat{\\Sigma}_n\\) to zero.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.4 (Thresholding Estimators)</div>
                    <div class="env-body">
                        <p>Given a threshold \\(\\lambda &gt; 0\\), define:</p>
                        <ul>
                            <li><strong>Hard thresholding:</strong> \\(T^H_{\\lambda}(\\hat{\\Sigma})_{jk} = \\hat{\\sigma}_{jk} \\cdot \\mathbf{1}(|\\hat{\\sigma}_{jk}| &gt; \\lambda)\\)</li>
                            <li><strong>Soft thresholding:</strong> \\(T^S_{\\lambda}(\\hat{\\Sigma})_{jk} = \\text{sign}(\\hat{\\sigma}_{jk})(|\\hat{\\sigma}_{jk}| - \\lambda)_+\\)</li>
                        </ul>
                        <p>The diagonal is typically left unthresholded to preserve positive semi-definiteness properties.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-threshold"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 16.5 (Bickel &amp; Levina, 2008)</div>
                    <div class="env-body">
                        <p>Let \\(X_1, \\ldots, X_n \\overset{\\text{i.i.d.}}{\\sim} N(0, \\Sigma)\\) with \\(\\Sigma \\in \\mathcal{U}_q(s_0)\\) for some \\(0 \\leq q &lt; 1\\). With threshold \\(\\lambda \\asymp \\sqrt{\\log p / n}\\), the hard thresholding estimator satisfies
                        \\[\\|T^H_{\\lambda}(\\hat{\\Sigma}) - \\Sigma\\|_{\\text{op}} = O_P\\left(s_0 \\left(\\frac{\\log p}{n}\\right)^{(1-q)/2}\\right)\\]
                        In particular, this rate tends to zero as long as \\(\\log p = o(n)\\), even when \\(p \\gg n\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Sketch)</div>
                    <div class="env-body">
                        <p>The key steps are:</p>
                        <ol>
                            <li><strong>Entry-wise concentration:</strong> For sub-Gaussian \\(X\\), each entry \\(\\hat{\\sigma}_{jk}\\) concentrates around \\(\\sigma_{jk}\\):
                            \\[P(|\\hat{\\sigma}_{jk} - \\sigma_{jk}| &gt; t) \\leq c_1 \\exp(-c_2 n t^2)\\]
                            With \\(t = C\\sqrt{\\log p / n}\\), a union bound over all \\(p^2\\) entries gives
                            \\[\\max_{j,k} |\\hat{\\sigma}_{jk} - \\sigma_{jk}| = O_P\\left(\\sqrt{\\frac{\\log p}{n}}\\right)\\]</li>
                            <li><strong>Bias-variance decomposition:</strong> After thresholding, the error on entry \\((j,k)\\) is bounded by \\(\\min(|\\sigma_{jk}|, \\lambda)\\) (bias from killing small true entries) plus \\(O(\\sqrt{\\log p / n})\\) (variance from noisy large entries).</li>
                            <li><strong>Operator norm bound:</strong> Using \\(\\|A\\|_{\\text{op}} \\leq \\max_j \\sum_k |a_{jk}|\\), the sparsity class condition controls the sum of errors in each row, yielding the stated rate.</li>
                        </ol>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The threshold level \\(\\lambda \\asymp \\sqrt{\\log p / n}\\) is <em>universal</em> in the sense that it does not depend on the unknown sparsity parameters \\(q\\) or \\(s_0\\). The \\(\\log p\\) factor is the price of simultaneously controlling \\(p^2\\) entries via a union bound. This is analogous to the universal threshold \\(\\sqrt{2 \\log p}\\) in wavelet shrinkage.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-threshold',
                    title: 'Thresholding Demo: Sample Covariance Cleanup',
                    description: 'Compare the sample covariance heatmap before and after thresholding. Adjust the threshold to see how Frobenius error changes relative to the true sparse covariance.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 620, height: 380, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var W = viz.width, H = viz.height;

                        var p = 12;
                        var n = 30;
                        var threshold = 0.3;
                        var trueSparsity = 0.3;

                        // Generate a sparse true covariance
                        var trueSigma, sampleSigma;

                        function generateData() {
                            // Build a sparse symmetric PD matrix
                            trueSigma = [];
                            for (var i = 0; i < p; i++) {
                                trueSigma[i] = [];
                                for (var j = 0; j < p; j++) {
                                    trueSigma[i][j] = 0;
                                }
                                trueSigma[i][i] = 1.0 + Math.random() * 0.5;
                            }
                            // Add sparse off-diagonal entries
                            for (var i = 0; i < p; i++) {
                                for (var j = i + 1; j < p; j++) {
                                    if (Math.random() < trueSparsity) {
                                        var val = (Math.random() - 0.5) * 1.2;
                                        trueSigma[i][j] = val;
                                        trueSigma[j][i] = val;
                                    }
                                }
                            }
                            // Make diagonally dominant for PD
                            for (var i = 0; i < p; i++) {
                                var rowSum = 0;
                                for (var j = 0; j < p; j++) {
                                    if (j !== i) rowSum += Math.abs(trueSigma[i][j]);
                                }
                                trueSigma[i][i] = Math.max(trueSigma[i][i], rowSum + 0.1);
                            }

                            // Generate sample data and compute sample covariance
                            // Simple: Sigma_hat = true + noise
                            sampleSigma = [];
                            for (var i = 0; i < p; i++) {
                                sampleSigma[i] = [];
                                for (var j = 0; j < p; j++) {
                                    var noise = (Math.random() - 0.5) * 2.0 * Math.sqrt(1.0 / n);
                                    sampleSigma[i][j] = trueSigma[i][j] + noise;
                                }
                                // Symmetrize
                                for (var j = 0; j < i; j++) {
                                    var avg = (sampleSigma[i][j] + sampleSigma[j][i]) / 2;
                                    sampleSigma[i][j] = avg;
                                    sampleSigma[j][i] = avg;
                                }
                            }
                        }

                        generateData();

                        VizEngine.createSlider(controls, '\\(\\lambda\\)', 0, 1.5, threshold, 0.05, function(v) {
                            threshold = parseFloat(v);
                            draw();
                        });

                        VizEngine.createButton(controls, 'New Data', function() {
                            generateData();
                            draw();
                        });

                        function heatmapColor(val, maxAbs) {
                            var t = val / maxAbs;
                            if (t > 0) {
                                var r = Math.round(50 + 200 * t);
                                var g = Math.round(50 + 50 * t);
                                var b = 50;
                                return 'rgb(' + r + ',' + g + ',' + b + ')';
                            } else {
                                var r = 50;
                                var g = Math.round(50 + 50 * (-t));
                                var b = Math.round(50 + 200 * (-t));
                                return 'rgb(' + r + ',' + g + ',' + b + ')';
                            }
                        }

                        function drawHeatmap(mat, x0, y0, cellSize, title, maxAbs) {
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(title, x0 + p * cellSize / 2, y0 - 8);

                            for (var i = 0; i < p; i++) {
                                for (var j = 0; j < p; j++) {
                                    ctx.fillStyle = heatmapColor(mat[i][j], maxAbs);
                                    ctx.fillRect(x0 + j * cellSize, y0 + i * cellSize, cellSize - 1, cellSize - 1);
                                }
                            }
                        }

                        function frobenius(A, B) {
                            var s = 0;
                            for (var i = 0; i < p; i++) {
                                for (var j = 0; j < p; j++) {
                                    var d = A[i][j] - B[i][j];
                                    s += d * d;
                                }
                            }
                            return Math.sqrt(s);
                        }

                        function draw() {
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, W, H);

                            var maxAbs = 0;
                            for (var i = 0; i < p; i++) {
                                for (var j = 0; j < p; j++) {
                                    maxAbs = Math.max(maxAbs, Math.abs(trueSigma[i][j]),
                                                      Math.abs(sampleSigma[i][j]));
                                }
                            }

                            var cellSize = Math.floor(Math.min((W - 60) / (3 * p + 2), (H - 80) / p));
                            var totalW = 3 * p * cellSize + 2 * cellSize;
                            var x0 = Math.floor((W - totalW) / 2);
                            var y0 = 40;

                            // Draw three heatmaps
                            drawHeatmap(trueSigma, x0, y0, cellSize, 'True \\u03A3', maxAbs);

                            var x1 = x0 + p * cellSize + cellSize;
                            drawHeatmap(sampleSigma, x1, y0, cellSize, 'Sample \\u03A3\\u0302', maxAbs);

                            // Thresholded
                            var threshSigma = [];
                            for (var i = 0; i < p; i++) {
                                threshSigma[i] = [];
                                for (var j = 0; j < p; j++) {
                                    if (i === j) {
                                        threshSigma[i][j] = sampleSigma[i][j];
                                    } else {
                                        threshSigma[i][j] = Math.abs(sampleSigma[i][j]) > threshold ? sampleSigma[i][j] : 0;
                                    }
                                }
                            }

                            var x2 = x1 + p * cellSize + cellSize;
                            drawHeatmap(threshSigma, x2, y0, cellSize, 'Thresholded T\\u03BB(\\u03A3\\u0302)', maxAbs);

                            // Frobenius errors
                            var errSample = frobenius(sampleSigma, trueSigma);
                            var errThresh = frobenius(threshSigma, trueSigma);

                            var barY = y0 + p * cellSize + 30;
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Frobenius error:', x0, barY);

                            var barX = x0 + 100;
                            var barMax = 200;
                            var maxErr = Math.max(errSample, errThresh, 0.01);

                            // Sample error bar
                            ctx.fillStyle = '#f0883e';
                            var bw1 = Math.min(barMax, (errSample / (maxErr * 1.2)) * barMax);
                            ctx.fillRect(barX, barY - 12, bw1, 12);
                            ctx.fillStyle = '#f0883e';
                            ctx.textAlign = 'left';
                            ctx.fillText('Sample: ' + errSample.toFixed(2), barX + bw1 + 6, barY - 4);

                            // Thresholded error bar
                            ctx.fillStyle = '#3fb950';
                            var bw2 = Math.min(barMax, (errThresh / (maxErr * 1.2)) * barMax);
                            ctx.fillRect(barX, barY + 4, bw2, 12);
                            ctx.fillStyle = '#3fb950';
                            ctx.fillText('Thresholded: ' + errThresh.toFixed(2), barX + bw2 + 6, barY + 12);

                            // Sparsity count
                            var nnzTrue = 0, nnzThresh = 0;
                            for (var i = 0; i < p; i++) {
                                for (var j = 0; j < p; j++) {
                                    if (i !== j && Math.abs(trueSigma[i][j]) > 0.001) nnzTrue++;
                                    if (i !== j && Math.abs(threshSigma[i][j]) > 0.001) nnzThresh++;
                                }
                            }
                            ctx.fillStyle = '#8b949e';
                            ctx.textAlign = 'left';
                            ctx.fillText('Off-diag nonzeros: true=' + nnzTrue + '  thresholded=' + nnzThresh, x0, barY + 36);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the sample covariance matrix \\(\\hat{\\Sigma}_n\\) has rank at most \\(\\min(n, p)\\). Conclude that when \\(p &gt; n\\), \\(\\hat{\\Sigma}_n\\) is always singular, regardless of the true covariance \\(\\Sigma\\).',
                    hint: 'Write \\(\\hat{\\Sigma}_n = \\frac{1}{n} Z^T Z\\) where \\(Z\\) is the \\(n \\times p\\) centered data matrix. What is the rank of \\(Z^T Z\\)?',
                    solution: 'Let \\(Z = [X_1 - \\bar{X}, \\ldots, X_n - \\bar{X}]^T \\in \\mathbb{R}^{n \\times p}\\). Then \\(\\hat{\\Sigma}_n = \\frac{1}{n} Z^T Z\\). The rank of \\(Z^T Z\\) equals the rank of \\(Z\\), which is at most \\(\\min(n, p)\\). In fact, since \\(\\sum_i (X_i - \\bar{X}) = 0\\), the rows of \\(Z\\) satisfy a linear constraint, so \\(\\text{rank}(Z) \\leq n - 1\\). When \\(p &gt; n\\), we have \\(\\text{rank}(\\hat{\\Sigma}_n) \\leq n - 1 &lt; p\\), so \\(\\hat{\\Sigma}_n\\) is singular and cannot be inverted.'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Banding and Tapering
        // ============================================================
        {
            id: 'ch16-sec02',
            title: 'Banding and Tapering',
            content: `
                <h2>Banding and Tapering</h2>

                <p>When the variables \\(X_1, \\ldots, X_p\\) have a <strong>natural ordering</strong> (for instance, time series, spatial locations along a line, or genomic positions), it is natural to assume that variables far apart in this ordering are weakly correlated. This leads to covariance matrices whose entries decay away from the diagonal.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.6 (Bandable Covariance Matrices)</div>
                    <div class="env-body">
                        <p>A covariance matrix \\(\\Sigma\\) is said to be <strong>bandable</strong> if for some decay function \\(\\alpha(\\cdot)\\) tending to zero:
                        \\[|\\sigma_{jk}| \\leq \\alpha(|j - k|) \\quad \\text{for all } j, k\\]
                        Common decay models include:</p>
                        <ul>
                            <li><strong>Exact banding:</strong> \\(\\sigma_{jk} = 0\\) when \\(|j - k| &gt; K\\) for some bandwidth \\(K\\)</li>
                            <li><strong>Polynomial decay:</strong> \\(|\\sigma_{jk}| \\leq C |j - k|^{-\\alpha - 1}\\) for \\(\\alpha &gt; 0\\)</li>
                            <li><strong>Exponential decay:</strong> \\(|\\sigma_{jk}| \\leq C \\rho^{|j-k|}\\) for some \\(\\rho \\in (0,1)\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Think of a temperature sensor array along a wall. Sensors close together measure similar temperatures and are strongly correlated, while sensors far apart have nearly independent readings. The covariance matrix inherits this spatial decay: entries far from the diagonal are small or zero.</p>
                    </div>
                </div>

                <h3>The Banding Estimator</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.7 (Banding Estimator)</div>
                    <div class="env-body">
                        <p>For bandwidth \\(K \\geq 0\\), the <strong>banding estimator</strong> retains only entries within bandwidth \\(K\\) of the diagonal:
                        \\[B_K(\\hat{\\Sigma})_{jk} = \\hat{\\sigma}_{jk} \\cdot \\mathbf{1}(|j - k| \\leq K)\\]
                        This is the sample covariance restricted to a band of width \\(2K + 1\\) around the diagonal.</p>
                    </div>
                </div>

                <h3>The Tapering Estimator</h3>

                <p>Banding introduces a hard cutoff that can cause discontinuities. <strong>Tapering</strong> provides a smooth transition by gradually downweighting entries as they move away from the diagonal.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.8 (Tapering Estimator)</div>
                    <div class="env-body">
                        <p>For bandwidth \\(K\\), the <strong>tapering estimator</strong> is the Hadamard (entry-wise) product:
                        \\[\\hat{\\Sigma}^{\\text{tap}}_K = W_K \\circ \\hat{\\Sigma}\\]
                        where the tapering weights \\(W_K\\) are
                        \\[(W_K)_{jk} = \\begin{cases} 1 & \\text{if } |j-k| \\leq K/2 \\\\ 2 - \\frac{2|j-k|}{K} & \\text{if } K/2 &lt; |j-k| \\leq K \\\\ 0 & \\text{if } |j-k| &gt; K \\end{cases}\\]
                        This trapezoidal taper smoothly transitions from weight 1 near the diagonal to weight 0 far from it.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 16.9 (Cai, Zhang &amp; Zhou, 2010)</div>
                    <div class="env-body">
                        <p>Assume \\(X_1, \\ldots, X_n \\overset{\\text{i.i.d.}}{\\sim} N(0, \\Sigma)\\) where \\(\\Sigma\\) belongs to the class
                        \\[\\mathcal{F}_\\alpha(M) = \\left\\{\\Sigma \\succ 0 : |\\sigma_{jk}| \\leq M |j - k|^{-\\alpha-1}, \\; \\|\\Sigma\\|_{\\text{op}} \\leq M \\right\\}\\]
                        for \\(\\alpha &gt; 0\\). The tapering estimator with bandwidth \\(K \\asymp (n / \\log p)^{1/(2\\alpha + 2)}\\) achieves
                        \\[\\|\\hat{\\Sigma}^{\\text{tap}}_K - \\Sigma\\|_{\\text{op}} = O_P\\left(\\left(\\frac{\\log p}{n}\\right)^{\\alpha/(2\\alpha+2)}\\right)\\]
                        This rate is <strong>minimax optimal</strong> over the class \\(\\mathcal{F}_\\alpha(M)\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Banding vs. Tapering)</div>
                    <div class="env-body">
                        <p>The key advantage of tapering over banding is that the tapering estimator is always <strong>positive semi-definite</strong>. This is because the Schur product theorem guarantees that \\(W_K \\circ \\hat{\\Sigma} \\succeq 0\\) when \\(W_K \\succeq 0\\), and the trapezoidal weight matrix is indeed PSD. In contrast, the banded estimator \\(B_K(\\hat{\\Sigma})\\) may fail to be PSD.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 16.10 (AR(1) Covariance)</div>
                    <div class="env-body">
                        <p>Consider the autoregressive process \\(X_t = \\rho X_{t-1} + \\epsilon_t\\) with \\(|\\rho| &lt; 1\\). The covariance matrix is
                        \\[\\sigma_{jk} = \\frac{\\rho^{|j-k|}}{1-\\rho^2}\\]
                        This has exponential decay: \\(|\\sigma_{jk}| = \\frac{1}{1-\\rho^2}|\\rho|^{|j-k|}\\). Both banding and tapering are well-suited to this structure. With exponential decay (\\(\\alpha\\) effectively infinite), the rates become arbitrarily fast.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.11 (Bandwidth Selection via Cross-Validation)</div>
                    <div class="env-body">
                        <p>In practice, the bandwidth \\(K\\) can be chosen by <strong>\\(k\\)-fold cross-validation</strong>: split the data into \\(k\\) folds, compute the banded/tapered estimator on each training set for various \\(K\\) values, and select the \\(K\\) that minimizes the average negative log-likelihood (or Frobenius error) on the held-out folds.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Let \\(\\Sigma\\) be a \\(p \\times p\\) covariance matrix with exact bandwidth \\(K\\), meaning \\(\\sigma_{jk} = 0\\) whenever \\(|j - k| &gt; K\\). Show that the banding estimator \\(B_K(\\hat{\\Sigma})\\) satisfies \\(\\|B_K(\\hat{\\Sigma}) - \\Sigma\\|_{\\text{op}} = O_P((2K+1)\\sqrt{\\log p / n})\\).',
                    hint: 'Within the band, all entries are estimated with error \\(O_P(\\sqrt{\\log p / n})\\). Use \\(\\|A\\|_{\\text{op}} \\leq \\max_j \\sum_k |a_{jk}|\\) and note that each row has at most \\(2K + 1\\) nonzero entries in the band.',
                    solution: 'Since \\(\\sigma_{jk} = 0\\) for \\(|j-k| &gt; K\\), the banding estimator makes no bias error: \\(B_K(\\hat{\\Sigma})_{jk} - \\sigma_{jk} = \\hat{\\sigma}_{jk} - \\sigma_{jk}\\) when \\(|j-k| \\leq K\\) and \\(0\\) otherwise. By entry-wise concentration, \\(\\max_{j,k} |\\hat{\\sigma}_{jk} - \\sigma_{jk}| = O_P(\\sqrt{\\log p / n})\\). By the bound \\(\\|A\\|_{\\text{op}} \\leq \\max_j \\sum_k |a_{jk}|\\), each row has at most \\(2K + 1\\) entries in the band, so \\(\\|B_K(\\hat{\\Sigma}) - \\Sigma\\|_{\\text{op}} \\leq \\max_j \\sum_{|k-j| \\leq K} |\\hat{\\sigma}_{jk} - \\sigma_{jk}| \\leq (2K+1) \\cdot O_P(\\sqrt{\\log p / n})\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Graphical Lasso
        // ============================================================
        {
            id: 'ch16-sec03',
            title: 'Graphical Lasso',
            content: `
                <h2>Graphical Lasso</h2>

                <p>We now shift our focus from estimating \\(\\Sigma\\) to estimating the <strong>precision matrix</strong> \\(\\Omega = \\Sigma^{-1}\\). The key insight is a deep connection between the precision matrix and <strong>conditional independence</strong>.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 16.12 (Precision Matrix and Conditional Independence)</div>
                    <div class="env-body">
                        <p>Let \\(X \\sim N(\\mu, \\Sigma)\\) with \\(\\Omega = \\Sigma^{-1}\\). Then for \\(j \\neq k\\):
                        \\[\\omega_{jk} = 0 \\quad \\Longleftrightarrow \\quad X_j \\perp\\!\\!\\!\\perp X_k \\mid X_{\\{1,\\ldots,p\\} \\setminus \\{j,k\\}}\\]
                        That is, \\(X_j\\) and \\(X_k\\) are <strong>conditionally independent</strong> given all other variables if and only if the \\((j,k)\\) entry of the precision matrix is zero.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The covariance \\(\\sigma_{jk} \\neq 0\\) means \\(X_j\\) and \\(X_k\\) are marginally correlated, but this could be due to a confounding variable \\(X_m\\) that influences both. The precision matrix entry \\(\\omega_{jk}\\) captures the <em>direct</em> association between \\(X_j\\) and \\(X_k\\), controlling for all other variables. A sparse precision matrix means the conditional independence graph is sparse: most pairs of variables are conditionally independent.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Partial Correlations)</div>
                    <div class="env-body">
                        <p>The <strong>partial correlation</strong> between \\(X_j\\) and \\(X_k\\) given all other variables is
                        \\[\\rho_{jk \\mid \\text{rest}} = -\\frac{\\omega_{jk}}{\\sqrt{\\omega_{jj} \\omega_{kk}}}\\]
                        Thus \\(\\omega_{jk} = 0\\) is equivalent to zero partial correlation, which in the Gaussian case equals conditional independence.</p>
                    </div>
                </div>

                <h3>The Graphical Lasso Optimization</h3>

                <p>The Gaussian log-likelihood for the precision matrix \\(\\Omega \\succ 0\\) is
                \\[\\ell(\\Omega) = \\frac{n}{2}\\left(\\log \\det \\Omega - \\text{tr}(\\hat{\\Sigma} \\Omega)\\right)\\]
                To encourage sparsity in \\(\\Omega\\), we add an \\(\\ell_1\\) penalty on the off-diagonal entries.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.13 (Graphical Lasso)</div>
                    <div class="env-body">
                        <p>The <strong>Graphical Lasso</strong> (glasso) estimator is:
                        \\[\\hat{\\Omega}_{\\lambda} = \\arg\\max_{\\Omega \\succ 0} \\left\\{ \\log \\det \\Omega - \\text{tr}(\\hat{\\Sigma} \\Omega) - \\lambda \\sum_{j \\neq k} |\\omega_{jk}| \\right\\}\\]
                        where \\(\\lambda &gt; 0\\) is the regularization parameter. Equivalently, this solves
                        \\[\\hat{\\Omega}_{\\lambda} = \\arg\\min_{\\Omega \\succ 0} \\left\\{ \\text{tr}(\\hat{\\Sigma} \\Omega) - \\log \\det \\Omega + \\lambda \\|\\Omega_{\\text{off}}\\|_1 \\right\\}\\]
                        where \\(\\|\\Omega_{\\text{off}}\\|_1 = \\sum_{j \\neq k} |\\omega_{jk}|\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-glasso-path"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 16.14 (Properties of the Graphical Lasso)</div>
                    <div class="env-body">
                        <p>The graphical lasso problem is a convex optimization problem. Its dual is:
                        \\[\\hat{\\Sigma}_{\\lambda} = \\arg\\min_{\\Sigma \\succ 0} \\left\\{ -\\log \\det \\Sigma : |\\Sigma_{jk} - \\hat{\\Sigma}_{jk}| \\leq \\lambda \\text{ for } j \\neq k \\right\\}\\]
                        and satisfies \\(\\hat{\\Sigma}_{\\lambda} = \\hat{\\Omega}_{\\lambda}^{-1}\\). Moreover:</p>
                        <ol>
                            <li>The solution exists and is unique when \\(\\hat{\\Sigma} + \\lambda I \\succ 0\\).</li>
                            <li>The estimated graph decomposes into connected components that can be solved independently.</li>
                            <li>For large \\(\\lambda\\), \\(\\hat{\\Omega}_{\\lambda}\\) is diagonal (no edges). As \\(\\lambda \\to 0\\), \\(\\hat{\\Omega}_{\\lambda} \\to \\hat{\\Sigma}^{-1}\\) (if it exists).</li>
                        </ol>
                    </div>
                </div>

                <h3>The Block Coordinate Descent Algorithm</h3>

                <p>Friedman, Hastie, and Tibshirani (2008) proposed an efficient algorithm based on block coordinate descent.</p>

                <div class="env-block definition">
                    <div class="env-title">Algorithm 16.15 (Glasso via Block Coordinate Descent)</div>
                    <div class="env-body">
                        <p>Initialize \\(\\hat{\\Sigma}_{\\lambda} = \\hat{\\Sigma} + \\lambda I\\). Iterate until convergence:</p>
                        <ol>
                            <li>For each variable \\(j = 1, \\ldots, p\\):</li>
                            <li>Partition \\(\\hat{\\Sigma}_{\\lambda}\\) by separating row/column \\(j\\):
                            \\[\\hat{\\Sigma}_{\\lambda} = \\begin{pmatrix} \\hat{\\Sigma}_{11} & \\hat{\\sigma}_{12} \\\\ \\hat{\\sigma}_{12}^T & \\hat{\\sigma}_{22} \\end{pmatrix}\\]</li>
                            <li>Solve the Lasso regression:
                            \\[\\hat{\\beta} = \\arg\\min_\\beta \\left\\{\\frac{1}{2} \\beta^T \\hat{\\Sigma}_{11} \\beta - \\hat{s}_{12}^T \\beta + \\lambda \\|\\beta\\|_1\\right\\}\\]
                            where \\(\\hat{s}_{12}\\) is the corresponding column of the sample covariance.</li>
                            <li>Update: \\(\\hat{\\sigma}_{12} = \\hat{\\Sigma}_{11} \\hat{\\beta}\\).</li>
                        </ol>
                        <p>Each inner Lasso subproblem can be solved by coordinate descent, giving an overall complexity of \\(O(p^3)\\) per sweep.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 16.16 (Estimation Error for Graphical Lasso)</div>
                    <div class="env-body">
                        <p>Under appropriate conditions (including an irrepresentability condition on the true precision matrix), with \\(\\lambda \\asymp \\sqrt{\\log p / n}\\), the graphical lasso estimator satisfies:
                        \\[\\|\\hat{\\Omega}_{\\lambda} - \\Omega^*\\|_{\\max} = O_P\\left(\\sqrt{\\frac{\\log p}{n}}\\right)\\]
                        \\[\\|\\hat{\\Omega}_{\\lambda} - \\Omega^*\\|_F = O_P\\left((s + p)\\sqrt{\\frac{\\log p}{n}}\\right)\\]
                        where \\(s = |\\{(j,k) : j \\neq k, \\omega^*_{jk} \\neq 0\\}|\\) is the number of edges in the true graph.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-glasso-path',
                    title: 'Graphical Lasso Regularization Path',
                    description: 'Vary the penalty parameter \\(\\lambda\\) and watch edges appear/disappear in the estimated conditional independence graph. The right panel shows the number of edges versus \\(\\lambda\\).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 680, height: 400, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var W = viz.width, H = viz.height;

                        var p = 8;
                        var lambda = 0.3;

                        // True precision matrix: sparse
                        // Define edges in the true graph
                        var trueEdges = [
                            [0,1], [1,2], [2,3], [3,4], [4,5], [5,6], [6,7], [7,0],
                            [0,3], [1,5], [2,6]
                        ];

                        // Assign precision values to edges
                        var truePrecision = [];
                        for (var i = 0; i < p; i++) {
                            truePrecision[i] = [];
                            for (var j = 0; j < p; j++) {
                                truePrecision[i][j] = 0;
                            }
                            truePrecision[i][i] = 2.0;
                        }
                        for (var e = 0; e < trueEdges.length; e++) {
                            var a = trueEdges[e][0], b = trueEdges[e][1];
                            var val = 0.3 + Math.random() * 0.4;
                            if (Math.random() < 0.5) val = -val;
                            truePrecision[a][b] = val;
                            truePrecision[b][a] = val;
                        }

                        // Precompute estimated edges for a grid of lambda values
                        // Simulate: as lambda decreases, edges are recovered roughly in order of |omega_jk|
                        // Sort edges by true |omega_jk| descending
                        var edgesWithStrength = [];
                        for (var e = 0; e < trueEdges.length; e++) {
                            var a = trueEdges[e][0], b = trueEdges[e][1];
                            edgesWithStrength.push({ edge: trueEdges[e], strength: Math.abs(truePrecision[a][b]) });
                        }
                        edgesWithStrength.sort(function(x, y) { return y.strength - x.strength; });

                        // Also add some false positive edges at low lambda
                        var falseEdges = [[0,4], [1,6], [3,7]];
                        for (var e = 0; e < falseEdges.length; e++) {
                            edgesWithStrength.push({ edge: falseEdges[e], strength: 0.05 + Math.random() * 0.1 });
                        }

                        // For a given lambda, edges with |omega| > lambda are "recovered"
                        function getEdgesAtLambda(lam) {
                            var edges = [];
                            for (var i = 0; i < edgesWithStrength.length; i++) {
                                if (edgesWithStrength[i].strength > lam) {
                                    edges.push(edgesWithStrength[i]);
                                }
                            }
                            return edges;
                        }

                        VizEngine.createSlider(controls, '\\(\\lambda\\)', 0, 0.8, lambda, 0.02, function(v) {
                            lambda = parseFloat(v);
                            draw();
                        });

                        // Node positions in a circle
                        var nodeRadius = 100;
                        var graphCX = 190, graphCY = H / 2;
                        var nodePos = [];
                        for (var i = 0; i < p; i++) {
                            var angle = -Math.PI / 2 + 2 * Math.PI * i / p;
                            nodePos.push([
                                graphCX + nodeRadius * Math.cos(angle),
                                graphCY + nodeRadius * Math.sin(angle)
                            ]);
                        }

                        function isTrue(edge) {
                            for (var e = 0; e < trueEdges.length; e++) {
                                if ((trueEdges[e][0] === edge[0] && trueEdges[e][1] === edge[1]) ||
                                    (trueEdges[e][0] === edge[1] && trueEdges[e][1] === edge[0])) return true;
                            }
                            return false;
                        }

                        function draw() {
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, W, H);

                            // --- Left panel: Graph ---
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Estimated Graph', graphCX, 22);

                            var currentEdges = getEdgesAtLambda(lambda);

                            // Draw edges
                            for (var e = 0; e < currentEdges.length; e++) {
                                var a = currentEdges[e].edge[0], b = currentEdges[e].edge[1];
                                var isTrueEdge = isTrue(currentEdges[e].edge);
                                ctx.strokeStyle = isTrueEdge ? '#3fb950' : '#f85149';
                                ctx.lineWidth = isTrueEdge ? 2.5 : 1.5;
                                if (!isTrueEdge) ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                ctx.moveTo(nodePos[a][0], nodePos[a][1]);
                                ctx.lineTo(nodePos[b][0], nodePos[b][1]);
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }

                            // Draw nodes
                            var labels = ['X\\u2081', 'X\\u2082', 'X\\u2083', 'X\\u2084', 'X\\u2085', 'X\\u2086', 'X\\u2087', 'X\\u2088'];
                            for (var i = 0; i < p; i++) {
                                ctx.fillStyle = '#1a1a40';
                                ctx.beginPath();
                                ctx.arc(nodePos[i][0], nodePos[i][1], 18, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.strokeStyle = '#58a6ff';
                                ctx.lineWidth = 2;
                                ctx.stroke();

                                ctx.fillStyle = '#f0f6fc';
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(labels[i], nodePos[i][0], nodePos[i][1]);
                            }

                            // Legend
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = '#3fb950';
                            ctx.fillRect(graphCX - 100, H - 40, 10, 10);
                            ctx.fillText('True positive', graphCX - 86, H - 31);
                            ctx.fillStyle = '#f85149';
                            ctx.fillRect(graphCX - 100, H - 25, 10, 10);
                            ctx.fillText('False positive', graphCX - 86, H - 16);

                            // --- Right panel: edges vs lambda ---
                            var plotX = 400, plotY = 40;
                            var plotW = 240, plotH = 280;

                            // Background
                            ctx.fillStyle = '#121230';
                            ctx.fillRect(plotX, plotY, plotW, plotH);
                            ctx.strokeStyle = '#30363d';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(plotX, plotY, plotW, plotH);

                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Edges vs \\u03BB', plotX + plotW / 2, plotY - 8);

                            // Axes labels
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('\\u03BB', plotX + plotW / 2, plotY + plotH + 18);
                            ctx.save();
                            ctx.translate(plotX - 16, plotY + plotH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('# edges', 0, 0);
                            ctx.restore();

                            // Plot the curve
                            var maxEdges = edgesWithStrength.length;
                            var lambdaVals = [];
                            var edgeCounts = [];
                            for (var l = 0; l <= 80; l++) {
                                var lv = l * 0.01;
                                lambdaVals.push(lv);
                                edgeCounts.push(getEdgesAtLambda(lv).length);
                            }

                            ctx.strokeStyle = '#3fb9a0';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var l = 0; l < lambdaVals.length; l++) {
                                var px = plotX + (lambdaVals[l] / 0.8) * plotW;
                                var py = plotY + plotH - (edgeCounts[l] / (maxEdges + 1)) * plotH;
                                if (l === 0) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Current lambda indicator
                            var curX = plotX + (lambda / 0.8) * plotW;
                            ctx.strokeStyle = '#f0883e';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath();
                            ctx.moveTo(curX, plotY);
                            ctx.lineTo(curX, plotY + plotH);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            var nEdgesNow = currentEdges.length;
                            var nTrue = 0, nFalse = 0;
                            for (var e = 0; e < currentEdges.length; e++) {
                                if (isTrue(currentEdges[e].edge)) nTrue++;
                                else nFalse++;
                            }

                            // Stats text
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Total edges: ' + nEdgesNow + ' / ' + trueEdges.length + ' true', plotX, plotY + plotH + 40);
                            ctx.fillStyle = '#3fb950';
                            ctx.fillText('TP: ' + nTrue, plotX, plotY + plotH + 56);
                            ctx.fillStyle = '#f85149';
                            ctx.fillText('FP: ' + nFalse, plotX + 60, plotY + plotH + 56);

                            // Tick marks
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '9px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            for (var t = 0; t <= 8; t++) {
                                var tv = t * 0.1;
                                var tx = plotX + (tv / 0.8) * plotW;
                                ctx.fillText(tv.toFixed(1), tx, plotY + plotH + 10);
                            }
                            ctx.textAlign = 'right';
                            for (var t = 0; t <= maxEdges; t += 2) {
                                var ty = plotY + plotH - (t / (maxEdges + 1)) * plotH;
                                ctx.fillText(t.toString(), plotX - 4, ty + 3);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the graphical lasso objective \\(f(\\Omega) = \\text{tr}(\\hat{\\Sigma} \\Omega) - \\log \\det \\Omega + \\lambda \\|\\Omega_{\\text{off}}\\|_1\\) is strictly convex over the cone of positive definite matrices.',
                    hint: 'The function \\(-\\log \\det \\Omega\\) is strictly convex on the PD cone. The trace and \\(\\ell_1\\) terms are convex (linear + convex).',
                    solution: 'The function \\(g(\\Omega) = \\text{tr}(\\hat{\\Sigma} \\Omega)\\) is linear, hence convex. The function \\(h(\\Omega) = -\\log \\det \\Omega\\) is strictly convex on the positive definite cone (this follows from the concavity of \\(\\log \\det\\) on PD matrices, which in turn follows from \\(\\log \\det \\Omega = \\sum_i \\log \\lambda_i(\\Omega)\\) being a sum of concave functions of the eigenvalues). The penalty \\(\\lambda \\|\\Omega_{\\text{off}}\\|_1\\) is convex (it is a norm). The sum \\(f = g + h + \\lambda \\|\\cdot\\|_1\\) is strictly convex because \\(h\\) is strictly convex. Since the feasible set (PD cone) is convex and open, the minimizer, if it exists, is unique.'
                },
                {
                    question: 'Prove Theorem 16.12: for a Gaussian random vector \\(X \\sim N(\\mu, \\Sigma)\\), the off-diagonal entry \\(\\omega_{jk} = 0\\) if and only if \\(X_j \\perp\\!\\!\\!\\perp X_k \\mid X_{-\\{j,k\\}}\\).',
                    hint: 'Use the formula for the conditional distribution of \\((X_j, X_k)\\) given \\(X_{-\\{j,k\\}}\\). The conditional covariance is determined by the \\(2 \\times 2\\) block of \\(\\Omega\\) corresponding to \\(j, k\\).',
                    solution: 'Write \\(X = (X_j, X_k, X_{-\\{j,k\\}})^T\\). By the properties of multivariate Gaussian conditioning, the conditional distribution of \\((X_j, X_k) \\mid X_{-\\{j,k\\}}\\) is Gaussian with conditional covariance matrix equal to the \\(2 \\times 2\\) matrix \\((\\Omega_{\\{j,k\\},\\{j,k\\}})^{-1}\\), where \\(\\Omega_{\\{j,k\\},\\{j,k\\}}\\) is the \\(2 \\times 2\\) submatrix of \\(\\Omega\\) at rows and columns \\(j, k\\). Specifically, \\(\\Omega_{\\{j,k\\},\\{j,k\\}} = \\begin{pmatrix} \\omega_{jj} & \\omega_{jk} \\\\ \\omega_{kj} & \\omega_{kk} \\end{pmatrix}\\). The conditional covariance between \\(X_j\\) and \\(X_k\\) is proportional to \\(-\\omega_{jk}\\). In a Gaussian distribution, uncorrelatedness is equivalent to independence. Hence \\(X_j \\perp\\!\\!\\!\\perp X_k \\mid X_{-\\{j,k\\}}\\) iff the conditional covariance is zero, iff \\(\\omega_{jk} = 0\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 4: CLIME
        // ============================================================
        {
            id: 'ch16-sec04',
            title: 'CLIME',
            content: `
                <h2>CLIME: Constrained \\(\\ell_1\\) Minimization for Inverse Matrix Estimation</h2>

                <p>While the graphical lasso is a penalized likelihood method, <strong>CLIME</strong> (Cai, Liu, and Luo, 2011) takes a fundamentally different approach: it directly targets the precision matrix through a constrained \\(\\ell_1\\) optimization that decouples across columns.</p>

                <h3>The CLIME Estimator</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.17 (CLIME)</div>
                    <div class="env-body">
                        <p>The <strong>CLIME</strong> estimator of the precision matrix \\(\\Omega = \\Sigma^{-1}\\) solves:
                        \\[\\hat{\\Omega} = \\arg\\min_{\\Omega} \\|\\Omega\\|_1 \\quad \\text{subject to} \\quad \\|\\hat{\\Sigma} \\Omega - I\\|_{\\max} \\leq \\lambda\\]
                        where \\(\\|A\\|_1 = \\sum_{j,k} |a_{jk}|\\) is the element-wise \\(\\ell_1\\) norm and \\(\\|A\\|_{\\max} = \\max_{j,k} |a_{jk}|\\) is the element-wise \\(\\ell_\\infty\\) norm.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The constraint \\(\\|\\hat{\\Sigma} \\Omega - I\\|_{\\max} \\leq \\lambda\\) says "\\(\\Omega\\) should approximately invert \\(\\hat{\\Sigma}\\)." The \\(\\ell_1\\) objective promotes sparsity. Unlike the graphical lasso, CLIME does not require \\(\\Omega \\succ 0\\) explicitly — the constraint set is a polytope, and the problem decomposes into \\(p\\) independent linear programs.</p>
                    </div>
                </div>

                <h3>Column-wise Decomposition</h3>

                <p>A key computational advantage of CLIME is that it decomposes into independent column-wise problems. Let \\(\\omega_j\\) denote the \\(j\\)-th column of \\(\\Omega\\) and \\(e_j\\) the \\(j\\)-th standard basis vector. Then CLIME is equivalent to solving, for each \\(j = 1, \\ldots, p\\):</p>

                <div class="env-block definition">
                    <div class="env-title">Algorithm 16.18 (CLIME Column-wise LP)</div>
                    <div class="env-body">
                        <p>For each \\(j = 1, \\ldots, p\\), solve the linear program:
                        \\[\\hat{\\omega}_j = \\arg\\min_{\\omega} \\|\\omega\\|_1 \\quad \\text{subject to} \\quad \\|\\hat{\\Sigma} \\omega - e_j\\|_\\infty \\leq \\lambda\\]
                        Then symmetrize: \\(\\hat{\\Omega}_{jk} = \\hat{\\omega}_{jk}\\) if \\(|\\hat{\\omega}_{jk}| \\leq |\\hat{\\omega}_{kj}|\\), and \\(\\hat{\\Omega}_{jk} = \\hat{\\omega}_{kj}\\) otherwise (element-wise minimum in absolute value).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Computational Advantage)</div>
                    <div class="env-body">
                        <p>Each column-wise problem is a linear program with \\(p\\) variables and \\(2p\\) constraints. These \\(p\\) LP's can be solved <strong>independently in parallel</strong>, making CLIME highly amenable to distributed computing. In contrast, the graphical lasso couples all columns through the \\(\\log \\det\\) term.</p>
                    </div>
                </div>

                <h3>Theoretical Guarantees</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 16.19 (Cai, Liu &amp; Luo, 2011)</div>
                    <div class="env-body">
                        <p>Let \\(X_1, \\ldots, X_n \\overset{\\text{i.i.d.}}{\\sim} N(0, \\Sigma)\\) with \\(\\Omega^* = \\Sigma^{-1}\\). Assume \\(\\Omega^* \\in \\mathcal{G}_q(s_n, M)\\), the class of precision matrices with
                        \\[\\max_j \\sum_{k} |\\omega^*_{jk}|^q \\leq s_n, \\quad \\|\\Omega^*\\|_1 \\leq M\\]
                        for some \\(0 \\leq q &lt; 1\\). With \\(\\lambda \\asymp \\sqrt{\\log p / n}\\), the CLIME estimator satisfies:
                        \\[\\|\\hat{\\Omega} - \\Omega^*\\|_{\\max} = O_P\\left(\\sqrt{\\frac{\\log p}{n}}\\right)\\]
                        \\[\\|\\hat{\\Omega} - \\Omega^*\\|_{\\text{op}} = O_P\\left(s_n \\left(\\frac{\\log p}{n}\\right)^{(1-q)/2}\\right)\\]</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (CLIME vs. Graphical Lasso)</div>
                    <div class="env-body">
                        <p>Key differences between the two approaches:</p>
                        <ul>
                            <li><strong>Assumptions:</strong> The graphical lasso requires an irrepresentability condition for model selection consistency; CLIME does not.</li>
                            <li><strong>Positive definiteness:</strong> The graphical lasso guarantees \\(\\hat{\\Omega} \\succ 0\\); CLIME does not (though the symmetrized estimator can be projected onto the PD cone).</li>
                            <li><strong>Computation:</strong> CLIME decomposes into parallel LP's; glasso requires iterative block coordinate descent.</li>
                            <li><strong>Rates:</strong> Both achieve the same minimax optimal rates for estimation under appropriate sparsity classes.</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch of Theorem 16.19</div>
                    <div class="env-body">
                        <p>The proof proceeds in three steps:</p>
                        <ol>
                            <li><strong>Feasibility:</strong> By concentration, \\(\\|\\hat{\\Sigma} - \\Sigma\\|_{\\max} = O_P(\\sqrt{\\log p / n})\\). Thus \\(\\|\\hat{\\Sigma} \\Omega^* - I\\|_{\\max} = \\|(\\hat{\\Sigma} - \\Sigma)\\Omega^*\\|_{\\max} \\leq \\|\\hat{\\Sigma} - \\Sigma\\|_{\\max} \\|\\Omega^*\\|_1 = O_P(M \\sqrt{\\log p / n})\\). So \\(\\Omega^*\\) is feasible for \\(\\lambda \\asymp M\\sqrt{\\log p / n}\\).</li>
                            <li><strong>\\(\\ell_1\\) comparison:</strong> Since \\(\\hat{\\Omega}\\) minimizes \\(\\|\\cdot\\|_1\\) over the feasible set and \\(\\Omega^*\\) is feasible, \\(\\|\\hat{\\Omega}\\|_1 \\leq \\|\\Omega^*\\|_1\\).</li>
                            <li><strong>Entry-wise bound:</strong> The constraint \\(\\|\\hat{\\Sigma}(\\hat{\\Omega} - \\Omega^*)\\|_{\\max} \\leq 2\\lambda\\) combined with invertibility of \\(\\Sigma\\) gives \\(\\|\\hat{\\Omega} - \\Omega^*\\|_{\\max} = O_P(\\sqrt{\\log p / n})\\). Aggregating via the sparsity condition yields the operator norm bound.</li>
                        </ol>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that the CLIME optimization can be decomposed into \\(p\\) independent linear programs, one per column of \\(\\Omega\\). Write out the LP for column \\(j\\) explicitly, including the transformation to standard LP form.',
                    hint: 'Write each variable \\(\\omega_k = \\omega_k^+ - \\omega_k^-\\) with \\(\\omega_k^+, \\omega_k^- \\geq 0\\). The constraint \\(\\|\\hat{\\Sigma} \\omega - e_j\\|_\\infty \\leq \\lambda\\) becomes \\(2p\\) linear inequality constraints.',
                    solution: 'The CLIME problem \\(\\min \\|\\Omega\\|_1\\) s.t. \\(\\|\\hat{\\Sigma}\\Omega - I\\|_{\\max} \\leq \\lambda\\) separates by columns because both the objective and constraints are separable: \\(\\|\\Omega\\|_1 = \\sum_j \\|\\omega_j\\|_1\\) and \\(\\|\\hat{\\Sigma}\\Omega - I\\|_{\\max} \\leq \\lambda \\Leftrightarrow \\|\\hat{\\Sigma}\\omega_j - e_j\\|_\\infty \\leq \\lambda\\) for all \\(j\\). For column \\(j\\): \\(\\min \\|\\omega\\|_1 = \\min \\sum_{k=1}^p |\\omega_k|\\) s.t. \\(-\\lambda \\leq (\\hat{\\Sigma}\\omega)_i - \\delta_{ij} \\leq \\lambda\\) for all \\(i = 1,\\ldots,p\\). Write \\(\\omega_k = \\omega_k^+ - \\omega_k^-\\) with \\(\\omega_k^+, \\omega_k^- \\geq 0\\). The objective becomes \\(\\min \\sum_k (\\omega_k^+ + \\omega_k^-)\\), and the constraints become \\(\\hat{\\Sigma}(\\omega^+ - \\omega^-) \\leq e_j + \\lambda \\mathbf{1}\\) and \\(-\\hat{\\Sigma}(\\omega^+ - \\omega^-) \\leq -e_j + \\lambda \\mathbf{1}\\), with \\(\\omega^+, \\omega^- \\geq 0\\). This is a standard LP with \\(2p\\) variables and \\(2p\\) constraints.'
                }
            ]
        },

        // ============================================================
        // SECTION 5: Gaussian Graphical Models
        // ============================================================
        {
            id: 'ch16-sec05',
            title: 'Gaussian Graphical Models',
            content: `
                <h2>Gaussian Graphical Models</h2>

                <p>The results of the preceding sections have a beautiful interpretation in the language of <strong>graphical models</strong>. A Gaussian graphical model encodes the conditional independence structure of a multivariate Gaussian distribution as an undirected graph.</p>

                <h3>Undirected Graphical Models</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.20 (Gaussian Graphical Model)</div>
                    <div class="env-body">
                        <p>Let \\(G = (V, E)\\) be an undirected graph with vertex set \\(V = \\{1, \\ldots, p\\}\\) and edge set \\(E \\subseteq \\binom{V}{2}\\). A random vector \\(X \\sim N(\\mu, \\Sigma)\\) is said to be <strong>Markov with respect to \\(G\\)</strong> if
                        \\[(j, k) \\notin E \\quad \\Longrightarrow \\quad X_j \\perp\\!\\!\\!\\perp X_k \\mid X_{V \\setminus \\{j,k\\}}\\]
                        The <strong>Gaussian graphical model</strong> associated with \\(G\\) is the family of all Gaussian distributions Markov with respect to \\(G\\):
                        \\[\\mathcal{N}(G) = \\{N(\\mu, \\Sigma) : \\Sigma^{-1}_{jk} = 0 \\text{ for all } (j,k) \\notin E\\}\\]</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-graph-model"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Graph Terminology)</div>
                    <div class="env-body">
                        <p>In the conditional independence graph:</p>
                        <ul>
                            <li><strong>Nodes</strong> represent random variables \\(X_1, \\ldots, X_p\\)</li>
                            <li><strong>Edges</strong> represent direct conditional dependencies (nonzero entries of \\(\\Omega\\))</li>
                            <li><strong>Absent edges</strong> represent conditional independence</li>
                            <li>The <strong>neighborhood</strong> \\(\\text{ne}(j)\\) of node \\(j\\) is the set of nodes connected to \\(j\\) by an edge</li>
                            <li>The <strong>degree</strong> of node \\(j\\) is \\(|\\text{ne}(j)|\\) = number of edges incident to \\(j\\)</li>
                        </ul>
                    </div>
                </div>

                <h3>Structure Learning: Graph Selection</h3>

                <p>The problem of <strong>structure learning</strong> or <strong>graph selection</strong> is to recover the edge set \\(E\\) from data. This is equivalent to identifying the support of the precision matrix: \\(\\text{supp}(\\Omega^*_{\\text{off}}) = \\{(j,k) : \\omega^*_{jk} \\neq 0, j \\neq k\\}\\).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.21 (Model Selection Consistency)</div>
                    <div class="env-body">
                        <p>An estimator \\(\\hat{E}\\) of the edge set is <strong>model selection consistent</strong> (or <strong>sparsistent</strong>) if
                        \\[P(\\hat{E} = E^*) \\to 1 \\quad \\text{as } n \\to \\infty\\]
                        where \\(E^* = \\{(j,k) : \\omega^*_{jk} \\neq 0\\}\\) is the true edge set.</p>
                    </div>
                </div>

                <h3>Neighborhood Selection (Meinshausen &amp; Bühlmann)</h3>

                <div class="env-block definition">
                    <div class="env-title">Algorithm 16.22 (Neighborhood Selection)</div>
                    <div class="env-body">
                        <p>For each node \\(j = 1, \\ldots, p\\):</p>
                        <ol>
                            <li>Regress \\(X_j\\) on \\(X_{-j} = (X_k)_{k \\neq j}\\) using the Lasso:
                            \\[\\hat{\\beta}^{(j)} = \\arg\\min_\\beta \\left\\{\\frac{1}{2n}\\|X_j - X_{-j}\\beta\\|_2^2 + \\lambda_n \\|\\beta\\|_1\\right\\}\\]</li>
                            <li>Estimate the neighborhood: \\(\\widehat{\\text{ne}}(j) = \\{k : \\hat{\\beta}^{(j)}_k \\neq 0\\}\\)</li>
                        </ol>
                        <p>Combine the \\(p\\) neighborhoods into a graph by either:</p>
                        <ul>
                            <li><strong>AND rule:</strong> \\((j,k) \\in \\hat{E}\\) iff \\(k \\in \\widehat{\\text{ne}}(j)\\) <em>and</em> \\(j \\in \\widehat{\\text{ne}}(k)\\)</li>
                            <li><strong>OR rule:</strong> \\((j,k) \\in \\hat{E}\\) iff \\(k \\in \\widehat{\\text{ne}}(j)\\) <em>or</em> \\(j \\in \\widehat{\\text{ne}}(k)\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 16.23 (Meinshausen &amp; Bühlmann, 2006)</div>
                    <div class="env-body">
                        <p>Under the following conditions:</p>
                        <ol>
                            <li><strong>Irrepresentability:</strong> For each \\(j\\), the relevant Lasso irrepresentability condition holds.</li>
                            <li><strong>Minimum signal:</strong> \\(\\min_{(j,k) \\in E^*} |\\omega^*_{jk}| \\geq C \\sqrt{\\log p / n}\\) for a sufficiently large constant \\(C\\).</li>
                            <li><strong>Growth condition:</strong> \\(\\log p = o(n)\\).</li>
                        </ol>
                        <p>Then neighborhood selection with the AND rule is model selection consistent:
                        \\[P(\\hat{E}_{\\text{AND}} = E^*) \\to 1\\]</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Irrepresentability Condition)</div>
                    <div class="env-body">
                        <p>The irrepresentability (or mutual incoherence) condition requires that the "relevant" variables (true neighbors) are not too well predicted by the "irrelevant" variables (non-neighbors). Formally, for the Lasso regression of \\(X_j\\) on \\(X_{-j}\\), if \\(S_j = \\text{ne}(j)\\) is the true support, then
                        \\[\\|\\Sigma_{S_j^c, S_j} \\Sigma_{S_j, S_j}^{-1}\\|_{\\infty} \\leq 1 - \\alpha\\]
                        for some \\(\\alpha &gt; 0\\). This is the same condition encountered in Lasso theory (Chapter 8).</p>
                    </div>
                </div>

                <h3>Selection Consistency of the Graphical Lasso</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 16.24 (Ravikumar, Wainwright, Raskutti &amp; Yu, 2011)</div>
                    <div class="env-body">
                        <p>Assume:</p>
                        <ol>
                            <li><strong>Irrepresentability:</strong> The Hessian of the graphical lasso at \\(\\Omega^*\\) satisfies an irrepresentability condition.</li>
                            <li><strong>Bounded eigenvalues:</strong> \\(0 &lt; \\kappa_{\\min} \\leq \\lambda_{\\min}(\\Sigma^*) \\leq \\lambda_{\\max}(\\Sigma^*) \\leq \\kappa_{\\max} &lt; \\infty\\).</li>
                            <li><strong>Minimum signal:</strong> \\(\\min_{(j,k) \\in E^*} |\\omega^*_{jk}| \\geq C\\lambda\\).</li>
                        </ol>
                        <p>Then with \\(\\lambda \\asymp \\sqrt{\\log p / n}\\) and \\(n \\geq C d^2 \\log p\\) (where \\(d = \\max_j |\\text{ne}(j)|\\) is the maximum degree), the graphical lasso is model selection consistent:
                        \\[P\\left(\\text{supp}(\\hat{\\Omega}_{\\lambda, \\text{off}}) = \\text{supp}(\\Omega^*_{\\text{off}})\\right) \\to 1\\]</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 16.25 (Chain Graph)</div>
                    <div class="env-body">
                        <p>Consider the <strong>chain graph</strong> where \\(\\Omega^*\\) is tridiagonal:
                        \\[\\omega^*_{jk} = \\begin{cases} 1 & \\text{if } j = k \\\\ -\\rho & \\text{if } |j - k| = 1 \\\\ 0 & \\text{otherwise} \\end{cases}\\]
                        for \\(|\\rho| &lt; 1/2\\). This corresponds to an AR(1) model. The maximum degree is \\(d = 2\\) (except at the endpoints). The sample size requirement for structure recovery is \\(n \\geq C \\log p\\), which is nearly dimension-free. Both neighborhood selection and the graphical lasso can recover this chain structure consistently.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 16.26 (Information-Theoretic Lower Bound)</div>
                    <div class="env-body">
                        <p>For the class of Gaussian graphical models with maximum degree \\(d\\) and minimum signal strength \\(\\theta_{\\min}\\), any estimator \\(\\hat{E}\\) requires
                        \\[n \\geq C \\cdot \\frac{\\log(p - d)}{\\theta_{\\min}^2}\\]
                        observations for model selection consistency. This shows that the \\(n \\asymp d^2 \\log p\\) requirement of the graphical lasso (and neighborhood selection) is not far from optimal, at least in the dependence on \\(p\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Practical Considerations)</div>
                    <div class="env-body">
                        <p>In practice, several methods are used to select \\(\\lambda\\):</p>
                        <ul>
                            <li><strong>BIC (Bayesian Information Criterion):</strong> \\(\\text{BIC}(\\lambda) = -2\\ell(\\hat{\\Omega}_\\lambda) + |\\hat{E}_\\lambda| \\log n\\), where \\(|\\hat{E}_\\lambda|\\) counts the number of edges.</li>
                            <li><strong>StARS (Stability Approach to Regularization Selection):</strong> Subsample the data and choose \\(\\lambda\\) to achieve a target level of edge instability.</li>
                            <li><strong>Cross-validation:</strong> Minimize held-out negative log-likelihood.</li>
                        </ul>
                        <p>The extended BIC of Chen and Chen (2008), which uses a penalty \\(|\\hat{E}_\\lambda|(\\log n + 4\\gamma \\log p)\\) for \\(\\gamma \\in [0,1]\\), has been shown to be particularly effective in high dimensions.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-graph-model',
                    title: 'Gaussian Graphical Model: Edge Recovery',
                    description: 'The true conditional independence graph is shown. Increase the sample size n and watch as the estimated graph converges to the true one. Green edges are correctly recovered; red dashed edges are false positives; gray dashed edges are missing (false negatives).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 680, height: 420, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var W = viz.width, H = viz.height;

                        var p = 10;
                        var nSamples = 50;

                        // True graph structure: a sparse graph
                        var trueEdges = [
                            [0,1], [1,2], [2,3], [3,4],
                            [5,6], [6,7], [7,8], [8,9],
                            [0,5], [2,7], [4,9],
                            [1,6]
                        ];
                        var numTrueEdges = trueEdges.length;

                        // Assign signal strengths
                        var edgeStrengths = [];
                        var rng = (function(seed) {
                            var s = seed;
                            return function() { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
                        })(42);

                        for (var e = 0; e < trueEdges.length; e++) {
                            edgeStrengths.push(0.15 + rng() * 0.55);
                        }

                        // Node positions: two rows
                        var nodePos = [];
                        var startX = 60, gapX = 65;
                        for (var i = 0; i < 5; i++) {
                            nodePos.push([startX + i * gapX, 130]);
                        }
                        for (var i = 0; i < 5; i++) {
                            nodePos.push([startX + i * gapX, 280]);
                        }

                        VizEngine.createSlider(controls, 'n', 10, 500, nSamples, 10, function(v) {
                            nSamples = parseInt(v);
                            draw();
                        });

                        function edgeInList(a, b, list) {
                            for (var e = 0; e < list.length; e++) {
                                if ((list[e][0] === a && list[e][1] === b) ||
                                    (list[e][0] === b && list[e][1] === a)) return e;
                            }
                            return -1;
                        }

                        function getRecoveredEdges(n) {
                            // Simulate recovery: probability of detecting an edge depends on signal strength and n
                            // P(detect) ~ 1 - exp(-c * strength^2 * n / log(p))
                            var recovered = [];
                            var falsePos = [];

                            var rng2 = (function(seed) {
                                var s = seed;
                                return function() { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
                            })(n * 7 + 13);

                            for (var e = 0; e < trueEdges.length; e++) {
                                var prob = 1 - Math.exp(-0.5 * edgeStrengths[e] * edgeStrengths[e] * n / Math.log(p));
                                if (rng2() < prob) {
                                    recovered.push(trueEdges[e]);
                                }
                            }

                            // False positives: probability decreasing with n
                            var fpProb = Math.max(0, 0.3 - 0.001 * n);
                            var possibleFP = [[0,3], [1,8], [5,9], [3,6], [0,7]];
                            for (var f = 0; f < possibleFP.length; f++) {
                                if (rng2() < fpProb) {
                                    falsePos.push(possibleFP[f]);
                                }
                            }

                            return { recovered: recovered, falsePos: falsePos };
                        }

                        function draw() {
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, W, H);

                            var result = getRecoveredEdges(nSamples);
                            var recovered = result.recovered;
                            var falsePos = result.falsePos;

                            // --- Left: True graph ---
                            var offsetL = 0;
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('True Graph (\\u03A9* structure)', 190, 30);

                            // Draw true edges
                            for (var e = 0; e < trueEdges.length; e++) {
                                var a = trueEdges[e][0], b = trueEdges[e][1];
                                ctx.strokeStyle = '#58a6ff55';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(nodePos[a][0] + offsetL, nodePos[a][1]);
                                ctx.lineTo(nodePos[b][0] + offsetL, nodePos[b][1]);
                                ctx.stroke();
                            }

                            // Draw nodes
                            for (var i = 0; i < p; i++) {
                                ctx.fillStyle = '#1a1a40';
                                ctx.beginPath();
                                ctx.arc(nodePos[i][0] + offsetL, nodePos[i][1], 16, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.strokeStyle = '#58a6ff';
                                ctx.lineWidth = 2;
                                ctx.stroke();
                                ctx.fillStyle = '#f0f6fc';
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('X' + (i + 1), nodePos[i][0] + offsetL, nodePos[i][1]);
                            }

                            // --- Right: Estimated graph ---
                            var offsetR = 340;
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'alphabetic';
                            ctx.fillText('Estimated Graph (n = ' + nSamples + ')', 190 + offsetR, 30);

                            // Draw missing true edges (false negatives) as gray dashed
                            for (var e = 0; e < trueEdges.length; e++) {
                                var a = trueEdges[e][0], b = trueEdges[e][1];
                                if (edgeInList(a, b, recovered) === -1) {
                                    ctx.strokeStyle = '#6e768155';
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([4, 4]);
                                    ctx.beginPath();
                                    ctx.moveTo(nodePos[a][0] + offsetR, nodePos[a][1]);
                                    ctx.lineTo(nodePos[b][0] + offsetR, nodePos[b][1]);
                                    ctx.stroke();
                                    ctx.setLineDash([]);
                                }
                            }

                            // Draw recovered true edges (true positives) as green
                            for (var e = 0; e < recovered.length; e++) {
                                var a = recovered[e][0], b = recovered[e][1];
                                ctx.strokeStyle = '#3fb950';
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.moveTo(nodePos[a][0] + offsetR, nodePos[a][1]);
                                ctx.lineTo(nodePos[b][0] + offsetR, nodePos[b][1]);
                                ctx.stroke();
                            }

                            // Draw false positives as red dashed
                            for (var f = 0; f < falsePos.length; f++) {
                                var a = falsePos[f][0], b = falsePos[f][1];
                                ctx.strokeStyle = '#f85149';
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                ctx.moveTo(nodePos[a][0] + offsetR, nodePos[a][1]);
                                ctx.lineTo(nodePos[b][0] + offsetR, nodePos[b][1]);
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }

                            // Draw nodes for estimated graph
                            for (var i = 0; i < p; i++) {
                                ctx.fillStyle = '#1a1a40';
                                ctx.beginPath();
                                ctx.arc(nodePos[i][0] + offsetR, nodePos[i][1], 16, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.strokeStyle = '#58a6ff';
                                ctx.lineWidth = 2;
                                ctx.stroke();
                                ctx.fillStyle = '#f0f6fc';
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('X' + (i + 1), nodePos[i][0] + offsetR, nodePos[i][1]);
                            }

                            // Legend and stats
                            var TP = recovered.length;
                            var FP = falsePos.length;
                            var FN = numTrueEdges - TP;

                            ctx.textBaseline = 'alphabetic';
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';

                            var ly = 340;
                            ctx.fillStyle = '#3fb950';
                            ctx.fillRect(offsetR + 20, ly, 12, 12);
                            ctx.fillText('True Positive (TP): ' + TP, offsetR + 38, ly + 10);

                            ctx.fillStyle = '#f85149';
                            ctx.fillRect(offsetR + 20, ly + 18, 12, 12);
                            ctx.fillText('False Positive (FP): ' + FP, offsetR + 38, ly + 28);

                            ctx.fillStyle = '#6e7681';
                            ctx.fillRect(offsetR + 20, ly + 36, 12, 12);
                            ctx.fillText('False Negative (FN): ' + FN, offsetR + 38, ly + 46);

                            // F1 score
                            var precision = TP > 0 ? TP / (TP + FP) : 0;
                            var recall = TP > 0 ? TP / (TP + FN) : 0;
                            var f1 = (precision + recall) > 0 ? 2 * precision * recall / (precision + recall) : 0;

                            ctx.fillStyle = '#3fb9a0';
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.fillText('Precision: ' + precision.toFixed(2) + '  Recall: ' + recall.toFixed(2) + '  F1: ' + f1.toFixed(2), offsetR + 20, ly + 68);

                            // Title annotation
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Increase n to improve edge recovery', W / 2, H - 10);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: []
        }
    ]
});
