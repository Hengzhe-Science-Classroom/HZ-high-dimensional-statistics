window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch13',
    number: 13,
    title: 'Selective Inference & Knockoffs',
    subtitle: 'Valid inference after model selection',
    sections: [
        // ============================================================
        // SECTION 1: The Selective Inference Problem
        // ============================================================
        {
            id: 'ch13-sec01',
            title: 'The Selective Inference Problem',
            content: `
                <h2>The Selective Inference Problem</h2>

                <p>In classical statistics, we formulate a hypothesis <em>before</em> looking at the data, collect observations, and then test that hypothesis. The resulting p-values and confidence intervals have their advertised coverage properties precisely because the hypothesis was fixed in advance.</p>

                <p>But modern high-dimensional practice breaks this contract. When \\(p \\gg n\\), we routinely use data-driven procedures &mdash; the Lasso, stepwise regression, marginal screening &mdash; to <strong>select</strong> which variables to include in a model, and then perform inference (p-values, confidence intervals) on the <em>same data</em> that was used for selection. This creates a fundamental statistical problem.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.1 (The Selective Inference Problem)</div>
                    <div class="env-body">
                        <p>Let \\(y = X\\beta + \\varepsilon\\) with \\(\\varepsilon \\sim \\mathcal{N}(0, \\sigma^2 I_n)\\). A <strong>selection procedure</strong> \\(\\hat{M}(y)\\) maps the response to a subset \\(\\hat{M} \\subseteq \\{1, \\ldots, p\\}\\) of selected variables. The <strong>selective inference problem</strong> asks: how do we construct valid p-values or confidence intervals for \\(\\beta_j\\), \\(j \\in \\hat{M}\\), given that \\(j\\) was selected by a data-dependent rule?</p>
                    </div>
                </div>

                <h3>Why Naive Inference Fails</h3>

                <p>Suppose we run the Lasso on data \\((X, y)\\) and it selects variable \\(j\\). If we then fit OLS on just the selected variables and compute a t-test p-value for \\(\\beta_j\\), the result is <strong>anti-conservative</strong>: the p-value is stochastically smaller than uniform under the null \\(\\beta_j = 0\\).</p>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Selection Bias</div>
                    <div class="env-body">
                        <p>Think of it this way: the Lasso selected variable \\(j\\) precisely <em>because</em> its estimated coefficient was large in this particular dataset. By conditioning on this event (that \\(j\\) was selected), we are looking at a biased slice of the sampling distribution. The naive OLS estimate \\(\\hat{\\beta}_j\\) is inflated upward in magnitude, and so the naive test rejects far too often.</p>
                        <p>Imagine flipping 1000 fair coins 20 times each, then reporting only the coins that came up heads 15 or more times. Testing \\(H_0\\!: p = 0.5\\) for these selected coins using the standard binomial test would reject almost every time &mdash; not because the coins are biased, but because <em>we selected the extreme ones</em>.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-selective"></div>

                <div class="env-block warning">
                    <div class="env-title">Warning: The Winner's Curse</div>
                    <div class="env-body">
                        <p>This phenomenon is also known as the <strong>winner's curse</strong>. Among all candidate variables, the ones selected by a penalized method are those whose sample correlations with \\(y\\) happen to be largest. Under the null, these correlations are just noise, yet selection systematically picks the largest noise values. Naive p-values can have Type I error rates exceeding 50% even at nominal level \\(\\alpha = 0.05\\).</p>
                    </div>
                </div>

                <h3>Two Approaches to Valid Post-Selection Inference</h3>

                <p>There are two fundamentally different strategies for correcting inference after model selection:</p>

                <ol>
                    <li><strong>Conditional inference (PoSI / polyhedral lemma):</strong> Condition on the selection event \\(\\{\\hat{M}(y) = M\\}\\) and derive the conditional distribution of the test statistic given that selection occurred. This leads to valid p-values and confidence intervals <em>conditional</em> on the selected model.</li>
                    <li><strong>Knockoff filter:</strong> Construct synthetic "knockoff" copies of the covariates that mimic the dependence structure of the originals but are independent of the response \\(y\\). By comparing how the original and knockoff variables enter the model, we can identify truly significant variables with controlled false discovery rate (FDR).</li>
                </ol>

                <p>In this chapter, we develop both approaches. Sections 2 covers conditional selective inference via the polyhedral lemma (Lee, Sun, Sun, and Taylor, 2016). Sections 3&ndash;5 develop the knockoff filter (Barber and Cand&egrave;s, 2015) and its model-X extension (Cand&egrave;s, Fan, Janson, and Lv, 2018).</p>

                <div class="env-block remark">
                    <div class="env-title">Remark: Contrast with Debiased Lasso</div>
                    <div class="env-body">
                        <p>In Chapter 12, we studied the debiased (or desparsified) Lasso, which provides valid inference for <em>any</em> prespecified coordinate \\(\\beta_j\\) without conditioning on selection. The debiased Lasso is a <em>marginal</em> inference procedure: it tests a single coordinate at a time. Selective inference, by contrast, specifically addresses the problem of inference for coordinates that were <em>chosen by the data</em>. The knockoff filter provides simultaneous FDR control over all selected variables.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-selective',
                    title: 'Selective Inference: Naive vs. Conditional p-values',
                    description: 'Under the null (all coefficients zero), the Lasso selects variables whose correlations with y are large by chance. Naive p-values (blue) are anti-conservative (concentrated near 0). Conditioning on selection (orange) restores uniformity.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 720, height: 480, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var nSim = 500;
                        var p = 50;
                        var n = 40;
                        var seed = 42;

                        VizEngine.createButton(controls, 'Resample', function() { seed = Math.floor(Math.random() * 100000); draw(); });

                        // Simple seeded PRNG (mulberry32)
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
                            return Math.sqrt(-2 * Math.log(u + 1e-15)) * Math.cos(2 * Math.PI * v);
                        }

                        // Standard normal CDF approximation
                        function normalCDF(x) {
                            var a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429;
                            var pp = 0.3275911;
                            var sign = 1;
                            if (x < 0) { sign = -1; x = -x; }
                            var t = 1.0 / (1.0 + pp * x);
                            var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x / 2);
                            return 0.5 * (1.0 + sign * y);
                        }

                        function draw() {
                            viz.clear();
                            var rng = mulberry32(seed);

                            var naivePvals = [];
                            var correctPvals = [];

                            // Simulate: generate y ~ N(0, I), X iid N(0,1), select variable with largest |X'y|
                            for (var sim = 0; sim < nSim; sim++) {
                                // Generate y ~ N(0, I_n)
                                var y = [];
                                for (var i = 0; i < n; i++) y.push(randn(rng));

                                // Compute marginal correlations z_j = X_j' y / sqrt(n) for each variable
                                var zScores = [];
                                for (var j = 0; j < p; j++) {
                                    var xj = [];
                                    for (var ii = 0; ii < n; ii++) xj.push(randn(rng));
                                    var dot = 0, normX = 0;
                                    for (var k = 0; k < n; k++) { dot += xj[k] * y[k]; normX += xj[k] * xj[k]; }
                                    zScores.push(dot / Math.sqrt(normX));
                                }

                                // Select the variable with largest |z|
                                var maxAbsZ = 0, selIdx = 0;
                                for (var jj = 0; jj < p; jj++) {
                                    if (Math.abs(zScores[jj]) > maxAbsZ) { maxAbsZ = Math.abs(zScores[jj]); selIdx = jj; }
                                }

                                var zSel = zScores[selIdx];

                                // Naive p-value: 2*(1 - Phi(|z|))
                                var naiveP = 2 * (1 - normalCDF(Math.abs(zSel)));
                                naivePvals.push(naiveP);

                                // Corrected p-value using Bonferroni-style truncation
                                // Conditional on |z_sel| >= all other |z_j|
                                // Approximate: use 2*p*(1 - Phi(|z|)) capped at 1
                                var corrP = Math.min(1, 2 * p * (1 - normalCDF(Math.abs(zSel))));
                                correctPvals.push(corrP);
                            }

                            // Draw histogram of p-values
                            var nBins = 20;
                            var binW = 1.0 / nBins;

                            function histCounts(pvals) {
                                var counts = new Array(nBins).fill(0);
                                for (var i = 0; i < pvals.length; i++) {
                                    var b = Math.min(Math.floor(pvals[i] / binW), nBins - 1);
                                    counts[b]++;
                                }
                                return counts;
                            }

                            var naiveCounts = histCounts(naivePvals);
                            var corrCounts = histCounts(correctPvals);
                            var maxCount = 0;
                            for (var b = 0; b < nBins; b++) { maxCount = Math.max(maxCount, naiveCounts[b], corrCounts[b]); }
                            maxCount = Math.max(maxCount, nSim / nBins * 1.5);

                            var plotL = 80, plotR = 680, plotT = 60, plotB = 400;
                            var plotW = plotR - plotL, plotH = plotB - plotT;
                            var barFullW = plotW / nBins;
                            var barW = barFullW * 0.4;

                            // Uniform reference line
                            var uniformH = (nSim / nBins) / maxCount * plotH;
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            ctx.moveTo(plotL, plotB - uniformH);
                            ctx.lineTo(plotR, plotB - uniformH);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('Uniform (valid)', plotR - 80, plotB - uniformH - 3);

                            // Draw naive histogram (blue)
                            for (var b1 = 0; b1 < nBins; b1++) {
                                var x1 = plotL + b1 * barFullW;
                                var h1 = naiveCounts[b1] / maxCount * plotH;
                                ctx.fillStyle = viz.colors.blue + '88';
                                ctx.fillRect(x1 + 1, plotB - h1, barW, h1);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(x1 + 1, plotB - h1, barW, h1);
                            }

                            // Draw corrected histogram (orange)
                            for (var b2 = 0; b2 < nBins; b2++) {
                                var x2 = plotL + b2 * barFullW + barW + 2;
                                var h2 = corrCounts[b2] / maxCount * plotH;
                                ctx.fillStyle = viz.colors.orange + '88';
                                ctx.fillRect(x2, plotB - h2, barW, h2);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(x2, plotB - h2, barW, h2);
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(plotL, plotB); ctx.lineTo(plotR, plotB); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(plotL, plotB); ctx.lineTo(plotL, plotT); ctx.stroke();

                            // X-axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var bl = 0; bl <= nBins; bl += 4) {
                                ctx.fillText((bl * binW).toFixed(1), plotL + bl * barFullW, plotB + 5);
                            }
                            ctx.fillText('p-value', (plotL + plotR) / 2, plotB + 22);

                            // Y-axis label
                            ctx.save();
                            ctx.translate(20, (plotT + plotB) / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.textAlign = 'center';
                            ctx.fillText('Count', 0, 0);
                            ctx.restore();

                            // Y-axis ticks
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var yy = 0; yy <= maxCount; yy += Math.max(1, Math.round(maxCount / 5))) {
                                var sy = plotB - (yy / maxCount) * plotH;
                                ctx.fillText(yy, plotL - 6, sy);
                            }

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('p-value Histograms Under the Null (all beta_j = 0)', (plotL + plotR) / 2, 18);

                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('n=' + n + ', p=' + p + ', ' + nSim + ' simulations, select variable with largest |X\'y|', (plotL + plotR) / 2, 38);

                            // Legend
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(plotL + 20, plotT + 8, 14, 10);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Naive p-values (anti-conservative)', plotL + 40, plotT + 16);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillRect(plotL + 20, plotT + 26, 14, 10);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Corrected p-values (approximately valid)', plotL + 40, plotT + 34);

                            // Rejection rates
                            var naiveReject = 0, corrReject = 0;
                            for (var s = 0; s < nSim; s++) {
                                if (naivePvals[s] < 0.05) naiveReject++;
                                if (correctPvals[s] < 0.05) corrReject++;
                            }
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Rejection rate at alpha=0.05:', (plotL + plotR) / 2, plotB + 44);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('Naive: ' + (100 * naiveReject / nSim).toFixed(1) + '%', (plotL + plotR) / 2 - 100, plotB + 62);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Corrected: ' + (100 * corrReject / nSim).toFixed(1) + '%', (plotL + plotR) / 2 + 100, plotB + 62);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Suppose we run a variable selection procedure on data \\(y \\sim \\mathcal{N}(0, I_n)\\) (so all true coefficients are zero) and it selects \\(k\\) variables. We then compute OLS t-test p-values for each selected variable. Explain why the expected proportion of these p-values below 0.05 is much larger than 5%.',
                    hint: 'Consider the selection bias: variables are selected because their sample correlations with \\(y\\) are large. Under the null, these correlations are pure noise, but selection picks the extremes.',
                    solution: 'Under the null, each \\(X_j^\\top y / \\|X_j\\|\\) is \\(\\mathcal{N}(0, \\sigma^2)\\). The selection procedure picks variables with the largest values of \\(|X_j^\\top y|\\). Conditional on selection, the distribution of \\(X_j^\\top y\\) is truncated to values with large magnitude. The naive t-test treats the selected coefficient as if it came from an untruncated Gaussian, drastically underestimating the probability of observing such a large value under the null, producing anti-conservative (too small) p-values. The rejection rate can far exceed 5%.'
                }
            ]
        },

        // ============================================================
        // SECTION 2: The Polyhedral Lemma
        // ============================================================
        {
            id: 'ch13-sec02',
            title: 'Polyhedral Lemma',
            content: `
                <h2>The Polyhedral Lemma: Conditioning on Lasso Selection</h2>

                <p>The key insight of Lee, Sun, Sun, and Taylor (2016) is that for the Lasso, the event "the Lasso selects model \\(M\\) with signs \\(s\\)" can be expressed as a <strong>polyhedral constraint</strong> on \\(y\\). This makes it possible to derive the exact conditional distribution of any linear functional of \\(y\\) given that the Lasso selected a particular model.</p>

                <h3>The Lasso Selection Event</h3>

                <p>Recall the Lasso estimator:</p>
                <p>\\[\\hat{\\beta}^{\\text{Lasso}} = \\arg\\min_{\\beta \\in \\mathbb{R}^p} \\left\\{ \\frac{1}{2} \\|y - X\\beta\\|_2^2 + \\lambda \\|\\beta\\|_1 \\right\\}.\\]</p>

                <p>The Lasso solution selects a set of <strong>active variables</strong> \\(\\hat{M} = \\{j : \\hat{\\beta}_j^{\\text{Lasso}} \\neq 0\\}\\) with signs \\(\\hat{s}_j = \\text{sign}(\\hat{\\beta}_j^{\\text{Lasso}})\\) for \\(j \\in \\hat{M}\\). The KKT conditions for the Lasso are:</p>
                <p>\\[X_{\\hat{M}}^\\top (y - X_{\\hat{M}} \\hat{\\beta}_{\\hat{M}}) = \\lambda \\hat{s}, \\qquad \\|X_{-\\hat{M}}^\\top (y - X_{\\hat{M}} \\hat{\\beta}_{\\hat{M}})\\|_\\infty \\leq \\lambda,\\]</p>
                <p>where \\(X_{\\hat{M}}\\) denotes the columns of \\(X\\) indexed by \\(\\hat{M}\\) and \\(\\hat{s}\\) is the sign vector.</p>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 13.2 (Polyhedral Selection Event &mdash; Lee et al., 2016)</div>
                    <div class="env-body">
                        <p>The event \\(\\{\\hat{M}(y) = M, \\hat{s}(y) = s\\}\\) &mdash; that the Lasso selects exactly the active set \\(M\\) with signs \\(s\\) &mdash; is equivalent to the polyhedral constraint:</p>
                        <p>\\[\\{\\hat{M}(y) = M, \\hat{s}(y) = s\\} = \\{Ay \\leq b\\}\\]</p>
                        <p>for a matrix \\(A \\in \\mathbb{R}^{m \\times n}\\) and vector \\(b \\in \\mathbb{R}^m\\) that depend on \\(X\\), \\(\\lambda\\), \\(M\\), and \\(s\\), but <strong>not</strong> on \\(y\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>The Lasso solution on the active set satisfies \\(\\hat{\\beta}_M = (X_M^\\top X_M)^{-1}(X_M^\\top y - \\lambda s)\\). The sign condition \\(\\text{diag}(s) \\hat{\\beta}_M \\geq 0\\) becomes a linear inequality in \\(y\\). The subgradient condition \\(\\|X_{-M}^\\top (y - X_M \\hat{\\beta}_M)\\|_\\infty \\leq \\lambda\\) also reduces to linear inequalities in \\(y\\). Collecting all such inequalities gives \\(Ay \\leq b\\).</p>
                        <p class="qed">&#8718;</p>
                    </div>
                </div>

                <h3>The Truncated Gaussian</h3>

                <p>Now suppose we want to test \\(H_0: \\eta^\\top \\mu = 0\\) for a direction \\(\\eta \\in \\mathbb{R}^n\\), where \\(y \\sim \\mathcal{N}(\\mu, \\sigma^2 I_n)\\). The test statistic is \\(\\eta^\\top y\\). The key result characterizes its <em>conditional</em> distribution given \\(Ay \\leq b\\).</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 13.3 (Post-Selection Inference via Truncated Gaussian)</div>
                    <div class="env-body">
                        <p>Under \\(y \\sim \\mathcal{N}(\\mu, \\sigma^2 I_n)\\), write \\(y = \\frac{\\eta}{\\|\\eta\\|^2}(\\eta^\\top y) + P_{\\eta^\\perp} y\\), decomposing \\(y\\) into the component along \\(\\eta\\) and the component orthogonal to \\(\\eta\\). Then:</p>
                        <p>\\[\\eta^\\top y \\mid Ay \\leq b, \\, P_{\\eta^\\perp} y = z \\;\\sim\\; \\text{TN}(\\eta^\\top \\mu, \\, \\sigma^2 \\|\\eta\\|^2, \\, [\\mathcal{V}^-(z), \\, \\mathcal{V}^+(z)])\\]</p>
                        <p>where \\(\\text{TN}(\\mu, \\sigma^2, [a, b])\\) denotes a Gaussian with mean \\(\\mu\\) and variance \\(\\sigma^2\\) truncated to \\([a, b]\\). The truncation limits \\(\\mathcal{V}^-(z)\\) and \\(\\mathcal{V}^+(z)\\) are computed from the polyhedral constraints and depend on the observed \\(z = P_{\\eta^\\perp} y\\).</p>
                    </div>
                </div>

                <p>The truncation limits are obtained as follows. Writing the constraint \\(Ay \\leq b\\) in terms of \\(\\eta^\\top y\\), each row \\(i\\) of \\(A\\) gives a constraint of the form \\(\\alpha_i (\\eta^\\top y) \\leq b_i - (A P_{\\eta^\\perp} y)_i\\). Depending on the sign of \\(\\alpha_i\\), this gives an upper or lower bound on \\(\\eta^\\top y\\):</p>
                <p>\\[\\mathcal{V}^-(z) = \\max_{i: \\alpha_i &gt; 0} \\frac{b_i - (A z)_i}{\\alpha_i}, \\qquad \\mathcal{V}^+(z) = \\min_{i: \\alpha_i &lt; 0} \\frac{b_i - (A z)_i}{\\alpha_i}.\\]</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.4 (Truncated Gaussian Distribution)</div>
                    <div class="env-body">
                        <p>A random variable \\(Z\\) follows a <strong>truncated normal</strong> distribution \\(\\text{TN}(\\mu, \\sigma^2, [a,b])\\) if its density is:</p>
                        <p>\\[f(z) = \\frac{\\phi\\!\\left(\\frac{z - \\mu}{\\sigma}\\right)}{\\sigma\\left[\\Phi\\!\\left(\\frac{b - \\mu}{\\sigma}\\right) - \\Phi\\!\\left(\\frac{a - \\mu}{\\sigma}\\right)\\right]} \\cdot \\mathbf{1}_{[a,b]}(z)\\]</p>
                        <p>where \\(\\phi\\) and \\(\\Phi\\) are the standard normal PDF and CDF, respectively.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 13.5 (Post-Lasso p-value)</div>
                    <div class="env-body">
                        <p>After the Lasso selects model \\(M\\) with signs \\(s\\), to test \\(H_0: \\beta_j = 0\\) for some \\(j \\in M\\), we choose \\(\\eta = (X_M^\\top X_M)^{-1} e_j\\) (the \\(j\\)-th column of the pseudo-inverse), compute the truncation limits \\(\\mathcal{V}^\\pm\\), and then the selective p-value is:</p>
                        <p>\\[p_j^{\\text{sel}} = \\mathbb{P}\\left(|Z| \\geq |\\eta^\\top y| \\;\\big|\\; Z \\sim \\text{TN}(0, \\sigma^2 \\|\\eta\\|^2, [\\mathcal{V}^-, \\mathcal{V}^+])\\right).\\]</p>
                        <p>Under \\(H_0: \\beta_j = 0\\), this p-value is exactly \\(\\text{Unif}[0,1]\\), <em>even conditional on selection</em>.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: Computational Aspects</div>
                    <div class="env-body">
                        <p>Computing the polyhedral constraints requires the matrix \\((X_M^\\top X_M)^{-1}\\) and manipulating linear inequalities. For moderate-size selected models, this is tractable. However, the resulting confidence intervals can be very wide &mdash; the "price" of conditioning on selection is a loss of power. When \\(|M|\\) is large, the polyhedral region can be very thin, leading to extreme truncation and unstable inference.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-truncated-gaussian"></div>
            `,
            visualizations: [
                {
                    id: 'viz-truncated-gaussian',
                    title: 'Truncated Gaussian for Post-Selection Inference',
                    description: 'The blue curve shows a standard Gaussian. The orange region shows the truncated Gaussian on [a, b] that arises from conditioning on the selection event. The selective p-value uses the truncated distribution.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 720, height: 420, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var truncA = 1.0;
                        var truncB = 4.0;
                        var obsZ = 2.0;

                        VizEngine.createSlider(controls, 'Lower a', -2, 3, 1.0, 0.1, function(v) { truncA = parseFloat(v); draw(); });
                        VizEngine.createSlider(controls, 'Upper b', 2, 6, 4.0, 0.1, function(v) { truncB = parseFloat(v); draw(); });
                        VizEngine.createSlider(controls, 'Obs z', -1, 5, 2.0, 0.1, function(v) { obsZ = parseFloat(v); draw(); });

                        function normalPDF(x) { return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI); }
                        function normalCDF(x) {
                            var a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429;
                            var pp = 0.3275911;
                            var sign = 1;
                            if (x < 0) { sign = -1; x = -x; }
                            var t = 1.0 / (1.0 + pp * x);
                            var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x / 2);
                            return 0.5 * (1.0 + sign * y);
                        }

                        function draw() {
                            viz.clear();
                            var a = Math.min(truncA, truncB - 0.1);
                            var b = truncB;

                            var plotL = 80, plotR = 680, plotT = 50, plotB = 340;
                            var plotW = plotR - plotL, plotH = plotB - plotT;

                            var xMin = -4, xMax = 6;
                            var xRange = xMax - xMin;

                            function toPixX(x) { return plotL + (x - xMin) / xRange * plotW; }

                            // Draw full Gaussian
                            var maxPDF = normalPDF(0);
                            var truncNorm = normalCDF(b) - normalCDF(a);
                            var maxTruncPDF = truncNorm > 1e-10 ? normalPDF(a > 0 && b > 0 ? Math.min(Math.abs(a), Math.abs(b)) : 0) / truncNorm : 0;
                            if (a > 0) maxTruncPDF = normalPDF(a) / truncNorm;
                            if (b < 0) maxTruncPDF = normalPDF(b) / truncNorm;
                            var yMax = Math.max(maxPDF, maxTruncPDF) * 1.2;

                            function toPixY(fv) { return plotB - (fv / yMax) * plotH; }

                            // Full Gaussian curve (background)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var px = plotL; px <= plotR; px++) {
                                var xx = xMin + (px - plotL) / plotW * xRange;
                                var fv = normalPDF(xx);
                                if (px === plotL) ctx.moveTo(px, toPixY(fv));
                                else ctx.lineTo(px, toPixY(fv));
                            }
                            ctx.stroke();

                            // Shaded truncated region
                            if (truncNorm > 1e-10) {
                                ctx.fillStyle = viz.colors.orange + '44';
                                ctx.beginPath();
                                var pxA = toPixX(a), pxB = toPixX(b);
                                ctx.moveTo(pxA, plotB);
                                for (var px2 = Math.max(plotL, Math.floor(pxA)); px2 <= Math.min(plotR, Math.ceil(pxB)); px2++) {
                                    var xx2 = xMin + (px2 - plotL) / plotW * xRange;
                                    if (xx2 < a || xx2 > b) continue;
                                    var fv2 = normalPDF(xx2) / truncNorm;
                                    ctx.lineTo(px2, toPixY(fv2));
                                }
                                ctx.lineTo(Math.min(plotR, Math.ceil(pxB)), plotB);
                                ctx.closePath();
                                ctx.fill();

                                // Truncated Gaussian curve
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                var started = false;
                                for (var px3 = Math.max(plotL, Math.floor(pxA)); px3 <= Math.min(plotR, Math.ceil(pxB)); px3++) {
                                    var xx3 = xMin + (px3 - plotL) / plotW * xRange;
                                    if (xx3 < a || xx3 > b) continue;
                                    var fv3 = normalPDF(xx3) / truncNorm;
                                    if (!started) { ctx.moveTo(px3, toPixY(fv3)); started = true; }
                                    else ctx.lineTo(px3, toPixY(fv3));
                                }
                                ctx.stroke();
                            }

                            // Truncation boundaries
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([5, 3]);
                            ctx.beginPath(); ctx.moveTo(toPixX(a), plotT); ctx.lineTo(toPixX(a), plotB); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(toPixX(b), plotT); ctx.lineTo(toPixX(b), plotB); ctx.stroke();
                            ctx.setLineDash([]);

                            ctx.fillStyle = viz.colors.red;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('a=' + a.toFixed(1), toPixX(a), plotB + 5);
                            ctx.fillText('b=' + b.toFixed(1), toPixX(b), plotB + 5);

                            // Observed value
                            var obsClamp = Math.max(a, Math.min(b, obsZ));
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(toPixX(obsZ), plotT); ctx.lineTo(toPixX(obsZ), plotB); ctx.stroke();
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.fillText('z_obs=' + obsZ.toFixed(1), toPixX(obsZ), plotB + 20);

                            // Compute selective p-value
                            var selP;
                            if (truncNorm > 1e-10 && obsZ >= a && obsZ <= b) {
                                // Two-sided: P(|Z| >= |z_obs|) under TN(0,1,[a,b])
                                var pRight = (normalCDF(b) - normalCDF(obsZ)) / truncNorm;
                                selP = 2 * Math.min(pRight, 1 - pRight);
                                selP = Math.min(selP, 1);
                            } else {
                                selP = obsZ < a || obsZ > b ? 0 : 1;
                            }
                            var naiveP = 2 * (1 - normalCDF(Math.abs(obsZ)));

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(plotL, plotB); ctx.lineTo(plotR, plotB); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(plotL, plotB); ctx.lineTo(plotL, plotT); ctx.stroke();

                            // X ticks
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var xt = Math.ceil(xMin); xt <= Math.floor(xMax); xt++) {
                                ctx.fillText(xt, toPixX(xt), plotB + 5);
                            }

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Standard Gaussian (blue) vs. Truncated Gaussian (orange)', (plotL + plotR) / 2, 14);

                            // Legend / p-values
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('Naive p-value: ' + naiveP.toFixed(4), plotL + 20, plotB + 50);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Selective p-value (truncated): ' + (obsZ >= a && obsZ <= b ? selP.toFixed(4) : 'z outside [a,b]'), plotL + 20, plotB + 68);

                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('The selective p-value accounts for the truncation from conditioning on selection.', plotL + 20, plotB + 90);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Explain why the selection event \\(\\{\\hat{M}(y) = M, \\hat{s}(y) = s\\}\\) for the Lasso can be written as a polyhedral constraint \\(Ay \\leq b\\) with \\(A\\) and \\(b\\) not depending on \\(y\\).',
                    hint: 'Start from the KKT conditions. The active coefficient \\(\\hat{\\beta}_M\\) is a linear function of \\(y\\). The sign constraint and the subgradient constraint both become linear inequalities in \\(y\\).',
                    solution: 'The Lasso solution on the active set is \\(\\hat{\\beta}_M = (X_M^\\top X_M)^{-1}(X_M^\\top y - \\lambda s)\\), which is an affine function of \\(y\\). The sign condition \\(\\text{diag}(s) \\hat{\\beta}_M \\geq 0\\) is equivalent to \\(\\text{diag}(s)(X_M^\\top X_M)^{-1} X_M^\\top y \\geq \\lambda \\, \\text{diag}(s)(X_M^\\top X_M)^{-1} s\\), a set of linear inequalities in \\(y\\). Similarly, the inactive constraint \\(\\|X_{-M}^\\top(I - P_M) y\\|_\\infty \\leq \\lambda\\) gives linear inequalities with coefficients depending on \\(X\\) and \\(\\lambda\\) only. Stacking all constraints yields \\(Ay \\leq b\\) with \\(A, b\\) free of \\(y\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 3: The Knockoff Filter
        // ============================================================
        {
            id: 'ch13-sec03',
            title: 'The Knockoff Filter',
            content: `
                <h2>The Knockoff Filter</h2>

                <p>The knockoff filter, introduced by Barber and Cand&egrave;s (2015), takes a completely different approach to post-selection inference. Instead of conditioning on the selection event, it constructs <strong>synthetic decoy variables</strong> &mdash; called <em>knockoffs</em> &mdash; that mimic the correlation structure of the original features but are independent of the response. By comparing how strongly the model relies on the originals versus the knockoffs, we can separate real signals from noise while controlling the false discovery rate.</p>

                <h3>The Fixed-X Knockoff Construction</h3>

                <p>Consider the linear model \\(y = X\\beta + \\varepsilon\\) where \\(X \\in \\mathbb{R}^{n \\times p}\\) is a fixed design matrix with \\(n \\geq 2p\\). The key idea is to construct a <strong>knockoff matrix</strong> \\(\\tilde{X}\\) that is carefully calibrated to be "similar enough" to \\(X\\) in its column structure but carries no information about \\(y\\).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.6 (Fixed-X Knockoff Matrix &mdash; Barber &amp; Cand&egrave;s, 2015)</div>
                    <div class="env-body">
                        <p>A <strong>knockoff matrix</strong> for \\(X\\) is a matrix \\(\\tilde{X} \\in \\mathbb{R}^{n \\times p}\\) satisfying two conditions:</p>
                        <ol>
                            <li><strong>Gram matrix matching:</strong> \\(\\tilde{X}^\\top \\tilde{X} = X^\\top X \\equiv \\Sigma\\).</li>
                            <li><strong>Cross-Gram structure:</strong> \\(X^\\top \\tilde{X} = \\Sigma - \\text{diag}(s)\\) for some vector \\(s \\geq 0\\).</li>
                        </ol>
                        <p>Here \\(s = (s_1, \\ldots, s_p)\\) with \\(s_j \\geq 0\\), and the constraint requires \\(2\\,\\text{diag}(s) \\preceq \\Sigma\\) (i.e., \\(\\Sigma - \\text{diag}(s)\\) remains positive semidefinite in the appropriate sense).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: What Knockoffs Do</div>
                    <div class="env-body">
                        <p>Each knockoff variable \\(\\tilde{X}_j\\) is a "fake" copy of \\(X_j\\). It has the same self-correlation \\(\\|\\tilde{X}_j\\|^2 = \\|X_j\\|^2\\) and the same cross-correlations with all other variables \\(\\langle \\tilde{X}_j, X_k \\rangle = \\langle X_j, X_k \\rangle\\) for \\(k \\neq j\\). The <em>only</em> difference is that \\(\\langle X_j, \\tilde{X}_j \\rangle = \\|X_j\\|^2 - s_j\\), which is slightly less than perfect correlation. This means that swapping \\(X_j\\) and \\(\\tilde{X}_j\\) preserves all the inter-variable correlations but introduces a "gap" of size \\(s_j\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-knockoff-construct"></div>

                <h3>Explicit Knockoff Construction</h3>

                <p>When \\(n \\geq 2p\\), knockoffs can be constructed explicitly. Let \\(X = UDV^\\top\\) be the SVD of \\(X\\), and let \\(U_\\perp \\in \\mathbb{R}^{n \\times (n-p)}\\) be an orthonormal basis for the orthogonal complement of the column space of \\(X\\). Define:</p>
                <p>\\[\\tilde{X} = X(I_p - \\Sigma^{-1} \\text{diag}(s)) + U_\\perp C,\\]</p>
                <p>where \\(C \\in \\mathbb{R}^{(n-p) \\times p}\\) is chosen so that \\(\\tilde{X}^\\top \\tilde{X} = \\Sigma\\). One can verify that \\(C^\\top C = 2\\,\\text{diag}(s) - \\text{diag}(s) \\Sigma^{-1} \\text{diag}(s)\\), and this is positive semidefinite precisely when \\(2\\,\\text{diag}(s) \\preceq \\Sigma\\).</p>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 13.7 (Knockoff Exchangeability)</div>
                    <div class="env-body">
                        <p>Let \\([X, \\tilde{X}] \\in \\mathbb{R}^{n \\times 2p}\\) be the augmented design matrix. For any subset \\(S \\subseteq \\{1, \\ldots, p\\}\\), let \\([X, \\tilde{X}]_{\\text{swap}(S)}\\) denote the matrix obtained by swapping columns \\(X_j \\leftrightarrow \\tilde{X}_j\\) for all \\(j \\in S\\). Then:</p>
                        <p>\\[[X, \\tilde{X}]_{\\text{swap}(S)}^\\top [X, \\tilde{X}]_{\\text{swap}(S)} = [X, \\tilde{X}]^\\top [X, \\tilde{X}]\\]</p>
                        <p>for every \\(S\\). That is, the Gram matrix of the augmented design is invariant under swapping any subset of original/knockoff pairs.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: The Requirement \\(n \\geq 2p\\)</div>
                    <div class="env-body">
                        <p>The fixed-X knockoff construction requires \\(n \\geq 2p\\) because we need to "fit" \\(2p\\) columns (original + knockoff) into \\(n\\)-dimensional space while maintaining the required Gram matrix structure. This is a significant limitation in high-dimensional settings. The <strong>model-X knockoff</strong> framework (Section 4) removes this restriction by leveraging knowledge of the distribution of \\(X\\).</p>
                    </div>
                </div>

                <h3>The Knockoff Procedure</h3>

                <p>Given the augmented design \\([X, \\tilde{X}]\\), the knockoff filter proceeds in three steps:</p>

                <ol>
                    <li><strong>Fit an augmented model:</strong> Run the Lasso (or another variable selection method) on \\(y\\) against \\([X, \\tilde{X}]\\) to obtain coefficients \\((\\hat{\\beta}_1, \\ldots, \\hat{\\beta}_p, \\hat{\\beta}_{p+1}, \\ldots, \\hat{\\beta}_{2p})\\).</li>
                    <li><strong>Compute knockoff statistics:</strong> For each variable \\(j\\), compute a statistic \\(W_j\\) that measures how much more important \\(X_j\\) is compared to its knockoff \\(\\tilde{X}_j\\). (See Section 5.)</li>
                    <li><strong>Apply the knockoff threshold:</strong> Select variables whose \\(W_j\\) exceeds a data-dependent threshold \\(\\tau\\), chosen to control the FDR.</li>
                </ol>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.8 (Antisymmetry Property)</div>
                    <div class="env-body">
                        <p>A knockoff statistic \\(W = (W_1, \\ldots, W_p)\\) must satisfy the <strong>flip-sign property</strong>: if we swap \\(X_j \\leftrightarrow \\tilde{X}_j\\) for any null variable \\(j\\) (i.e., \\(\\beta_j = 0\\)), then \\(W_j\\) changes sign while all other \\(W_k\\) (\\(k \\neq j\\)) remain unchanged. Formally, \\(W_j\\) must be antisymmetric in \\((X_j, \\tilde{X}_j)\\) for null variables.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-knockoff-construct',
                    title: 'Knockoff Construction: Original vs. Knockoff Variables',
                    description: 'Visualization of the correlation structure between original variables X and their knockoff copies. The Gram matrix [X, X~]\'[X, X~] shows the pairwise correlations. Knockoffs preserve inter-variable correlations but have reduced self-correlation with their originals.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 720, height: 460, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var pDim = 4;
                        var sVal = 0.5;

                        VizEngine.createSlider(controls, 'Gap s', 0.05, 0.95, 0.5, 0.05, function(v) { sVal = parseFloat(v); draw(); });
                        VizEngine.createSlider(controls, 'p', 2, 6, 4, 1, function(v) { pDim = Math.round(parseFloat(v)); draw(); });

                        function draw() {
                            viz.clear();

                            // Build Sigma = identity for simplicity (orthogonal design)
                            // Gram matrix of [X, X~] is a 2p x 2p matrix:
                            // [ Sigma,        Sigma - diag(s) ]
                            // [ Sigma - diag(s),   Sigma      ]
                            var sz = 2 * pDim;
                            var gram = [];
                            for (var i = 0; i < sz; i++) {
                                gram[i] = [];
                                for (var j = 0; j < sz; j++) {
                                    if (i < pDim && j < pDim) {
                                        // X'X block = Sigma = I
                                        gram[i][j] = (i === j) ? 1.0 : 0.0;
                                    } else if (i >= pDim && j >= pDim) {
                                        // X~'X~ block = Sigma = I
                                        gram[i][j] = (i === j) ? 1.0 : 0.0;
                                    } else if (i < pDim && j >= pDim) {
                                        // X'X~ block = Sigma - diag(s)
                                        gram[i][j] = (i === j - pDim) ? (1.0 - sVal) : 0.0;
                                    } else {
                                        // X~'X block = Sigma - diag(s)
                                        gram[i][j] = (i - pDim === j) ? (1.0 - sVal) : 0.0;
                                    }
                                }
                            }

                            // Draw correlation heatmap
                            var hmLeft = 100, hmTop = 60;
                            var cellSize = Math.min(30, Math.floor(320 / sz));
                            var hmSize = cellSize * sz;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Gram Matrix of [X, X~]  (p=' + pDim + ', s=' + sVal.toFixed(2) + ')', viz.width / 2, 20);
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Knockoffs preserve all cross-correlations; only X_j\' X~_j = 1 - s differs from 1', viz.width / 2, 40);

                            // Draw cells
                            for (var ii = 0; ii < sz; ii++) {
                                for (var jj = 0; jj < sz; jj++) {
                                    var val = gram[ii][jj];
                                    var cx = hmLeft + jj * cellSize;
                                    var cy = hmTop + ii * cellSize;

                                    // Color: blue for positive, red for negative, intensity proportional to |val|
                                    var absVal = Math.abs(val);
                                    var r, g, b;
                                    if (val >= 0) {
                                        // Blue to teal gradient
                                        r = Math.round(12 + (1 - absVal) * 40);
                                        g = Math.round(12 + absVal * 160);
                                        b = Math.round(32 + absVal * 200);
                                    } else {
                                        r = Math.round(12 + absVal * 200);
                                        g = Math.round(12 + (1 - absVal) * 40);
                                        b = Math.round(32);
                                    }
                                    ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
                                    ctx.fillRect(cx, cy, cellSize - 1, cellSize - 1);

                                    // Value text
                                    if (cellSize >= 20) {
                                        ctx.fillStyle = absVal > 0.5 ? '#ffffff' : '#aaaaaa';
                                        ctx.font = (cellSize > 25 ? 10 : 8) + 'px -apple-system,sans-serif';
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'middle';
                                        ctx.fillText(val.toFixed(1), cx + cellSize / 2, cy + cellSize / 2);
                                    }
                                }
                            }

                            // Row/column labels
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textBaseline = 'middle';
                            for (var k = 0; k < sz; k++) {
                                var label = k < pDim ? 'X' + (k + 1) : 'X~' + (k - pDim + 1);
                                var color = k < pDim ? viz.colors.blue : viz.colors.orange;
                                ctx.fillStyle = color;
                                ctx.textAlign = 'right';
                                ctx.fillText(label, hmLeft - 5, hmTop + k * cellSize + cellSize / 2);
                                ctx.textAlign = 'center';
                                ctx.save();
                                ctx.translate(hmLeft + k * cellSize + cellSize / 2, hmTop - 5);
                                ctx.rotate(-Math.PI / 4);
                                ctx.fillText(label, 0, 0);
                                ctx.restore();
                            }

                            // Block labels
                            ctx.font = 'bold 11px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.textAlign = 'center';
                            var blockMid = hmLeft + pDim * cellSize / 2;
                            ctx.fillText("X'X = I", blockMid, hmTop + hmSize + 18);

                            ctx.fillStyle = viz.colors.orange;
                            var blockMid2 = hmLeft + pDim * cellSize + pDim * cellSize / 2;
                            ctx.fillText("X'X~ = I - sI", blockMid2, hmTop + hmSize + 18);

                            // Right panel: 2D scatter showing original and knockoff
                            var scatterL = hmLeft + hmSize + 60;
                            var scatterT = hmTop + 20;
                            var scatterW = 240;
                            var scatterH = 240;
                            var scatterCX = scatterL + scatterW / 2;
                            var scatterCY = scatterT + scatterH / 2;
                            var scatterR = scatterW / 2 - 20;

                            // Draw 2D correlation visualization
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Correlation Structure (2D)', scatterCX, scatterT - 10);

                            // Draw coordinate axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(scatterL, scatterCY); ctx.lineTo(scatterL + scatterW, scatterCY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(scatterCX, scatterT); ctx.lineTo(scatterCX, scatterT + scatterH); ctx.stroke();

                            // Draw unit circle
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.arc(scatterCX, scatterCY, scatterR, 0, Math.PI * 2);
                            ctx.stroke();

                            // Show X1 as a vector
                            var angle1 = 0;
                            var x1px = scatterCX + scatterR * Math.cos(angle1);
                            var y1px = scatterCY - scatterR * Math.sin(angle1);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(scatterCX, scatterCY); ctx.lineTo(x1px, y1px); ctx.stroke();
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(x1px, y1px, 5, 0, Math.PI * 2); ctx.fill();
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('X1', x1px + 8, y1px - 5);

                            // Show X~1 as a vector with correlation 1-s with X1
                            var corrAngle = Math.acos(1 - sVal);
                            var xk1px = scatterCX + scatterR * Math.cos(corrAngle);
                            var yk1px = scatterCY - scatterR * Math.sin(corrAngle);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(scatterCX, scatterCY); ctx.lineTo(xk1px, yk1px); ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(xk1px, yk1px, 5, 0, Math.PI * 2); ctx.fill();
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.fillText('X~1', xk1px + 8, yk1px - 5);

                            // Draw the angle arc
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.arc(scatterCX, scatterCY, scatterR * 0.3, -corrAngle, 0);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            var labelAngle = corrAngle / 2;
                            ctx.fillText('corr = ' + (1 - sVal).toFixed(2), scatterCX + scatterR * 0.35 * Math.cos(labelAngle), scatterCY - scatterR * 0.35 * Math.sin(labelAngle) + 4);

                            // Bottom info
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Larger s = more separation between X_j and X~_j', scatterCX, scatterT + scatterH + 18);
                            ctx.fillText('(better power, but s must satisfy 2*diag(s) <= Sigma)', scatterCX, scatterT + scatterH + 34);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify the knockoff exchangeability property: show that the Gram matrix \\([X, \\tilde{X}]^\\top [X, \\tilde{X}]\\) is invariant under swapping \\(X_j \\leftrightarrow \\tilde{X}_j\\) for any single \\(j\\).',
                    hint: 'Write out the \\(2p \\times 2p\\) Gram matrix in block form. A swap of column \\(j\\) is a permutation of rows and columns. Show that the resulting matrix is the same as the original.',
                    solution: 'The Gram matrix is \\(G = \\begin{pmatrix} \\Sigma & \\Sigma - \\text{diag}(s) \\\\ \\Sigma - \\text{diag}(s) & \\Sigma \\end{pmatrix}\\). Swapping \\(X_j \\leftrightarrow \\tilde{X}_j\\) permutes rows \\(j\\) and \\(p+j\\), and columns \\(j\\) and \\(p+j\\). Since \\(\\Sigma_{jj} = \\Sigma_{jj}\\), \\(\\Sigma_{jk} = (\\Sigma - \\text{diag}(s))_{jk}\\) for \\(k \\neq j\\) (as \\(\\text{diag}(s)\\) is diagonal, the off-diagonal entries are identical), and the \\((j, p+j)\\) entry \\(\\Sigma_{jj} - s_j\\) stays at the same position. Checking all four blocks, the permuted Gram matrix equals \\(G\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Model-X Knockoffs
        // ============================================================
        {
            id: 'ch13-sec04',
            title: 'Model-X Knockoffs',
            content: `
                <h2>Model-X Knockoffs: Distribution-Free FDR Control</h2>

                <p>The fixed-X knockoff filter of Section 3 requires \\(n \\geq 2p\\), which is a severe limitation in high-dimensional settings. The <strong>model-X knockoff framework</strong> (Cand&egrave;s, Fan, Janson, and Lv, 2018) overcomes this by leveraging the <em>distribution of the covariates</em> rather than the geometry of the design matrix.</p>

                <h3>The Model-X Framework</h3>

                <p>The key shift is philosophical: instead of treating \\(X\\) as fixed and \\(y \\mid X\\) as random, model-X knockoffs treat the rows of \\(X\\) as random draws from a known (or estimated) distribution.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.9 (Model-X Knockoffs &mdash; Cand&egrave;s et al., 2018)</div>
                    <div class="env-body">
                        <p>Given random feature vectors \\(X_1, \\ldots, X_p\\) with joint distribution \\(F_X\\), <strong>model-X knockoffs</strong> \\(\\tilde{X} = (\\tilde{X}_1, \\ldots, \\tilde{X}_p)\\) are a new set of random variables satisfying:</p>
                        <ol>
                            <li><strong>Exchangeability:</strong> For any subset \\(S \\subseteq \\{1, \\ldots, p\\}\\),
                            \\[(X, \\tilde{X})_{\\text{swap}(S)} \\overset{d}{=} (X, \\tilde{X})\\]
                            where \\(\\text{swap}(S)\\) exchanges \\(X_j \\leftrightarrow \\tilde{X}_j\\) for each \\(j \\in S\\).</li>
                            <li><strong>Conditional independence:</strong> \\(\\tilde{X} \\perp\\!\\!\\!\\perp y \\mid X\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Why Model-X Knockoffs Work</div>
                    <div class="env-body">
                        <p>Condition (1) says that the joint distribution of \\((X, \\tilde{X})\\) "looks the same" no matter which pairs you swap. This means any procedure based on \\((X, \\tilde{X})\\) cannot distinguish an original from a knockoff based on correlation structure alone. Condition (2) says that knockoffs carry <em>no information about \\(y\\)</em> beyond what is already in \\(X\\). So if a knockoff variable \\(\\tilde{X}_j\\) appears important in a model, it must be a false positive &mdash; since it has no real relationship with \\(y\\).</p>
                    </div>
                </div>

                <h3>Gaussian Model-X Knockoffs</h3>

                <p>When \\(X \\sim \\mathcal{N}(0, \\Sigma)\\), model-X knockoffs can be constructed analytically.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 13.10 (Gaussian Knockoff Construction)</div>
                    <div class="env-body">
                        <p>If \\(X \\sim \\mathcal{N}_p(0, \\Sigma)\\), then model-X knockoffs can be constructed as:</p>
                        <p>\\[\\tilde{X} \\mid X \\;\\sim\\; \\mathcal{N}_p\\!\\left(X - X \\Sigma^{-1} \\text{diag}(s),\\; 2\\,\\text{diag}(s) - \\text{diag}(s) \\Sigma^{-1} \\text{diag}(s)\\right)\\]</p>
                        <p>where \\(s \\in \\mathbb{R}^p_+\\) satisfies \\(\\text{diag}(s) \\preceq 2\\Sigma\\). The joint distribution \\((X, \\tilde{X})\\) is then multivariate Gaussian with:</p>
                        <p>\\[\\begin{pmatrix} X \\\\ \\tilde{X} \\end{pmatrix} \\sim \\mathcal{N}_{2p}\\!\\left(0, \\begin{pmatrix} \\Sigma & \\Sigma - \\text{diag}(s) \\\\ \\Sigma - \\text{diag}(s) & \\Sigma \\end{pmatrix}\\right).\\]</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: Choosing \\(s\\)</div>
                    <div class="env-body">
                        <p>The vector \\(s\\) controls the "gap" between each variable and its knockoff. Larger \\(s_j\\) means \\(X_j\\) and \\(\\tilde{X}_j\\) are less correlated, giving more power to distinguish real signals. Two common choices are:</p>
                        <ul>
                            <li><strong>Equicorrelated:</strong> \\(s_j = \\min(2 \\lambda_{\\min}(\\Sigma), 1)\\) for all \\(j\\), where \\(\\lambda_{\\min}(\\Sigma)\\) is the smallest eigenvalue of \\(\\Sigma\\).</li>
                            <li><strong>SDP (semidefinite program):</strong> Maximize \\(\\sum_j s_j\\) subject to \\(\\text{diag}(s) \\preceq 2\\Sigma\\), \\(s \\geq 0\\). This maximizes the average gap and generally yields better power.</li>
                        </ul>
                    </div>
                </div>

                <h3>Key Properties of Model-X Knockoffs</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 13.11 (Model-X FDR Control)</div>
                    <div class="env-body">
                        <p>Suppose \\(\\tilde{X}\\) are valid model-X knockoffs and \\(W = (W_1, \\ldots, W_p)\\) is any knockoff statistic satisfying the flip-sign property. Define the knockoff threshold (see Section 5). Then the set of selected variables \\(\\hat{S} = \\{j: W_j \\geq \\tau\\}\\) satisfies:</p>
                        <p>\\[\\text{FDR} = \\mathbb{E}\\left[\\frac{|\\hat{S} \\cap \\mathcal{H}_0|}{|\\hat{S}| \\vee 1}\\right] \\leq q\\]</p>
                        <p>where \\(q\\) is the target FDR level and \\(\\mathcal{H}_0 = \\{j: \\beta_j = 0\\}\\) is the set of null variables. This holds <strong>without any assumptions on the conditional distribution</strong> \\(y \\mid X\\).</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning: Knowledge of the Covariate Distribution</div>
                    <div class="env-body">
                        <p>Model-X knockoffs require <em>exact knowledge</em> of the distribution of \\(X\\). In practice, \\(F_X\\) is estimated from the data (e.g., fitting a Gaussian with sample covariance), which introduces an additional approximation. Recent work studies the robustness of knockoffs to misspecification of \\(F_X\\), showing that moderate misspecification can inflate the FDR, but the framework is reasonably robust for well-estimated covariance structures.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 13.12 (Model-X vs. Fixed-X)</div>
                    <div class="env-body">
                        <p>Consider \\(n = 300\\), \\(p = 1000\\), \\(X \\sim \\mathcal{N}(0, I_p)\\), and \\(y = X\\beta + \\varepsilon\\) with \\(\\|\\beta\\|_0 = 20\\). The fixed-X knockoff requires \\(n \\geq 2000\\), so it cannot be applied. Model-X knockoffs, however, use the known \\(\\Sigma = I\\) to construct \\(\\tilde{X}\\) with independent Gaussian entries having correlation \\(1 - s\\) with their originals. The knockoff filter can then control FDR at level \\(q = 0.1\\) while discovering a large fraction of the true signals.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Verify that the Gaussian knockoff construction in Theorem 13.10 produces knockoffs satisfying the exchangeability condition. Specifically, show that for any \\(j\\), swapping \\(X_j\\) and \\(\\tilde{X}_j\\) does not change the joint distribution of \\((X, \\tilde{X})\\).',
                    hint: 'Compute the joint covariance matrix of \\((X, \\tilde{X})\\) and show it is invariant under the permutation that swaps coordinate \\(j\\) with coordinate \\(p + j\\).',
                    solution: 'The joint covariance is \\(\\begin{pmatrix} \\Sigma & \\Sigma - D_s \\\\ \\Sigma - D_s & \\Sigma \\end{pmatrix}\\) where \\(D_s = \\text{diag}(s)\\). Swapping \\(X_j \\leftrightarrow \\tilde{X}_j\\) permutes rows/columns \\(j\\) and \\(p+j\\). The diagonal blocks are both \\(\\Sigma\\), so they are unchanged. In the off-diagonal block, the \\((j, j)\\) entry is \\(\\Sigma_{jj} - s_j\\), and after the swap it becomes the \\((p+j, p+j)\\) entry of the off-diagonal block, which is also \\(\\Sigma_{jj} - s_j\\). Off-diagonal entries \\((j, k)\\) with \\(k \\neq j\\) equal \\(\\Sigma_{jk}\\) (since \\(D_s\\) is diagonal), and after the swap they become \\((p+j, k)\\), which by symmetry of the blocks also equals \\(\\Sigma_{jk}\\). Since the mean is zero, the Gaussian joint distribution is determined by the covariance, confirming exchangeability.'
                }
            ]
        },

        // ============================================================
        // SECTION 5: Knockoff Statistics & Threshold
        // ============================================================
        {
            id: 'ch13-sec05',
            title: 'Knockoff Statistics & Threshold',
            content: `
                <h2>Knockoff Statistics and the FDR Threshold</h2>

                <p>The power of the knockoff filter depends on two ingredients: the choice of <strong>knockoff statistic</strong> \\(W_j\\), which measures the importance of each variable relative to its knockoff, and the <strong>threshold</strong> \\(\\tau\\), which determines which variables to select.</p>

                <h3>Knockoff Statistics</h3>

                <p>A knockoff statistic \\(W_j\\) should be large and positive when \\(X_j\\) is a genuine signal (i.e., \\(\\beta_j \\neq 0\\)) and should be approximately symmetric around zero for null variables.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.13 (Valid Knockoff Statistic)</div>
                    <div class="env-body">
                        <p>A vector of statistics \\(W = (W_1, \\ldots, W_p)\\) is a <strong>valid knockoff statistic</strong> if it depends on \\(y\\), \\(X\\), and \\(\\tilde{X}\\) only through the pair \\((X, \\tilde{X})\\) and \\(y\\), and satisfies:</p>
                        <p><strong>Flip-sign property:</strong> Let \\(W(S)\\) denote the knockoff statistics computed after swapping \\(X_j \\leftrightarrow \\tilde{X}_j\\) for all \\(j \\in S\\). Then for any \\(S \\subseteq \\{1, \\ldots, p\\}\\):</p>
                        <p>\\[W_j(S) = \\begin{cases} W_j & \\text{if } j \\notin S, \\\\ -W_j & \\text{if } j \\in S. \\end{cases}\\]</p>
                    </div>
                </div>

                <h4>Common Knockoff Statistics</h4>

                <p>Several choices of \\(W_j\\) have been proposed and studied:</p>

                <div class="env-block example">
                    <div class="env-title">Example 13.14 (Lasso Coefficient Difference &mdash; LCD)</div>
                    <div class="env-body">
                        <p>Run the Lasso on the augmented design \\([X, \\tilde{X}]\\) against \\(y\\) with a fixed \\(\\lambda\\), yielding coefficients \\((\\hat{\\beta}_1, \\ldots, \\hat{\\beta}_p, \\hat{\\beta}_{p+1}, \\ldots, \\hat{\\beta}_{2p})\\). Define:</p>
                        <p>\\[W_j^{\\text{LCD}} = |\\hat{\\beta}_j| - |\\hat{\\beta}_{p+j}|\\]</p>
                        <p>A large positive \\(W_j\\) means that the Lasso assigned a much larger coefficient to \\(X_j\\) than to its knockoff \\(\\tilde{X}_j\\), suggesting \\(X_j\\) is a true signal.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 13.15 (Lasso Signed Max &mdash; LSM)</div>
                    <div class="env-body">
                        <p>Run the Lasso path on \\([X, \\tilde{X}]\\) and record \\(Z_j\\) and \\(\\tilde{Z}_j\\), the values of \\(\\lambda\\) at which \\(X_j\\) and \\(\\tilde{X}_j\\) first enter the model, respectively. Define:</p>
                        <p>\\[W_j^{\\text{LSM}} = \\max(Z_j, \\tilde{Z}_j) \\cdot \\text{sign}(Z_j - \\tilde{Z}_j)\\]</p>
                        <p>This statistic is positive and large when \\(X_j\\) enters the Lasso path much earlier (at higher \\(\\lambda\\)) than its knockoff.</p>
                    </div>
                </div>

                <h3>The Knockoff and Knockoff+ Thresholds</h3>

                <p>Given knockoff statistics \\(W_1, \\ldots, W_p\\) and a target FDR level \\(q \\in (0,1)\\), the knockoff filter determines a data-dependent threshold \\(\\tau\\) and selects variables \\(\\hat{S} = \\{j: W_j \\geq \\tau\\}\\).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.16 (Knockoff Threshold)</div>
                    <div class="env-body">
                        <p>For a candidate threshold \\(t &gt; 0\\), define the <strong>estimated false discovery proportion</strong>:</p>
                        <p>\\[\\widehat{\\text{FDP}}(t) = \\frac{\\#\\{j: W_j \\leq -t\\}}{\\#\\{j: W_j \\geq t\\} \\vee 1}.\\]</p>
                        <p>The <strong>knockoff threshold</strong> is:</p>
                        <p>\\[\\tau = \\min\\left\\{t &gt; 0: \\widehat{\\text{FDP}}(t) \\leq q\\right\\}\\]</p>
                        <p>with \\(\\tau = +\\infty\\) if no such \\(t\\) exists (selecting nothing).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Why the Threshold Works</div>
                    <div class="env-body">
                        <p>The key insight is that for a null variable \\(j\\), the statistic \\(W_j\\) has a symmetric distribution around zero (by the flip-sign property and the exchangeability of knockoffs). Therefore, \\(\\#\\{j \\in \\mathcal{H}_0: W_j \\leq -t\\}\\) has approximately the same expected value as \\(\\#\\{j \\in \\mathcal{H}_0: W_j \\geq t\\}\\). The total count \\(\\#\\{j: W_j \\leq -t\\}\\) is an observable proxy for the number of null variables above the threshold, giving us an estimate of the false discovery proportion.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 13.17 (Knockoff+ FDR Control &mdash; Barber &amp; Cand&egrave;s, 2015)</div>
                    <div class="env-body">
                        <p>A slightly modified <strong>knockoff+</strong> threshold adds 1 to the numerator:</p>
                        <p>\\[\\widehat{\\text{FDP}}^+(t) = \\frac{1 + \\#\\{j: W_j \\leq -t\\}}{\\#\\{j: W_j \\geq t\\} \\vee 1}\\]</p>
                        <p>and \\(\\tau^+ = \\min\\{t &gt; 0: \\widehat{\\text{FDP}}^+(t) \\leq q\\}\\). Then the selected set \\(\\hat{S} = \\{j: W_j \\geq \\tau^+\\}\\) satisfies:</p>
                        <p>\\[\\text{FDR} = \\mathbb{E}\\!\\left[\\frac{|\\hat{S} \\cap \\mathcal{H}_0|}{|\\hat{S}| \\vee 1}\\right] \\leq q.\\]</p>
                        <p>This holds in <strong>finite samples</strong> without any asymptotic approximation.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>The proof relies on the following key facts:</p>
                        <ol>
                            <li>For null variables \\(j \\in \\mathcal{H}_0\\), the signs \\(\\text{sign}(W_j)\\) are i.i.d. symmetric random variables (equally likely \\(+1\\) or \\(-1\\)), independent of \\(|W_j|\\).</li>
                            <li>The signs of null \\(W_j\\)'s are also independent of the \\(W_k\\) for non-null \\(k\\).</li>
                        </ol>
                        <p>Fix any threshold \\(t\\) and let \\(V(t) = \\#\\{j \\in \\mathcal{H}_0: W_j \\geq t\\}\\) (false discoveries) and \\(R(t) = \\#\\{j: W_j \\geq t\\}\\) (total discoveries). By the sign symmetry, \\(\\mathbb{E}[V(t)] \\leq \\mathbb{E}[\\#\\{j: W_j \\leq -t\\}]\\). The "+1" in the knockoff+ numerator provides the needed margin for the super-martingale argument. A careful analysis using optional stopping yields \\(\\text{FDR} \\leq q\\).</p>
                        <p class="qed">&#8718;</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-knockoff-filter"></div>

                <h3>Comparison with BH Procedure</h3>

                <div class="env-block remark">
                    <div class="env-title">Remark: Knockoffs vs. Benjamini-Hochberg</div>
                    <div class="env-body">
                        <p>Both the knockoff filter and the BH procedure control FDR at level \\(q\\). However, they make very different assumptions:</p>
                        <ul>
                            <li><strong>BH procedure</strong> (Chapter 11) requires valid p-values, which in high dimensions is itself challenging (requiring, e.g., the debiased Lasso from Chapter 12).</li>
                            <li><strong>Knockoff filter</strong> does not require p-values at all. Instead, it leverages the knockoff construction to directly estimate the false discovery proportion. It makes no assumptions on \\(y \\mid X\\) (for model-X knockoffs) but requires knowledge of the distribution of \\(X\\).</li>
                        </ul>
                        <p>In practice, the knockoff filter often has competitive or superior power compared to BH applied to debiased Lasso p-values, especially when the signal is well-separated from zero.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: Software and Practice</div>
                    <div class="env-body">
                        <p>The knockoff filter is implemented in the R package <code>knockoff</code> and the Python package <code>knockpy</code>. In practice, one must: (1) estimate \\(\\Sigma\\) if not known, (2) choose \\(s\\) (equicorrelated or SDP), (3) generate knockoffs \\(\\tilde{X}\\), (4) choose a knockoff statistic (LCD or LSM), and (5) apply the knockoff+ threshold at the desired FDR level \\(q\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-knockoff-filter',
                    title: 'Knockoff Filter: Statistics and FDR Threshold',
                    description: 'Each bar shows the knockoff statistic W_j for a variable. Green bars are true signals; gray bars are nulls. The red dashed line is the knockoff+ threshold. Variables above the threshold are selected. The FDR is controlled below the target q.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 720, height: 500, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var targetQ = 0.2;
                        var signalStrength = 3.5;
                        var pDim = 40;
                        var pSignal = 8;
                        var seed = 123;

                        VizEngine.createSlider(controls, 'FDR q', 0.05, 0.5, 0.2, 0.05, function(v) { targetQ = parseFloat(v); draw(); });
                        VizEngine.createSlider(controls, 'Signal', 1, 6, 3.5, 0.5, function(v) { signalStrength = parseFloat(v); draw(); });
                        VizEngine.createButton(controls, 'Resample', function() { seed = Math.floor(Math.random() * 100000); draw(); });

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
                            return Math.sqrt(-2 * Math.log(u + 1e-15)) * Math.cos(2 * Math.PI * v);
                        }

                        function draw() {
                            viz.clear();
                            var rng = mulberry32(seed);

                            // Generate knockoff statistics
                            // True signals: W_j ~ N(signalStrength, 1)
                            // Nulls: W_j ~ N(0, 1) (symmetric around 0)
                            var W = [];
                            var isSignal = [];
                            for (var j = 0; j < pDim; j++) {
                                if (j < pSignal) {
                                    isSignal.push(true);
                                    W.push(signalStrength + randn(rng));
                                } else {
                                    isSignal.push(false);
                                    W.push(randn(rng));
                                }
                            }

                            // Compute knockoff+ threshold
                            // Sort |W| values descending to find threshold
                            var absW = W.map(function(w) { return Math.abs(w); });
                            var sortedAbsW = absW.slice().sort(function(a, b) { return b - a; });

                            var threshold = Infinity;
                            for (var ti = 0; ti < sortedAbsW.length; ti++) {
                                var t = sortedAbsW[ti];
                                if (t <= 0) continue;
                                var numAbove = 0, numBelow = 0;
                                for (var jj = 0; jj < pDim; jj++) {
                                    if (W[jj] >= t) numAbove++;
                                    if (W[jj] <= -t) numBelow++;
                                }
                                var fdpEst = (1 + numBelow) / Math.max(numAbove, 1);
                                if (fdpEst <= targetQ) {
                                    threshold = t;
                                    break;
                                }
                            }

                            // Selected set
                            var selected = [];
                            var nFP = 0, nTP = 0;
                            for (var jjj = 0; jjj < pDim; jjj++) {
                                if (W[jjj] >= threshold && threshold < Infinity) {
                                    selected.push(jjj);
                                    if (isSignal[jjj]) nTP++; else nFP++;
                                }
                            }
                            var actualFDP = selected.length > 0 ? nFP / selected.length : 0;

                            // Plot
                            var plotL = 70, plotR = 690, plotT = 70, plotB = 350;
                            var plotW = plotR - plotL, plotH = plotB - plotT;

                            // Find y range
                            var wMin = Math.min.apply(null, W);
                            var wMax = Math.max.apply(null, W);
                            var yRange = Math.max(Math.abs(wMin), Math.abs(wMax), 1) * 1.2;

                            function toPixY(w) { return plotT + plotH / 2 - (w / yRange) * (plotH / 2); }

                            var barW = Math.min(12, Math.floor(plotW / pDim) - 2);
                            var gap = (plotW - barW * pDim) / (pDim + 1);

                            // Zero line
                            var zeroY = toPixY(0);
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(plotL, zeroY); ctx.lineTo(plotR, zeroY); ctx.stroke();

                            // Threshold line
                            if (threshold < Infinity) {
                                var threshY = toPixY(threshold);
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([6, 4]);
                                ctx.beginPath(); ctx.moveTo(plotL, threshY); ctx.lineTo(plotR, threshY); ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = viz.colors.red;
                                ctx.font = 'bold 11px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'bottom';
                                ctx.fillText('threshold = ' + threshold.toFixed(2), plotR - 120, threshY - 3);
                            }

                            // Draw bars
                            for (var b = 0; b < pDim; b++) {
                                var x = plotL + gap + b * (barW + gap);
                                var y = toPixY(W[b]);
                                var h = Math.abs(y - zeroY);
                                var top = W[b] >= 0 ? y : zeroY;

                                var isSel = W[b] >= threshold && threshold < Infinity;
                                var color;
                                if (isSignal[b]) {
                                    color = isSel ? viz.colors.green : viz.colors.teal;
                                } else {
                                    color = isSel ? viz.colors.red : viz.colors.muted;
                                }

                                ctx.fillStyle = color + (isSel ? 'cc' : '88');
                                ctx.fillRect(x, top, barW, h);
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(x, top, barW, h);

                                // Label if selected (mark with star)
                                if (isSel) {
                                    ctx.fillStyle = color;
                                    ctx.font = 'bold 10px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'bottom';
                                    ctx.fillText('*', x + barW / 2, top - 2);
                                }
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(plotL, plotB); ctx.lineTo(plotR, plotB); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(plotL, plotT); ctx.lineTo(plotL, plotB); ctx.stroke();

                            // Y-axis ticks
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            var yStep = Math.max(1, Math.round(yRange / 3));
                            for (var yy = -Math.floor(yRange); yy <= Math.ceil(yRange); yy += yStep) {
                                var py = toPixY(yy);
                                if (py > plotT && py < plotB) {
                                    ctx.fillText(yy, plotL - 5, py);
                                    ctx.strokeStyle = viz.colors.grid || '#1a1a40';
                                    ctx.lineWidth = 0.5;
                                    ctx.beginPath(); ctx.moveTo(plotL, py); ctx.lineTo(plotR, py); ctx.stroke();
                                }
                            }

                            // X-axis label
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Variable index j', (plotL + plotR) / 2, plotB + 8);

                            // Y-axis label
                            ctx.save();
                            ctx.translate(18, (plotT + plotB) / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.textAlign = 'center';
                            ctx.fillText('Knockoff statistic W_j', 0, 0);
                            ctx.restore();

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Knockoff Filter: W Statistics and Threshold (knockoff+)', (plotL + plotR) / 2, 16);

                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('p = ' + pDim + ',  signals = ' + pSignal + ' (indices 0-' + (pSignal - 1) + '),  target FDR q = ' + targetQ.toFixed(2), (plotL + plotR) / 2, 36);

                            // Legend
                            var legY = plotB + 30;
                            ctx.font = '11px -apple-system,sans-serif';

                            ctx.fillStyle = viz.colors.green;
                            ctx.fillRect(plotL + 20, legY, 12, 10);
                            ctx.fillText('True positive (signal, selected)', plotL + 38, legY + 9);

                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillRect(plotL + 240, legY, 12, 10);
                            ctx.textAlign = 'left';
                            ctx.fillText('Signal, not selected', plotL + 258, legY + 9);

                            ctx.fillStyle = viz.colors.red;
                            ctx.fillRect(plotL + 420, legY, 12, 10);
                            ctx.fillText('False positive (null, selected)', plotL + 438, legY + 9);

                            ctx.fillStyle = viz.colors.muted;
                            ctx.fillRect(plotL + 20, legY + 18, 12, 10);
                            ctx.fillText('Null, not selected', plotL + 38, legY + 27);

                            // FDR summary
                            var summaryY = legY + 48;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(
                                'Selected: ' + selected.length +
                                '  |  TP: ' + nTP +
                                '  |  FP: ' + nFP +
                                '  |  Actual FDP: ' + (actualFDP * 100).toFixed(1) + '%' +
                                (threshold < Infinity ? '  |  FDP <= q? ' + (actualFDP <= targetQ + 0.001 ? 'Yes' : 'No') : '  |  No selection'),
                                (plotL + plotR) / 2, summaryY
                            );

                            if (threshold === Infinity) {
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillText('No threshold found: no variables selected (try increasing signal strength)', (plotL + plotR) / 2, summaryY + 20);
                            }
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Explain why the "+1" in the knockoff+ numerator \\(\\widehat{\\text{FDP}}^+(t) = \\frac{1 + \\#\\{j: W_j \\leq -t\\}}{\\#\\{j: W_j \\geq t\\} \\vee 1}\\) is necessary for finite-sample FDR control. What goes wrong without it?',
                    hint: 'Consider a scenario where all null \\(W_j\\) happen to be positive. Then \\(\\#\\{j: W_j \\leq -t\\} = 0\\), so \\(\\widehat{\\text{FDP}}(t) = 0\\) for all \\(t\\), and the procedure selects at the smallest positive \\(W_j\\). Could this include false discoveries?',
                    solution: 'Without the "+1," if by chance all null \\(W_j > 0\\), the estimated FDP is zero for every threshold, and the procedure would select all variables with \\(W_j > 0\\), potentially including many false discoveries. The "+1" ensures that \\(\\widehat{\\text{FDP}}^+(t) \\geq 1 / (\\#\\{j: W_j \\geq t\\} \\vee 1) > 0\\), providing a conservative correction. Formally, the "+1" accounts for the fact that \\(\\#\\{j: W_j \\leq -t\\}\\) underestimates \\(\\#\\{j \\in \\mathcal{H}_0: W_j \\geq t\\}\\) on average by approximately 1 (due to the "coin-flip" nature of null statistics), and the correction is what makes the super-martingale argument go through for exact finite-sample FDR control.'
                },
                {
                    question: 'Verify that the Lasso Coefficient Difference statistic \\(W_j^{\\text{LCD}} = |\\hat{\\beta}_j| - |\\hat{\\beta}_{p+j}|\\) satisfies the flip-sign property. That is, if we swap \\(X_j \\leftrightarrow \\tilde{X}_j\\) in the design matrix, then \\(W_j^{\\text{LCD}}\\) changes sign.',
                    hint: 'After swapping \\(X_j \\leftrightarrow \\tilde{X}_j\\), column \\(j\\) of the augmented matrix becomes what was column \\(p+j\\) and vice versa. How does this affect the Lasso coefficients?',
                    solution: 'The Lasso objective depends on the design matrix only through its columns. After swapping \\(X_j \\leftrightarrow \\tilde{X}_j\\), the augmented matrix \\([X, \\tilde{X}]\\) has columns \\(j\\) and \\(p+j\\) exchanged. By the exchangeability of knockoffs (the Gram matrix is invariant under swaps), the Lasso solution on the swapped matrix has \\(\\hat{\\beta}_j^{\\text{swap}} = \\hat{\\beta}_{p+j}\\) and \\(\\hat{\\beta}_{p+j}^{\\text{swap}} = \\hat{\\beta}_j\\). Therefore, \\(W_j^{\\text{LCD, swap}} = |\\hat{\\beta}_j^{\\text{swap}}| - |\\hat{\\beta}_{p+j}^{\\text{swap}}| = |\\hat{\\beta}_{p+j}| - |\\hat{\\beta}_j| = -W_j^{\\text{LCD}}\\), confirming the flip-sign property. For \\(k \\neq j\\), the symmetry of the Gram matrix ensures \\(W_k\\) is unchanged.'
                }
            ]
        }
    ]
});
