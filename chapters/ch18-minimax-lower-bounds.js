window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch18',
    number: 18,
    title: 'Minimax Lower Bounds',
    subtitle: 'Fundamental limits of estimation',
    sections: [
        // ============================================================
        // SECTION 1: The Minimax Framework
        // ============================================================
        {
            id: 'ch18-sec01',
            title: 'The Minimax Framework',
            content: `
                <h2>The Minimax Framework</h2>

                <p>Throughout this course, we have derived <em>upper bounds</em> on estimation error: given an estimator \\(\\hat{\\theta}\\), we showed its risk is at most some rate. But are these rates the best possible? Could a cleverer estimator do fundamentally better? The minimax framework provides a principled answer: it characterizes the <strong>intrinsic difficulty</strong> of an estimation problem, independent of any particular estimator.</p>

                <h3>Setup</h3>

                <p>Consider a statistical model \\(\\{P_\\theta : \\theta \\in \\Theta\\}\\), where \\(\\Theta\\) is a parameter space. We observe data \\(X \\sim P_\\theta\\), and our goal is to estimate \\(\\theta\\) (or some functional of \\(\\theta\\)). An <strong>estimator</strong> is any measurable function \\(\\hat{\\theta} = \\hat{\\theta}(X)\\) of the data.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 18.1 (Risk and Loss)</div>
                    <div class="env-body">
                        <p>Given a loss function \\(L: \\Theta \\times \\Theta \\to [0, \\infty)\\), the <strong>risk</strong> of an estimator \\(\\hat{\\theta}\\) at parameter \\(\\theta\\) is</p>
                        \\[R(\\hat{\\theta}, \\theta) = \\mathbb{E}_{\\theta}\\bigl[L(\\hat{\\theta}, \\theta)\\bigr].\\]
                        <p>Common choices include <strong>squared error</strong> \\(L(\\hat{\\theta}, \\theta) = \\|\\hat{\\theta} - \\theta\\|_2^2\\) and <strong>absolute error</strong> \\(L(\\hat{\\theta}, \\theta) = \\|\\hat{\\theta} - \\theta\\|_2\\).</p>
                    </div>
                </div>

                <p>The <strong>worst-case risk</strong> of an estimator \\(\\hat{\\theta}\\) over the parameter space \\(\\Theta\\) is</p>
                \\[\\sup_{\\theta \\in \\Theta} R(\\hat{\\theta}, \\theta).\\]
                <p>This measures the performance of \\(\\hat{\\theta}\\) in the least favorable scenario. The minimax risk then asks: among all estimators, which one minimizes this worst case?</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 18.2 (Minimax Risk)</div>
                    <div class="env-body">
                        <p>The <strong>minimax risk</strong> over the parameter space \\(\\Theta\\) is</p>
                        \\[\\mathfrak{M}_n(\\Theta) \\;=\\; \\inf_{\\hat{\\theta}} \\sup_{\\theta \\in \\Theta} R(\\hat{\\theta}, \\theta),\\]
                        <p>where the infimum is over all measurable estimators \\(\\hat{\\theta} = \\hat{\\theta}(X_1, \\ldots, X_n)\\).</p>
                        <p>An estimator \\(\\hat{\\theta}^*\\) is <strong>minimax optimal</strong> if it achieves this infimum (or comes within a constant factor).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: A Two-Player Game</div>
                    <div class="env-body">
                        <p>The minimax risk has a natural game-theoretic interpretation. Nature (the adversary) chooses \\(\\theta \\in \\Theta\\) to maximize the risk, while the statistician chooses \\(\\hat{\\theta}\\) to minimize it. The minimax risk is the value of this zero-sum game:</p>
                        \\[\\text{Statistician: } \\inf_{\\hat{\\theta}} \\quad \\text{Nature: } \\sup_{\\theta \\in \\Theta} \\quad R(\\hat{\\theta}, \\theta).\\]
                        <p>A minimax optimal estimator is the statistician's best response against a worst-case adversary.</p>
                    </div>
                </div>

                <h3>Upper Bounds vs. Lower Bounds</h3>

                <p>For an estimation problem, we seek to pin down the minimax risk from both sides:</p>
                <ul>
                    <li><strong>Upper bound:</strong> Construct a specific estimator \\(\\hat{\\theta}\\) and show \\(\\sup_{\\theta \\in \\Theta} R(\\hat{\\theta}, \\theta) \\leq C \\cdot r_n\\). This proves \\(\\mathfrak{M}_n(\\Theta) \\leq C \\cdot r_n\\).</li>
                    <li><strong>Lower bound:</strong> Show that <em>no estimator</em> can do better: \\(\\inf_{\\hat{\\theta}} \\sup_{\\theta \\in \\Theta} R(\\hat{\\theta}, \\theta) \\geq c \\cdot r_n\\). This proves \\(\\mathfrak{M}_n(\\Theta) \\geq c \\cdot r_n\\).</li>
                </ul>
                <p>When both bounds match up to constants, we say the minimax rate is \\(r_n\\), and any estimator achieving this rate is <strong>rate-optimal</strong>.</p>

                <div class="env-block remark">
                    <div class="env-title">Remark (Why Lower Bounds are Hard)</div>
                    <div class="env-body">
                        <p>Upper bounds require constructing <em>one good estimator</em>. Lower bounds require reasoning about <em>all possible estimators</em> simultaneously. This is fundamentally harder: we must show that no matter how clever the estimator, it cannot escape a certain error rate. The key techniques in this chapter reduce this daunting task to tractable information-theoretic problems.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 18.3 (Minimax Rate-Optimality)</div>
                    <div class="env-body">
                        <p>An estimator \\(\\hat{\\theta}\\) is <strong>minimax rate-optimal</strong> (up to constants) if there exist constants \\(c, C &gt; 0\\) such that</p>
                        \\[c \\cdot r_n \\leq \\sup_{\\theta \\in \\Theta} R(\\hat{\\theta}, \\theta) \\leq C \\cdot r_n\\]
                        <p>and \\(\\mathfrak{M}_n(\\Theta) \\asymp r_n\\), meaning \\(c' \\cdot r_n \\leq \\mathfrak{M}_n(\\Theta) \\leq C' \\cdot r_n\\) for universal constants \\(c', C'\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 18.1 (Gaussian Mean Estimation)</div>
                    <div class="env-body">
                        <p>Observe \\(X_1, \\ldots, X_n \\sim N(\\mu, \\sigma^2)\\) i.i.d. with \\(\\mu \\in \\mathbb{R}\\). For squared error loss:</p>
                        <ul>
                            <li><strong>Upper bound:</strong> The sample mean \\(\\bar{X}\\) satisfies \\(\\mathbb{E}[(\\bar{X} - \\mu)^2] = \\sigma^2/n\\).</li>
                            <li><strong>Lower bound:</strong> By the Cramer-Rao bound, \\(\\mathfrak{M}_n(\\mathbb{R}) \\geq \\sigma^2/n\\).</li>
                        </ul>
                        <p>Thus \\(\\mathfrak{M}_n(\\mathbb{R}) = \\sigma^2/n\\), and \\(\\bar{X}\\) is exactly minimax optimal. This parametric rate \\(1/n\\) is the baseline against which we compare high-dimensional rates.</p>
                    </div>
                </div>

                <h3>The General Strategy for Lower Bounds</h3>

                <p>All minimax lower bound techniques follow a common paradigm: <strong>reduce estimation to testing</strong>. The idea is:</p>
                <ol>
                    <li>Choose a finite subset \\(\\{\\theta_0, \\theta_1, \\ldots, \\theta_M\\} \\subset \\Theta\\) of well-separated parameters.</li>
                    <li>Show that even <em>identifying which</em> \\(\\theta_j\\) generated the data is hard (a hypothesis testing problem).</li>
                    <li>Since testing is easier than estimation, any lower bound on the testing error implies a lower bound on the estimation risk.</li>
                </ol>
                <p>The different methods (Le Cam, Fano, Assouad) differ in <em>how many</em> hypotheses are used and <em>how</em> the reduction is made.</p>
            `,
            visualizations: [],
            exercises: []
        },

        // ============================================================
        // SECTION 2: Le Cam's Two-Point Method
        // ============================================================
        {
            id: 'ch18-sec02',
            title: "Le Cam's Two-Point Method",
            content: `
                <h2>Le Cam's Two-Point Method</h2>

                <p>The simplest and most elegant lower bound technique uses just <em>two</em> hypotheses. If the statistician cannot reliably distinguish between two parameter values \\(\\theta_0\\) and \\(\\theta_1\\), then the estimation error must be at least proportional to the distance \\(\\|\\theta_1 - \\theta_0\\|\\).</p>

                <h3>Total Variation Distance</h3>

                <p>The fundamental quantity governing the difficulty of hypothesis testing is the <strong>total variation distance</strong> between probability distributions.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 18.4 (Total Variation Distance)</div>
                    <div class="env-body">
                        <p>The <strong>total variation distance</strong> between probability measures \\(P\\) and \\(Q\\) on a measurable space \\((\\mathcal{X}, \\mathcal{A})\\) is</p>
                        \\[\\mathrm{TV}(P, Q) \\;=\\; \\sup_{A \\in \\mathcal{A}} |P(A) - Q(A)| \\;=\\; \\frac{1}{2}\\int |p(x) - q(x)| \\, d\\mu(x),\\]
                        <p>where \\(p, q\\) are densities with respect to a common dominating measure \\(\\mu\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Total variation measures the maximum difference in probability that \\(P\\) and \\(Q\\) can assign to any event. If \\(\\mathrm{TV}(P, Q) = 0\\), the distributions are identical; if \\(\\mathrm{TV}(P, Q) = 1\\), they are supported on disjoint sets. The half-integral formula shows \\(\\mathrm{TV}\\) equals half the \\(L^1\\) distance between the densities.</p>
                    </div>
                </div>

                <p>A classical result connects total variation to the optimal testing error:</p>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 18.1 (Optimal Testing Error)</div>
                    <div class="env-body">
                        <p>Consider testing \\(H_0: X \\sim P\\) versus \\(H_1: X \\sim Q\\) with equal prior probabilities \\(\\pi_0 = \\pi_1 = 1/2\\). The minimum probability of error over all tests \\(\\psi: \\mathcal{X} \\to \\{0, 1\\}\\) is</p>
                        \\[\\inf_{\\psi} P_\\text{err}(\\psi) \\;=\\; \\frac{1}{2}\\bigl(1 - \\mathrm{TV}(P, Q)\\bigr).\\]
                        <p>In particular, if \\(\\mathrm{TV}(P, Q) \\leq \\alpha\\), then no test can have error probability less than \\((1 - \\alpha)/2\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Sketch)</div>
                    <div class="env-body">
                        <p>The optimal test is the likelihood ratio test: reject \\(H_0\\) when \\(q(x) &gt; p(x)\\). The error probability under equal priors is</p>
                        \\[P_\\text{err} = \\frac{1}{2}P(\\psi = 1) + \\frac{1}{2}Q(\\psi = 0) = \\frac{1}{2} - \\frac{1}{2}\\bigl(Q(\\psi = 1) - P(\\psi = 1)\\bigr).\\]
                        <p>Maximizing \\(Q(A) - P(A)\\) over sets \\(A\\) gives precisely the total variation distance.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <h3>Le Cam's Method</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 18.1 (Le Cam's Two-Point Method)</div>
                    <div class="env-body">
                        <p>Let \\(\\theta_0, \\theta_1 \\in \\Theta\\) with \\(L(\\theta_0, \\theta_1) \\geq 2\\delta &gt; 0\\). Then</p>
                        \\[\\mathfrak{M}_n(\\Theta) \\;=\\; \\inf_{\\hat{\\theta}} \\sup_{\\theta \\in \\Theta} \\mathbb{E}_\\theta[L(\\hat{\\theta}, \\theta)] \\;\\geq\\; \\delta \\cdot \\bigl(1 - \\mathrm{TV}(P_{\\theta_0}^n, P_{\\theta_1}^n)\\bigr),\\]
                        <p>where \\(P_\\theta^n\\) denotes the joint law of \\(n\\) i.i.d. observations from \\(P_\\theta\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>For any estimator \\(\\hat{\\theta}\\), the maximum risk satisfies</p>
                        \\[\\sup_{\\theta \\in \\Theta} \\mathbb{E}_\\theta[L(\\hat{\\theta}, \\theta)] \\;\\geq\\; \\frac{1}{2}\\bigl(\\mathbb{E}_{\\theta_0}[L(\\hat{\\theta}, \\theta_0)] + \\mathbb{E}_{\\theta_1}[L(\\hat{\\theta}, \\theta_1)]\\bigr).\\]
                        <p>By the triangle inequality for \\(L\\), for any value of \\(\\hat{\\theta}\\), either \\(L(\\hat{\\theta}, \\theta_0) \\geq \\delta\\) or \\(L(\\hat{\\theta}, \\theta_1) \\geq \\delta\\) (since \\(L(\\theta_0, \\theta_1) \\geq 2\\delta\\)). Define the test \\(\\psi(X) = \\mathbf{1}\\{L(\\hat{\\theta}(X), \\theta_1) &lt; L(\\hat{\\theta}(X), \\theta_0)\\}\\). Then:</p>
                        \\[\\frac{1}{2}\\bigl(\\mathbb{E}_{\\theta_0}[L(\\hat{\\theta}, \\theta_0)] + \\mathbb{E}_{\\theta_1}[L(\\hat{\\theta}, \\theta_1)]\\bigr) \\;\\geq\\; \\delta \\cdot P_{\\text{err}}(\\psi) \\;\\geq\\; \\delta \\cdot \\frac{1 - \\mathrm{TV}(P_{\\theta_0}^n, P_{\\theta_1}^n)}{2}.\\]
                        <p>Taking the infimum over \\(\\hat{\\theta}\\) and noting \\(\\sup \\geq \\frac{1}{2}(\\cdot + \\cdot)\\) gives the result (absorbing the factor of 2 into the constant).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (The Art of Le Cam)</div>
                    <div class="env-body">
                        <p>The power of Le Cam's method lies in choosing \\(\\theta_0, \\theta_1\\) to balance two competing requirements:</p>
                        <ul>
                            <li><strong>Separation:</strong> \\(L(\\theta_0, \\theta_1)\\) should be large (to get a strong lower bound).</li>
                            <li><strong>Indistinguishability:</strong> \\(\\mathrm{TV}(P_{\\theta_0}^n, P_{\\theta_1}^n)\\) should be small (so the bound is non-trivial, i.e., the \\(1 - \\mathrm{TV}\\) factor is bounded away from 0).</li>
                        </ul>
                        <p>These are in tension: parameters that are far apart tend to produce easily distinguishable distributions.</p>
                    </div>
                </div>

                <h3>KL Divergence and Pinsker's Inequality</h3>

                <p>In practice, total variation is often controlled via the KL divergence, which is easier to compute for product distributions.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 18.5 (KL Divergence)</div>
                    <div class="env-body">
                        <p>The <strong>Kullback-Leibler divergence</strong> from \\(P\\) to \\(Q\\) is</p>
                        \\[\\mathrm{KL}(P \\| Q) = \\int p(x) \\log\\frac{p(x)}{q(x)} \\, d\\mu(x),\\]
                        <p>where \\(p, q\\) are densities of \\(P, Q\\). For i.i.d. observations, \\(\\mathrm{KL}(P^n \\| Q^n) = n \\cdot \\mathrm{KL}(P \\| Q)\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 18.2 (Pinsker's Inequality)</div>
                    <div class="env-body">
                        <p>For any probability measures \\(P\\) and \\(Q\\),</p>
                        \\[\\mathrm{TV}(P, Q) \\leq \\sqrt{\\frac{1}{2}\\mathrm{KL}(P \\| Q)}.\\]
                    </div>
                </div>

                <p>Combining Pinsker's inequality with Le Cam's method: if \\(n \\cdot \\mathrm{KL}(P_{\\theta_0} \\| P_{\\theta_1})\\) is small, then total variation is small, and the lower bound is non-trivial.</p>

                <div class="env-block example">
                    <div class="env-title">Example 18.2 (Gaussian Location Model via Le Cam)</div>
                    <div class="env-body">
                        <p>Let \\(X_1, \\ldots, X_n \\sim N(\\theta, 1)\\) with \\(\\theta \\in \\mathbb{R}\\). Take \\(\\theta_0 = 0\\) and \\(\\theta_1 = \\delta\\). Then:</p>
                        <ul>
                            <li>Separation: \\(|\\theta_1 - \\theta_0| = \\delta\\)</li>
                            <li>\\(\\mathrm{KL}(N(0,1) \\| N(\\delta, 1)) = \\delta^2/2\\), so \\(\\mathrm{KL}(P_{\\theta_0}^n \\| P_{\\theta_1}^n) = n\\delta^2/2\\)</li>
                        </ul>
                        <p>Choosing \\(\\delta = c/\\sqrt{n}\\) makes the KL divergence \\(O(1)\\) while achieving separation \\(\\delta \\asymp 1/\\sqrt{n}\\). By Le Cam's method, \\(\\mathfrak{M}_n \\gtrsim 1/n\\) for squared error, matching the upper bound \\(1/n\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-lecam"></div>
            `,
            visualizations: [
                {
                    id: 'viz-lecam',
                    title: "Le Cam's Two-Point Method",
                    description: "Two hypotheses \\(\\theta_0\\) and \\(\\theta_1\\) produce distributions \\(P_{\\theta_0}\\) and \\(P_{\\theta_1}\\). The shaded overlap region represents the total variation distance. Adjust the separation to see how distinguishability changes.",
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 680, height: 380,
                            scale: 50,
                            originX: 340, originY: 300
                        });

                        var separation = 1.5;
                        var nObs = 1;

                        var sliderSep = VizEngine.createSlider(controls, 'Separation delta', 0.2, 4.0, 1.5, 0.1, function(v) {
                            separation = v; draw();
                        });
                        var sliderN = VizEngine.createSlider(controls, 'n (samples)', 1, 20, 1, 1, function(v) {
                            nObs = Math.round(v); draw();
                        });

                        function gaussianPdf(x, mu, sigma) {
                            var z = (x - mu) / sigma;
                            return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Effective standard deviation after n observations: sigma/sqrt(n)
                            var sigma = 1.0 / Math.sqrt(nObs);
                            var mu0 = -separation / 2;
                            var mu1 = separation / 2;

                            // Draw axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(20, 300);
                            ctx.lineTo(660, 300);
                            ctx.stroke();

                            // Scale for density plot
                            var peakHeight = gaussianPdf(0, 0, sigma);
                            var yScale = 220 / Math.max(peakHeight, 0.1);
                            var xMin = -5, xMax = 5;
                            var dx = 0.02;

                            // Compute overlap (TV region)
                            var tvIntegral = 0;
                            for (var xx = xMin; xx <= xMax; xx += dx) {
                                var p0 = gaussianPdf(xx, mu0, sigma);
                                var p1 = gaussianPdf(xx, mu1, sigma);
                                tvIntegral += Math.abs(p0 - p1) * dx;
                            }
                            var tvDist = tvIntegral / 2;

                            // Draw overlap region (shaded)
                            ctx.fillStyle = viz.colors.purple + '30';
                            ctx.beginPath();
                            var first = true;
                            for (var xx = xMin; xx <= xMax; xx += dx) {
                                var p0 = gaussianPdf(xx, mu0, sigma);
                                var p1 = gaussianPdf(xx, mu1, sigma);
                                var minP = Math.min(p0, p1);
                                var sx = 340 + xx * 60;
                                var sy = 300 - minP * yScale;
                                if (first) { ctx.moveTo(sx, 300); first = false; }
                                ctx.lineTo(sx, sy);
                            }
                            ctx.lineTo(340 + xMax * 60, 300);
                            ctx.closePath();
                            ctx.fill();

                            // Draw P_theta0
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var xx = xMin; xx <= xMax; xx += dx) {
                                var p0 = gaussianPdf(xx, mu0, sigma);
                                var sx = 340 + xx * 60;
                                var sy = 300 - p0 * yScale;
                                if (xx === xMin) ctx.moveTo(sx, sy);
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Draw P_theta1
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var xx = xMin; xx <= xMax; xx += dx) {
                                var p1 = gaussianPdf(xx, mu1, sigma);
                                var sx = 340 + xx * 60;
                                var sy = 300 - p1 * yScale;
                                if (xx === xMin) ctx.moveTo(sx, sy);
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Mark theta_0, theta_1 on x-axis
                            var sx0 = 340 + mu0 * 60;
                            var sx1 = 340 + mu1 * 60;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(sx0, 300, 5, 0, 2 * Math.PI); ctx.fill();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(sx1, 300, 5, 0, 2 * Math.PI); ctx.fill();

                            // Labels
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('\u03B8\u2080', sx0, 308);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('\u03B8\u2081', sx1, 308);

                            // Separation arrow
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath(); ctx.moveTo(sx0, 320); ctx.lineTo(sx1, 320); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('\u03B4 = ' + separation.toFixed(1), (sx0 + sx1) / 2, 325);

                            // KL and TV info
                            var klDiv = nObs * separation * separation / 2;
                            var pinskerBound = Math.min(1, Math.sqrt(klDiv / 2));
                            var testingError = (1 - tvDist) / 2;

                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            var infoX = 20, infoY = 14;
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('n = ' + nObs + ',  \u03C3/\u221An = ' + sigma.toFixed(3), infoX, infoY);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('KL(P\u2080\u207F \u2016 P\u2081\u207F) = ' + klDiv.toFixed(2), infoX, infoY + 18);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('TV(P\u2080\u207F, P\u2081\u207F) = ' + tvDist.toFixed(3), infoX, infoY + 36);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('Min testing error = ' + testingError.toFixed(3), infoX, infoY + 54);

                            // Lower bound
                            var lowerBound = (separation / 2) * (separation / 2) * (1 - tvDist);
                            ctx.fillStyle = viz.colors.red;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.fillText('Le Cam LB (squared): \u2265 ' + lowerBound.toFixed(4), infoX, infoY + 78);

                            // Legend
                            ctx.textAlign = 'right';
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('P_{\u03B8\u2080}', 660, 14);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('P_{\u03B8\u2081}', 660, 32);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('Overlap', 660, 50);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: "Consider observing \\(X \\sim N(\\theta, I_d)\\) in \\(\\mathbb{R}^d\\) (a single observation). Use Le Cam's method with \\(\\theta_0 = 0\\) and \\(\\theta_1 = \\delta e_1\\) (where \\(e_1\\) is the first standard basis vector) to show that \\(\\mathfrak{M}_1(\\mathbb{R}^d) \\geq c\\) for squared \\(\\ell_2\\) loss.",
                    hint: "Compute \\(\\mathrm{KL}(N(0, I_d) \\| N(\\delta e_1, I_d)) = \\delta^2/2\\). Choose \\(\\delta\\) so that \\(\\mathrm{TV}\\) is bounded below \\(1\\).",
                    solution: "We have \\(\\mathrm{KL}(P_{\\theta_0} \\| P_{\\theta_1}) = \\|\\theta_1 - \\theta_0\\|^2/2 = \\delta^2/2\\). By Pinsker, \\(\\mathrm{TV} \\leq \\sqrt{\\delta^2/4} = \\delta/2\\). Choosing \\(\\delta = 1\\), we get \\(\\mathrm{TV} \\leq 1/2\\), so Le Cam gives \\(\\mathfrak{M}_1 \\geq (\\delta/2)^2 \\cdot (1 - 1/2) = 1/8\\). Thus the minimax risk for estimating a \\(d\\)-dimensional Gaussian mean from a single observation is at least a constant, regardless of \\(d\\). (With \\(n\\) observations, the rate becomes \\(d/n\\).)"
                },
                {
                    question: "Show that Le Cam's method can only yield lower bounds of order \\(\\delta^2\\) where \\(\\delta\\) is the separation between the two hypotheses. Explain why this is a limitation for problems with large parameter spaces.",
                    hint: "The lower bound is \\(\\delta \\cdot (1 - \\mathrm{TV})\\). But to keep \\(\\mathrm{TV}\\) bounded away from 1, we need \\(\\delta\\) small. What happens for the \\(s\\)-sparse estimation problem?",
                    solution: "Le Cam's bound is \\(\\delta \\cdot (1 - \\mathrm{TV}(P_0^n, P_1^n))\\). For \\(\\mathrm{TV} \\leq 1/2\\), we need \\(n \\cdot \\mathrm{KL}(P_0 \\| P_1) \\leq 2\\) (via Pinsker), which forces \\(\\delta \\lesssim 1/\\sqrt{n}\\). Thus the lower bound is \\(O(1/n)\\). For sparse regression where the minimax rate is \\(s\\log(p/s)/n\\), Le Cam with two points cannot capture the \\(\\log(p/s)\\) factor since it does not exploit the combinatorial complexity of the parameter space. We need Fano's inequality with \\(M \\gg 2\\) hypotheses to capture this logarithmic factor."
                }
            ]
        },

        // ============================================================
        // SECTION 3: Fano's Inequality
        // ============================================================
        {
            id: 'ch18-sec03',
            title: "Fano's Inequality",
            content: `
                <h2>Fano's Inequality</h2>

                <p>Le Cam's two-point method is limited because it uses only two hypotheses and cannot capture the combinatorial richness of large parameter spaces. <strong>Fano's inequality</strong> generalizes the approach to \\(M \\geq 2\\) hypotheses, enabling us to derive sharp lower bounds for high-dimensional problems.</p>

                <h3>The Multiple Testing Reduction</h3>

                <p>The idea is to embed a <strong>multiple hypothesis testing</strong> problem within the estimation problem. We select \\(M\\) well-separated points in \\(\\Theta\\) and argue that distinguishing among them requires a certain number of observations.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 18.3 (Generalized Fano's Inequality)</div>
                    <div class="env-body">
                        <p>Let \\(\\{\\theta_0, \\theta_1, \\ldots, \\theta_M\\} \\subset \\Theta\\) satisfy \\(L(\\theta_j, \\theta_k) \\geq 2\\delta\\) for all \\(j \\neq k\\). Then</p>
                        \\[\\mathfrak{M}_n(\\Theta) \\;\\geq\\; \\delta \\cdot \\left(1 - \\frac{\\overline{I}_n + \\log 2}{\\log M}\\right),\\]
                        <p>where \\(\\overline{I}_n\\) is the average mutual information:</p>
                        \\[\\overline{I}_n = \\frac{1}{M} \\sum_{j=1}^{M} \\mathrm{KL}(P_{\\theta_j}^n \\| \\bar{P}^n), \\qquad \\bar{P}^n = \\frac{1}{M+1}\\sum_{j=0}^{M} P_{\\theta_j}^n.\\]
                    </div>
                </div>

                <p>A simpler and widely-used form replaces the mutual information with pairwise KL divergences:</p>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 18.1 (Fano with Pairwise KL)</div>
                    <div class="env-body">
                        <p>Under the hypotheses of Theorem 18.3, if \\(\\mathrm{KL}(P_{\\theta_j}^n \\| P_{\\theta_k}^n) \\leq \\beta\\) for all \\(j \\neq k\\), then</p>
                        \\[\\mathfrak{M}_n(\\Theta) \\;\\geq\\; \\delta \\cdot \\left(1 - \\frac{n \\cdot \\max_{j \\neq k} \\mathrm{KL}(P_{\\theta_j} \\| P_{\\theta_k}) + \\log 2}{\\log M}\\right).\\]
                        <p>The bound is non-trivial when \\(\\log M \\gg n \\cdot \\max_{j \\neq k} \\mathrm{KL}(P_{\\theta_j} \\| P_{\\theta_k})\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Information vs. Complexity</div>
                    <div class="env-body">
                        <p>Fano's inequality captures a fundamental tension: </p>
                        <ul>
                            <li>\\(\\log M\\) measures the <strong>combinatorial complexity</strong> of the parameter space (the number of bits needed to specify which \\(\\theta_j\\) is the true parameter).</li>
                            <li>\\(\\overline{I}_n\\) measures how much <strong>information</strong> the data provides about the identity of the true parameter.</li>
                        </ul>
                        <p>When the information is smaller than the complexity (\\(\\overline{I}_n \\ll \\log M\\)), no estimator can reliably identify the true \\(\\theta_j\\), and estimation error must be large.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (of Fano's Inequality)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be uniformly distributed on \\(\\{0, 1, \\ldots, M\\}\\), and let \\(X^n \\sim P_{\\theta_V}^n\\) given \\(V\\). Any estimator \\(\\hat{\\theta}\\) induces a decoder \\(\\hat{V} = \\arg\\min_j L(\\hat{\\theta}, \\theta_j)\\). Define \\(P_e = \\mathbb{P}(\\hat{V} \\neq V)\\).</p>

                        <p>By the classical Fano inequality from information theory:</p>
                        \\[P_e \\geq 1 - \\frac{I(V; X^n) + \\log 2}{\\log(M+1)},\\]
                        <p>where \\(I(V; X^n)\\) is the mutual information. Since \\(L(\\theta_j, \\theta_k) \\geq 2\\delta\\) for \\(j \\neq k\\), if \\(\\hat{V} \\neq V\\), then \\(L(\\hat{\\theta}, \\theta_V) \\geq \\delta\\). Therefore:</p>
                        \\[\\sup_{\\theta \\in \\Theta} \\mathbb{E}_\\theta[L(\\hat{\\theta}, \\theta)] \\geq \\frac{1}{M+1}\\sum_{j=0}^{M} \\mathbb{E}_{\\theta_j}[L(\\hat{\\theta}, \\theta_j)] \\geq \\delta \\cdot P_e.\\]
                        <p>The bound on \\(I(V; X^n) \\leq \\overline{I}_n\\) follows from the convexity of KL divergence, giving the result.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <h3>Constructing Packing Sets</h3>

                <p>The effectiveness of Fano's method depends on constructing a <strong>packing set</strong> \\(\\{\\theta_0, \\ldots, \\theta_M\\}\\) with:</p>
                <ol>
                    <li><strong>Large \\(M\\):</strong> more hypotheses means more bits of information needed.</li>
                    <li><strong>Large separation:</strong> \\(L(\\theta_j, \\theta_k) \\geq 2\\delta\\) for all pairs.</li>
                    <li><strong>Small KL:</strong> \\(\\mathrm{KL}(P_{\\theta_j} \\| P_{\\theta_k})\\) bounded for all pairs.</li>
                </ol>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 18.2 (Varshamov-Gilbert Bound)</div>
                    <div class="env-body">
                        <p>For any \\(m \\geq 8\\), there exists a subset \\(\\{\\omega_0, \\omega_1, \\ldots, \\omega_M\\} \\subset \\{0, 1\\}^m\\) with \\(M \\geq 2^{m/8}\\) such that</p>
                        \\[d_H(\\omega_j, \\omega_k) \\geq \\frac{m}{8} \\quad \\text{for all } j \\neq k,\\]
                        <p>where \\(d_H\\) is the Hamming distance.</p>
                    </div>
                </div>

                <p>This combinatorial lemma is a workhorse for constructing packing sets in high-dimensional estimation problems. The idea is to embed binary codes into the parameter space via a suitable mapping.</p>

                <div class="viz-placeholder" data-viz="viz-fano"></div>

                <div class="env-block example">
                    <div class="env-title">Example 18.3 (Nonparametric Density Estimation)</div>
                    <div class="env-body">
                        <p>Consider estimating a density \\(f\\) on \\([0,1]\\) with smoothness constraint \\(f \\in \\Sigma(\\beta, L)\\) (Holder class of order \\(\\beta\\)). The minimax rate under \\(L^2\\) loss is</p>
                        \\[\\mathfrak{M}_n(\\Sigma(\\beta, L)) \\asymp n^{-2\\beta/(2\\beta+1)}.\\]
                        <p>The lower bound is obtained via Fano's method: we construct \\(M = 2^{m}\\) densities by perturbing a base density with \\(m \\asymp n^{1/(2\\beta+1)}\\) local bumps, each bump chosen to be present or absent. The Varshamov-Gilbert bound ensures sufficient packing, and the KL divergence between any pair is \\(O(n \\cdot m \\cdot h^{2\\beta+1})\\) where \\(h = 1/m\\) is the bump width.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-fano',
                    title: "Fano's Inequality: Multiple Hypotheses",
                    description: "\\(M\\) hypotheses are arranged so that their KL balls overlap significantly. When the information \\(\\overline{I}_n\\) is small compared to \\(\\log M\\), no estimator can distinguish among them. Adjust \\(M\\) and the KL budget to see when the bound is non-trivial.",
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 680, height: 420,
                            scale: 40,
                            originX: 340, originY: 210
                        });

                        var numHyp = 8;
                        var klBudget = 1.0;

                        var sliderM = VizEngine.createSlider(controls, 'M (hypotheses)', 3, 20, 8, 1, function(v) {
                            numHyp = Math.round(v); draw();
                        });
                        var sliderKL = VizEngine.createSlider(controls, 'nKL (info budget)', 0.1, 8.0, 1.0, 0.1, function(v) {
                            klBudget = v; draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var M = numHyp;
                            var cx = 340, cy = 200;
                            var arrangementRadius = 120;
                            var klRadius = 30 + 50 * Math.sqrt(klBudget / 4);

                            // Draw KL balls around each hypothesis
                            var points = [];
                            for (var j = 0; j < M; j++) {
                                var angle = (2 * Math.PI * j) / M - Math.PI / 2;
                                var px = cx + arrangementRadius * Math.cos(angle);
                                var py = cy + arrangementRadius * Math.sin(angle);
                                points.push({x: px, y: py, angle: angle});
                            }

                            // Draw KL balls (overlap region)
                            for (var j = 0; j < M; j++) {
                                var hue = (j / M) * 360;
                                var color;
                                if (j % 6 === 0) color = viz.colors.blue;
                                else if (j % 6 === 1) color = viz.colors.orange;
                                else if (j % 6 === 2) color = viz.colors.green;
                                else if (j % 6 === 3) color = viz.colors.purple;
                                else if (j % 6 === 4) color = viz.colors.teal;
                                else color = viz.colors.red;

                                ctx.beginPath();
                                ctx.arc(points[j].x, points[j].y, klRadius, 0, 2 * Math.PI);
                                ctx.fillStyle = color + '18';
                                ctx.fill();
                                ctx.strokeStyle = color + '60';
                                ctx.lineWidth = 1.5;
                                ctx.stroke();
                            }

                            // Draw hypothesis points
                            for (var j = 0; j < M; j++) {
                                var color;
                                if (j % 6 === 0) color = viz.colors.blue;
                                else if (j % 6 === 1) color = viz.colors.orange;
                                else if (j % 6 === 2) color = viz.colors.green;
                                else if (j % 6 === 3) color = viz.colors.purple;
                                else if (j % 6 === 4) color = viz.colors.teal;
                                else color = viz.colors.red;

                                ctx.beginPath();
                                ctx.arc(points[j].x, points[j].y, 6, 0, 2 * Math.PI);
                                ctx.fillStyle = color;
                                ctx.fill();

                                // Label
                                var labelR = klRadius + 16;
                                var lx = cx + (arrangementRadius + labelR - klRadius + 10) * Math.cos(points[j].angle);
                                var ly = cy + (arrangementRadius + labelR - klRadius + 10) * Math.sin(points[j].angle);
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('\u03B8' + j, lx, ly);
                            }

                            // Compute Fano bound
                            var logM = Math.log(M);
                            var fanoFraction = Math.max(0, 1 - (klBudget + Math.log(2)) / logM);

                            // Info panel
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.font = '12px -apple-system,sans-serif';

                            var infoX = 15, infoY = 14;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.fillText("Fano's Inequality", infoX, infoY);

                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('M = ' + M + ' hypotheses', infoX, infoY + 22);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('log M = ' + logM.toFixed(2), infoX, infoY + 40);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('nKL (info) = ' + klBudget.toFixed(1), infoX, infoY + 58);

                            // Fano result
                            ctx.fillStyle = fanoFraction > 0.05 ? viz.colors.green : viz.colors.red;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.fillText('P(error) \u2265 ' + fanoFraction.toFixed(3), infoX, infoY + 84);

                            if (fanoFraction > 0.05) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('Bound is non-trivial!', infoX, infoY + 104);
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText('(info < complexity: estimation is hard)', infoX, infoY + 122);
                            } else {
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('Bound is trivial', infoX, infoY + 104);
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText('(info \u2265 complexity: need more M or less KL)', infoX, infoY + 122);
                            }

                            // Bottom bar: Fano fraction visualization
                            var barX = 60, barY = 395, barW = 560, barH = 14;
                            ctx.fillStyle = viz.colors.grid;
                            ctx.fillRect(barX, barY, barW, barH);
                            // Information portion
                            var infoWidth = Math.min(1, (klBudget + Math.log(2)) / logM) * barW;
                            ctx.fillStyle = viz.colors.purple + '80';
                            ctx.fillRect(barX, barY, infoWidth, barH);
                            // Remaining: error probability
                            if (fanoFraction > 0) {
                                ctx.fillStyle = viz.colors.green + '60';
                                ctx.fillRect(barX + infoWidth, barY, barW - infoWidth, barH);
                            }
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(barX, barY, barW, barH);

                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Information / Complexity ratio', barX + barW / 2, barY - 8);
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('I\u0304_n + log2', barX + 2, barY + barH + 12);
                            ctx.textAlign = 'right';
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('log M', barX + barW - 2, barY + barH + 12);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: "Suppose we have \\(M = 2^m\\) hypotheses with pairwise KL divergence bounded by \\(\\beta\\). Using Fano's inequality, show that the minimax risk satisfies \\(\\mathfrak{M}_n(\\Theta) \\geq \\delta \\cdot (1 - (n\\beta + \\log 2)/(m \\log 2))\\). When is this bound most useful?",
                    hint: "Recall that \\(\\log M = m \\log 2\\). The bound is non-trivial when \\(n\\beta \\ll m \\log 2\\), i.e., when the sample size is small relative to the complexity of the packing set.",
                    solution: "With \\(M = 2^m\\), we have \\(\\log M = m \\log 2\\). Substituting into Fano's bound: \\(\\mathfrak{M}_n \\geq \\delta(1 - (n\\beta + \\log 2)/(m \\log 2))\\). This is non-trivial (positive) when \\(n\\beta < m \\log 2 - \\log 2 = (m-1)\\log 2\\), i.e., \\(n < (m-1)\\log 2 / \\beta\\). The bound is most useful when the parameter space has high combinatorial complexity (large \\(m\\)) relative to the information per sample (small \\(\\beta\\)). This is precisely the regime of high-dimensional statistics."
                }
            ]
        },

        // ============================================================
        // SECTION 4: Assouad's Lemma
        // ============================================================
        {
            id: 'ch18-sec04',
            title: "Assouad's Lemma",
            content: `
                <h2>Assouad's Lemma</h2>

                <p>While Fano's inequality is powerful, it sometimes gives suboptimal constants because it treats the multiple testing problem globally. <strong>Assouad's lemma</strong> is tailored for parameter spaces with <strong>product structure</strong>, where the difficulty of estimation decomposes into independent coordinate-wise testing problems.</p>

                <h3>Product Parameter Spaces</h3>

                <p>Many high-dimensional estimation problems have a natural product structure. For instance, in sparse regression, the difficulty of estimating each coefficient can be analyzed separately. Assouad's lemma exploits this structure by reducing the minimax lower bound to a collection of two-point testing problems, one for each coordinate.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 18.6 (Hypercube Parameter Indexing)</div>
                    <div class="env-body">
                        <p>Consider a family of parameters \\(\\{\\theta_\\omega : \\omega \\in \\{-1, +1\\}^d\\}\\) indexed by the vertices of the \\(d\\)-dimensional hypercube. For each vertex \\(\\omega = (\\omega_1, \\ldots, \\omega_d)\\), let \\(\\omega^{(j)}\\) denote the vector obtained by flipping the \\(j\\)-th coordinate:</p>
                        \\[\\omega^{(j)}_k = \\begin{cases} -\\omega_j & \\text{if } k = j \\\\ \\omega_k & \\text{if } k \\neq j \\end{cases}\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 18.4 (Assouad's Lemma)</div>
                    <div class="env-body">
                        <p>Let \\(\\{\\theta_\\omega : \\omega \\in \\{-1,+1\\}^d\\} \\subset \\Theta\\) be a family of parameters satisfying:</p>
                        <ol>
                            <li><strong>Separation:</strong> \\(L(\\theta_\\omega, \\theta_{\\omega'}) \\geq \\alpha \\cdot d_H(\\omega, \\omega')\\) for all \\(\\omega, \\omega'\\)</li>
                            <li><strong>Indistinguishability:</strong> For each \\(j = 1, \\ldots, d\\) and each \\(\\omega\\),</li>
                        </ol>
                        \\[\\mathrm{TV}\\bigl(P_{\\theta_\\omega}^n, P_{\\theta_{\\omega^{(j)}}}^n\\bigr) \\leq \\gamma &lt; 1.\\]
                        <p>Then</p>
                        \\[\\mathfrak{M}_n(\\Theta) \\;\\geq\\; \\frac{\\alpha \\cdot d}{2} \\cdot (1 - \\gamma).\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Let \\(\\omega \\sim \\mathrm{Unif}(\\{-1,+1\\}^d)\\) and \\(X^n \\sim P_{\\theta_\\omega}^n\\). For any estimator \\(\\hat{\\theta}\\):</p>
                        \\[\\sup_{\\theta \\in \\Theta} R(\\hat{\\theta}, \\theta) \\;\\geq\\; \\mathbb{E}_\\omega\\bigl[R(\\hat{\\theta}, \\theta_\\omega)\\bigr] \\;\\geq\\; \\alpha \\cdot \\mathbb{E}_\\omega\\bigl[d_H(\\hat{\\omega}, \\omega)\\bigr]\\]
                        <p>where \\(\\hat{\\omega}_j = \\mathrm{sign}(\\hat{\\theta}_j)\\) (or any decoder). Decomposing by coordinates:</p>
                        \\[\\mathbb{E}_\\omega\\bigl[d_H(\\hat{\\omega}, \\omega)\\bigr] = \\sum_{j=1}^{d} \\mathbb{P}(\\hat{\\omega}_j \\neq \\omega_j).\\]
                        <p>For each \\(j\\), marginalizing over all coordinates except \\(j\\):</p>
                        \\[\\mathbb{P}(\\hat{\\omega}_j \\neq \\omega_j) \\;\\geq\\; \\frac{1}{2}(1 - \\gamma),\\]
                        <p>by Le Cam's lemma applied to the binary testing problem for the \\(j\\)-th coordinate. Summing over \\(j = 1, \\ldots, d\\) gives the result.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Coordinate-Wise Hardness</div>
                    <div class="env-body">
                        <p>Assouad's lemma says: if each coordinate is individually hard to estimate (the distributions before and after flipping one coordinate are close in TV), and the loss decomposes additively over coordinates, then the total estimation error is at least \\(d\\) times the per-coordinate error. This is particularly natural for:</p>
                        <ul>
                            <li><strong>Squared \\(\\ell_2\\) loss:</strong> \\(\\|\\hat{\\theta} - \\theta\\|_2^2 = \\sum_j (\\hat{\\theta}_j - \\theta_j)^2\\)</li>
                            <li><strong>Hamming loss:</strong> \\(\\sum_j \\mathbf{1}(\\hat{\\omega}_j \\neq \\omega_j)\\)</li>
                        </ul>
                    </div>
                </div>

                <h3>Comparison of the Three Methods</h3>

                <p>The following table summarizes when each method is most effective:</p>

                <table style="width:100%; border-collapse:collapse; margin:20px 0; font-size:0.9rem;">
                    <thead>
                        <tr style="border-bottom:2px solid var(--border-default);">
                            <th style="text-align:left; padding:8px; color:var(--text-bright);">Method</th>
                            <th style="text-align:left; padding:8px; color:var(--text-bright);">Hypotheses</th>
                            <th style="text-align:left; padding:8px; color:var(--text-bright);">Best for</th>
                            <th style="text-align:left; padding:8px; color:var(--text-bright);">Key quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom:1px solid var(--border-subtle);">
                            <td style="padding:8px; color:var(--accent-blue);">Le Cam</td>
                            <td style="padding:8px;">2</td>
                            <td style="padding:8px;">Simple parametric problems</td>
                            <td style="padding:8px;">\\(\\mathrm{TV}(P_0^n, P_1^n)\\)</td>
                        </tr>
                        <tr style="border-bottom:1px solid var(--border-subtle);">
                            <td style="padding:8px; color:var(--accent-orange);">Fano</td>
                            <td style="padding:8px;">\\(M \\gg 1\\)</td>
                            <td style="padding:8px;">Combinatorially rich spaces</td>
                            <td style="padding:8px;">\\(\\overline{I}_n / \\log M\\)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; color:var(--accent-green);">Assouad</td>
                            <td style="padding:8px;">\\(2^d\\)</td>
                            <td style="padding:8px;">Product parameter spaces</td>
                            <td style="padding:8px;">Per-coordinate TV</td>
                        </tr>
                    </tbody>
                </table>

                <div class="env-block remark">
                    <div class="env-title">Remark (Assouad vs. Fano)</div>
                    <div class="env-body">
                        <p>Assouad's lemma can be seen as applying Le Cam's method \\(d\\) times (once per coordinate) and summing the results. It gives sharper constants than Fano for problems with product structure because it avoids the logarithmic loss in Fano's bound. However, for problems where the difficulty is not coordinate-wise (e.g., estimating a single functional of \\(\\theta\\)), Fano is typically the method of choice.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 18.4 (Gaussian Sequence Model via Assouad)</div>
                    <div class="env-body">
                        <p>Observe \\(y_j = \\theta_j + \\varepsilon_j\\), \\(\\varepsilon_j \\sim N(0, 1)\\), for \\(j = 1, \\ldots, d\\). Consider \\(\\Theta = [-1, 1]^d\\) and squared \\(\\ell_2\\) loss. Take \\(\\theta_\\omega = \\delta \\omega\\) for \\(\\omega \\in \\{-1, +1\\}^d\\) with \\(\\delta\\) to be chosen.</p>
                        <ul>
                            <li>Separation: \\(\\|\\theta_\\omega - \\theta_{\\omega'}\\|_2^2 = 4\\delta^2 \\cdot d_H(\\omega, \\omega')\\), so \\(\\alpha = 4\\delta^2\\).</li>
                            <li>Flipping coordinate \\(j\\): \\(\\mathrm{KL}(P_{\\theta_\\omega} \\| P_{\\theta_{\\omega^{(j)}}}) = 2\\delta^2\\), so by Pinsker, \\(\\gamma \\leq \\sqrt{\\delta^2} = \\delta\\).</li>
                            <li>Choosing \\(\\delta = c\\) (a small constant), Assouad gives \\(\\mathfrak{M}_n \\geq c' \\cdot d\\).</li>
                        </ul>
                        <p>With \\(n = 1\\) observation, this gives the correct rate \\(d\\) for estimating a \\(d\\)-dimensional mean.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: "In the Gaussian sequence model \\(y_j = \\theta_j + \\varepsilon_j\\), \\(\\varepsilon_j \\sim N(0, \\sigma^2)\\), \\(j = 1, \\ldots, d\\), use Assouad's lemma to derive the minimax lower bound \\(\\mathfrak{M}_n \\geq c \\sigma^2 d\\) for squared \\(\\ell_2\\) loss over \\(\\Theta = \\{\\theta: \\|\\theta\\|_\\infty \\leq 1\\}\\).",
                    hint: "Set \\(\\theta_\\omega = \\delta \\omega\\) with \\(\\omega \\in \\{-1, +1\\}^d\\). Compute the KL divergence for flipping a single coordinate, apply Pinsker's inequality, and optimize \\(\\delta\\).",
                    solution: "Take \\(\\theta_\\omega = \\delta \\omega\\) with \\(\\delta \\leq 1\\). The separation condition gives \\(\\alpha = 4\\delta^2\\). For coordinate \\(j\\), flipping changes \\(\\theta_j\\) from \\(\\delta \\omega_j\\) to \\(-\\delta \\omega_j\\), and \\(\\mathrm{KL}(N(\\delta\\omega_j, \\sigma^2) \\| N(-\\delta\\omega_j, \\sigma^2)) = (2\\delta)^2/(2\\sigma^2) = 2\\delta^2/\\sigma^2\\). By Pinsker, \\(\\gamma \\leq \\sqrt{\\delta^2/\\sigma^2} = \\delta/\\sigma\\). Choose \\(\\delta = \\sigma/2\\) so that \\(\\gamma \\leq 1/2\\). Then Assouad gives \\(\\mathfrak{M}_n \\geq \\frac{4(\\sigma/2)^2 \\cdot d}{2} \\cdot (1 - 1/2) = \\sigma^2 d / 4\\). Hence \\(\\mathfrak{M}_n \\geq c \\sigma^2 d\\) with \\(c = 1/4\\)."
                }
            ]
        },

        // ============================================================
        // SECTION 5: Applications to Sparse Estimation
        // ============================================================
        {
            id: 'ch18-sec05',
            title: 'Applications: Sparse Regression Lower Bounds',
            content: `
                <h2>Applications: Sparse Regression Lower Bounds</h2>

                <p>We now apply the machinery developed in this chapter to establish the <strong>minimax lower bound for sparse linear regression</strong>, showing that the Lasso (Chapter 8) achieves the <em>optimal rate</em>.</p>

                <h3>The Sparse Regression Model</h3>

                <p>Recall the model \\(Y = X\\beta^* + \\varepsilon\\), where \\(Y \\in \\mathbb{R}^n\\), \\(X \\in \\mathbb{R}^{n \\times p}\\), \\(\\varepsilon \\sim N(0, \\sigma^2 I_n)\\), and \\(\\beta^* \\in \\mathbb{B}_0(s) = \\{\\beta \\in \\mathbb{R}^p : \\|\\beta\\|_0 \\leq s\\}\\) is \\(s\\)-sparse.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 18.5 (Minimax Lower Bound for Sparse Regression)</div>
                    <div class="env-body">
                        <p>Consider the Gaussian linear model with \\(X^T X / n = I_p\\) (orthogonal design). For \\(s \\leq p/2\\) and \\(n\\) sufficiently large, the minimax risk over the \\(s\\)-sparse ball satisfies</p>
                        \\[\\inf_{\\hat{\\beta}} \\sup_{\\beta^* \\in \\mathbb{B}_0(s)} \\mathbb{E}\\bigl[\\|\\hat{\\beta} - \\beta^*\\|_2^2\\bigr] \\;\\geq\\; c \\cdot \\frac{\\sigma^2 s \\log(p/s)}{n}\\]
                        <p>for a universal constant \\(c &gt; 0\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (via Fano's Method)</div>
                    <div class="env-body">
                        <p><strong>Step 1: Construct the packing set.</strong> Let \\(S \\subset \\{1, \\ldots, p\\}\\) with \\(|S| = s\\). Consider only vectors supported on \\(S\\), parametrized as \\(\\beta_\\omega = \\delta \\cdot \\omega\\) where \\(\\omega \\in \\{0, 1\\}^s\\) and \\(\\delta &gt; 0\\). By the Varshamov-Gilbert lemma, there exists \\(\\{\\omega_0, \\ldots, \\omega_M\\} \\subset \\{0,1\\}^s\\) with \\(M \\geq 2^{s/8}\\) and \\(d_H(\\omega_j, \\omega_k) \\geq s/8\\) for all \\(j \\neq k\\).</p>

                        <p><strong>Step 2: Verify separation.</strong> For the squared \\(\\ell_2\\) loss:</p>
                        \\[\\|\\beta_{\\omega_j} - \\beta_{\\omega_k}\\|_2^2 = \\delta^2 \\cdot d_H(\\omega_j, \\omega_k) \\geq \\frac{\\delta^2 s}{8}.\\]
                        <p>So separation \\(2\\delta_{\\mathrm{sep}} = \\delta^2 s / 8\\), giving \\(\\delta_{\\mathrm{sep}} = \\delta^2 s / 16\\).</p>

                        <p><strong>Step 3: Bound the KL divergence.</strong> Under orthogonal design, \\(Y \\sim N(X\\beta, \\sigma^2 I_n)\\), so</p>
                        \\[\\mathrm{KL}(P_{\\beta_j} \\| P_{\\beta_k}) = \\frac{n}{2\\sigma^2}\\|\\beta_j - \\beta_k\\|_2^2 = \\frac{n\\delta^2}{2\\sigma^2} d_H(\\omega_j, \\omega_k) \\leq \\frac{n\\delta^2 s}{2\\sigma^2}.\\]

                        <p><strong>Step 4: Apply Fano.</strong> By the corollary, the bound is non-trivial when</p>
                        \\[\\frac{n\\delta^2 s}{2\\sigma^2} + \\log 2 \\leq \\frac{s}{8} \\cdot \\log 2.\\]
                        <p>Actually, we can do better by using a more refined construction with \\(\\binom{p}{s}\\) possible support sets. We use the Varshamov-Gilbert bound on \\(\\{0,1\\}^p\\) with sparsity \\(s\\), obtaining \\(M \\geq \\exp(c \\cdot s \\log(p/s))\\) well-separated codewords. With this:</p>
                        \\[\\log M \\geq c \\cdot s \\log(p/s).\\]

                        <p>Setting \\(\\delta = c' \\sigma \\sqrt{\\log(p/s)/n}\\) makes the KL divergence \\(O(s \\log(p/s))\\), which matches \\(\\log M\\). Fano then gives</p>
                        \\[\\mathfrak{M}_n \\geq c'' \\cdot \\frac{\\sigma^2 s \\log(p/s)}{n}.\\]
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Where Does the log(p/s) Come From?</div>
                    <div class="env-body">
                        <p>The \\(\\log(p/s)\\) factor reflects the <strong>combinatorial complexity of support recovery</strong>. There are \\(\\binom{p}{s} \\approx (p/s)^s\\) possible support sets for an \\(s\\)-sparse vector. To identify the correct support, we need at least \\(\\log \\binom{p}{s} \\approx s \\log(p/s)\\) bits of information. Each observation provides \\(O(1)\\) bits (bounded by the KL divergence per sample), so we need \\(n \\gtrsim s \\log(p/s)\\) observations. This is precisely the threshold at which estimation becomes possible.</p>
                    </div>
                </div>

                <h3>Matching Upper and Lower Bounds</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 18.6 (Minimax Optimality of the Lasso)</div>
                    <div class="env-body">
                        <p>Under the conditions of Chapter 8 (restricted eigenvalue condition, suitable \\(\\lambda\\)), the Lasso estimator \\(\\hat{\\beta}_{\\mathrm{Lasso}}\\) satisfies</p>
                        \\[\\sup_{\\beta^* \\in \\mathbb{B}_0(s)} \\mathbb{E}\\bigl[\\|\\hat{\\beta}_{\\mathrm{Lasso}} - \\beta^*\\|_2^2\\bigr] \\;\\leq\\; C \\cdot \\frac{\\sigma^2 s \\log p}{n}.\\]
                        <p>Combined with the lower bound \\(\\mathfrak{M}_n \\geq c \\cdot \\sigma^2 s \\log(p/s) / n\\), this gives</p>
                        \\[c \\cdot \\frac{\\sigma^2 s \\log(p/s)}{n} \\;\\leq\\; \\mathfrak{M}_n(\\mathbb{B}_0(s)) \\;\\leq\\; C \\cdot \\frac{\\sigma^2 s \\log p}{n}.\\]
                        <p>When \\(s = o(p)\\), \\(\\log(p/s) \\asymp \\log p\\), and the Lasso is <strong>minimax rate-optimal</strong>.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-minimax-rate"></div>

                <h3>Further Applications</h3>

                <div class="env-block example">
                    <div class="env-title">Example 18.5 (Density Estimation: Sobolev Classes)</div>
                    <div class="env-body">
                        <p>For estimating a density in the \\(\\beta\\)-Sobolev ball of radius \\(L\\) under \\(L^2\\) loss:</p>
                        \\[\\mathfrak{M}_n(W^\\beta(L)) \\asymp n^{-2\\beta/(2\\beta+1)}.\\]
                        <p>The lower bound is obtained by Fano's method, constructing \\(M\\) densities by varying Fourier coefficients. The upper bound is achieved by projection estimators or kernel density estimators with optimal bandwidth.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 18.6 (Covariance Estimation)</div>
                    <div class="env-body">
                        <p>For estimating a \\(p \\times p\\) covariance matrix \\(\\Sigma\\) from \\(n\\) i.i.d. samples under the operator norm loss, over the class of matrices with bounded condition number:</p>
                        \\[\\mathfrak{M}_n \\asymp \\frac{p}{n} \\quad \\text{(if } n \\geq p\\text{)}.\\]
                        <p>For sparse covariance estimation (each row has at most \\(s\\) nonzeros), the rate improves to \\(s \\log p / n\\). These rates are established via variants of Assouad's lemma and Fano's inequality.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Local Minimax and Modulus of Continuity)</div>
                    <div class="env-body">
                        <p>The minimax framework can be refined to <strong>local minimax theory</strong>, which characterizes the difficulty of estimation in a neighborhood of a specific parameter value \\(\\theta_0\\). The key quantity is the <strong>modulus of continuity</strong>:</p>
                        \\[\\omega(\\varepsilon) = \\sup\\{L(\\theta_0, \\theta_1) : \\mathrm{KL}(P_{\\theta_0} \\| P_{\\theta_1}) \\leq \\varepsilon^2\\}.\\]
                        <p>The local minimax risk at \\(\\theta_0\\) is then \\(\\omega(1/\\sqrt{n})^2\\). This provides a finer characterization than the global minimax rate and is connected to the theory of moduli of continuity in functional analysis.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Summary: The Minimax Program</div>
                    <div class="env-body">
                        <p>This chapter has established the following program for characterizing the fundamental difficulty of estimation:</p>
                        <ol>
                            <li><strong>Identify the parameter space</strong> \\(\\Theta\\) and the loss \\(L\\).</li>
                            <li><strong>Upper bound:</strong> Construct an estimator (Lasso, thresholding, projection) and bound its worst-case risk.</li>
                            <li><strong>Lower bound:</strong> Use Le Cam, Fano, or Assouad to show no estimator can do better.</li>
                            <li><strong>Match:</strong> When upper and lower bounds agree, declare the estimator minimax optimal.</li>
                        </ol>
                        <p>The fact that the Lasso achieves the minimax rate \\(s \\log(p/s)/n\\) for sparse regression is one of the crowning achievements of high-dimensional statistics.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-minimax-rate',
                    title: 'Minimax Rate Explorer for Sparse Regression',
                    description: "Explore how the minimax rate \\(s \\log(p/s)/n\\) depends on sparsity \\(s\\), dimension \\(p\\), and sample size \\(n\\). The Lasso's achieved rate matches the lower bound.",
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 700, height: 420,
                            scale: 40,
                            originX: 80, originY: 370
                        });

                        var pDim = 500;
                        var nSamp = 200;

                        var sliderP = VizEngine.createSlider(controls, 'p (dimension)', 50, 2000, 500, 50, function(v) {
                            pDim = Math.round(v); draw();
                        });
                        var sliderN = VizEngine.createSlider(controls, 'n (samples)', 10, 1000, 200, 10, function(v) {
                            nSamp = Math.round(v); draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var p = pDim;
                            var n = nSamp;

                            // Plot region
                            var plotL = 80, plotT = 40, plotR = 660, plotB = 370;
                            var plotW = plotR - plotL, plotH = plotB - plotT;

                            // s ranges from 1 to p/2
                            var maxS = Math.floor(p / 2);
                            var sValues = [];
                            var step = Math.max(1, Math.floor(maxS / 200));
                            for (var s = 1; s <= maxS; s += step) {
                                sValues.push(s);
                            }
                            if (sValues[sValues.length - 1] !== maxS) sValues.push(maxS);

                            // Compute rates
                            var minimaxRates = sValues.map(function(s) {
                                return s * Math.log(p / s) / n;
                            });
                            var lassoRates = sValues.map(function(s) {
                                return s * Math.log(p) / n;
                            });
                            var parametricRates = sValues.map(function(s) {
                                return s / n;
                            });

                            // Find max for scaling
                            var allRates = minimaxRates.concat(lassoRates);
                            var maxRate = Math.max.apply(null, allRates);
                            if (maxRate < 0.01) maxRate = 0.01;

                            // Axis scaling
                            var xScale = plotW / maxS;
                            var yScale = plotH / (maxRate * 1.1);

                            // Draw grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            var numGridY = 5;
                            for (var i = 0; i <= numGridY; i++) {
                                var yVal = (maxRate * 1.1) * i / numGridY;
                                var yy = plotB - yVal * yScale;
                                ctx.beginPath(); ctx.moveTo(plotL, yy); ctx.lineTo(plotR, yy); ctx.stroke();
                            }
                            var numGridX = 5;
                            for (var i = 0; i <= numGridX; i++) {
                                var xVal = maxS * i / numGridX;
                                var xx = plotL + xVal * xScale;
                                ctx.beginPath(); ctx.moveTo(xx, plotT); ctx.lineTo(xx, plotB); ctx.stroke();
                            }

                            // Draw axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(plotL, plotB); ctx.lineTo(plotR, plotB); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(plotL, plotB); ctx.lineTo(plotL, plotT); ctx.stroke();

                            // Axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('Sparsity s', (plotL + plotR) / 2, plotB + 20);

                            // X ticks
                            for (var i = 0; i <= numGridX; i++) {
                                var xVal = Math.round(maxS * i / numGridX);
                                var xx = plotL + xVal * xScale;
                                ctx.fillText(xVal.toString(), xx, plotB + 5);
                            }

                            // Y ticks
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            for (var i = 0; i <= numGridY; i++) {
                                var yVal = (maxRate * 1.1) * i / numGridY;
                                var yy = plotB - yVal * yScale;
                                ctx.fillText(yVal.toFixed(2), plotL - 6, yy);
                            }

                            // Y axis label
                            ctx.save();
                            ctx.translate(16, (plotT + plotB) / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('Minimax Risk', 0, 0);
                            ctx.restore();

                            // Plot parametric rate s/n (dashed gray)
                            ctx.strokeStyle = viz.colors.text + '60';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            for (var i = 0; i < sValues.length; i++) {
                                var xx = plotL + sValues[i] * xScale;
                                var yy = plotB - parametricRates[i] * yScale;
                                yy = Math.max(plotT, yy);
                                if (i === 0) ctx.moveTo(xx, yy);
                                else ctx.lineTo(xx, yy);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Plot minimax lower bound (green, thick)
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            for (var i = 0; i < sValues.length; i++) {
                                var xx = plotL + sValues[i] * xScale;
                                var yy = plotB - minimaxRates[i] * yScale;
                                yy = Math.max(plotT, yy);
                                if (i === 0) ctx.moveTo(xx, yy);
                                else ctx.lineTo(xx, yy);
                            }
                            ctx.stroke();

                            // Plot Lasso upper bound (blue, thick)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            for (var i = 0; i < sValues.length; i++) {
                                var xx = plotL + sValues[i] * xScale;
                                var yy = plotB - lassoRates[i] * yScale;
                                yy = Math.max(plotT, yy);
                                if (i === 0) ctx.moveTo(xx, yy);
                                else ctx.lineTo(xx, yy);
                            }
                            ctx.stroke();

                            // Shade region between lower and upper (the gap)
                            ctx.fillStyle = viz.colors.teal + '15';
                            ctx.beginPath();
                            for (var i = 0; i < sValues.length; i++) {
                                var xx = plotL + sValues[i] * xScale;
                                var yy = plotB - minimaxRates[i] * yScale;
                                yy = Math.max(plotT, yy);
                                if (i === 0) ctx.moveTo(xx, yy);
                                else ctx.lineTo(xx, yy);
                            }
                            for (var i = sValues.length - 1; i >= 0; i--) {
                                var xx = plotL + sValues[i] * xScale;
                                var yy = plotB - lassoRates[i] * yScale;
                                yy = Math.max(plotT, yy);
                                ctx.lineTo(xx, yy);
                            }
                            ctx.closePath();
                            ctx.fill();

                            // Legend
                            var legX = plotR - 200, legY = plotT + 10;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'middle';

                            ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(legX, legY); ctx.lineTo(legX + 25, legY); ctx.stroke();
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('LB: s log(p/s)/n', legX + 30, legY);

                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(legX, legY + 20); ctx.lineTo(legX + 25, legY + 20); ctx.stroke();
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('UB (Lasso): s log(p)/n', legX + 30, legY + 20);

                            ctx.strokeStyle = viz.colors.text + '60'; ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(legX, legY + 40); ctx.lineTo(legX + 25, legY + 40); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Parametric: s/n', legX + 30, legY + 40);

                            // Title info
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('p = ' + p + ',  n = ' + n, plotL + 10, plotT + 12);

                            // Ratio at s = sqrt(p)
                            var sMid = Math.max(1, Math.round(Math.sqrt(p)));
                            if (sMid <= maxS) {
                                var rLB = sMid * Math.log(p / sMid) / n;
                                var rUB = sMid * Math.log(p) / n;
                                var ratio = rUB / rLB;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText('At s = \u221Ap \u2248 ' + sMid + ':  UB/LB ratio = ' + ratio.toFixed(2), plotL + 10, plotT + 30);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: "Consider the sparse Gaussian sequence model: \\(y_j = \\theta_j + \\varepsilon_j\\), \\(\\varepsilon_j \\sim N(0,1)\\), \\(j = 1, \\ldots, p\\), with \\(\\|\\theta\\|_0 \\leq s\\). Use Fano's method with the Varshamov-Gilbert construction to prove that \\(\\mathfrak{M} \\geq c \\cdot s \\log(p/s)\\) for \\(\\ell_2^2\\) loss.",
                    hint: "Construct codewords \\(\\omega \\in \\{0,1\\}^p\\) with \\(\\|\\omega\\|_1 = s\\) and pairwise Hamming distance at least \\(s/4\\). The number of such codewords satisfies \\(\\log M \\geq c \\cdot s \\log(p/s)\\). Set \\(\\theta_\\omega = \\delta \\cdot \\omega\\) and compute the pairwise KL.",
                    solution: "By a variant of the Varshamov-Gilbert bound on binary vectors of weight \\(s\\) in \\(\\{0,1\\}^p\\), there exist \\(M \\geq \\exp(c s \\log(p/s))\\) codewords with pairwise Hamming distance \\(\\geq s/4\\). Define \\(\\theta_\\omega = \\delta \\omega\\). Then \\(\\|\\theta_{\\omega_j} - \\theta_{\\omega_k}\\|_2^2 = \\delta^2 d_H(\\omega_j, \\omega_k) \\geq \\delta^2 s/4\\), giving separation \\(2\\delta_{\\text{sep}} = \\delta^2 s/4\\). The KL divergence is \\(\\mathrm{KL}(P_j \\| P_k) = \\delta^2 d_H(\\omega_j, \\omega_k) / 2 \\leq \\delta^2 s/2\\). For Fano to be non-trivial, we need \\(\\delta^2 s / 2 \\ll s \\log(p/s)\\), i.e., \\(\\delta^2 \\ll \\log(p/s)\\). Choosing \\(\\delta^2 = c' \\log(p/s)\\) yields \\(\\mathfrak{M} \\geq c'' \\cdot s \\log(p/s)\\)."
                },
                {
                    question: "Explain why the gap between the Lasso upper bound \\(s \\log p / n\\) and the minimax lower bound \\(s \\log(p/s)/n\\) is negligible when \\(s = o(p)\\). For what regime of \\(s\\) relative to \\(p\\) is the gap largest?",
                    hint: "Write \\(\\log(p/s) = \\log p - \\log s\\). When is \\(\\log s \\ll \\log p\\)?",
                    solution: "We have \\(\\log(p/s) = \\log p - \\log s\\). The ratio is \\(\\log p / \\log(p/s) = \\log p / (\\log p - \\log s) = 1/(1 - \\log s / \\log p)\\). When \\(s = p^\\alpha\\) for some \\(\\alpha \\in (0,1)\\), this ratio is \\(1/(1-\\alpha)\\), which is a constant. In particular, for \\(s = O(p^\\alpha)\\) with \\(\\alpha < 1\\), \\(\\log(p/s) \\asymp \\log p\\) and the bounds match up to constants. The gap is largest when \\(s\\) is proportional to \\(p\\) (say \\(s = p/4\\)), where \\(\\log(p/s) = \\log 4 = O(1)\\) while \\(\\log p \\to \\infty\\). In this dense regime, the Lasso's rate \\(s \\log p / n\\) is suboptimal by a factor of \\(\\log p\\); different estimators (like the oracle least squares) achieve the correct rate \\(s/n \\approx p/n\\)."
                }
            ]
        }
    ]
});
