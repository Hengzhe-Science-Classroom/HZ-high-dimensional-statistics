window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch12',
    number: 12,
    title: 'Debiased Lasso & HD Inference',
    subtitle: 'Confidence intervals in high-dimensional regression',
    sections: [
        // ============================================================
        // SECTION 1: The Bias Problem
        // ============================================================
        {
            id: 'ch12-sec01',
            title: 'The Bias Problem',
            content: `
                <h2>The Bias Problem</h2>

                <p>In classical low-dimensional regression, the ordinary least squares (OLS) estimator \\(\\hat{\\beta}^{\\mathrm{OLS}} = (X^\\top X)^{-1}X^\\top y\\) is <strong>unbiased</strong>: \\(\\mathbb{E}[\\hat{\\beta}^{\\mathrm{OLS}}] = \\beta^*\\). This unbiasedness is the foundation of classical statistical inference &mdash; it enables us to construct confidence intervals, perform hypothesis tests, and compute p-values. But in the high-dimensional setting where \\(p \\gg n\\), OLS does not even exist (the matrix \\(X^\\top X\\) is singular), and we must turn to regularized estimators like the Lasso.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.1 (Lasso Estimator)</div>
                    <div class="env-body">
                        <p>Consider the linear model \\(y = X\\beta^* + \\varepsilon\\) with \\(X \\in \\mathbb{R}^{n \\times p}\\), \\(\\varepsilon \\sim N(0, \\sigma^2 I_n)\\). The <strong>Lasso estimator</strong> is</p>
                        \\[\\hat{\\beta}^{\\mathrm{lasso}} = \\arg\\min_{\\beta \\in \\mathbb{R}^p} \\left\\{ \\frac{1}{2n} \\|y - X\\beta\\|_2^2 + \\lambda \\|\\beta\\|_1 \\right\\}.\\]
                    </div>
                </div>

                <p>The Lasso achieves excellent <em>prediction</em> and <em>estimation</em> properties under sparsity assumptions (as we saw in Chapter 8). However, it has a fundamental problem for <em>inference</em>: the \\(\\ell_1\\)-penalty introduces <strong>systematic shrinkage bias</strong>.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.1 (Lasso Bias &mdash; Informal)</div>
                    <div class="env-body">
                        <p>Under the compatibility condition and with \\(\\lambda \\asymp \\sigma\\sqrt{\\log p / n}\\), the Lasso satisfies</p>
                        \\[\\|\\hat{\\beta}^{\\mathrm{lasso}} - \\beta^*\\|_1 \\leq C \\cdot s \\cdot \\sigma \\sqrt{\\frac{\\log p}{n}},\\]
                        <p>but for each coordinate \\(j\\), the bias \\(\\mathbb{E}[\\hat{\\beta}^{\\mathrm{lasso}}_j] - \\beta^*_j\\) is of order \\(\\lambda \\cdot s / \\phi_0^2\\) in the worst case, which does <strong>not</strong> vanish at the \\(\\sqrt{n}\\) rate needed for asymptotic normality.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Why Lasso Shrinks</div>
                    <div class="env-body">
                        <p>The KKT conditions of the Lasso require \\(\\frac{1}{n}X_j^\\top(y - X\\hat{\\beta}^{\\mathrm{lasso}}) = \\lambda \\cdot \\mathrm{sign}(\\hat{\\beta}^{\\mathrm{lasso}}_j)\\) for active coordinates. This means the residual correlation is pinned at \\(\\pm \\lambda\\) rather than at zero. In OLS, by contrast, the residual is orthogonal to every column of \\(X\\). This nonzero correlation translates into bias.</p>
                        <p>Geometrically, the Lasso solution sits on the boundary of the \\(\\ell_1\\)-ball, not at the OLS minimum. The penalty "pulls" estimates toward zero, creating a bias that is proportional to \\(\\lambda\\).</p>
                    </div>
                </div>

                <h3>Consequences for Inference</h3>

                <p>To build a confidence interval for a single coordinate \\(\\beta^*_j\\), we need an estimator \\(\\hat{\\beta}_j\\) such that</p>
                \\[\\sqrt{n}(\\hat{\\beta}_j - \\beta^*_j) \\xrightarrow{d} N(0, V_j)\\]
                <p>for some known or estimable variance \\(V_j\\). The Lasso fails this requirement in two ways:</p>

                <ol>
                    <li><strong>Non-vanishing bias:</strong> The shrinkage bias is of order \\(\\lambda \\sim \\sqrt{\\log p/n}\\), so \\(\\sqrt{n} \\cdot \\mathrm{bias} \\sim \\sqrt{\\log p}\\), which diverges.</li>
                    <li><strong>Non-normal distribution:</strong> Due to the \\(\\ell_1\\)-penalty, the Lasso estimator has a non-regular, possibly mixed continuous-discrete distribution (point masses at zero for inactive coordinates).</li>
                </ol>

                <div class="env-block remark">
                    <div class="env-title">Remark: The Inference Gap</div>
                    <div class="env-body">
                        <p>The Lasso achieves near-optimal rates for <em>estimation</em> (in \\(\\ell_2\\) or prediction norm), but its coordinates cannot be directly used for <em>inference</em> (confidence intervals, hypothesis tests). Closing this gap is the central challenge of high-dimensional inference, and the <strong>debiased Lasso</strong> is one of the most elegant solutions.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-debias"></div>

                <div class="env-block example">
                    <div class="env-title">Example 12.1 (Observing the Bias)</div>
                    <div class="env-body">
                        <p>Suppose \\(n = 100\\), \\(p = 200\\), \\(s = 5\\), and \\(\\beta^*_1 = 3\\). With \\(\\lambda = \\sigma\\sqrt{2\\log p / n}\\), one typically observes \\(\\hat{\\beta}^{\\mathrm{lasso}}_1 \\approx 2.4\\) &mdash; the Lasso systematically underestimates the true parameter. Over 1000 simulations, the histogram of \\(\\hat{\\beta}^{\\mathrm{lasso}}_1\\) is centered around 2.4 rather than 3, confirming the shrinkage bias.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-debias',
                    title: 'Debiasing the Lasso: Shrinkage Correction',
                    description: 'The Lasso estimate (orange) is biased toward zero. The debiased estimate (blue) corrects this, centering on the true parameter. Adjust the signal strength to see how bias varies.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 420, scale: 40, originX: 350, originY: 350 });
                        var ctx = viz.ctx;

                        var signalStrength = 3.0;
                        var noiseLevel = 1.0;
                        var nSim = 80;

                        VizEngine.createSlider(controls, 'Signal strength |beta*|', 0.5, 6, 3.0, 0.1, function(v) {
                            signalStrength = parseFloat(v);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Noise sigma', 0.3, 3, 1.0, 0.1, function(v) {
                            noiseLevel = parseFloat(v);
                            draw();
                        });

                        // Simple seeded pseudo-random for reproducibility
                        function mulberry32(a) {
                            return function() {
                                a |= 0; a = a + 0x6D2B79F5 | 0;
                                var t = Math.imul(a ^ a >>> 15, 1 | a);
                                t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
                                return ((t ^ t >>> 14) >>> 0) / 4294967296;
                            };
                        }

                        function randn(rng) {
                            var u = rng(), v = rng();
                            return Math.sqrt(-2 * Math.log(u + 1e-10)) * Math.cos(2 * Math.PI * v);
                        }

                        function draw() {
                            viz.clear();
                            var rng = mulberry32(42);

                            var trueBeta = signalStrength;
                            // Simulate Lasso bias: beta_lasso approx = soft-threshold(beta* + noise, lambda)
                            var lambda = noiseLevel * Math.sqrt(2 * Math.log(200) / 100);

                            var lassoEsts = [];
                            var debiasedEsts = [];
                            for (var i = 0; i < nSim; i++) {
                                var noise = noiseLevel * randn(rng) * 0.3;
                                var raw = trueBeta + noise;
                                // Soft-thresholding to simulate Lasso shrinkage
                                var lassoEst = Math.sign(raw) * Math.max(Math.abs(raw) - lambda, 0);
                                // Debiased estimate: add back correction
                                var correction = lambda * Math.sign(lassoEst) + noiseLevel * randn(rng) * 0.15;
                                var debiasedEst = lassoEst + (lassoEst !== 0 ? correction : noise);

                                lassoEsts.push(lassoEst);
                                debiasedEsts.push(debiasedEst);
                            }

                            // Compute means
                            var lassoMean = lassoEsts.reduce(function(a, b) { return a + b; }, 0) / nSim;
                            var dbMean = debiasedEsts.reduce(function(a, b) { return a + b; }, 0) / nSim;

                            // Layout: horizontal axis is parameter value
                            var centerY = 200;
                            var xScale = 70; // pixels per unit
                            var xCenter = 350;

                            function toX(val) { return xCenter + val * xScale; }

                            // Background
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, 700, 420);

                            // Horizontal axis
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(30, centerY);
                            ctx.lineTo(670, centerY);
                            ctx.stroke();

                            // Tick marks
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var t = -4; t <= 6; t++) {
                                var tx = toX(t);
                                if (tx > 30 && tx < 670) {
                                    ctx.beginPath();
                                    ctx.moveTo(tx, centerY - 3);
                                    ctx.lineTo(tx, centerY + 3);
                                    ctx.stroke();
                                    ctx.fillText(t.toString(), tx, centerY + 6);
                                }
                            }

                            // Zero line
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(toX(0), 40);
                            ctx.lineTo(toX(0), centerY - 10);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.muted;
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('0', toX(0), 38);

                            // True parameter line
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            ctx.moveTo(toX(trueBeta), 50);
                            ctx.lineTo(toX(trueBeta), centerY - 5);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('beta* = ' + trueBeta.toFixed(1), toX(trueBeta), 48);

                            // Draw Lasso estimates (row 1: above axis)
                            var rowLasso = centerY - 55;
                            var rowDebias = centerY - 105;

                            // Lasso scatter
                            for (var i = 0; i < nSim; i++) {
                                var jitter = (mulberry32(i * 7 + 1)() - 0.5) * 20;
                                ctx.fillStyle = viz.colors.orange + '66';
                                ctx.beginPath();
                                ctx.arc(toX(lassoEsts[i]), rowLasso + jitter, 3, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Lasso mean
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(toX(lassoMean), rowLasso - 18);
                            ctx.lineTo(toX(lassoMean), rowLasso + 18);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('Lasso mean = ' + lassoMean.toFixed(2), toX(lassoMean), rowLasso - 22);

                            // Debiased scatter
                            for (var i = 0; i < nSim; i++) {
                                var jitter2 = (mulberry32(i * 13 + 3)() - 0.5) * 20;
                                ctx.fillStyle = viz.colors.blue + '66';
                                ctx.beginPath();
                                ctx.arc(toX(debiasedEsts[i]), rowDebias + jitter2, 3, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Debiased mean
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(toX(dbMean), rowDebias - 18);
                            ctx.lineTo(toX(dbMean), rowDebias + 18);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('Debiased mean = ' + dbMean.toFixed(2), toX(dbMean), rowDebias - 22);

                            // Bias arrow from Lasso mean to true
                            if (Math.abs(toX(trueBeta) - toX(lassoMean)) > 10) {
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath();
                                ctx.moveTo(toX(lassoMean), rowLasso + 25);
                                ctx.lineTo(toX(trueBeta), rowLasso + 25);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                var biasVal = Math.abs(trueBeta - lassoMean);
                                ctx.fillStyle = viz.colors.red;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textBaseline = 'top';
                                ctx.fillText('bias = ' + biasVal.toFixed(2), (toX(lassoMean) + toX(trueBeta)) / 2, rowLasso + 28);
                            }

                            // Labels on left
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Debiased', 35, rowDebias);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Lasso', 35, rowLasso);

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Lasso Shrinkage Bias vs. Debiased Correction', 350, 10);

                            // Lambda info
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('lambda = ' + lambda.toFixed(3) + '  (n=100, p=200, sigma=' + noiseLevel.toFixed(1) + ')', 350, 395);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Consider the univariate soft-thresholding estimator \\(\\hat{\\beta} = \\mathrm{sign}(z)(|z| - \\lambda)_+\\) where \\(z = \\beta^* + \\varepsilon\\), \\(\\varepsilon \\sim N(0,1)\\). Show that \\(\\mathbb{E}[\\hat{\\beta}] \\neq \\beta^*\\) whenever \\(\\lambda &gt; 0\\), and characterize the direction of the bias.',
                    hint: 'Write \\(\\mathbb{E}[\\hat{\\beta}] = \\mathbb{E}[\\mathrm{sign}(z)(|z| - \\lambda)_+]\\) and note that the soft-thresholding operator always pulls toward zero.',
                    solution: 'We have \\(\\mathbb{E}[\\hat{\\beta}] = \\mathbb{E}[z \\cdot \\mathbf{1}_{|z| &gt; \\lambda}] - \\lambda \\, \\mathbb{E}[\\mathrm{sign}(z) \\cdot \\mathbf{1}_{|z| &gt; \\lambda}]\\). The first term equals \\(\\beta^* \\cdot P(|z| &gt; \\lambda) + \\) correction terms from the truncated normal. The second term subtracts \\(\\lambda\\) times the expected sign on the active region. When \\(\\beta^* &gt; 0\\), the sign is predominantly positive, so the second term subtracts a positive quantity, giving \\(\\mathbb{E}[\\hat{\\beta}] &lt; \\beta^*\\). Symmetrically, when \\(\\beta^* &lt; 0\\), \\(\\mathbb{E}[\\hat{\\beta}] &gt; \\beta^*\\). In both cases, the bias is toward zero: \\(|\\mathbb{E}[\\hat{\\beta}]| &lt; |\\beta^*|\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Debiased Lasso Construction
        // ============================================================
        {
            id: 'ch12-sec02',
            title: 'Debiased Lasso Construction',
            content: `
                <h2>Debiased Lasso Construction</h2>

                <p>The key idea of the <strong>debiased Lasso</strong> (also called the <strong>desparsified Lasso</strong>) is to add a one-step correction to the Lasso that removes the shrinkage bias, at the cost of slightly increased variance.</p>

                <h3>The One-Step Correction</h3>

                <p>Start from the KKT conditions. For the true parameter \\(\\beta^*\\), we have \\(y = X\\beta^* + \\varepsilon\\), so</p>
                \\[\\hat{\\beta}^{\\mathrm{lasso}} - \\beta^* = \\hat{\\beta}^{\\mathrm{lasso}} - \\beta^* + 0.\\]
                <p>Adding and subtracting \\(\\frac{1}{n}\\Theta X^\\top(y - X\\hat{\\beta}^{\\mathrm{lasso}})\\) for some matrix \\(\\Theta \\in \\mathbb{R}^{p \\times p}\\):</p>
                \\[\\hat{\\beta}^{\\mathrm{lasso}} + \\frac{1}{n}\\Theta X^\\top(y - X\\hat{\\beta}^{\\mathrm{lasso}}) - \\beta^* = \\left(I_p - \\frac{1}{n}\\Theta X^\\top X\\right)(\\hat{\\beta}^{\\mathrm{lasso}} - \\beta^*) + \\frac{1}{n}\\Theta X^\\top \\varepsilon.\\]

                <div class="env-block definition">
                    <div class="env-title">Definition 12.2 (Debiased Lasso Estimator)</div>
                    <div class="env-body">
                        <p>Given the Lasso estimator \\(\\hat{\\beta}^{\\mathrm{lasso}}\\) and an approximate inverse \\(\\hat{\\Theta}\\) of the sample Gram matrix \\(\\hat{\\Sigma} = X^\\top X / n\\), the <strong>debiased Lasso estimator</strong> is</p>
                        \\[\\hat{\\beta}^{\\mathrm{db}} = \\hat{\\beta}^{\\mathrm{lasso}} + \\frac{1}{n}\\hat{\\Theta} X^\\top (y - X\\hat{\\beta}^{\\mathrm{lasso}}).\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Score-Based Correction</div>
                    <div class="env-body">
                        <p>The term \\(\\frac{1}{n}X^\\top(y - X\\hat{\\beta}^{\\mathrm{lasso}})\\) is the <strong>score</strong> (gradient of the loss) at the Lasso solution. In classical statistics, the score at the MLE is exactly zero. For the Lasso, the score is nonzero due to the penalty &mdash; it equals \\(\\lambda \\cdot \\hat{z}\\) where \\(\\hat{z}\\) is a subgradient of \\(\\|\\cdot\\|_1\\). The correction \\(\\hat{\\Theta} \\cdot (\\text{score})\\) is analogous to a <strong>one-step Newton update</strong>, using \\(\\hat{\\Theta}\\) as an approximate inverse Hessian.</p>
                    </div>
                </div>

                <h3>The Decomposition</h3>

                <p>Substituting \\(y = X\\beta^* + \\varepsilon\\):</p>
                \\[\\hat{\\beta}^{\\mathrm{db}} - \\beta^* = \\underbrace{\\frac{1}{n}\\hat{\\Theta} X^\\top \\varepsilon}_{\\text{noise term}} + \\underbrace{\\left(I_p - \\frac{1}{n}\\hat{\\Theta} X^\\top X\\right)(\\hat{\\beta}^{\\mathrm{lasso}} - \\beta^*)}_{\\text{remainder / bias term}}.\\]

                <p>The magic: if \\(\\hat{\\Theta}\\) is chosen so that \\(\\hat{\\Theta} \\hat{\\Sigma} \\approx I_p\\) (i.e., \\(\\hat{\\Theta}\\) approximates \\(\\hat{\\Sigma}^{-1}\\)), then the remainder term is a product of two small quantities:</p>
                <ul>
                    <li>\\(\\|I_p - \\hat{\\Theta}\\hat{\\Sigma}\\|_\\infty\\) &mdash; how well \\(\\hat{\\Theta}\\) inverts \\(\\hat{\\Sigma}\\);</li>
                    <li>\\(\\|\\hat{\\beta}^{\\mathrm{lasso}} - \\beta^*\\|_1\\) &mdash; the Lasso estimation error.</li>
                </ul>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 12.1 (Remainder Bound)</div>
                    <div class="env-body">
                        <p>For each coordinate \\(j\\),</p>
                        \\[\\left|(\\hat{\\beta}^{\\mathrm{db}}_j - \\beta^*_j) - \\frac{1}{n}\\hat{\\Theta}_j^\\top X^\\top \\varepsilon\\right| \\leq \\|e_j^\\top(I_p - \\hat{\\Theta}\\hat{\\Sigma})\\|_\\infty \\cdot \\|\\hat{\\beta}^{\\mathrm{lasso}} - \\beta^*\\|_1,\\]
                        <p>where \\(\\hat{\\Theta}_j\\) denotes the \\(j\\)-th row of \\(\\hat{\\Theta}\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.2 (Debiasing Works)</div>
                    <div class="env-body">
                        <p>Suppose:</p>
                        <ol>
                            <li>\\(\\|\\hat{\\beta}^{\\mathrm{lasso}} - \\beta^*\\|_1 = O_P(s\\sqrt{\\log p / n})\\) (Lasso \\(\\ell_1\\)-rate);</li>
                            <li>\\(\\max_j \\|e_j^\\top(I_p - \\hat{\\Theta}\\hat{\\Sigma})\\|_\\infty = O_P(\\sqrt{\\log p / n})\\).</li>
                        </ol>
                        <p>Then the remainder satisfies</p>
                        \\[\\sqrt{n} \\cdot |\\text{remainder}_j| = O_P\\left(s \\cdot \\frac{\\log p}{n}\\right) = o_P(1)\\]
                        <p>provided \\(s \\log p / n \\to 0\\). The dominant term \\(\\frac{1}{\\sqrt{n}}\\hat{\\Theta}_j^\\top X^\\top \\varepsilon\\) is asymptotically Gaussian.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: The Sparsity Condition</div>
                    <div class="env-body">
                        <p>The condition \\(s \\log p / n \\to 0\\) (or equivalently \\(s = o(n / \\log p)\\)) is <strong>stronger</strong> than the condition \\(s \\log p / n = O(1)\\) needed for Lasso consistency. Debiased inference requires a slightly more stringent sparsity assumption. This is the price we pay for obtaining distributional results rather than mere point estimation bounds.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.2 (The Correction in Action)</div>
                    <div class="env-body">
                        <p>Consider \\(n = 200\\), \\(p = 500\\), \\(s = 3\\). With \\(\\beta^* = (2, -1, 1.5, 0, \\ldots, 0)^\\top\\):</p>
                        <ul>
                            <li>Lasso gives \\(\\hat{\\beta}^{\\mathrm{lasso}}_1 \\approx 1.7\\) (biased toward 0)</li>
                            <li>The score correction is \\(\\frac{1}{n}\\hat{\\Theta}_1^\\top X^\\top(y - X\\hat{\\beta}^{\\mathrm{lasso}}) \\approx 0.28\\)</li>
                            <li>Debiased: \\(\\hat{\\beta}^{\\mathrm{db}}_1 \\approx 1.98\\) (close to \\(\\beta^*_1 = 2\\))</li>
                        </ul>
                        <p>The correction "adds back" what the penalty removed.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that if \\(\\hat{\\Theta} = \\hat{\\Sigma}^{-1}\\) (the exact inverse, when it exists), then the debiased Lasso reduces to the OLS estimator. Why can we not use \\(\\hat{\\Sigma}^{-1}\\) in the high-dimensional setting?',
                    hint: 'Substitute \\(\\hat{\\Theta} = (X^\\top X / n)^{-1}\\) into the debiased formula and simplify.',
                    solution: 'With \\(\\hat{\\Theta} = \\hat{\\Sigma}^{-1}\\), we get \\(\\hat{\\beta}^{\\mathrm{db}} = \\hat{\\beta}^{\\mathrm{lasso}} + \\hat{\\Sigma}^{-1} \\cdot \\frac{1}{n}X^\\top(y - X\\hat{\\beta}^{\\mathrm{lasso}}) = \\hat{\\beta}^{\\mathrm{lasso}} + \\hat{\\Sigma}^{-1}(\\hat{\\Sigma}\\hat{\\beta}^{\\mathrm{OLS}} - \\hat{\\Sigma}\\hat{\\beta}^{\\mathrm{lasso}}) = \\hat{\\beta}^{\\mathrm{OLS}}\\). In high dimensions (\\(p &gt; n\\)), \\(\\hat{\\Sigma} = X^\\top X / n\\) is rank-deficient and not invertible. We need an <em>approximate</em> inverse \\(\\hat{\\Theta}\\) that can be constructed even when \\(p \\gg n\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Node-Wise Regression
        // ============================================================
        {
            id: 'ch12-sec03',
            title: 'Node-Wise Regression',
            content: `
                <h2>Node-Wise Regression: Constructing \\(\\hat{\\Theta}\\)</h2>

                <p>The debiased Lasso requires an approximate inverse \\(\\hat{\\Theta}\\) of \\(\\hat{\\Sigma} = X^\\top X / n\\). The <strong>node-wise Lasso</strong> (introduced by Meinshausen and Buhlmann, later refined by van de Geer et al.) provides an elegant, coordinate-by-coordinate construction.</p>

                <h3>The Idea</h3>

                <p>To compute the \\(j\\)-th row of \\(\\hat{\\Theta}\\), we regress \\(X_j\\) (the \\(j\\)-th column of \\(X\\)) on all other columns \\(X_{-j}\\) using the Lasso:</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.3 (Node-Wise Lasso)</div>
                    <div class="env-body">
                        <p>For each \\(j = 1, \\ldots, p\\), solve</p>
                        \\[\\hat{\\gamma}_j = \\arg\\min_{\\gamma \\in \\mathbb{R}^{p-1}} \\left\\{ \\frac{1}{2n}\\|X_j - X_{-j}\\gamma\\|_2^2 + \\lambda_j \\|\\gamma\\|_1 \\right\\},\\]
                        <p>and define the residual variance</p>
                        \\[\\hat{\\tau}_j^2 = \\frac{1}{n}\\|X_j - X_{-j}\\hat{\\gamma}_j\\|_2^2 + \\lambda_j \\|\\hat{\\gamma}_j\\|_1.\\]
                        <p>The \\(j\\)-th row of \\(\\hat{\\Theta}\\) is then set as</p>
                        \\[\\hat{\\Theta}_j = \\frac{1}{\\hat{\\tau}_j^2}(e_j - \\hat{\\gamma}_j^{(-j)}),\\]
                        <p>where \\(\\hat{\\gamma}_j^{(-j)} \\in \\mathbb{R}^p\\) inserts the entries of \\(\\hat{\\gamma}_j\\) with a zero in position \\(j\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Partial Correlations</div>
                    <div class="env-body">
                        <p>In the Gaussian graphical model setting, the precision matrix \\(\\Theta = \\Sigma^{-1}\\) encodes <strong>conditional independence</strong>: \\(\\Theta_{jk} = 0\\) if and only if \\(X_j \\perp\\!\\!\\!\\perp X_k \\mid X_{-jk}\\). The node-wise regression estimates the <em>partial regression coefficients</em> of \\(X_j\\) on \\(X_{-j}\\), which are precisely the (rescaled) entries of the \\(j\\)-th row of \\(\\Theta\\).</p>
                        <p>The normalization by \\(\\hat{\\tau}_j^2\\) ensures the correct scaling. Intuitively, \\(\\hat{\\tau}_j^2\\) estimates the conditional variance of \\(X_j\\) given all other variables.</p>
                    </div>
                </div>

                <h3>Why This Works</h3>

                <p>Consider the population version. If \\(X \\sim N(0, \\Sigma)\\), then the best linear predictor of \\(X_j\\) from \\(X_{-j}\\) has coefficients</p>
                \\[\\gamma_j^* = \\Sigma_{-j,-j}^{-1} \\Sigma_{-j,j}.\\]
                <p>The Schur complement formula gives</p>
                \\[\\Theta_{jj} = (\\Sigma_{jj} - \\Sigma_{j,-j}\\Sigma_{-j,-j}^{-1}\\Sigma_{-j,j})^{-1} = \\frac{1}{\\tau_j^{*2}},\\]
                <p>and for \\(k \\neq j\\),</p>
                \\[\\Theta_{jk} = -\\Theta_{jj} \\cdot \\gamma_{j,k}^* = -\\frac{\\gamma_{j,k}^*}{\\tau_j^{*2}}.\\]
                <p>The node-wise Lasso simply replaces the population quantities with their Lasso-based estimates.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.3 (Node-Wise Approximation Quality)</div>
                    <div class="env-body">
                        <p>Assume the rows of \\(X\\) are i.i.d. sub-Gaussian with covariance \\(\\Sigma\\) such that \\(\\Theta = \\Sigma^{-1}\\) has row-sparsity \\(s_\\Theta = \\max_j |\\{k : \\Theta_{jk} \\neq 0\\}|\\). With \\(\\lambda_j \\asymp \\sqrt{\\log p / n}\\), the node-wise estimator satisfies</p>
                        \\[\\max_{j} \\|e_j^\\top(I_p - \\hat{\\Theta}\\hat{\\Sigma})\\|_\\infty = O_P\\left(s_\\Theta \\sqrt{\\frac{\\log p}{n}}\\right),\\]
                        <p>and</p>
                        \\[\\max_j \\|\\hat{\\Theta}_j - \\Theta_j\\|_1 = O_P\\left(s_\\Theta \\sqrt{\\frac{\\log p}{n}}\\right).\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>For each \\(j\\), the node-wise Lasso regression of \\(X_j\\) on \\(X_{-j}\\) satisfies the usual Lasso guarantees (from Chapter 8), giving \\(\\|\\hat{\\gamma}_j - \\gamma_j^*\\|_1 = O_P(s_j \\sqrt{\\log p / n})\\) where \\(s_j\\) is the sparsity of the \\(j\\)-th row of \\(\\Theta\\). The key identity is</p>
                        \\[e_j^\\top(I_p - \\hat{\\Theta}\\hat{\\Sigma}) = \\frac{1}{\\hat{\\tau}_j^2}\\left(\\hat{\\Sigma}_{j,\\cdot} - \\hat{\\gamma}_j^{(-j)\\top}\\hat{\\Sigma} - \\hat{\\tau}_j^2 e_j^\\top\\right).\\]
                        <p>The term in parentheses relates to the KKT conditions of the node-wise Lasso, and its \\(\\ell_\\infty\\)-norm is bounded by \\(\\lambda_j\\). Combined with the \\(\\ell_1\\)-consistency of \\(\\hat{\\gamma}_j\\), this yields the stated bound.</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <h3>Computational Cost</h3>

                <p>The node-wise Lasso requires solving \\(p\\) separate Lasso problems, each of size \\(n \\times (p-1)\\). While this is \\(p\\) times the cost of a single Lasso, each subproblem can be solved in parallel. For inference on a <em>single</em> coordinate \\(\\beta^*_j\\), only the \\(j\\)-th node-wise regression is needed, reducing the cost to a single additional Lasso.</p>

                <div class="env-block remark">
                    <div class="env-title">Remark: Alternative Constructions</div>
                    <div class="env-body">
                        <p>Several alternative approaches exist for constructing \\(\\hat{\\Theta}\\):</p>
                        <ul>
                            <li><strong>CLIME</strong> (Cai, Liu, Luo): minimize \\(\\|\\Theta\\|_1\\) subject to \\(\\|\\hat{\\Sigma}\\Theta - I\\|_\\infty \\leq \\lambda\\);</li>
                            <li><strong>Graphical Lasso</strong> approach: use the inverse of the graphical Lasso estimate of \\(\\Sigma\\);</li>
                            <li><strong>Direct row-by-row inversion</strong>: for each \\(j\\), solve \\(\\min \\|\\theta\\|_1\\) subject to \\(\\|\\hat{\\Sigma}\\theta - e_j\\|_\\infty \\leq \\mu\\).</li>
                        </ul>
                        <p>The node-wise Lasso has the advantage of being easy to implement and analyze, and directly connects to the precision matrix structure.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'In the node-wise regression for coordinate \\(j\\), explain why we use the "relaxed" residual variance \\(\\hat{\\tau}_j^2 = \\frac{1}{n}\\|X_j - X_{-j}\\hat{\\gamma}_j\\|_2^2 + \\lambda_j\\|\\hat{\\gamma}_j\\|_1\\) instead of just \\(\\frac{1}{n}\\|X_j - X_{-j}\\hat{\\gamma}_j\\|_2^2\\).',
                    hint: 'Consider the KKT conditions and think about what happens when you multiply \\(\\hat{\\Theta}_j\\) by \\(\\hat{\\Sigma}\\).',
                    solution: 'The addition of \\(\\lambda_j\\|\\hat{\\gamma}_j\\|_1\\) ensures that the approximate inversion property \\(\\hat{\\Theta}_j^\\top \\hat{\\Sigma} \\approx e_j^\\top\\) holds. Without it, the scaling would be wrong: the squared residual \\(\\frac{1}{n}\\|X_j - X_{-j}\\hat{\\gamma}_j\\|_2^2\\) underestimates the conditional variance because the Lasso residuals are "too small" (the Lasso overfits the in-sample prediction). The correction \\(\\lambda_j\\|\\hat{\\gamma}_j\\|_1\\) accounts for the bias in the residual sum of squares, analogous to the degrees-of-freedom correction in classical regression. Formally, by the KKT conditions, \\(\\hat{\\tau}_j^2 = \\hat{\\gamma}_j^\\top \\hat{\\Sigma}_{-j,-j} \\hat{\\gamma}_j - 2\\hat{\\gamma}_j^\\top \\hat{\\Sigma}_{-j,j} + \\hat{\\Sigma}_{jj}\\), which equals the \\((j,j)\\)-entry of \\(\\hat{\\Theta}^{-1}\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Asymptotic Normality & Confidence Intervals
        // ============================================================
        {
            id: 'ch12-sec04',
            title: 'Asymptotic Normality & CIs',
            content: `
                <h2>Asymptotic Normality &amp; Confidence Intervals</h2>

                <p>We now state the main distributional result for the debiased Lasso and show how to construct valid confidence intervals for individual coordinates of \\(\\beta^*\\).</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.4 (Asymptotic Normality of the Debiased Lasso &mdash; van de Geer et al., 2014)</div>
                    <div class="env-body">
                        <p>Assume:</p>
                        <ol>
                            <li>\\(y = X\\beta^* + \\varepsilon\\) with \\(\\varepsilon \\sim N(0, \\sigma^2 I_n)\\);</li>
                            <li>\\(\\beta^*\\) is \\(s\\)-sparse and \\(\\Theta = \\Sigma^{-1}\\) has row-sparsity \\(s_\\Theta\\);</li>
                            <li>The compatibility condition holds for \\(X\\);</li>
                            <li>\\(s \\cdot s_\\Theta \\cdot (\\log p)^2 / n \\to 0\\).</li>
                        </ol>
                        <p>Then for each coordinate \\(j = 1, \\ldots, p\\):</p>
                        \\[\\frac{\\sqrt{n}(\\hat{\\beta}^{\\mathrm{db}}_j - \\beta^*_j)}{\\sigma \\sqrt{\\hat{\\Theta}_j^\\top \\hat{\\Sigma} \\hat{\\Theta}_j}} \\xrightarrow{d} N(0, 1).\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Outline</div>
                    <div class="env-body">
                        <p><strong>Step 1:</strong> Decompose the error as</p>
                        \\[\\hat{\\beta}^{\\mathrm{db}}_j - \\beta^*_j = \\underbrace{\\frac{1}{n}\\hat{\\Theta}_j^\\top X^\\top \\varepsilon}_{W_j} + \\underbrace{e_j^\\top(I_p - \\hat{\\Theta}\\hat{\\Sigma})(\\hat{\\beta}^{\\mathrm{lasso}} - \\beta^*)}_{R_j}.\\]

                        <p><strong>Step 2:</strong> The remainder satisfies \\(|R_j| \\leq \\|e_j^\\top(I_p - \\hat{\\Theta}\\hat{\\Sigma})\\|_\\infty \\cdot \\|\\hat{\\beta}^{\\mathrm{lasso}} - \\beta^*\\|_1\\). By Theorem 12.3, the first factor is \\(O_P(s_\\Theta \\sqrt{\\log p / n})\\). By the Lasso \\(\\ell_1\\)-bound, the second is \\(O_P(s\\sqrt{\\log p / n})\\). Hence \\(\\sqrt{n}|R_j| = O_P(s \\cdot s_\\Theta \\cdot \\log p / \\sqrt{n}) = o_P(1)\\).</p>

                        <p><strong>Step 3:</strong> The leading term \\(W_j = \\frac{1}{n}\\hat{\\Theta}_j^\\top X^\\top \\varepsilon\\) is a linear combination of Gaussian random variables. Conditional on \\(X\\), it has distribution \\(N(0, \\sigma^2 \\hat{\\Theta}_j^\\top \\hat{\\Sigma} \\hat{\\Theta}_j / n)\\). By concentration of \\(\\hat{\\Sigma}\\) around \\(\\Sigma\\), this variance converges to \\(\\sigma^2 \\Theta_j^\\top \\Sigma \\Theta_j / n = \\sigma^2 \\Theta_{jj} / n\\).</p>

                        <p><strong>Step 4:</strong> Combine: \\(\\sqrt{n}(\\hat{\\beta}^{\\mathrm{db}}_j - \\beta^*_j) = \\sqrt{n} W_j + \\sqrt{n} R_j\\). The first term is \\(N(0, \\sigma^2 \\Theta_{jj})\\) asymptotically, and the second is \\(o_P(1)\\). By Slutsky's theorem, their sum converges to \\(N(0, \\sigma^2 \\Theta_{jj})\\).</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <h3>Confidence Intervals</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.4 (Debiased Lasso Confidence Interval)</div>
                    <div class="env-body">
                        <p>A \\((1-\\alpha)\\)-level confidence interval for \\(\\beta^*_j\\) is</p>
                        \\[\\mathrm{CI}_j(\\alpha) = \\left[\\hat{\\beta}^{\\mathrm{db}}_j \\pm z_{\\alpha/2} \\cdot \\hat{\\sigma} \\cdot \\sqrt{\\frac{\\hat{\\Theta}_j^\\top \\hat{\\Sigma} \\hat{\\Theta}_j}{n}}\\right],\\]
                        <p>where \\(z_{\\alpha/2}\\) is the \\((1 - \\alpha/2)\\)-quantile of the standard normal, and \\(\\hat{\\sigma}\\) is a consistent estimator of \\(\\sigma\\) (e.g., the scaled Lasso or cross-validation).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.5 (Honest Coverage)</div>
                    <div class="env-body">
                        <p>Under the conditions of Theorem 12.4, the confidence interval \\(\\mathrm{CI}_j(\\alpha)\\) achieves asymptotically honest coverage:</p>
                        \\[\\sup_{\\beta^* \\in \\mathcal{B}_0(s)} \\left|P(\\beta^*_j \\in \\mathrm{CI}_j(\\alpha)) - (1-\\alpha)\\right| \\to 0,\\]
                        <p>where \\(\\mathcal{B}_0(s) = \\{\\beta \\in \\mathbb{R}^p : \\|\\beta\\|_0 \\leq s\\}\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-coverage"></div>

                <h3>Variance Estimation</h3>

                <p>The confidence interval requires a consistent estimate of \\(\\sigma^2\\). Two common approaches:</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.5 (Variance Estimators)</div>
                    <div class="env-body">
                        <ol>
                            <li><strong>Scaled Lasso</strong> (Sun and Zhang): jointly estimate \\((\\beta, \\sigma)\\) by solving
                            \\[\\min_{\\beta, \\sigma &gt; 0} \\left\\{\\frac{\\|y - X\\beta\\|_2^2}{2n\\sigma} + \\frac{\\sigma}{2} + \\lambda\\|\\beta\\|_1\\right\\}.\\]</li>
                            <li><strong>Refitted residuals</strong>: let \\(\\hat{S} = \\mathrm{supp}(\\hat{\\beta}^{\\mathrm{lasso}})\\) and compute \\(\\hat{\\sigma}^2 = \\|y - X_{\\hat{S}}(X_{\\hat{S}}^\\top X_{\\hat{S}})^{-1}X_{\\hat{S}}^\\top y\\|_2^2 / (n - |\\hat{S}|)\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.3 (Hypothesis Testing)</div>
                    <div class="env-body">
                        <p>To test \\(H_0: \\beta^*_j = 0\\) vs. \\(H_1: \\beta^*_j \\neq 0\\) at level \\(\\alpha\\), compute the test statistic</p>
                        \\[T_j = \\frac{\\hat{\\beta}^{\\mathrm{db}}_j}{\\hat{\\sigma}\\sqrt{\\hat{\\Theta}_j^\\top \\hat{\\Sigma}\\hat{\\Theta}_j / n}}\\]
                        <p>and reject \\(H_0\\) if \\(|T_j| &gt; z_{\\alpha/2}\\). Under \\(H_0\\), \\(T_j \\xrightarrow{d} N(0,1)\\), so this gives asymptotically valid p-values.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: Variance of the Debiased Estimator</div>
                    <div class="env-body">
                        <p>The asymptotic variance of \\(\\sqrt{n}\\hat{\\beta}^{\\mathrm{db}}_j\\) is \\(\\sigma^2 \\Theta_{jj}\\). Note that \\(\\Theta_{jj} = 1/\\tau_j^{*2}\\) where \\(\\tau_j^{*2}\\) is the conditional variance of \\(X_j \\mid X_{-j}\\). This is always at least \\(1/\\Sigma_{jj}\\), and can be much larger when \\(X_j\\) is highly correlated with other covariates. This reflects the intuitive fact that inference is harder when covariates are strongly correlated.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-coverage',
                    title: 'Confidence Interval Coverage Simulation',
                    description: 'Simulating 200 datasets: each horizontal line is a 95% CI for beta*_1 from one dataset. Green lines cover the true value; red lines miss. Check that empirical coverage approaches 95%.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 480, scale: 40, originX: 350, originY: 240 });
                        var ctx = viz.ctx;

                        var trueBeta = 2.0;
                        var nDatasets = 200;
                        var nObs = 100;

                        VizEngine.createSlider(controls, 'True beta*_1', -3, 5, 2.0, 0.1, function(v) {
                            trueBeta = parseFloat(v);
                            draw();
                        });
                        VizEngine.createButton(controls, 'Re-simulate', function() {
                            seed += 100;
                            draw();
                        });

                        var seed = 12345;

                        function mulberry32(a) {
                            return function() {
                                a |= 0; a = a + 0x6D2B79F5 | 0;
                                var t = Math.imul(a ^ a >>> 15, 1 | a);
                                t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
                                return ((t ^ t >>> 14) >>> 0) / 4294967296;
                            };
                        }

                        function randn(rng) {
                            var u = rng(), v = rng();
                            return Math.sqrt(-2 * Math.log(u + 1e-10)) * Math.cos(2 * Math.PI * v);
                        }

                        function draw() {
                            viz.clear();
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, 700, 480);

                            var rng = mulberry32(seed);

                            // Simulation parameters
                            var sigma = 1.0;
                            // Approximate standard error for debiased Lasso
                            // In practice: sigma * sqrt(Theta_jj / n), assume Theta_jj ~ 1.2
                            var thetaJJ = 1.2;
                            var se = sigma * Math.sqrt(thetaJJ / nObs);
                            var z975 = 1.96;

                            // Generate CIs
                            var coverCount = 0;
                            var intervals = [];
                            for (var i = 0; i < nDatasets; i++) {
                                // Debiased estimate: beta* + noise (approximately normal)
                                var noise = se * randn(rng);
                                var est = trueBeta + noise;
                                var lo = est - z975 * se;
                                var hi = est + z975 * se;
                                var covers = (lo <= trueBeta && trueBeta <= hi);
                                if (covers) coverCount++;
                                intervals.push({ est: est, lo: lo, hi: hi, covers: covers });
                            }

                            var coverage = coverCount / nDatasets;

                            // Layout
                            var plotLeft = 80;
                            var plotRight = 650;
                            var plotTop = 50;
                            var plotBottom = 430;
                            var plotW = plotRight - plotLeft;
                            var plotH = plotBottom - plotTop;

                            // Find x-range
                            var allVals = [];
                            for (var i = 0; i < intervals.length; i++) {
                                allVals.push(intervals[i].lo, intervals[i].hi);
                            }
                            allVals.push(trueBeta);
                            var xMin = Math.min.apply(null, allVals) - 0.3;
                            var xMax = Math.max.apply(null, allVals) + 0.3;

                            function toX(val) { return plotLeft + (val - xMin) / (xMax - xMin) * plotW; }

                            // Draw true parameter line
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            ctx.moveTo(toX(trueBeta), plotTop);
                            ctx.lineTo(toX(trueBeta), plotBottom);
                            ctx.stroke();

                            // Show only a subset (up to 100) for visual clarity
                            var showN = Math.min(nDatasets, 100);
                            var step = Math.max(1, Math.floor(nDatasets / showN));
                            var yStep = plotH / showN;

                            var displayIdx = 0;
                            for (var i = 0; i < nDatasets && displayIdx < showN; i += step) {
                                var ci = intervals[i];
                                var y = plotTop + displayIdx * yStep + yStep / 2;
                                var color = ci.covers ? viz.colors.teal + 'aa' : viz.colors.red + 'cc';

                                // Draw CI line
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(toX(ci.lo), y);
                                ctx.lineTo(toX(ci.hi), y);
                                ctx.stroke();

                                // Draw point estimate
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.arc(toX(ci.est), y, 2, 0, Math.PI * 2);
                                ctx.fill();

                                displayIdx++;
                            }

                            // X-axis at bottom
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(plotLeft, plotBottom + 5);
                            ctx.lineTo(plotRight, plotBottom + 5);
                            ctx.stroke();

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            var tickStep = (xMax - xMin) > 4 ? 1 : 0.5;
                            for (var t = Math.ceil(xMin); t <= Math.floor(xMax); t += tickStep) {
                                var tx = toX(t);
                                ctx.beginPath();
                                ctx.moveTo(tx, plotBottom + 5);
                                ctx.lineTo(tx, plotBottom + 10);
                                ctx.stroke();
                                ctx.fillText(t.toFixed(1), tx, plotBottom + 12);
                            }

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('95% Debiased Lasso CIs (' + nDatasets + ' datasets, showing ' + showN + ')', 365, 8);

                            // Coverage text
                            var covColor = Math.abs(coverage - 0.95) < 0.03 ? viz.colors.green : viz.colors.orange;
                            ctx.fillStyle = covColor;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Empirical coverage: ' + (coverage * 100).toFixed(1) + '%  (nominal: 95%)', 365, 28);

                            // Legend
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('beta*_1 = ' + trueBeta.toFixed(1), toX(trueBeta) + 6, plotTop + 2);

                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.fillText('covers (' + coverCount + ')', plotRight, plotBottom + 30);

                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('misses (' + (nDatasets - coverCount) + ')', plotRight, plotBottom + 44);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Derive the asymptotic variance formula: show that \\(\\mathrm{Var}(\\frac{1}{n}\\hat{\\Theta}_j^\\top X^\\top \\varepsilon \\mid X) = \\frac{\\sigma^2}{n} \\hat{\\Theta}_j^\\top \\hat{\\Sigma} \\hat{\\Theta}_j\\).',
                    hint: 'Use the fact that \\(\\varepsilon \\sim N(0, \\sigma^2 I_n)\\) is independent of \\(X\\) and compute the conditional variance of the linear form.',
                    solution: 'Conditional on \\(X\\), the quantity \\(\\frac{1}{n}\\hat{\\Theta}_j^\\top X^\\top \\varepsilon\\) is a fixed linear combination of \\(\\varepsilon\\). Its variance is \\(\\frac{1}{n^2} \\hat{\\Theta}_j^\\top X^\\top \\mathrm{Var}(\\varepsilon) X \\hat{\\Theta}_j = \\frac{\\sigma^2}{n^2} \\hat{\\Theta}_j^\\top X^\\top X \\hat{\\Theta}_j = \\frac{\\sigma^2}{n} \\hat{\\Theta}_j^\\top \\hat{\\Sigma} \\hat{\\Theta}_j\\), where \\(\\hat{\\Sigma} = X^\\top X / n\\). As \\(n \\to \\infty\\), \\(\\hat{\\Sigma} \\to \\Sigma\\) in probability, so \\(\\hat{\\Theta}_j^\\top \\hat{\\Sigma} \\hat{\\Theta}_j \\to \\Theta_j^\\top \\Sigma \\Theta_j = e_j^\\top \\Theta \\Sigma \\Theta e_j = \\Theta_{jj}\\).'
                },
                {
                    question: 'Show that the width of the debiased Lasso confidence interval scales as \\(O(1/\\sqrt{n})\\), the same rate as in classical low-dimensional statistics. Why is this remarkable?',
                    hint: 'The CI width is \\(2 z_{\\alpha/2} \\hat{\\sigma} \\sqrt{\\hat{\\Theta}_j^\\top \\hat{\\Sigma} \\hat{\\Theta}_j / n}\\). What is the order of the remaining terms?',
                    solution: 'The CI half-width is \\(z_{\\alpha/2} \\cdot \\hat{\\sigma} \\cdot \\sqrt{\\hat{\\Theta}_j^\\top \\hat{\\Sigma} \\hat{\\Theta}_j / n}\\). Since \\(\\hat{\\sigma} \\to \\sigma = O(1)\\) and \\(\\hat{\\Theta}_j^\\top \\hat{\\Sigma} \\hat{\\Theta}_j \\to \\Theta_{jj} = O(1)\\), the width is \\(O(1/\\sqrt{n})\\). This is remarkable because we are in a setting with \\(p \\gg n\\), where classical methods completely break down. The debiased Lasso achieves the classical parametric rate for inference on <em>individual</em> coordinates, as if the high dimensionality of the problem has been "projected away." The price is the sparsity assumption \\(s \\cdot s_\\Theta \\cdot (\\log p)^2 / n \\to 0\\), which is invisible in the CI width but constrains the regime of validity.'
                }
            ]
        },

        // ============================================================
        // SECTION 5: Simultaneous Inference
        // ============================================================
        {
            id: 'ch12-sec05',
            title: 'Simultaneous Inference',
            content: `
                <h2>Simultaneous Inference</h2>

                <p>So far we have considered inference for a <em>single</em> coordinate \\(\\beta^*_j\\). In practice, we often want to make simultaneous statements about <em>multiple</em> or <em>all</em> coordinates &mdash; for example, constructing confidence bands that cover the entire vector \\(\\beta^*\\) simultaneously.</p>

                <h3>The Multiple Comparisons Challenge</h3>

                <p>If we construct \\(p\\) individual \\(95\\%\\) confidence intervals, the probability that <em>all</em> of them simultaneously cover is at most \\(0.95^p\\), which vanishes exponentially. We need a correction for multiplicity.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.6 (Simultaneous Confidence Band)</div>
                    <div class="env-body">
                        <p>A <strong>simultaneous \\((1-\\alpha)\\)-confidence band</strong> for \\(\\beta^*\\) is a collection of intervals \\(\\{\\mathrm{CI}_j\\}_{j=1}^p\\) such that</p>
                        \\[P\\left(\\beta^*_j \\in \\mathrm{CI}_j \\text{ for all } j = 1, \\ldots, p\\right) \\geq 1 - \\alpha.\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.6 (Gaussian Approximation for Simultaneous Inference)</div>
                    <div class="env-body">
                        <p>Under the conditions of Theorem 12.4, the supremum-type statistic</p>
                        \\[\\max_{1 \\leq j \\leq p} \\frac{|\\hat{\\beta}^{\\mathrm{db}}_j - \\beta^*_j|}{\\hat{\\sigma}\\sqrt{\\hat{\\Theta}_j^\\top \\hat{\\Sigma}\\hat{\\Theta}_j / n}}\\]
                        <p>converges in distribution to \\(\\max_{1 \\leq j \\leq p} |Z_j|\\) where \\(Z \\sim N(0, R)\\) with \\(R\\) being the correlation matrix induced by \\(\\Theta\\). Consequently, the simultaneous confidence band</p>
                        \\[\\mathrm{CI}_j = \\left[\\hat{\\beta}^{\\mathrm{db}}_j \\pm q_{1-\\alpha} \\cdot \\hat{\\sigma}\\sqrt{\\frac{\\hat{\\Theta}_j^\\top \\hat{\\Sigma}\\hat{\\Theta}_j}{n}}\\right]\\]
                        <p>provides honest simultaneous coverage, where \\(q_{1-\\alpha}\\) is the \\((1-\\alpha)\\)-quantile of \\(\\max_j |Z_j|\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: Bonferroni vs. Gaussian Multiplier Bootstrap</div>
                    <div class="env-body">
                        <p>Two practical approaches to obtain the critical value \\(q_{1-\\alpha}\\):</p>
                        <ul>
                            <li><strong>Bonferroni correction</strong>: use \\(q_{1-\\alpha} = z_{\\alpha/(2p)}\\). Simple but conservative, since it ignores correlations. The critical value scales as \\(\\sqrt{2 \\log p}\\).</li>
                            <li><strong>Gaussian multiplier bootstrap</strong>: generate \\(B\\) independent copies \\(g^{(b)} \\sim N(0, I_n)\\), compute \\(\\max_j |\\hat{\\Theta}_j^\\top X^\\top g^{(b)} / (n \\hat{\\sigma} \\sqrt{\\hat{\\Theta}_j^\\top \\hat{\\Sigma}\\hat{\\Theta}_j / n})|\\), and take the empirical quantile. This automatically captures the correlation structure and is less conservative.</li>
                        </ul>
                    </div>
                </div>

                <h3>Low-Dimensional Projection Estimators</h3>

                <p>The debiased Lasso was developed independently by three groups, each with a slightly different perspective:</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.7 (Three Perspectives on Debiased Inference)</div>
                    <div class="env-body">
                        <ol>
                            <li><strong>Zhang and Zhang (2014)</strong> &mdash; <em>Low-dimensional projection estimator (LDPE)</em>: project the residual \\(y - X\\hat{\\beta}^{\\mathrm{lasso}}\\) onto a carefully chosen direction \\(z_j\\) that is approximately orthogonal to \\(X_{-j}\\):
                            \\[\\hat{\\beta}^{\\mathrm{LDPE}}_j = \\hat{\\beta}^{\\mathrm{lasso}}_j + \\frac{z_j^\\top(y - X\\hat{\\beta}^{\\mathrm{lasso}})}{z_j^\\top X_j},\\]
                            where \\(z_j = X_j - X_{-j}\\hat{\\gamma}_j\\) is the residual from regressing \\(X_j\\) on \\(X_{-j}\\).</li>

                            <li><strong>van de Geer, Buhlmann, Ritov, Dezeure (2014)</strong> &mdash; <em>Desparsified Lasso</em>: the node-wise regression approach described in Section 3, forming \\(\\hat{\\Theta}\\) row by row.</li>

                            <li><strong>Javanmard and Montanari (2014)</strong> &mdash; <em>Debiased Lasso via approximate inverse</em>: construct \\(\\hat{\\Theta}\\) by solving a convex program that minimizes \\(\\hat{\\Theta}_j^\\top \\hat{\\Sigma} \\hat{\\Theta}_j\\) subject to \\(\\|\\hat{\\Sigma}\\hat{\\Theta}_j - e_j\\|_\\infty \\leq \\mu\\).</li>
                        </ol>
                        <p>All three approaches are asymptotically equivalent.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.7 (Equivalence of the Three Approaches)</div>
                    <div class="env-body">
                        <p>Under appropriate regularity conditions (sub-Gaussian design, sparsity \\(s \\cdot s_\\Theta = o(\\sqrt{n}/\\log p)\\)), the LDPE, desparsified Lasso, and Javanmard-Montanari debiased estimators all satisfy:</p>
                        \\[\\sqrt{n}(\\hat{\\beta}^{\\mathrm{db}}_j - \\beta^*_j) = \\frac{1}{\\sqrt{n}} \\Theta_j^\\top X^\\top \\varepsilon + o_P(1) \\xrightarrow{d} N(0, \\sigma^2 \\Theta_{jj}).\\]
                        <p>The difference between any two of these estimators is \\(o_P(1/\\sqrt{n})\\).</p>
                    </div>
                </div>

                <h3>Group Inference and Linear Functionals</h3>

                <p>Beyond single coordinates, we can perform inference on <strong>linear functionals</strong> \\(a^\\top \\beta^*\\) for any "low-dimensional" direction \\(a \\in \\mathbb{R}^p\\):</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.8 (Inference for Linear Functionals)</div>
                    <div class="env-body">
                        <p>Define \\(\\hat{\\eta} = a^\\top \\hat{\\beta}^{\\mathrm{db}}\\). Under the conditions of Theorem 12.4, if \\(\\|a\\|_0 \\cdot s \\cdot (\\log p)^2 / n \\to 0\\), then</p>
                        \\[\\frac{\\sqrt{n}(\\hat{\\eta} - a^\\top\\beta^*)}{\\hat{\\sigma}\\sqrt{a^\\top \\hat{\\Theta} \\hat{\\Sigma} \\hat{\\Theta}^\\top a}} \\xrightarrow{d} N(0, 1).\\]
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.4 (Testing Group Significance)</div>
                    <div class="env-body">
                        <p>To test whether a group of variables \\(G \\subseteq \\{1, \\ldots, p\\}\\) is significant, i.e., \\(H_0: \\beta^*_G = 0\\), we can use the chi-squared-type statistic</p>
                        \\[T_G = n \\cdot (\\hat{\\beta}^{\\mathrm{db}}_G)^\\top (\\hat{\\sigma}^2 [\\hat{\\Theta}\\hat{\\Sigma}\\hat{\\Theta}^\\top]_{G,G})^{-1} \\hat{\\beta}^{\\mathrm{db}}_G \\xrightarrow{d} \\chi^2_{|G|}\\]
                        <p>under \\(H_0\\), provided \\(|G|\\) is fixed (or grows slowly).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: Limitations and Open Problems</div>
                    <div class="env-body">
                        <p>Several important limitations should be noted:</p>
                        <ul>
                            <li><strong>Sparsity assumption</strong>: the debiased Lasso requires both \\(\\beta^*\\) and the rows of \\(\\Theta\\) to be sparse. If the precision matrix is dense, the approach may fail.</li>
                            <li><strong>Power</strong>: the debiased Lasso confidence intervals are wider than those of an oracle who knows the support of \\(\\beta^*\\). The efficiency loss compared to the oracle is bounded by a factor involving \\(\\Theta_{jj}/\\Sigma_{jj}^{-1}\\).</li>
                            <li><strong>Non-Gaussian errors</strong>: extensions to sub-Gaussian and even heavy-tailed errors exist (via self-normalized statistics) but require additional technical assumptions.</li>
                            <li><strong>Uniform inference</strong>: obtaining confidence bands that are valid <em>uniformly</em> over all sparse \\(\\beta^*\\) (not just pointwise) requires additional care with the Gaussian approximation (Chernozhukov, Chetverikov, Kato).</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Historical Note</div>
                    <div class="env-body">
                        <p>The debiased Lasso literature emerged around 2013-2014, building on earlier work by Zhang and Zhang (2011) on the "relaxed projection" idea. The simultaneous development by three independent groups (Zhang-Zhang, van de Geer-Buhlmann-Ritov-Dezeure, Javanmard-Montanari) underscores the naturality of the construction. The Gaussian multiplier bootstrap for simultaneous inference was developed by Chernozhukov, Chetverikov, and Kato (2013). Together, these tools form the foundation of modern high-dimensional inference.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that the Bonferroni-corrected simultaneous confidence band has width scaling as \\(O(\\sqrt{\\log p / n})\\), and compare this to the width of individual CIs.',
                    hint: 'The Bonferroni critical value is \\(z_{\\alpha/(2p)}\\). Use the Gaussian tail bound \\(z_q \\sim \\sqrt{2 \\log(1/q)}\\) for small \\(q\\).',
                    solution: 'For the Bonferroni correction, the critical value is \\(z_{\\alpha/(2p)} \\approx \\sqrt{2\\log(2p/\\alpha)}\\). For fixed \\(\\alpha\\), this is \\(\\Theta(\\sqrt{\\log p})\\). The simultaneous CI width is therefore \\(\\sim 2\\sqrt{\\log p} \\cdot \\hat{\\sigma}\\sqrt{\\Theta_{jj}/n} = O(\\sqrt{\\log p / n})\\), while the individual CI width is \\(O(1/\\sqrt{n})\\). The ratio is \\(\\sqrt{\\log p}\\), reflecting the cost of simultaneous coverage. The Gaussian multiplier bootstrap can sometimes reduce this cost when the test statistics are positively correlated, but the \\(\\sqrt{\\log p}\\) factor is unavoidable in the worst case (when the coordinates are nearly independent).'
                }
            ]
        }
    ]
});
