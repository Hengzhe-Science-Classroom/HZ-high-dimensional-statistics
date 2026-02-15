window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch09',
    number: 9,
    title: 'Lasso Variants & Extensions',
    subtitle: 'Dantzig selector, elastic net, group Lasso, and non-convex penalties',
    sections: [
        // ================================================================
        // SECTION 1: Dantzig Selector & Square-Root Lasso
        // ================================================================
        {
            id: 'ch09-sec01',
            title: 'Dantzig Selector & Square-Root Lasso',
            content: `
                <h2>Dantzig Selector &amp; Square-Root Lasso</h2>

                <p>In Chapter 8 we studied the Lasso estimator, which regularizes least-squares by adding an \\\\(\\\\ell_1\\\\) penalty. The Lasso requires choosing a tuning parameter \\\\(\\\\lambda\\\\) that depends on the unknown noise level \\\\(\\\\sigma\\\\). In this section we introduce two <strong>pivotal</strong> alternatives whose theoretical guarantees do not require knowledge of \\\\(\\\\sigma\\\\).</p>

                <h3>The Dantzig Selector</h3>

                <p>The Dantzig selector, introduced by Cand&egrave;s and Tao (2007), takes a strikingly different approach from the Lasso. Instead of penalizing the \\\\(\\\\ell_1\\\\) norm in the objective, it <em>minimizes</em> the \\\\(\\\\ell_1\\\\) norm subject to a constraint on the residual correlations.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 9.1 &mdash; Dantzig Selector</div>
                    <div class="env-body">
                        <p>Given observations \\\\(y = X\\\\beta^* + w\\\\) with \\\\(X \\\\in \\\\mathbb{R}^{n \\\\times p}\\\\), the <strong>Dantzig selector</strong> is defined as:</p>
                        \\\\[
                            \\\\hat{\\\\beta}^{\\\\mathrm{DS}} = \\\\arg\\\\min_{\\\\beta \\\\in \\\\mathbb{R}^p} \\\\|\\\\beta\\\\|_1 \\\\quad \\\\text{subject to} \\\\quad \\\\left\\\\|\\\\frac{X^\\\\top(y - X\\\\beta)}{n}\\\\right\\\\|_\\\\infty \\\\leq \\\\lambda.
                        \\\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The constraint \\\\(\\\\|X^\\\\top(y - X\\\\beta)/n\\\\|_\\\\infty \\\\leq \\\\lambda\\\\) requires that the residual \\\\(y - X\\\\beta\\\\) has small correlation with every column of \\\\(X\\\\). If the true \\\\(\\\\beta^*\\\\) is sparse, then \\\\(X^\\\\top w/n\\\\) should be small in \\\\(\\\\ell_\\\\infty\\\\) norm (by concentration), so the true parameter is feasible. Among all feasible vectors, we pick the sparsest one (in \\\\(\\\\ell_1\\\\) sense).</p>
                    </div>
                </div>

                <p>The Dantzig selector is a <strong>linear program</strong>, which can be solved efficiently. This is one of its computational advantages over the Lasso, which is a quadratic program.</p>

                <h3>Equivalence with the Lasso</h3>

                <p>A remarkable result, due to Bickel, Ritov, and Tsybakov (2009), shows that the Lasso and Dantzig selector are closely related.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.1 &mdash; Lasso&ndash;Dantzig Equivalence (Bickel, Ritov, Tsybakov 2009)</div>
                    <div class="env-body">
                        <p>Under the restricted eigenvalue condition on \\\\(X\\\\), with the same choice of \\\\(\\\\lambda \\\\geq 2\\\\|X^\\\\top w/n\\\\|_\\\\infty\\\\), both the Lasso estimator \\\\(\\\\hat{\\\\beta}^{\\\\mathrm{L}}\\\\) and the Dantzig selector \\\\(\\\\hat{\\\\beta}^{\\\\mathrm{DS}}\\\\) satisfy:</p>
                        \\\\[
                            \\\\|\\\\hat{\\\\beta} - \\\\beta^*\\\\|_2 \\\\leq C \\\\lambda \\\\frac{\\\\sqrt{s}}{\\\\kappa}, \\\\qquad \\\\|\\\\hat{\\\\beta} - \\\\beta^*\\\\|_1 \\\\leq C \\\\lambda \\\\frac{s}{\\\\kappa^2},
                        \\\\]
                        <p>where \\\\(s = \\\\|\\\\beta^*\\\\|_0\\\\) is the sparsity level and \\\\(\\\\kappa\\\\) is the restricted eigenvalue constant.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The key difference is operational: the Lasso KKT condition says \\\\(X^\\\\top(y - X\\\\hat{\\\\beta})/n \\\\in \\\\lambda \\\\cdot \\\\partial\\\\|\\\\hat{\\\\beta}\\\\|_1\\\\), while the Dantzig constraint says \\\\(\\\\|X^\\\\top(y - X\\\\hat{\\\\beta})/n\\\\|_\\\\infty \\\\leq \\\\lambda\\\\). The Lasso satisfies the Dantzig constraint automatically, and conversely the Dantzig selector nearly satisfies the Lasso KKT conditions.</p>
                    </div>
                </div>

                <h3>The Square-Root Lasso</h3>

                <p>A major practical limitation of the standard Lasso is that the optimal choice \\\\(\\\\lambda \\\\asymp \\\\sigma\\\\sqrt{\\\\log p / n}\\\\) requires knowledge of \\\\(\\\\sigma\\\\). The <strong>square-root Lasso</strong> (Belloni, Chernozhukov, and Wang, 2011) elegantly removes this dependence.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 9.2 &mdash; Square-Root Lasso</div>
                    <div class="env-body">
                        <p>The <strong>square-root Lasso</strong> (also called the scaled Lasso) is defined as:</p>
                        \\\\[
                            \\\\hat{\\\\beta}^{\\\\mathrm{SR}} = \\\\arg\\\\min_{\\\\beta \\\\in \\\\mathbb{R}^p} \\\\left\\\\{ \\\\frac{\\\\|y - X\\\\beta\\\\|_2}{\\\\sqrt{n}} + \\\\lambda \\\\|\\\\beta\\\\|_1 \\\\right\\\\}.
                        \\\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition &mdash; Why is it Pivotal?</div>
                    <div class="env-body">
                        <p>The standard Lasso minimizes \\\\(\\\\|y - X\\\\beta\\\\|_2^2/(2n) + \\\\lambda\\\\|\\\\beta\\\\|_1\\\\). By the KKT conditions, the optimal \\\\(\\\\lambda\\\\) is proportional to \\\\(\\\\sigma\\\\). In the square-root Lasso, the loss is \\\\(\\\\|y - X\\\\beta\\\\|_2/\\\\sqrt{n}\\\\) (not squared). This makes the objective <strong>homogeneous of degree 1</strong> in \\\\((y, \\\\lambda)\\\\). Consider scaling \\\\(y \\\\to cy\\\\): both the loss and the penalty scale linearly, so the KKT condition for the optimal \\\\(\\\\lambda\\\\) becomes independent of \\\\(\\\\sigma\\\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.2 &mdash; Square-Root Lasso: Pivotal Bound</div>
                    <div class="env-body">
                        <p>Suppose the columns of \\\\(X\\\\) satisfy \\\\(\\\\|X_j\\\\|_2/\\\\sqrt{n} \\\\leq 1\\\\) for all \\\\(j\\\\), and the restricted eigenvalue condition holds. Then with the universal choice</p>
                        \\\\[
                            \\\\lambda = c_0 \\\\sqrt{\\\\frac{\\\\log p}{n}}
                        \\\\]
                        <p>(where \\\\(c_0\\\\) is an absolute constant, independent of \\\\(\\\\sigma\\\\)), the square-root Lasso satisfies</p>
                        \\\\[
                            \\\\|\\\\hat{\\\\beta}^{\\\\mathrm{SR}} - \\\\beta^*\\\\|_2 \\\\leq C \\\\sigma \\\\sqrt{\\\\frac{s \\\\log p}{n}}
                        \\\\]
                        <p>with high probability. The rate is identical to the Lasso, but \\\\(\\\\lambda\\\\) does <em>not</em> depend on \\\\(\\\\sigma\\\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>The KKT conditions for the square-root Lasso read:</p>
                        \\\\[
                            \\\\frac{X^\\\\top(y - X\\\\hat{\\\\beta})}{n \\\\cdot \\\\|y - X\\\\hat{\\\\beta}\\\\|_2 / \\\\sqrt{n}} \\\\in \\\\lambda \\\\cdot \\\\partial\\\\|\\\\hat{\\\\beta}\\\\|_1.
                        \\\\]
                        <p>The denominator \\\\(\\\\|y - X\\\\hat{\\\\beta}\\\\|_2 / \\\\sqrt{n}\\\\) acts as a <strong>self-normalizing</strong> estimate of \\\\(\\\\sigma\\\\). Indeed, one can show that \\\\(\\\\|y - X\\\\hat{\\\\beta}\\\\|_2 / \\\\sqrt{n} \\\\asymp \\\\sigma\\\\) under the sparsity assumption. This converts the problem back to one resembling the Lasso with the correct \\\\(\\\\sigma\\\\)-dependent scaling, without needing to know \\\\(\\\\sigma\\\\) in advance.</p>
                        <div class="qed">&squ;</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 9.1 &mdash; Practical Comparison</div>
                    <div class="env-body">
                        <p>Consider the linear model \\\\(y = X\\\\beta^* + \\\\sigma w\\\\) with \\\\(n = 200\\\\), \\\\(p = 500\\\\), \\\\(s = 10\\\\), and varying \\\\(\\\\sigma \\\\in \\\\{0.5, 1, 2, 5\\\\}\\\\).</p>
                        <ul>
                            <li><strong>Standard Lasso</strong> with fixed \\\\(\\\\lambda\\\\): performance degrades significantly as \\\\(\\\\sigma\\\\) changes.</li>
                            <li><strong>Standard Lasso</strong> with oracle \\\\(\\\\lambda = \\\\sigma\\\\sqrt{2\\\\log p / n}\\\\): near-optimal but requires knowing \\\\(\\\\sigma\\\\).</li>
                            <li><strong>Square-root Lasso</strong> with universal \\\\(\\\\lambda\\\\): performance matches the oracle Lasso across all \\\\(\\\\sigma\\\\) values.</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that the Lasso solution \\\\(\\\\hat{\\\\beta}^{\\\\mathrm{L}}\\\\) satisfies the Dantzig constraint \\\\(\\\\|X^\\\\top(y - X\\\\hat{\\\\beta}^{\\\\mathrm{L}})/n\\\\|_\\\\infty \\\\leq \\\\lambda\\\\). <em>Hint:</em> Use the KKT conditions of the Lasso.',
                    hint: 'The KKT conditions for the Lasso state that \\\\(X^\\\\top(y - X\\\\hat{\\\\beta})/n = \\\\lambda \\\\cdot v\\\\) where \\\\(v \\\\in \\\\partial\\\\|\\\\hat{\\\\beta}\\\\|_1\\\\). What can you say about \\\\(\\\\|v\\\\|_\\\\infty\\\\) for a subgradient of the \\\\(\\\\ell_1\\\\) norm?',
                    solution: 'The Lasso KKT conditions give \\\\(X^\\\\top(y - X\\\\hat{\\\\beta})/n = \\\\lambda v\\\\) where \\\\(v \\\\in \\\\partial\\\\|\\\\hat{\\\\beta}\\\\|_1\\\\). The subdifferential of the \\\\(\\\\ell_1\\\\) norm at any point \\\\(\\\\beta\\\\) consists of vectors \\\\(v\\\\) with \\\\(v_j = \\\\mathrm{sign}(\\\\beta_j)\\\\) if \\\\(\\\\beta_j \\\\neq 0\\\\) and \\\\(v_j \\\\in [-1,1]\\\\) if \\\\(\\\\beta_j = 0\\\\). In either case \\\\(|v_j| \\\\leq 1\\\\), so \\\\(\\\\|v\\\\|_\\\\infty \\\\leq 1\\\\). Therefore \\\\(\\\\|X^\\\\top(y - X\\\\hat{\\\\beta})/n\\\\|_\\\\infty = \\\\lambda\\\\|v\\\\|_\\\\infty \\\\leq \\\\lambda\\\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 2: Elastic Net
        // ================================================================
        {
            id: 'ch09-sec02',
            title: 'Elastic Net',
            content: `
                <h2>Elastic Net</h2>

                <p>The Lasso has a well-known limitation: when predictors are highly correlated (forming groups), the Lasso tends to select only one predictor from each group and ignore the rest. The <strong>elastic net</strong> (Zou and Hastie, 2005) addresses this by combining \\\\(\\\\ell_1\\\\) and \\\\(\\\\ell_2\\\\) penalties.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 9.3 &mdash; Elastic Net</div>
                    <div class="env-body">
                        <p>The <strong>elastic net</strong> estimator is defined as:</p>
                        \\\\[
                            \\\\hat{\\\\beta}^{\\\\mathrm{EN}} = \\\\arg\\\\min_{\\\\beta \\\\in \\\\mathbb{R}^p} \\\\left\\\\{ \\\\frac{\\\\|y - X\\\\beta\\\\|_2^2}{2n} + \\\\lambda_1 \\\\|\\\\beta\\\\|_1 + \\\\frac{\\\\lambda_2}{2} \\\\|\\\\beta\\\\|_2^2 \\\\right\\\\}.
                        \\\\]
                        <p>Equivalently, with mixing parameter \\\\(\\\\alpha \\\\in [0, 1]\\\\):</p>
                        \\\\[
                            \\\\hat{\\\\beta}^{\\\\mathrm{EN}} = \\\\arg\\\\min_{\\\\beta} \\\\left\\\\{ \\\\frac{\\\\|y - X\\\\beta\\\\|_2^2}{2n} + \\\\lambda \\\\left[ \\\\alpha \\\\|\\\\beta\\\\|_1 + \\\\frac{1 - \\\\alpha}{2} \\\\|\\\\beta\\\\|_2^2 \\\\right] \\\\right\\\\}.
                        \\\\]
                        <p>When \\\\(\\\\alpha = 1\\\\), this reduces to the Lasso; when \\\\(\\\\alpha = 0\\\\), to ridge regression.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-penalties"></div>

                <h3>Geometric Interpretation</h3>

                <p>The penalty set \\\\(\\\\{\\\\beta : \\\\alpha\\\\|\\\\beta\\\\|_1 + (1-\\\\alpha)\\\\|\\\\beta\\\\|_2^2/2 \\\\leq t\\\\}\\\\) interpolates between the diamond (\\\\(\\\\ell_1\\\\) ball) and the sphere (\\\\(\\\\ell_2\\\\) ball). The corners of the diamond are rounded but not eliminated, which means:</p>

                <ul>
                    <li>The elastic net still produces <strong>sparse</strong> solutions (due to the \\\\(\\\\ell_1\\\\) component).</li>
                    <li>Correlated predictors receive <strong>similar coefficients</strong> (due to the \\\\(\\\\ell_2\\\\) component &mdash; the <em>grouping effect</em>).</li>
                </ul>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.3 &mdash; Grouping Effect (Zou &amp; Hastie 2005)</div>
                    <div class="env-body">
                        <p>Suppose the data are standardized so that \\\\(\\\\|X_j\\\\|_2^2 = n\\\\) for all \\\\(j\\\\). Let \\\\(\\\\hat{\\\\beta}^{\\\\mathrm{EN}}\\\\) be the elastic net solution. If \\\\(\\\\hat{\\\\beta}_j^{\\\\mathrm{EN}} \\\\cdot \\\\hat{\\\\beta}_k^{\\\\mathrm{EN}} &gt; 0\\\\) (same sign), then:</p>
                        \\\\[
                            |\\\\hat{\\\\beta}_j^{\\\\mathrm{EN}} - \\\\hat{\\\\beta}_k^{\\\\mathrm{EN}}| \\\\leq \\\\frac{\\\\|y\\\\|_2}{\\\\lambda_2} \\\\cdot \\\\sqrt{\\\\frac{2(1 - \\\\rho_{jk})}{n}},
                        \\\\]
                        <p>where \\\\(\\\\rho_{jk} = X_j^\\\\top X_k / n\\\\) is the sample correlation. Thus highly correlated predictors (\\\\(\\\\rho_{jk} \\\\approx 1\\\\)) receive nearly identical coefficients.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>The KKT conditions for the elastic net yield, for each active variable \\\\(j\\\\) (where \\\\(\\\\hat{\\\\beta}_j \\\\neq 0\\\\)):</p>
                        \\\\[
                            \\\\frac{X_j^\\\\top(y - X\\\\hat{\\\\beta})}{n} = \\\\lambda_1 \\\\mathrm{sign}(\\\\hat{\\\\beta}_j) + \\\\lambda_2 \\\\hat{\\\\beta}_j.
                        \\\\]
                        <p>Taking the difference for variables \\\\(j\\\\) and \\\\(k\\\\) with the same sign:</p>
                        \\\\[
                            \\\\frac{(X_j - X_k)^\\\\top(y - X\\\\hat{\\\\beta})}{n} = \\\\lambda_2(\\\\hat{\\\\beta}_j - \\\\hat{\\\\beta}_k).
                        \\\\]
                        <p>By Cauchy&ndash;Schwarz:</p>
                        \\\\[
                            \\\\lambda_2|\\\\hat{\\\\beta}_j - \\\\hat{\\\\beta}_k| \\\\leq \\\\frac{\\\\|X_j - X_k\\\\|_2 \\\\cdot \\\\|y - X\\\\hat{\\\\beta}\\\\|_2}{n} \\\\leq \\\\frac{\\\\|X_j - X_k\\\\|_2 \\\\cdot \\\\|y\\\\|_2}{n}.
                        \\\\]
                        <p>Since \\\\(\\\\|X_j - X_k\\\\|_2^2 = 2n(1 - \\\\rho_{jk})\\\\), we obtain the result.</p>
                        <div class="qed">&squ;</div>
                    </div>
                </div>

                <h3>Elastic Net via Augmented Data</h3>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 9.4 &mdash; Augmented Representation</div>
                    <div class="env-body">
                        <p>The elastic net problem is equivalent to a Lasso problem on augmented data:</p>
                        \\\\[
                            \\\\tilde{y} = \\\\begin{pmatrix} y \\\\\\\\ 0_p \\\\end{pmatrix}, \\\\quad \\\\tilde{X} = \\\\frac{1}{\\\\sqrt{1 + \\\\lambda_2}} \\\\begin{pmatrix} X \\\\\\\\ \\\\sqrt{\\\\lambda_2 n} \\\\, I_p \\\\end{pmatrix}.
                        \\\\]
                        <p>That is, \\\\(\\\\hat{\\\\beta}^{\\\\mathrm{EN}} = \\\\sqrt{1 + \\\\lambda_2} \\\\cdot \\\\hat{\\\\beta}^{\\\\mathrm{Lasso}}(\\\\tilde{y}, \\\\tilde{X}; \\\\tilde{\\\\lambda})\\\\) with \\\\(\\\\tilde{\\\\lambda} = \\\\lambda_1 / \\\\sqrt{1 + \\\\lambda_2}\\\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark &mdash; Effective Restricted Eigenvalue</div>
                    <div class="env-body">
                        <p>The augmented design \\\\(\\\\tilde{X}\\\\) has Gram matrix \\\\(\\\\tilde{X}^\\\\top \\\\tilde{X} / \\\\tilde{n} \\\\propto X^\\\\top X/n + \\\\lambda_2 I\\\\). The \\\\(\\\\ell_2\\\\) penalty shifts all eigenvalues upward by \\\\(\\\\lambda_2\\\\), so the restricted eigenvalue condition holds automatically with \\\\(\\\\kappa^2 \\\\geq \\\\lambda_2\\\\). This explains why the elastic net is better conditioned than the Lasso when columns of \\\\(X\\\\) are correlated.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-lasso-path"></div>

                <h3>Statistical Properties</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.5 &mdash; Elastic Net Prediction Bound</div>
                    <div class="env-body">
                        <p>Under sub-Gaussian noise and the elastic net with \\\\(\\\\lambda_1 \\\\asymp \\\\sigma\\\\sqrt{\\\\log p / n}\\\\), \\\\(\\\\lambda_2 &gt; 0\\\\):</p>
                        \\\\[
                            \\\\frac{\\\\|X(\\\\hat{\\\\beta}^{\\\\mathrm{EN}} - \\\\beta^*)\\\\|_2^2}{n} + \\\\lambda_2 \\\\|\\\\hat{\\\\beta}^{\\\\mathrm{EN}} - \\\\beta^*\\\\|_2^2 \\\\leq C \\\\sigma^2 \\\\frac{s \\\\log p}{n} + \\\\lambda_2 \\\\|\\\\beta^*\\\\|_2^2.
                        \\\\]
                        <p>The first term is the usual Lasso rate. The second term is a <strong>bias</strong> introduced by the ridge component, which is small when \\\\(\\\\|\\\\beta^*\\\\|_2\\\\) is moderate.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-penalties',
                    title: 'Penalty Function Gallery & Thresholding Operators',
                    description: 'Compare L1, L2, elastic net, SCAD, and MCP penalty shapes (left) and their corresponding thresholding operators (right). Adjust the penalty parameter and mixing ratio.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 800, height: 400, scale: 50, originX: 200, originY: 350 });
                        var ctx = viz.ctx;
                        var lambda = 1.0;
                        var alpha = 0.5;
                        var gamma = 3.0;

                        VizEngine.createSlider(controls, '\u03bb', 0.2, 3.0, 1.0, 0.1, function(v) { lambda = v; });
                        VizEngine.createSlider(controls, '\u03b1 (EN mix)', 0.0, 1.0, 0.5, 0.05, function(v) { alpha = v; });
                        VizEngine.createSlider(controls, '\u03b3 (SCAD/MCP)', 1.5, 6.0, 3.0, 0.1, function(v) { gamma = v; });

                        function penL1(t) { return lambda * Math.abs(t); }
                        function penL2(t) { return 0.5 * lambda * t * t; }
                        function penEN(t) { return lambda * (alpha * Math.abs(t) + (1 - alpha) * 0.5 * t * t); }
                        function penSCAD(t) {
                            var at = Math.abs(t);
                            if (at <= lambda) return lambda * at;
                            if (at <= gamma * lambda) return -(at * at - 2 * gamma * lambda * at + lambda * lambda) / (2 * (gamma - 1));
                            return (gamma + 1) * lambda * lambda / 2;
                        }
                        function penMCP(t) {
                            var at = Math.abs(t);
                            if (at <= gamma * lambda) return lambda * at - at * at / (2 * gamma);
                            return gamma * lambda * lambda / 2;
                        }

                        // Thresholding operators
                        function threshSoft(z) {
                            if (z > lambda) return z - lambda;
                            if (z < -lambda) return z + lambda;
                            return 0;
                        }
                        function threshRidge(z) { return z / (1 + lambda); }
                        function threshEN(z) {
                            var l1 = lambda * alpha;
                            var l2 = lambda * (1 - alpha);
                            if (z > l1) return (z - l1) / (1 + l2);
                            if (z < -l1) return (z + l1) / (1 + l2);
                            return 0;
                        }
                        function threshSCAD(z) {
                            var az = Math.abs(z);
                            var sg = z >= 0 ? 1 : -1;
                            if (az <= 2 * lambda) return threshSoft(z);
                            if (az <= gamma * lambda) return sg * ((gamma - 1) * az - gamma * lambda) / (gamma - 2);
                            return z;
                        }
                        function threshMCP(z) {
                            var az = Math.abs(z);
                            var sg = z >= 0 ? 1 : -1;
                            if (az <= lambda) return 0;
                            if (az <= gamma * lambda) return sg * gamma * (az - lambda) / (gamma - 1);
                            return z;
                        }

                        function drawCurve(func, xMin, xMax, color, lw, offsetX) {
                            ctx.strokeStyle = color;
                            ctx.lineWidth = lw || 2;
                            ctx.beginPath();
                            var steps = 300;
                            for (var i = 0; i <= steps; i++) {
                                var t = xMin + (xMax - xMin) * i / steps;
                                var px = offsetX + (t - xMin) / (xMax - xMin) * 350;
                                var py = 350 - func(t) * 50;
                                if (py < 10) py = 10;
                                if (i === 0) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();
                        }

                        function draw() {
                            viz.clear();
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, 800, 400);

                            // Penalty panel (left half)
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(25, 350); ctx.lineTo(375, 350); ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(200, 350); ctx.lineTo(200, 20); ctx.stroke();

                            // Grid lines for penalty panel
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var g = 1; g <= 6; g++) {
                                var gy = 350 - g * 50;
                                if (gy > 10) { ctx.beginPath(); ctx.moveTo(25, gy); ctx.lineTo(375, gy); ctx.stroke(); }
                            }

                            drawCurve(penL1, -3.5, 3.5, viz.colors.blue, 2.5, 25);
                            drawCurve(penL2, -3.5, 3.5, viz.colors.purple, 2, 25);
                            drawCurve(penEN, -3.5, 3.5, viz.colors.teal, 2.5, 25);
                            drawCurve(penSCAD, -3.5, 3.5, viz.colors.orange, 2.5, 25);
                            drawCurve(penMCP, -3.5, 3.5, viz.colors.red, 2.5, 25);

                            // Thresholding panel (right half)
                            var ox2 = 425;
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(ox2, 200); ctx.lineTo(ox2 + 350, 200); ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(ox2 + 175, 20); ctx.lineTo(ox2 + 175, 380); ctx.stroke();

                            // 45-degree reference
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(ox2, 380); ctx.lineTo(ox2 + 350, 20); ctx.stroke();
                            ctx.setLineDash([]);

                            function drawThreshCurve(func, color, lw) {
                                ctx.strokeStyle = color;
                                ctx.lineWidth = lw || 2;
                                ctx.beginPath();
                                var steps = 300;
                                var xMin = -3.5, xMax = 3.5;
                                for (var i = 0; i <= steps; i++) {
                                    var t = xMin + (xMax - xMin) * i / steps;
                                    var val = func(t);
                                    var px = ox2 + (t - xMin) / (xMax - xMin) * 350;
                                    var py = 200 - val * (350 / 7);
                                    if (i === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                            }

                            drawThreshCurve(threshSoft, viz.colors.blue, 2.5);
                            drawThreshCurve(threshRidge, viz.colors.purple, 2);
                            drawThreshCurve(threshEN, viz.colors.teal, 2.5);
                            drawThreshCurve(threshSCAD, viz.colors.orange, 2.5);
                            drawThreshCurve(threshMCP, viz.colors.red, 2.5);

                            // Labels
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('Penalty p\u03bb(\u03b2)', 200, 14);
                            ctx.fillText('Thresholding \u03b7\u03bb(z)', ox2 + 175, 14);

                            // Legend
                            var legY = 30;
                            var legItems = [
                                { name: 'L1 (Lasso)', color: viz.colors.blue },
                                { name: 'L2 (Ridge)', color: viz.colors.purple },
                                { name: 'Elastic Net', color: viz.colors.teal },
                                { name: 'SCAD', color: viz.colors.orange },
                                { name: 'MCP', color: viz.colors.red }
                            ];
                            ctx.textAlign = 'left';
                            ctx.font = '11px -apple-system,sans-serif';
                            for (var li = 0; li < legItems.length; li++) {
                                ctx.fillStyle = legItems[li].color;
                                ctx.fillRect(30, legY + li * 16, 12, 3);
                                ctx.fillText(legItems[li].name, 48, legY + li * 16 + 4);
                            }

                            // Axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('\u03b2', 375, 365);
                            ctx.fillText('z', ox2 + 350, 215);
                            ctx.textAlign = 'right';
                            ctx.fillText('\u03b7(z)', ox2 + 170, 25);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'viz-lasso-path',
                    title: 'Regularization Path: Lasso vs Elastic Net',
                    description: 'Watch how coefficient estimates \u03b2\u0302(\\\\(\\\\lambda\\\\)) evolve as \\\\(\\\\lambda\\\\) decreases from large to zero. Lasso paths are piecewise linear; elastic net paths are smoother. Colors indicate true support membership.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 800, height: 400, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var showEN = false;
                        var alphaEN = 0.5;

                        VizEngine.createButton(controls, 'Toggle Elastic Net', function() { showEN = !showEN; });
                        VizEngine.createSlider(controls, '\u03b1 (EN)', 0.1, 1.0, 0.5, 0.05, function(v) { alphaEN = v; });

                        // Generate a fixed design and response
                        var p = 8, n = 50, sTrue = 3;
                        // True coefficients: first sTrue are nonzero
                        var betaTrue = [3.0, -2.0, 1.5, 0, 0, 0, 0, 0];
                        // Pre-computed correlations for realistic paths
                        var corrMatrix = [];
                        for (var i = 0; i < p; i++) {
                            corrMatrix[i] = [];
                            for (var j = 0; j < p; j++) {
                                corrMatrix[i][j] = Math.pow(0.5, Math.abs(i - j));
                            }
                        }

                        // Approximate Lasso path via coordinate descent
                        function computePath(alphaVal) {
                            var nLam = 120;
                            var lamMax = 5.0;
                            var path = [];
                            for (var li = 0; li < nLam; li++) {
                                var lam = lamMax * (1 - li / (nLam - 1));
                                var beta = [];
                                // Approximate: soft-threshold of correlation-based OLS
                                for (var j = 0; j < p; j++) {
                                    var z = betaTrue[j];
                                    // Add cross-correlation effects
                                    for (var k = 0; k < sTrue; k++) {
                                        if (k !== j) z += 0.15 * corrMatrix[j][k] * betaTrue[k];
                                    }
                                    // Add small noise effect
                                    z += 0.1 * Math.sin(j * 2.3 + 1.7);
                                    var l1 = lam * alphaVal;
                                    var l2 = lam * (1 - alphaVal);
                                    if (z > l1) beta[j] = (z - l1) / (1 + l2);
                                    else if (z < -l1) beta[j] = (z + l1) / (1 + l2);
                                    else beta[j] = 0;
                                }
                                path.push({ lam: lam, beta: beta });
                            }
                            return path;
                        }

                        function draw() {
                            viz.clear();
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, 800, 400);

                            var padL = 70, padR = 30, padT = 40, padB = 50;
                            var plotW = 800 - padL - padR;
                            var plotH = 400 - padT - padB;
                            var betaMax = 4.0;
                            var lamMax = 5.0;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(padL, padT); ctx.lineTo(padL, padT + plotH); ctx.lineTo(padL + plotW, padT + plotH);
                            ctx.stroke();

                            // Grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var g = 0; g <= 4; g++) {
                                var gy = padT + plotH / 2 - g * plotH / (2 * betaMax) * betaMax;
                                ctx.beginPath(); ctx.moveTo(padL, padT + plotH * (1 - (g + betaMax) / (2 * betaMax)));
                                ctx.lineTo(padL + plotW, padT + plotH * (1 - (g + betaMax) / (2 * betaMax))); ctx.stroke();
                            }

                            // Zero line
                            ctx.strokeStyle = viz.colors.axis + '88';
                            ctx.lineWidth = 1;
                            var zeroY = padT + plotH / 2;
                            ctx.beginPath(); ctx.moveTo(padL, zeroY); ctx.lineTo(padL + plotW, zeroY); ctx.stroke();

                            // Compute paths
                            var lassoPath = computePath(1.0);
                            var enPath = showEN ? computePath(alphaEN) : null;
                            var pathColors = [viz.colors.blue, viz.colors.red, viz.colors.green, viz.colors.text, viz.colors.text, viz.colors.text, viz.colors.text, viz.colors.text];

                            function drawPath(path, dashPattern, lwBase) {
                                for (var j = 0; j < p; j++) {
                                    ctx.strokeStyle = pathColors[j];
                                    ctx.lineWidth = j < sTrue ? (lwBase || 2.5) : 1.2;
                                    if (dashPattern) ctx.setLineDash(dashPattern);
                                    ctx.beginPath();
                                    for (var li = 0; li < path.length; li++) {
                                        var px = padL + (1 - path[li].lam / lamMax) * plotW;
                                        var py = padT + plotH * (1 - (path[li].beta[j] + betaMax) / (2 * betaMax));
                                        if (li === 0) ctx.moveTo(px, py);
                                        else ctx.lineTo(px, py);
                                    }
                                    ctx.stroke();
                                    if (dashPattern) ctx.setLineDash([]);
                                }
                            }

                            drawPath(lassoPath, null, 2.5);
                            if (enPath) drawPath(enPath, [6, 3], 2);

                            // Axis labels
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('\u03bb (decreasing \u2192)', padL + plotW / 2, padT + plotH + 35);
                            ctx.save();
                            ctx.translate(18, padT + plotH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('\u03b2\u0302(\u03bb)', 0, 0);
                            ctx.restore();

                            // Tick labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            for (var tl = 0; tl <= 5; tl++) {
                                var tlx = padL + tl / 5 * plotW;
                                ctx.fillText((lamMax * (1 - tl / 5)).toFixed(1), tlx, padT + plotH + 15);
                            }
                            ctx.textAlign = 'right';
                            for (var tb = -4; tb <= 4; tb += 2) {
                                var tby = padT + plotH * (1 - (tb + betaMax) / (2 * betaMax));
                                ctx.fillText(tb.toString(), padL - 8, tby + 3);
                            }

                            // Legend
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            var legLabels = ['\u03b2\u2081* = 3', '\u03b2\u2082* = -2', '\u03b2\u2083* = 1.5', 'noise vars'];
                            var legColors = [viz.colors.blue, viz.colors.red, viz.colors.green, viz.colors.text];
                            for (var ll = 0; ll < legLabels.length; ll++) {
                                ctx.fillStyle = legColors[ll];
                                ctx.fillRect(padL + plotW - 110, padT + 10 + ll * 16, 12, 3);
                                ctx.fillText(legLabels[ll], padL + plotW - 93, padT + 14 + ll * 16);
                            }

                            if (showEN) {
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('Solid = Lasso | Dashed = Elastic Net (\u03b1=' + alphaEN.toFixed(2) + ')', padL + 10, padT + 10);
                            } else {
                                ctx.fillStyle = viz.colors.muted;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('Lasso regularization path', padL + 10, padT + 10);
                            }
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the elastic net thresholding operator is \\\\(\\\\hat{\\\\beta}_j = \\\\frac{S_\\\\lambda(z_j)}{1 + \\\\lambda_2}\\\\) where \\\\(S_\\\\lambda\\\\) is the soft-thresholding operator and \\\\(z_j = X_j^\\\\top(y - X_{-j}\\\\hat{\\\\beta}_{-j})/n\\\\) is the partial residual.',
                    hint: 'Write the elastic net objective in terms of \\\\(\\\\beta_j\\\\) alone (holding others fixed) and take the subdifferential.',
                    solution: 'Fixing all coordinates except \\\\(\\\\beta_j\\\\), the elastic net objective in \\\\(\\\\beta_j\\\\) is \\\\(\\\\frac{1}{2}\\\\beta_j^2 - z_j \\\\beta_j + \\\\lambda_1|\\\\beta_j| + \\\\frac{\\\\lambda_2}{2}\\\\beta_j^2 + C\\\\). This equals \\\\(\\\\frac{1+\\\\lambda_2}{2}\\\\beta_j^2 - z_j \\\\beta_j + \\\\lambda_1|\\\\beta_j| + C\\\\). Setting the subdifferential to zero: \\\\((1+\\\\lambda_2)\\\\beta_j - z_j + \\\\lambda_1 v = 0\\\\) where \\\\(v \\\\in \\\\partial|\\\\beta_j|\\\\). This gives \\\\(\\\\beta_j = S_{\\\\lambda_1}(z_j)/(1+\\\\lambda_2)\\\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Group Lasso
        // ================================================================
        {
            id: 'ch09-sec03',
            title: 'Group Lasso',
            content: `
                <h2>Group Lasso</h2>

                <p>In many applications, predictors come in natural <strong>groups</strong>. For example, dummy variables for a categorical factor, polynomial terms for a single variable, or genes in the same pathway. The <strong>group Lasso</strong> (Yuan and Lin, 2006) encourages entire groups to be included or excluded together.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 9.4 &mdash; Group Lasso</div>
                    <div class="env-body">
                        <p>Let \\\\(\\\\{G_1, G_2, \\\\ldots, G_K\\\\}\\\\) be a partition of \\\\(\\\\{1, \\\\ldots, p\\\\}\\\\) into \\\\(K\\\\) groups, with \\\\(|G_k| = p_k\\\\). The <strong>group Lasso</strong> estimator is:</p>
                        \\\\[
                            \\\\hat{\\\\beta}^{\\\\mathrm{GL}} = \\\\arg\\\\min_{\\\\beta \\\\in \\\\mathbb{R}^p} \\\\left\\\\{ \\\\frac{\\\\|y - X\\\\beta\\\\|_2^2}{2n} + \\\\lambda \\\\sum_{k=1}^{K} \\\\sqrt{p_k} \\\\, \\\\|\\\\beta_{G_k}\\\\|_2 \\\\right\\\\},
                        \\\\]
                        <p>where \\\\(\\\\beta_{G_k} = (\\\\beta_j)_{j \\\\in G_k} \\\\in \\\\mathbb{R}^{p_k}\\\\) is the subvector of \\\\(\\\\beta\\\\) corresponding to group \\\\(G_k\\\\), and \\\\(\\\\|\\\\cdot\\\\|_2\\\\) is the Euclidean norm on \\\\(\\\\mathbb{R}^{p_k}\\\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The group Lasso penalty \\\\(\\\\sum_k \\\\sqrt{p_k}\\\\|\\\\beta_{G_k}\\\\|_2\\\\) uses the \\\\(\\\\ell_2\\\\) norm <em>within</em> each group and the \\\\(\\\\ell_1\\\\) norm <em>across</em> groups. Since \\\\(\\\\|\\\\beta_{G_k}\\\\|_2 = 0\\\\) if and only if the entire block \\\\(\\\\beta_{G_k} = 0\\\\), this penalty encourages <strong>group-level sparsity</strong>: entire groups are set to zero or not.</p>
                        <p>The factor \\\\(\\\\sqrt{p_k}\\\\) normalizes for group size, ensuring that larger groups are not unfairly penalized.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-group-lasso"></div>

                <h3>Block Soft-Thresholding</h3>

                <p>The group Lasso admits a closed-form proximal operator, analogous to soft thresholding.</p>

                <div class="env-block theorem">
                    <div class="env-title">Proposition 9.6 &mdash; Group Soft-Thresholding</div>
                    <div class="env-body">
                        <p>The proximal operator for the group Lasso penalty \\\\(\\\\lambda\\\\sqrt{p_k}\\\\|\\\\cdot\\\\|_2\\\\) on \\\\(\\\\mathbb{R}^{p_k}\\\\) is the <strong>block soft-thresholding</strong> operator:</p>
                        \\\\[
                            \\\\mathrm{prox}_{\\\\lambda\\\\sqrt{p_k}\\\\|\\\\cdot\\\\|_2}(z) = \\\\left(1 - \\\\frac{\\\\lambda\\\\sqrt{p_k}}{\\\\|z\\\\|_2}\\\\right)_+ z,
                        \\\\]
                        <p>where \\\\((t)_+ = \\\\max(t, 0)\\\\). This either shrinks the entire block toward zero proportionally, or sets it to zero entirely if \\\\(\\\\|z\\\\|_2 \\\\leq \\\\lambda\\\\sqrt{p_k}\\\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>We need to solve \\\\(\\\\hat{u} = \\\\arg\\\\min_u \\\\frac{1}{2}\\\\|u - z\\\\|_2^2 + \\\\lambda\\\\sqrt{p_k}\\\\|u\\\\|_2\\\\). If \\\\(z = 0\\\\), clearly \\\\(\\\\hat{u} = 0\\\\). If \\\\(z \\\\neq 0\\\\), the optimality condition is \\\\(\\\\hat{u} - z + \\\\lambda\\\\sqrt{p_k} \\\\cdot \\\\partial\\\\|\\\\hat{u}\\\\|_2 \\\\ni 0\\\\).</p>
                        <p>Case 1: If \\\\(\\\\hat{u} \\\\neq 0\\\\), then \\\\(\\\\partial\\\\|\\\\hat{u}\\\\|_2 = \\\\{\\\\hat{u}/\\\\|\\\\hat{u}\\\\|_2\\\\}\\\\), so \\\\(\\\\hat{u} = z - \\\\lambda\\\\sqrt{p_k} \\\\hat{u}/\\\\|\\\\hat{u}\\\\|_2\\\\). This implies \\\\(\\\\hat{u} \\\\parallel z\\\\) (same direction), and solving for the scaling factor gives \\\\(\\\\|\\\\hat{u}\\\\|_2 = \\\\|z\\\\|_2 - \\\\lambda\\\\sqrt{p_k}\\\\). This is positive iff \\\\(\\\\|z\\\\|_2 &gt; \\\\lambda\\\\sqrt{p_k}\\\\).</p>
                        <p>Case 2: If \\\\(\\\\hat{u} = 0\\\\), the condition becomes \\\\(z \\\\in \\\\lambda\\\\sqrt{p_k} \\\\cdot \\\\bar{B}_2\\\\), i.e., \\\\(\\\\|z\\\\|_2 \\\\leq \\\\lambda\\\\sqrt{p_k}\\\\).</p>
                        <p>Combining both cases gives the stated formula.</p>
                        <div class="qed">&squ;</div>
                    </div>
                </div>

                <h3>Sparse Group Lasso</h3>

                <p>Sometimes we want sparsity both <em>between</em> and <em>within</em> groups. The sparse group Lasso (Simon et al., 2013) combines the group Lasso with the standard Lasso.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 9.5 &mdash; Sparse Group Lasso</div>
                    <div class="env-body">
                        <p>The <strong>sparse group Lasso</strong> is defined as:</p>
                        \\\\[
                            \\\\hat{\\\\beta}^{\\\\mathrm{SGL}} = \\\\arg\\\\min_{\\\\beta} \\\\left\\\\{ \\\\frac{\\\\|y - X\\\\beta\\\\|_2^2}{2n} + \\\\lambda_1 \\\\|\\\\beta\\\\|_1 + \\\\lambda_2 \\\\sum_{k=1}^{K} \\\\sqrt{p_k} \\\\, \\\\|\\\\beta_{G_k}\\\\|_2 \\\\right\\\\}.
                        \\\\]
                        <p>The \\\\(\\\\ell_1\\\\) penalty encourages element-wise sparsity within active groups, while the group penalty encourages group-level sparsity. When \\\\(\\\\lambda_1 = 0\\\\), this reduces to the group Lasso; when \\\\(\\\\lambda_2 = 0\\\\), to the standard Lasso.</p>
                    </div>
                </div>

                <h3>Statistical Properties of the Group Lasso</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.7 &mdash; Group Lasso Estimation Bound</div>
                    <div class="env-body">
                        <p>Suppose the rows of \\\\(X\\\\) are i.i.d. sub-Gaussian, and the true coefficient \\\\(\\\\beta^*\\\\) is supported on \\\\(s_G\\\\) groups (out of \\\\(K\\\\) groups). Under a group restricted eigenvalue condition, with \\\\(\\\\lambda \\\\asymp \\\\sigma\\\\sqrt{\\\\log K / n}\\\\):</p>
                        \\\\[
                            \\\\|\\\\hat{\\\\beta}^{\\\\mathrm{GL}} - \\\\beta^*\\\\|_2 \\\\leq C \\\\sigma \\\\sqrt{\\\\frac{s_G \\\\bar{p} \\\\log K}{n}},
                        \\\\]
                        <p>where \\\\(\\\\bar{p} = \\\\frac{1}{s_G}\\\\sum_{k \\\\in \\\\mathrm{supp}} p_k\\\\) is the average size of the active groups. Compare with the Lasso rate \\\\(\\\\sigma\\\\sqrt{s \\\\log p / n}\\\\): the group Lasso replaces \\\\(s \\\\log p\\\\) with \\\\(s_G \\\\bar{p} \\\\log K\\\\), which is smaller when \\\\(s_G \\\\ll s\\\\) and \\\\(K \\\\ll p\\\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark &mdash; When Does Group Structure Help?</div>
                    <div class="env-body">
                        <p>The group Lasso gains over the standard Lasso when:</p>
                        <ul>
                            <li>The group structure reflects the true sparsity pattern (entire groups are active or inactive).</li>
                            <li>The number of groups \\\\(K\\\\) is much smaller than \\\\(p\\\\).</li>
                            <li>The group sizes \\\\(p_k\\\\) are moderate.</li>
                        </ul>
                        <p>If the true signal is sparse within groups (violating the group-level assumption), the group Lasso can actually perform <em>worse</em> than the standard Lasso, since it includes all variables in each active group.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-group-lasso',
                    title: 'Group Lasso: Group Selection Demo',
                    description: 'Variables are organized into colored groups. As \\\\(\\\\lambda\\\\) decreases, entire groups enter the model together. Compare with element-wise Lasso selection.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 800, height: 420, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var lambda = 3.0;
                        var showLasso = false;

                        VizEngine.createSlider(controls, '\u03bb', 0.0, 5.0, 3.0, 0.05, function(v) { lambda = v; });
                        VizEngine.createButton(controls, 'Toggle Lasso', function() { showLasso = !showLasso; });

                        // Define groups and true coefficients
                        var groups = [
                            { name: 'G1', indices: [0, 1, 2], color: viz.colors.blue, beta: [2.0, 1.5, 1.0] },
                            { name: 'G2', indices: [3, 4], color: viz.colors.orange, beta: [0, 0] },
                            { name: 'G3', indices: [5, 6, 7, 8], color: viz.colors.green, beta: [-1.8, -1.2, -0.8, -0.5] },
                            { name: 'G4', indices: [9, 10, 11], color: viz.colors.purple, beta: [0, 0, 0] },
                            { name: 'G5', indices: [12, 13], color: viz.colors.red, beta: [0, 0] }
                        ];
                        var p = 14;

                        function getGroupLassoEst(lam) {
                            var est = new Array(p).fill(0);
                            for (var gi = 0; gi < groups.length; gi++) {
                                var g = groups[gi];
                                var groupNorm = 0;
                                for (var i = 0; i < g.beta.length; i++) {
                                    groupNorm += g.beta[i] * g.beta[i];
                                }
                                groupNorm = Math.sqrt(groupNorm);
                                var sqrtPk = Math.sqrt(g.beta.length);
                                var shrink = Math.max(0, 1 - lam * sqrtPk / Math.max(groupNorm, 1e-10));
                                for (var i = 0; i < g.beta.length; i++) {
                                    est[g.indices[i]] = g.beta[i] * shrink;
                                }
                            }
                            return est;
                        }

                        function getLassoEst(lam) {
                            var est = new Array(p).fill(0);
                            for (var gi = 0; gi < groups.length; gi++) {
                                var g = groups[gi];
                                for (var i = 0; i < g.beta.length; i++) {
                                    var b = g.beta[i];
                                    if (b > lam) est[g.indices[i]] = b - lam;
                                    else if (b < -lam) est[g.indices[i]] = b + lam;
                                    else est[g.indices[i]] = 0;
                                }
                            }
                            return est;
                        }

                        function draw() {
                            viz.clear();
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, 800, 420);

                            var padL = 60, padR = 30, padT = 50, padB = 80;
                            var plotW = 800 - padL - padR;
                            var plotH = showLasso ? 150 : 300;
                            var barW = plotW / p - 4;
                            var betaMax = 3.0;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Group Lasso Estimates (\u03bb = ' + lambda.toFixed(2) + ')', 400, 20);

                            // Axes
                            var zeroY = padT + plotH / 2;
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(padL, zeroY); ctx.lineTo(padL + plotW, zeroY);
                            ctx.stroke();

                            // Group Lasso estimates
                            var glEst = getGroupLassoEst(lambda);
                            for (var j = 0; j < p; j++) {
                                var gi = groups.findIndex(function(g) { return g.indices.indexOf(j) >= 0; });
                                var color = groups[gi].color;
                                var barX = padL + j * (plotW / p) + 2;
                                var barH = Math.abs(glEst[j]) / betaMax * (plotH / 2);
                                var barY = glEst[j] >= 0 ? zeroY - barH : zeroY;

                                ctx.fillStyle = color + (Math.abs(glEst[j]) > 0.01 ? 'cc' : '33');
                                ctx.fillRect(barX, barY, barW, barH);
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(barX, barY, barW, barH);

                                // Variable label
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('\u03b2' + (j + 1), barX + barW / 2, padT + plotH + 14);
                            }

                            // Group brackets
                            var bracketY = padT + plotH + 25;
                            for (var gi = 0; gi < groups.length; gi++) {
                                var g = groups[gi];
                                var x1 = padL + g.indices[0] * (plotW / p) + 2;
                                var x2 = padL + g.indices[g.indices.length - 1] * (plotW / p) + 2 + barW;
                                ctx.strokeStyle = g.color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(x1, bracketY); ctx.lineTo(x1, bracketY + 6);
                                ctx.lineTo(x2, bracketY + 6); ctx.lineTo(x2, bracketY);
                                ctx.stroke();
                                ctx.fillStyle = g.color;
                                ctx.font = 'bold 10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(g.name, (x1 + x2) / 2, bracketY + 18);

                                // Active indicator
                                var groupActive = glEst[g.indices[0]] !== 0 || (g.indices.length > 1 && glEst[g.indices[1]] !== 0);
                                ctx.fillStyle = groupActive ? g.color : viz.colors.muted;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.fillText(groupActive ? 'ACTIVE' : 'zero', (x1 + x2) / 2, bracketY + 30);
                            }

                            // Standard Lasso comparison
                            if (showLasso) {
                                var plotH2 = 130;
                                var padT2 = padT + plotH + 70;
                                var zeroY2 = padT2 + plotH2 / 2;

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Standard Lasso Estimates', 400, padT2 - 12);

                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(padL, zeroY2); ctx.lineTo(padL + plotW, zeroY2);
                                ctx.stroke();

                                var lassoEst = getLassoEst(lambda);
                                for (var j = 0; j < p; j++) {
                                    var gi = groups.findIndex(function(g) { return g.indices.indexOf(j) >= 0; });
                                    var color = groups[gi].color;
                                    var barX = padL + j * (plotW / p) + 2;
                                    var barH = Math.abs(lassoEst[j]) / betaMax * (plotH2 / 2);
                                    var barY = lassoEst[j] >= 0 ? zeroY2 - barH : zeroY2;

                                    ctx.fillStyle = color + (Math.abs(lassoEst[j]) > 0.01 ? 'cc' : '33');
                                    ctx.fillRect(barX, barY, barW, barH);
                                    ctx.strokeStyle = color;
                                    ctx.lineWidth = 1;
                                    ctx.strokeRect(barX, barY, barW, barH);
                                }
                            }

                            // Y-axis tick labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            for (var t = -2; t <= 2; t++) {
                                var ty = zeroY - t / betaMax * (plotH / 2);
                                ctx.fillText(t.toFixed(0), padL - 8, ty + 3);
                            }
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that when all groups have size \\\\(p_k = 1\\\\), the group Lasso reduces to the standard Lasso.',
                    hint: 'What is \\\\(\\\\|\\\\beta_{G_k}\\\\|_2\\\\) when \\\\(\\\\beta_{G_k} \\\\in \\\\mathbb{R}^1\\\\)?',
                    solution: 'When \\\\(p_k = 1\\\\) for all \\\\(k\\\\), each group contains a single variable \\\\(\\\\beta_j\\\\). Then \\\\(\\\\|\\\\beta_{G_k}\\\\|_2 = |\\\\beta_j|\\\\) and \\\\(\\\\sqrt{p_k} = 1\\\\), so the group penalty becomes \\\\(\\\\lambda \\\\sum_{k=1}^K |\\\\beta_k| = \\\\lambda\\\\|\\\\beta\\\\|_1\\\\), which is exactly the Lasso penalty.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Non-Convex Penalties — SCAD, MCP, Oracle Properties
        // ================================================================
        {
            id: 'ch09-sec04',
            title: 'Non-Convex Penalties',
            content: `
                <h2>Non-Convex Penalties: SCAD &amp; MCP</h2>

                <p>The Lasso penalty \\\\(\\\\lambda|\\\\beta_j|\\\\) introduces a well-known <strong>bias</strong>: large coefficients are shrunk toward zero by the same amount \\\\(\\\\lambda\\\\) as small ones. This prevents the Lasso from achieving the <em>oracle property</em> &mdash; it cannot simultaneously select the correct support and estimate the nonzero coefficients at the parametric rate \\\\(\\\\sqrt{s/n}\\\\).</p>

                <p><strong>Non-convex penalties</strong> address this limitation by reducing the penalty on large coefficients. The two most important are <strong>SCAD</strong> (Fan and Li, 2001) and <strong>MCP</strong> (Zhang, 2010).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 9.6 &mdash; SCAD Penalty</div>
                    <div class="env-body">
                        <p>The <strong>Smoothly Clipped Absolute Deviation</strong> (SCAD) penalty with parameters \\\\(\\\\lambda &gt; 0\\\\) and \\\\(\\\\gamma &gt; 2\\\\) is defined via its derivative:</p>
                        \\\\[
                            p'_{\\\\lambda}(t) = \\\\lambda \\\\left\\\\{ \\\\mathbf{1}(t \\\\leq \\\\lambda) + \\\\frac{(\\\\gamma\\\\lambda - t)_+}{(\\\\gamma - 1)\\\\lambda} \\\\mathbf{1}(t &gt; \\\\lambda) \\\\right\\\\}, \\\\quad t \\\\geq 0.
                        \\\\]
                        <p>Integrating, the penalty function is:</p>
                        \\\\[
                            p_{\\\\lambda}(t) = \\\\begin{cases}
                                \\\\lambda|t| & \\\\text{if } |t| \\\\leq \\\\lambda, \\\\\\\\
                                -\\\\frac{t^2 - 2\\\\gamma\\\\lambda|t| + \\\\lambda^2}{2(\\\\gamma - 1)} & \\\\text{if } \\\\lambda &lt; |t| \\\\leq \\\\gamma\\\\lambda, \\\\\\\\
                                \\\\frac{(\\\\gamma + 1)\\\\lambda^2}{2} & \\\\text{if } |t| &gt; \\\\gamma\\\\lambda.
                            \\\\end{cases}
                        \\\\]
                        <p>The default choice in practice is \\\\(\\\\gamma = 3.7\\\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 9.7 &mdash; MCP Penalty</div>
                    <div class="env-body">
                        <p>The <strong>Minimax Concave Penalty</strong> (MCP) with parameters \\\\(\\\\lambda &gt; 0\\\\) and \\\\(\\\\gamma &gt; 1\\\\) is:</p>
                        \\\\[
                            p_{\\\\lambda}(t) = \\\\begin{cases}
                                \\\\lambda|t| - \\\\frac{t^2}{2\\\\gamma} & \\\\text{if } |t| \\\\leq \\\\gamma\\\\lambda, \\\\\\\\[4pt]
                                \\\\frac{\\\\gamma\\\\lambda^2}{2} & \\\\text{if } |t| &gt; \\\\gamma\\\\lambda.
                            \\\\end{cases}
                        \\\\]
                        <p>Its derivative is \\\\(p'_{\\\\lambda}(t) = (\\\\lambda - t/\\\\gamma)_+\\\\) for \\\\(t \\\\geq 0\\\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition &mdash; Three Penalty Regimes</div>
                    <div class="env-body">
                        <p>Both SCAD and MCP share the following structure:</p>
                        <ol>
                            <li><strong>Small \\\\(|\\\\beta_j|\\\\)</strong> (below \\\\(\\\\lambda\\\\)): behave like the \\\\(\\\\ell_1\\\\) penalty, producing sparsity via soft thresholding.</li>
                            <li><strong>Medium \\\\(|\\\\beta_j|\\\\)</strong> (between \\\\(\\\\lambda\\\\) and \\\\(\\\\gamma\\\\lambda\\\\)): the penalty rate <em>decreases</em>, gradually reducing the shrinkage bias.</li>
                            <li><strong>Large \\\\(|\\\\beta_j|\\\\)</strong> (above \\\\(\\\\gamma\\\\lambda\\\\)): the penalty becomes <em>constant</em> &mdash; large coefficients are not penalized at all. This is the key to the oracle property.</li>
                        </ol>
                        <p>The corresponding thresholding operator interpolates between soft thresholding (for small signals) and hard thresholding (for large signals), which is called <strong>firm thresholding</strong>.</p>
                    </div>
                </div>

                <h3>The Oracle Property</h3>

                <p>The concept of an <em>oracle estimator</em> is central to understanding non-convex penalties. If an oracle told us the true support \\\\(S = \\\\mathrm{supp}(\\\\beta^*)\\\\), we could simply run OLS on the active variables to get the <strong>oracle estimator</strong> \\\\(\\\\hat{\\\\beta}^{\\\\mathrm{oracle}}_S = (X_S^\\\\top X_S)^{-1} X_S^\\\\top y\\\\).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 9.8 &mdash; Oracle Property</div>
                    <div class="env-body">
                        <p>An estimator \\\\(\\\\hat{\\\\beta}\\\\) is said to have the <strong>oracle property</strong> if, with probability tending to 1:</p>
                        <ol>
                            <li><strong>Support recovery:</strong> \\\\(\\\\mathrm{supp}(\\\\hat{\\\\beta}) = \\\\mathrm{supp}(\\\\beta^*)\\\\).</li>
                            <li><strong>Asymptotic normality:</strong> \\\\(\\\\sqrt{n}(\\\\hat{\\\\beta}_S - \\\\beta^*_S) \\\\xrightarrow{d} N(0, \\\\sigma^2 (\\\\Sigma_{SS})^{-1})\\\\), where \\\\(\\\\Sigma = \\\\lim_{n \\\\to \\\\infty} X^\\\\top X / n\\\\).</li>
                        </ol>
                        <p>In other words, the estimator performs as well as if the true support were known in advance.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.8 &mdash; Oracle Property of SCAD (Fan &amp; Li 2001)</div>
                    <div class="env-body">
                        <p>Consider the fixed-\\\\(p\\\\) setting with \\\\(p\\\\) fixed as \\\\(n \\\\to \\\\infty\\\\). Suppose the design satisfies \\\\(X^\\\\top X / n \\\\to \\\\Sigma \\\\succ 0\\\\) and the minimum signal satisfies \\\\(\\\\min_{j \\\\in S} |\\\\beta_j^*| &gt; (\\\\gamma + 1)\\\\lambda\\\\). If \\\\(\\\\lambda \\\\to 0\\\\) and \\\\(\\\\sqrt{n}\\\\lambda \\\\to \\\\infty\\\\), then the SCAD estimator has the oracle property.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>The proof proceeds in two steps:</p>
                        <p><strong>Step 1 (Support recovery):</strong> For \\\\(j \\\\notin S\\\\) (noise variables), the SCAD penalty near zero behaves like \\\\(\\\\lambda|\\\\beta_j|\\\\), which (like the Lasso) sets small coefficients to zero. Since \\\\(\\\\sqrt{n}\\\\lambda \\\\to \\\\infty\\\\), the penalty is strong enough to shrink noise to exactly zero.</p>
                        <p><strong>Step 2 (Unbiasedness on support):</strong> For \\\\(j \\\\in S\\\\), the minimum signal condition ensures \\\\(|\\\\hat{\\\\beta}_j| &gt; \\\\gamma\\\\lambda\\\\) with high probability. In this region, \\\\(p'_{\\\\lambda}(|\\\\hat{\\\\beta}_j|) = 0\\\\), so the SCAD penalty imposes <em>no penalty</em> on these coordinates. The estimator on \\\\(S\\\\) reduces to OLS, giving asymptotic normality.</p>
                        <div class="qed">&squ;</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark &mdash; High-Dimensional Oracle Results</div>
                    <div class="env-body">
                        <p>In the high-dimensional setting \\\\(p \\\\gg n\\\\), the oracle property in its classical form does not hold. However, Loh and Wainwright (2015) proved that under a restricted strong convexity condition, any <strong>stationary point</strong> of the penalized objective with SCAD or MCP satisfies:</p>
                        \\\\[
                            \\\\|\\\\hat{\\\\beta} - \\\\beta^*\\\\|_2 \\\\leq C\\\\sigma\\\\sqrt{\\\\frac{s \\\\log p}{n}},
                        \\\\]
                        <p>matching the minimax rate. Furthermore, with a sufficiently strong minimum signal condition (\\\\(\\\\min_{j \\\\in S}|\\\\beta_j^*| \\\\gtrsim \\\\sigma\\\\sqrt{\\\\log p / n}\\\\)), the estimator achieves exact support recovery.</p>
                    </div>
                </div>

                <h3>Computational Challenges</h3>

                <div class="env-block remark">
                    <div class="env-title">Remark &mdash; Non-Convexity and Local Minima</div>
                    <div class="env-body">
                        <p>Unlike the Lasso, the SCAD and MCP objectives are <strong>non-convex</strong>, so:</p>
                        <ul>
                            <li>There may be multiple local minima. Standard optimization algorithms (coordinate descent, proximal gradient) may converge to different solutions depending on initialization.</li>
                            <li>Loh and Wainwright (2015) showed that under restricted strong convexity, all local optima (and even all stationary points) lie within a small ball around \\\\(\\\\beta^*\\\\). This provides theoretical reassurance that local minima are not a serious issue.</li>
                            <li>In practice, a common approach is to use the Lasso solution as a <strong>warm start</strong> for the non-convex optimization, or to use the <strong>local linear approximation</strong> (LLA) algorithm, which iteratively reweights an \\\\(\\\\ell_1\\\\) penalty.</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Derive the firm thresholding operator for MCP. That is, find \\\\(\\\\hat{\\\\beta} = \\\\arg\\\\min_\\\\beta \\\\frac{1}{2}(\\\\beta - z)^2 + p_\\\\lambda(|\\\\beta|)\\\\) where \\\\(p_\\\\lambda\\\\) is the MCP penalty.',
                    hint: 'Consider three cases: (i) \\\\(\\\\hat{\\\\beta} = 0\\\\), (ii) \\\\(0 &lt; |\\\\hat{\\\\beta}| \\\\leq \\\\gamma\\\\lambda\\\\), (iii) \\\\(|\\\\hat{\\\\beta}| &gt; \\\\gamma\\\\lambda\\\\). In case (ii), the objective is differentiable and you can solve explicitly.',
                    solution: 'Case (iii): For \\\\(|\\\\hat{\\\\beta}| &gt; \\\\gamma\\\\lambda\\\\), the MCP penalty is constant, so the minimizer is \\\\(\\\\hat{\\\\beta} = z\\\\). This is consistent when \\\\(|z| &gt; \\\\gamma\\\\lambda\\\\). Case (ii): For \\\\(0 &lt; |\\\\hat{\\\\beta}| \\\\leq \\\\gamma\\\\lambda\\\\), the objective (for \\\\(\\\\beta &gt; 0\\\\)) is \\\\(\\\\frac{1}{2}(\\\\beta - z)^2 + \\\\lambda\\\\beta - \\\\beta^2/(2\\\\gamma) = \\\\frac{\\\\gamma-1}{2\\\\gamma}\\\\beta^2 - (z-\\\\lambda)\\\\beta + \\\\text{const}\\\\). Setting the derivative to zero: \\\\(\\\\hat{\\\\beta} = \\\\gamma(z-\\\\lambda)/(\\\\gamma-1)\\\\). This is positive when \\\\(z &gt; \\\\lambda\\\\). Case (i): \\\\(\\\\hat{\\\\beta} = 0\\\\) when \\\\(|z| \\\\leq \\\\lambda\\\\). Combining: \\\\(\\\\eta_\\\\lambda^{\\\\mathrm{MCP}}(z) = 0\\\\) if \\\\(|z| \\\\leq \\\\lambda\\\\), \\\\(= \\\\mathrm{sign}(z)\\\\gamma(|z|-\\\\lambda)/(\\\\gamma-1)\\\\) if \\\\(\\\\lambda &lt; |z| \\\\leq \\\\gamma\\\\lambda\\\\), \\\\(= z\\\\) if \\\\(|z| &gt; \\\\gamma\\\\lambda\\\\).'
                },
                {
                    question: 'Explain why the Lasso cannot have the oracle property (in the fixed-\\\\(p\\\\) setting), even with optimal \\\\(\\\\lambda\\\\). <em>Hint:</em> Consider the bias of the Lasso on the support set.',
                    hint: 'If \\\\(\\\\hat{\\\\beta}_j \\\\neq 0\\\\), the Lasso KKT condition gives \\\\(X_j^\\\\top(y - X\\\\hat{\\\\beta})/n = \\\\lambda \\\\cdot \\\\mathrm{sign}(\\\\hat{\\\\beta}_j)\\\\). What does this imply about the bias?',
                    solution: 'The Lasso KKT condition for \\\\(j \\\\in S\\\\) with \\\\(\\\\hat{\\\\beta}_j \\\\neq 0\\\\) is \\\\(X_j^\\\\top(y - X\\\\hat{\\\\beta})/n = \\\\lambda \\\\mathrm{sign}(\\\\hat{\\\\beta}_j)\\\\). If we also require correct support recovery (\\\\(\\\\hat{\\\\beta}_j = 0\\\\) for \\\\(j \\\\notin S\\\\)), then \\\\(\\\\hat{\\\\beta}_S\\\\) satisfies \\\\((X_S^\\\\top X_S/n)\\\\hat{\\\\beta}_S = X_S^\\\\top y/n - \\\\lambda \\\\mathrm{sign}(\\\\hat{\\\\beta}_S)\\\\). This means \\\\(\\\\hat{\\\\beta}_S = \\\\hat{\\\\beta}_S^{\\\\mathrm{OLS}} - \\\\lambda(X_S^\\\\top X_S/n)^{-1}\\\\mathrm{sign}(\\\\beta^*_S)\\\\), introducing a bias of order \\\\(\\\\lambda\\\\). For support recovery we need \\\\(\\\\sqrt{n}\\\\lambda \\\\to \\\\infty\\\\), but then the bias \\\\(\\\\sqrt{n} \\\\cdot \\\\lambda \\\\to \\\\infty\\\\), preventing \\\\(\\\\sqrt{n}\\\\)-consistency. The two requirements are contradictory.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Comparison and Guidelines
        // ================================================================
        {
            id: 'ch09-sec05',
            title: 'Comparison and Guidelines',
            content: `
                <h2>Comparison and Guidelines</h2>

                <p>Having introduced several Lasso variants, we now provide a systematic comparison to help practitioners choose the right method for their problem.</p>

                <h3>Summary of Methods</h3>

                <div class="env-block remark">
                    <div class="env-title">Method Comparison Table</div>
                    <div class="env-body">
                        <table style="width:100%; border-collapse:collapse; font-size:0.9rem; color:var(--text-primary);">
                            <thead>
                                <tr style="border-bottom:2px solid var(--border-default);">
                                    <th style="text-align:left; padding:8px;">Method</th>
                                    <th style="text-align:left; padding:8px;">Penalty</th>
                                    <th style="text-align:left; padding:8px;">Key Property</th>
                                    <th style="text-align:left; padding:8px;">Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="border-bottom:1px solid var(--border-subtle);">
                                    <td style="padding:8px;">Lasso</td>
                                    <td style="padding:8px;">\\\\(\\\\lambda\\\\|\\\\beta\\\\|_1\\\\)</td>
                                    <td style="padding:8px;">Sparsity, convex</td>
                                    <td style="padding:8px;">\\\\(\\\\sigma\\\\sqrt{s\\\\log p/n}\\\\)</td>
                                </tr>
                                <tr style="border-bottom:1px solid var(--border-subtle);">
                                    <td style="padding:8px;">Dantzig</td>
                                    <td style="padding:8px;">\\\\(\\\\min \\\\|\\\\beta\\\\|_1\\\\) s.t. \\\\(\\\\ell_\\\\infty\\\\)</td>
                                    <td style="padding:8px;">LP formulation</td>
                                    <td style="padding:8px;">Same as Lasso</td>
                                </tr>
                                <tr style="border-bottom:1px solid var(--border-subtle);">
                                    <td style="padding:8px;">Sqrt-Lasso</td>
                                    <td style="padding:8px;">\\\\(\\\\|y-X\\\\beta\\\\|_2/\\\\sqrt{n} + \\\\lambda\\\\|\\\\beta\\\\|_1\\\\)</td>
                                    <td style="padding:8px;">Pivotal (no \\\\(\\\\sigma\\\\))</td>
                                    <td style="padding:8px;">Same as Lasso</td>
                                </tr>
                                <tr style="border-bottom:1px solid var(--border-subtle);">
                                    <td style="padding:8px;">Elastic Net</td>
                                    <td style="padding:8px;">\\\\(\\\\alpha\\\\|\\\\beta\\\\|_1 + (1-\\\\alpha)\\\\|\\\\beta\\\\|_2^2/2\\\\)</td>
                                    <td style="padding:8px;">Grouping effect</td>
                                    <td style="padding:8px;">\\\\(\\\\sigma\\\\sqrt{s\\\\log p/n}\\\\) + bias</td>
                                </tr>
                                <tr style="border-bottom:1px solid var(--border-subtle);">
                                    <td style="padding:8px;">Group Lasso</td>
                                    <td style="padding:8px;">\\\\(\\\\sum_k \\\\sqrt{p_k}\\\\|\\\\beta_{G_k}\\\\|_2\\\\)</td>
                                    <td style="padding:8px;">Group sparsity</td>
                                    <td style="padding:8px;">\\\\(\\\\sigma\\\\sqrt{s_G \\\\bar{p} \\\\log K/n}\\\\)</td>
                                </tr>
                                <tr style="border-bottom:1px solid var(--border-subtle);">
                                    <td style="padding:8px;">SCAD/MCP</td>
                                    <td style="padding:8px;">Non-convex, flattening</td>
                                    <td style="padding:8px;">Oracle property</td>
                                    <td style="padding:8px;">\\\\(\\\\sigma\\\\sqrt{s\\\\log p/n}\\\\), unbiased</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <h3>Decision Guidelines</h3>

                <div class="env-block intuition">
                    <div class="env-title">When to Use Which Method</div>
                    <div class="env-body">
                        <p><strong>1. Default choice: Lasso.</strong> Start with the Lasso. It is convex, well-understood, and has efficient solvers (coordinate descent, ADMM). The tuning parameter can be selected by cross-validation.</p>

                        <p><strong>2. Unknown noise level: Square-root Lasso.</strong> When \\\\(\\\\sigma\\\\) is unknown and you want to avoid estimating it (or when the noise is heteroscedastic), the square-root Lasso provides a universal \\\\(\\\\lambda\\\\) that does not depend on \\\\(\\\\sigma\\\\).</p>

                        <p><strong>3. Correlated predictors: Elastic net.</strong> When predictors are highly correlated (e.g., gene expression data), the Lasso arbitrarily selects one from each group. The elastic net includes all correlated predictors and yields more stable results. Use \\\\(\\\\alpha \\\\in [0.5, 0.9]\\\\) as a starting range.</p>

                        <p><strong>4. Natural group structure: Group Lasso.</strong> When variables naturally form groups (e.g., dummy variables, polynomial expansions, pathway membership), and you expect entire groups to be active or inactive, the group Lasso exploits this structure for improved estimation.</p>

                        <p><strong>5. Inference and low bias: SCAD/MCP.</strong> When you need accurate point estimates (not just prediction) or want to construct confidence intervals, non-convex penalties reduce the Lasso bias. These are especially useful when the minimum signal is well above the noise floor.</p>
                    </div>
                </div>

                <h3>Tuning Parameter Selection</h3>

                <div class="env-block theorem">
                    <div class="env-title">Proposition 9.9 &mdash; Theoretical vs. Practical \\\\(\\\\lambda\\\\)</div>
                    <div class="env-body">
                        <p>Theoretical analyses typically set \\\\(\\\\lambda = c \\\\sigma \\\\sqrt{2 \\\\log p / n}\\\\) (with \\\\(c \\\\geq 1\\\\)). In practice:</p>
                        <ul>
                            <li><strong>Cross-validation</strong> (K-fold, typically \\\\(K = 5\\\\) or \\\\(10\\\\)): optimizes prediction error. Often selects a smaller \\\\(\\\\lambda\\\\) than the theoretical choice, leading to denser models.</li>
                            <li><strong>BIC-type criteria</strong>: \\\\(\\\\mathrm{BIC}(\\\\lambda) = n \\\\log(\\\\|y - X\\\\hat{\\\\beta}_{\\\\lambda}\\\\|_2^2/n) + |\\\\hat{S}_{\\\\lambda}| \\\\log n\\\\). Better for model selection (support recovery).</li>
                            <li><strong>Universal threshold</strong> (square-root Lasso): \\\\(\\\\lambda = \\\\Phi^{-1}(1 - \\\\alpha/(2p)) / \\\\sqrt{n}\\\\) for a desired false discovery level \\\\(\\\\alpha\\\\).</li>
                        </ul>
                    </div>
                </div>

                <h3>Theoretical Landscape</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.10 &mdash; Minimax Optimality</div>
                    <div class="env-body">
                        <p>Consider the class of \\\\(s\\\\)-sparse vectors in \\\\(\\\\mathbb{R}^p\\\\) with sub-Gaussian noise. The minimax rate of estimation is:</p>
                        \\\\[
                            \\\\inf_{\\\\hat{\\\\beta}} \\\\sup_{\\\\|\\\\beta^*\\\\|_0 \\\\leq s} \\\\mathbb{E}\\\\|\\\\hat{\\\\beta} - \\\\beta^*\\\\|_2^2 \\\\asymp \\\\sigma^2 \\\\frac{s \\\\log(p/s)}{n}.
                        \\\\]
                        <p>The Lasso, Dantzig selector, square-root Lasso, and SCAD/MCP all achieve this rate (up to constants). The elastic net achieves it plus an additional bias term \\\\(\\\\lambda_2\\\\|\\\\beta^*\\\\|_2^2\\\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark &mdash; Beyond Estimation</div>
                    <div class="env-body">
                        <p>The methods differ more sharply in tasks beyond estimation:</p>
                        <ul>
                            <li><strong>Support recovery:</strong> Requires the irrepresentability condition for Lasso, the minimum signal condition for SCAD/MCP. The latter is more natural.</li>
                            <li><strong>Inference:</strong> The Lasso estimator is biased, requiring debiasing (Chapter 12). SCAD/MCP provide unbiased estimates on the support, simplifying inference.</li>
                            <li><strong>Prediction:</strong> All methods achieve similar prediction rates \\\\(\\\\sigma^2 s \\\\log p / n\\\\) under the RE condition.</li>
                            <li><strong>Computation:</strong> Convex methods (Lasso, elastic net, group Lasso) guarantee global optimality. Non-convex methods (SCAD, MCP) may have local minima, though theory suggests these are statistically benign.</li>
                        </ul>
                    </div>
                </div>

                <h3>Looking Ahead</h3>

                <p>In Chapter 10, we will study the <strong>computational methods</strong> that make these estimators practical: coordinate descent, proximal gradient methods, and ADMM. In Chapter 12, we will revisit the Lasso bias problem from the perspective of <strong>debiased estimation</strong> for constructing confidence intervals in high dimensions.</p>
            `,
            visualizations: [],
            exercises: []
        }
    ]
});
