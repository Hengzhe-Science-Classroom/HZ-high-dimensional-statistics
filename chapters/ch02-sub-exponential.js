window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch02',
    number: 2,
    title: 'Concentration II: Sub-Exponential',
    subtitle: 'Bernstein-type bounds and bounded differences',
    sections: [
        // ============================================================
        // SECTION 1: Sub-Exponential Random Variables
        // ============================================================
        {
            id: 'ch02-sec01',
            title: 'Sub-Exponential Random Variables',
            content: `
                <h2>Sub-Exponential Random Variables</h2>

                <p>In the previous chapter, we studied sub-Gaussian random variables --- those whose tails decay at least as fast as a Gaussian. Many important random variables, however, have <strong>heavier tails</strong> that decay exponentially rather than as \\\\(e^{-ct^2}\\\\). The canonical example is the \\\\(\\\\chi^2\\\\) distribution.</p>

                <h3>Motivating Example: The \\\\(\\\\chi^2\\\\) Distribution</h3>

                <p>If \\\\(Z_1, \\\\ldots, Z_n \\\\sim \\\\mathcal{N}(0,1)\\\\) are independent standard normals, consider the sum of squares:</p>
                \\\\[X = Z_1^2 + Z_2^2 + \\\\cdots + Z_n^2 \\\\sim \\\\chi^2_n.\\\\]

                <p>Each \\\\(Z_i^2\\\\) has mean 1 and variance 2. Although \\\\(Z_i\\\\) is sub-Gaussian, the square \\\\(Z_i^2\\\\) is <em>not</em> sub-Gaussian. To see this, note that for a sub-Gaussian random variable \\\\(Y\\\\) with parameter \\\\(\\\\sigma\\\\), we need:</p>
                \\\\[\\\\mathbb{P}(|Y - \\\\mathbb{E}Y| \\\\geq t) \\\\leq 2e^{-t^2/(2\\\\sigma^2)}\\\\]

                <p>But for \\\\(Y = Z^2\\\\) with \\\\(Z \\\\sim \\\\mathcal{N}(0,1)\\\\):</p>
                \\\\[\\\\mathbb{P}(Z^2 \\\\geq 1 + t) = \\\\mathbb{P}(|Z| \\\\geq \\\\sqrt{1+t}) \\\\leq 2e^{-(1+t)/2}\\\\]

                <p>which decays as \\\\(e^{-ct}\\\\), not \\\\(e^{-ct^2}\\\\). This is slower than sub-Gaussian but still exponential --- this is the <strong>sub-exponential</strong> regime.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 2.1 (Sub-Exponential Random Variable)</div>
                    <div class="env-body">
                        <p>A random variable \\\\(X\\\\) is called <strong>sub-exponential</strong> if there exist non-negative parameters \\\\((\\\\nu^2, \\\\alpha)\\\\) such that:</p>
                        \\\\[\\\\mathbb{E}\\\\bigl[e^{\\\\lambda(X - \\\\mathbb{E}X)}\\\\bigr] \\\\leq \\\\exp\\\\!\\\\left(\\\\frac{\\\\nu^2 \\\\lambda^2}{2}\\\\right) \\\\quad \\\\text{for all } |\\\\lambda| &lt; \\\\frac{1}{\\\\alpha}.\\\\]
                        <p>The pair \\\\((\\\\nu^2, \\\\alpha)\\\\) is called a <strong>sub-exponential parameter</strong> of \\\\(X\\\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Compare with the sub-Gaussian definition, where the MGF bound \\\\(\\\\mathbb{E}[e^{\\\\lambda(X - \\\\mu)}] \\\\leq e^{\\\\sigma^2\\\\lambda^2/2}\\\\) holds for <em>all</em> \\\\(\\\\lambda \\\\in \\\\mathbb{R}\\\\). For sub-exponential random variables, we only control the MGF in a <em>bounded neighborhood</em> of zero: \\\\(|\\\\lambda| &lt; 1/\\\\alpha\\\\). Outside this neighborhood, the MGF may blow up --- this is exactly what happens with heavy-tailed variables like \\\\(Z^2\\\\).</p>
                    </div>
                </div>

                <h3>The Sub-Exponential Norm \\\\(\\\\|X\\\\|_{\\\\psi_1}\\\\)</h3>

                <p>Just as we used the \\\\(\\\\psi_2\\\\)-norm (or sub-Gaussian norm) in Chapter 1, there is a corresponding Orlicz norm for the sub-exponential class.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 2.2 (Sub-Exponential Norm)</div>
                    <div class="env-body">
                        <p>The <strong>sub-exponential norm</strong> of a random variable \\\\(X\\\\) is:</p>
                        \\\\[\\\\|X\\\\|_{\\\\psi_1} = \\\\inf\\\\!\\\\left\\\\{t &gt; 0 : \\\\mathbb{E}\\\\bigl[\\\\exp(|X|/t)\\\\bigr] \\\\leq 2\\\\right\\\\}.\\\\]
                        <p>A random variable \\\\(X\\\\) is sub-exponential if and only if \\\\(\\\\|X\\\\|_{\\\\psi_1} &lt; \\\\infty\\\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Proposition 2.3 (Equivalent Characterizations)</div>
                    <div class="env-body">
                        <p>Let \\\\(X\\\\) be a random variable with \\\\(\\\\mathbb{E}X = 0\\\\). The following properties are equivalent (with parameters differing by at most universal constants):</p>
                        <ol>
                            <li><strong>Tail condition:</strong> \\\\(\\\\mathbb{P}(|X| \\\\geq t) \\\\leq 2\\\\exp(-t/K_1)\\\\) for all \\\\(t \\\\geq 0\\\\).</li>
                            <li><strong>Moment condition:</strong> \\\\(\\\\bigl(\\\\mathbb{E}|X|^p\\\\bigr)^{1/p} \\\\leq K_2\\, p\\\\) for all \\\\(p \\\\geq 1\\\\).</li>
                            <li><strong>MGF condition near zero:</strong> \\\\(\\\\mathbb{E}[e^{\\\\lambda X}] \\\\leq e^{K_3^2 \\\\lambda^2/2}\\\\) for all \\\\(|\\\\lambda| \\\\leq 1/K_3\\\\).</li>
                            <li><strong>Finite \\\\(\\\\psi_1\\\\)-norm:</strong> \\\\(\\\\|X\\\\|_{\\\\psi_1} \\\\leq K_4\\\\).</li>
                        </ol>
                        <p>Here \\\\(K_1, K_2, K_3, K_4\\\\) are related by universal constants.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Sub-Gaussian vs. Sub-Exponential Moments)</div>
                    <div class="env-body">
                        <p>For sub-Gaussian variables, the \\\\(p\\\\)-th moment grows as \\\\(\\\\sigma \\\\sqrt{p}\\\\); for sub-exponential variables, it grows as \\\\(K p\\\\). This linear-in-\\\\(p\\\\) growth (versus square-root) is the hallmark of heavier tails.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 2.4</div>
                    <div class="env-body">
                        <p><strong>(a) Squared Gaussian:</strong> If \\\\(Z \\\\sim \\\\mathcal{N}(0,1)\\\\), then \\\\(Z^2 - 1\\\\) is sub-exponential with \\\\(\\\\|Z^2 - 1\\\\|_{\\\\psi_1} \\\\leq C\\\\) for a universal constant \\\\(C\\\\).</p>
                        <p><strong>(b) Exponential distribution:</strong> If \\\\(X \\\\sim \\\\mathrm{Exp}(\\\\lambda)\\\\), then \\\\(X\\\\) is sub-exponential with \\\\(\\\\|X\\\\|_{\\\\psi_1} = 1/\\\\lambda\\\\).</p>
                        <p><strong>(c) Bounded variables:</strong> Every sub-Gaussian variable is sub-exponential (but not conversely). If \\\\(\\\\|X\\\\|_{\\\\psi_2} = \\\\sigma\\\\), then \\\\(\\\\|X\\\\|_{\\\\psi_1} \\\\leq C\\\\sigma\\\\).</p>
                    </div>
                </div>

                <h3>The Bernstein Condition</h3>

                <p>An important alternative characterization uses moment growth conditions.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 2.5 (Bernstein Condition)</div>
                    <div class="env-body">
                        <p>A centered random variable \\\\(X\\\\) satisfies the <strong>Bernstein condition</strong> with parameter \\\\(b &gt; 0\\\\) if:</p>
                        \\\\[\\\\bigl|\\\\mathbb{E}[X^k]\\\\bigr| \\\\leq \\\\frac{k!}{2} \\\\cdot \\\\sigma^2 \\\\cdot b^{k-2} \\\\quad \\\\text{for all integers } k \\\\geq 2,\\\\]
                        <p>where \\\\(\\\\sigma^2 = \\\\operatorname{Var}(X)\\\\). Equivalently, the MGF satisfies:</p>
                        \\\\[\\\\mathbb{E}[e^{\\\\lambda X}] \\\\leq \\\\exp\\\\!\\\\left(\\\\frac{\\\\sigma^2 \\\\lambda^2}{2(1 - b|\\\\lambda|)}\\\\right) \\\\quad \\\\text{for } |\\\\lambda| &lt; 1/b.\\\\]
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body">
                        <p>Pareto, log-normal, and other <em>heavy-tailed</em> distributions (polynomial tail decay) are <em>not</em> sub-exponential. The sub-exponential class, while broader than sub-Gaussian, still requires exponential tail decay.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: []
        },
        // ============================================================
        // SECTION 2: Bernstein's Inequality
        // ============================================================
        {
            id: 'ch02-sec02',
            title: "Bernstein's Inequality",
            content: `
                <h2>Bernstein's Inequality</h2>

                <p>The central result for sub-exponential random variables is <strong>Bernstein's inequality</strong>. Unlike Hoeffding's inequality, which uses only boundedness information, Bernstein's inequality is <em>variance-sensitive</em>: it exploits the variance of the summands to give tighter bounds when the variance is small.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 2.6 (Bernstein's Inequality)</div>
                    <div class="env-body">
                        <p>Let \\\\(X_1, \\\\ldots, X_n\\\\) be independent centered random variables. Suppose each \\\\(X_i\\\\) satisfies the Bernstein condition with variance proxy \\\\(\\\\sigma_i^2\\\\) and parameter \\\\(b\\\\). Then for all \\\\(t \\\\geq 0\\\\):</p>
                        \\\\[\\\\mathbb{P}\\\\!\\\\left(\\\\left|\\\\frac{1}{n}\\\\sum_{i=1}^n X_i\\\\right| \\\\geq t\\\\right) \\\\leq 2\\\\exp\\\\!\\\\left(-\\\\frac{n}{2} \\\\cdot \\\\frac{t^2}{\\\\bar{\\\\sigma}^2 + bt}\\\\right),\\\\]
                        <p>where \\\\(\\\\bar{\\\\sigma}^2 = \\\\frac{1}{n}\\\\sum_{i=1}^n \\\\sigma_i^2\\\\) is the average variance.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>Apply the Chernoff method: for \\\\(\\\\lambda &gt; 0\\\\),</p>
                        \\\\[\\\\mathbb{P}\\\\!\\\\left(\\\\sum_{i=1}^n X_i \\\\geq nt\\\\right) \\\\leq e^{-\\\\lambda nt} \\\\prod_{i=1}^n \\\\mathbb{E}[e^{\\\\lambda X_i}].\\\\]
                        <p>Using the Bernstein condition on each factor:</p>
                        \\\\[\\\\prod_{i=1}^n \\\\mathbb{E}[e^{\\\\lambda X_i}] \\\\leq \\\\exp\\\\!\\\\left(\\\\frac{\\\\lambda^2 \\\\sum_i \\\\sigma_i^2}{2(1 - b\\\\lambda)}\\\\right) = \\\\exp\\\\!\\\\left(\\\\frac{n\\\\bar{\\\\sigma}^2 \\\\lambda^2}{2(1 - b\\\\lambda)}\\\\right).\\\\]
                        <p>Optimizing over \\\\(\\\\lambda \\\\in (0, 1/b)\\\\), the minimizer is:</p>
                        \\\\[\\\\lambda^* = \\\\frac{t}{\\\\bar{\\\\sigma}^2 + bt},\\\\]
                        <p>which lies in \\\\((0, 1/b)\\\\) for all \\\\(t &gt; 0\\\\). Substituting gives the result. The two-sided bound follows by applying the same argument to \\\\(-X_i\\\\).</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <h3>The Two Regimes</h3>

                <p>Bernstein's inequality exhibits a beautiful <strong>phase transition</strong> depending on the magnitude of \\\\(t\\\\):</p>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Two Regimes of Bernstein's Bound</div>
                    <div class="env-body">
                        <p><strong>Small \\\\(t\\\\) (\\\\(t \\\\ll \\\\bar{\\\\sigma}^2/b\\\\)):</strong> The denominator is dominated by \\\\(\\\\bar{\\\\sigma}^2\\\\), giving:</p>
                        \\\\[\\\\mathbb{P}\\\\!\\\\left(\\\\left|\\\\bar{X}_n\\\\right| \\\\geq t\\\\right) \\\\lesssim 2\\\\exp\\\\!\\\\left(-\\\\frac{nt^2}{2\\\\bar{\\\\sigma}^2}\\\\right).\\\\]
                        <p>This is a <em>sub-Gaussian</em> tail --- the bound is quadratic in \\\\(t\\\\) and controlled by the variance. This is the <strong>moderate deviation</strong> regime.</p>

                        <p><strong>Large \\\\(t\\\\) (\\\\(t \\\\gg \\\\bar{\\\\sigma}^2/b\\\\)):</strong> The denominator is dominated by \\\\(bt\\\\), giving:</p>
                        \\\\[\\\\mathbb{P}\\\\!\\\\left(\\\\left|\\\\bar{X}_n\\\\right| \\\\geq t\\\\right) \\\\lesssim 2\\\\exp\\\\!\\\\left(-\\\\frac{nt}{2b}\\\\right).\\\\]
                        <p>This is a <em>sub-exponential</em> tail --- the bound is linear in \\\\(t\\\\). This is the <strong>large deviation</strong> regime.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-bernstein-hoeffding"></div>

                <div class="env-block example">
                    <div class="env-title">Example 2.7 (\\\\(\\\\chi^2\\\\) Concentration)</div>
                    <div class="env-body">
                        <p>Let \\\\(X = \\\\frac{1}{n}\\\\sum_{i=1}^n Z_i^2\\\\) where \\\\(Z_i \\\\sim \\\\mathcal{N}(0,1)\\\\) are i.i.d. Each centered variable \\\\(Z_i^2 - 1\\\\) has variance \\\\(\\\\sigma^2 = 2\\\\) and satisfies Bernstein's condition with \\\\(b = 4\\\\). By Bernstein's inequality:</p>
                        \\\\[\\\\mathbb{P}\\\\!\\\\left(\\\\left|\\\\frac{1}{n}\\\\sum_{i=1}^n Z_i^2 - 1\\\\right| \\\\geq t\\\\right) \\\\leq 2\\\\exp\\\\!\\\\left(-\\\\frac{n}{2} \\\\cdot \\\\frac{t^2}{2 + 4t}\\\\right).\\\\]
                        <p>For the moderate regime \\\\(t \\\\leq 1/2\\\\), this gives \\\\(\\\\approx 2e^{-nt^2/8}\\\\), much better than Hoeffding (which would treat each \\\\(Z_i^2\\\\) as bounded and give a far worse constant).</p>
                    </div>
                </div>

                <h3>Comparison with Hoeffding</h3>

                <p>For bounded random variables on \\\\([a, b]\\\\), Hoeffding's inequality gives:</p>
                \\\\[\\\\mathbb{P}(|\\\\bar{X}_n - \\\\mu| \\\\geq t) \\\\leq 2\\\\exp\\\\!\\\\left(-\\\\frac{2nt^2}{(b-a)^2}\\\\right).\\\\]

                <p>Bernstein's inequality gives:</p>
                \\\\[\\\\mathbb{P}(|\\\\bar{X}_n - \\\\mu| \\\\geq t) \\\\leq 2\\\\exp\\\\!\\\\left(-\\\\frac{nt^2}{2\\\\sigma^2 + \\\\frac{2}{3}(b-a)t}\\\\right).\\\\]

                <p>When the variance \\\\(\\\\sigma^2 \\\\ll (b-a)^2\\\\), Bernstein is <strong>substantially tighter</strong>. Consider coin flips with bias \\\\(p = 0.01\\\\): the range is \\\\([0,1]\\\\), so Hoeffding uses denominator \\\\(1\\\\), but the variance is \\\\(p(1-p) \\\\approx 0.01\\\\), so Bernstein uses a denominator about 100 times smaller.</p>

                <div class="env-block theorem">
                    <div class="env-title">Corollary 2.8 (Confidence Width)</div>
                    <div class="env-body">
                        <p>For \\\\(\\\\bar{X}_n = \\\\frac{1}{n}\\\\sum_{i=1}^n X_i\\\\) with \\\\(X_i \\\\in [0,1]\\\\) i.i.d., \\\\(\\\\mathbb{E}X_i = \\\\mu\\\\), \\\\(\\\\operatorname{Var}(X_i) = \\\\sigma^2\\\\):</p>
                        <ul>
                            <li><strong>Hoeffding:</strong> width \\\\(\\\\sim \\\\sqrt{\\\\log(1/\\\\delta)/(2n)}\\\\)</li>
                            <li><strong>Bernstein:</strong> width \\\\(\\\\sim \\\\sigma\\\\sqrt{2\\\\log(1/\\\\delta)/n} + \\\\frac{2\\\\log(1/\\\\delta)}{3n}\\\\)</li>
                        </ul>
                        <p>When \\\\(\\\\sigma \\\\ll 1\\\\), Bernstein gives confidence intervals that are \\\\(\\\\sigma\\\\) times narrower.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-bernstein-hoeffding',
                    title: 'Bernstein vs. Hoeffding for \\(\\chi^2\\) Sums',
                    description: 'Compare the Bernstein and Hoeffding tail bounds for the sum of squared Gaussians. Bernstein (orange) wins in the moderate-deviation regime; both agree for large deviations. The true tail probability (green) lies below both bounds.',
                    setup: function(container, controls) {
                        var W = 680, H = 420;
                        var dpr = window.devicePixelRatio || 1;
                        var canvas = document.createElement('canvas');
                        canvas.width = W * dpr;
                        canvas.height = H * dpr;
                        canvas.style.width = W + 'px';
                        canvas.style.height = H + 'px';
                        var ctx = canvas.getContext('2d');
                        ctx.scale(dpr, dpr);
                        container.appendChild(canvas);

                        var colors = { bg:'#0c0c20', grid:'#1a1a40', axis:'#4a4a7a', text:'#8b949e',
                            white:'#f0f6fc', blue:'#58a6ff', teal:'#3fb9a0', orange:'#f0883e',
                            green:'#3fb950', purple:'#bc8cff', red:'#f85149' };

                        var nVal = 20;
                        var nSlider = VizEngine.createSlider(controls, 'n', 5, 200, nVal, 5, function(v) { nVal = Math.round(v); draw(); });

                        // Margins
                        var ml = 70, mr = 20, mt = 40, mb = 50;
                        var pw = W - ml - mr, ph = H - mt - mb;

                        function gammaLnApprox(z) {
                            // Stirling approximation for ln(Gamma(z))
                            if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - gammaLnApprox(1 - z);
                            z -= 1;
                            var x = 0.99999999999980993;
                            var p = [676.5203681218851, -1259.1392167224028, 771.32342877765313,
                                     -176.61502916214059, 12.507343278686905, -0.13857109526572012,
                                     9.9843695780195716e-6, 1.5056327351493116e-7];
                            for (var i = 0; i < 8; i++) { x += p[i] / (z + i + 1); }
                            var t = z + 7.5;
                            return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
                        }

                        function chi2CDF(x, k) {
                            // Use regularized gamma function approximation for chi2 CDF
                            if (x <= 0) return 0;
                            // P(chi2_k <= x) = gammaInc(k/2, x/2)
                            var a = k / 2, z = x / 2;
                            // Series expansion for lower regularized gamma
                            if (z < a + 1) {
                                var sum = 1 / a, term = 1 / a;
                                for (var i = 1; i < 200; i++) {
                                    term *= z / (a + i);
                                    sum += term;
                                    if (Math.abs(term) < 1e-14 * Math.abs(sum)) break;
                                }
                                return sum * Math.exp(-z + a * Math.log(z) - gammaLnApprox(a));
                            } else {
                                // Continued fraction for upper gamma
                                var f = 1, c = 1, d = 1 / (z - a + 1 + 1);
                                f = d;
                                for (var i = 1; i < 200; i++) {
                                    var an = -i * (i - a);
                                    var bn = z - a + 1 + 2 * i;
                                    d = 1 / (bn + an * d);
                                    c = bn + an / c;
                                    var delta = c * d;
                                    f *= delta;
                                    if (Math.abs(delta - 1) < 1e-14) break;
                                }
                                var upper = Math.exp(-z + a * Math.log(z) - gammaLnApprox(a)) * f;
                                return 1 - upper;
                            }
                        }

                        function draw() {
                            ctx.fillStyle = colors.bg;
                            ctx.fillRect(0, 0, W, H);

                            var n = nVal;
                            // chi2_n: mean = n, var = 2n
                            // We plot P(|chi2_n/n - 1| >= t)
                            var sigma2 = 2; // variance of Z_i^2 - 1
                            var b = 4;      // Bernstein parameter for Z^2 - 1
                            var range = 2;  // max t range for bounded case

                            // Determine max t
                            var tMax = Math.min(3, 1 + 6 / Math.sqrt(n));
                            var yMin = -12; // log10 scale lower bound
                            var yMax = 0.5;

                            // Axes
                            ctx.strokeStyle = colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(ml, mt);
                            ctx.lineTo(ml, H - mb);
                            ctx.lineTo(W - mr, H - mb);
                            ctx.stroke();

                            // Grid lines
                            ctx.strokeStyle = colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var yg = 0; yg >= yMin; yg -= 2) {
                                var sy = mt + (yMax - yg) / (yMax - yMin) * ph;
                                ctx.beginPath();
                                ctx.moveTo(ml, sy);
                                ctx.lineTo(W - mr, sy);
                                ctx.stroke();
                            }

                            // Axis labels
                            ctx.fillStyle = colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var yg = 0; yg >= yMin; yg -= 2) {
                                var sy = mt + (yMax - yg) / (yMax - yMin) * ph;
                                ctx.fillText('1e' + yg, ml - 6, sy);
                            }
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            var tSteps = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0];
                            for (var i = 0; i < tSteps.length; i++) {
                                if (tSteps[i] > tMax) break;
                                var sx = ml + (tSteps[i] / tMax) * pw;
                                ctx.fillText(tSteps[i].toFixed(1), sx, H - mb + 6);
                            }

                            // Axis titles
                            ctx.fillStyle = colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Deviation t from mean', ml + pw / 2, H - 14);
                            ctx.save();
                            ctx.translate(16, mt + ph / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.textBaseline = 'middle';
                            ctx.fillText('log\u2081\u2080 P(|\u03A3Z\u00B2/n - 1| \u2265 t)', 0, 0);
                            ctx.restore();

                            // Title
                            ctx.fillStyle = colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Bernstein vs Hoeffding, n = ' + n, ml + pw / 2, 18);

                            var numPts = 200;

                            function toPixel(t, logp) {
                                var sx = ml + (t / tMax) * pw;
                                var sy = mt + (yMax - logp) / (yMax - yMin) * ph;
                                return [sx, sy];
                            }

                            // True tail: P(|chi2_n/n - 1| >= t) = P(chi2_n >= n(1+t)) + P(chi2_n <= n(1-t))
                            ctx.strokeStyle = colors.green;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;
                            for (var i = 1; i <= numPts; i++) {
                                var t = (i / numPts) * tMax;
                                var upper = 1 - chi2CDF(n * (1 + t), n);
                                var lower = (1 - t > 0) ? chi2CDF(n * (1 - t), n) : 0;
                                var prob = upper + lower;
                                if (prob < 1e-15) prob = 1e-15;
                                var logp = Math.log10(prob);
                                if (logp < yMin) logp = yMin;
                                var pt = toPixel(t, logp);
                                if (!started) { ctx.moveTo(pt[0], pt[1]); started = true; }
                                else ctx.lineTo(pt[0], pt[1]);
                            }
                            ctx.stroke();

                            // Bernstein bound: 2*exp(-n/2 * t^2/(sigma2 + b*t))
                            ctx.strokeStyle = colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            started = false;
                            for (var i = 1; i <= numPts; i++) {
                                var t = (i / numPts) * tMax;
                                var exponent = -(n / 2) * (t * t) / (sigma2 + b * t);
                                var logp = Math.log10(2) + exponent * Math.LOG10E;
                                if (logp < yMin) logp = yMin;
                                if (logp > yMax) continue;
                                var pt = toPixel(t, logp);
                                if (!started) { ctx.moveTo(pt[0], pt[1]); started = true; }
                                else ctx.lineTo(pt[0], pt[1]);
                            }
                            ctx.stroke();

                            // Hoeffding: treat each Z_i^2 as roughly bounded in [0, M] for some M
                            // For chi2, each Z_i^2 has E=1. Hoeffding with range ~ [0, C*log(n)] is loose.
                            // More standard: use generic Hoeffding as 2*exp(-2n t^2 / (range)^2).
                            // We use a practical effective range based on truncation at ~2*sqrt(2*log(n))+1
                            // Actually, for fair comparison, use Hoeffding on bounded [0, M] after truncation
                            // Simpler: Hoeffding bound with effective variance sigma2 replaced by (bmax)^2/4
                            // Let's use: 2*exp(-n*t^2/(2*sigma_H^2)) where sigma_H^2 = (range)^2/4
                            // Use effective bound range from chi2_1 tail: ~6 for practical purposes
                            var effectiveRange = 6; // conservative range for Z_i^2
                            var hoeffSigma2 = effectiveRange * effectiveRange / 4;
                            ctx.strokeStyle = colors.blue;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([8, 4]);
                            ctx.beginPath();
                            started = false;
                            for (var i = 1; i <= numPts; i++) {
                                var t = (i / numPts) * tMax;
                                var exponent = -2 * n * t * t / (effectiveRange * effectiveRange);
                                var logp = Math.log10(2) + exponent * Math.LOG10E;
                                if (logp < yMin) logp = yMin;
                                if (logp > yMax) continue;
                                var pt = toPixel(t, logp);
                                if (!started) { ctx.moveTo(pt[0], pt[1]); started = true; }
                                else ctx.lineTo(pt[0], pt[1]);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Legend
                            var lx = ml + pw - 180, ly = mt + 16;
                            var items = [
                                { color: colors.green, label: 'True tail', dash: false },
                                { color: colors.orange, label: 'Bernstein bound', dash: false },
                                { color: colors.blue, label: 'Hoeffding bound', dash: true }
                            ];
                            for (var i = 0; i < items.length; i++) {
                                var iy = ly + i * 20;
                                ctx.strokeStyle = items[i].color;
                                ctx.lineWidth = 2;
                                if (items[i].dash) ctx.setLineDash([6, 3]);
                                else ctx.setLineDash([]);
                                ctx.beginPath();
                                ctx.moveTo(lx, iy);
                                ctx.lineTo(lx + 24, iy);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = items[i].color;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(items[i].label, lx + 30, iy);
                            }

                            // Phase transition marker
                            var tStar = sigma2 / b; // transition point
                            if (tStar < tMax) {
                                var ptStar = toPixel(tStar, yMax);
                                ctx.strokeStyle = colors.purple + '88';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                ctx.moveTo(ptStar[0], mt);
                                ctx.lineTo(ptStar[0], H - mb);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = colors.purple;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'bottom';
                                ctx.fillText('t* = \u03C3\u00B2/b', ptStar[0], mt - 2);
                            }
                        }

                        draw();
                        return { stopAnimation: function() {} };
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the optimal \\\\(\\\\lambda\\\\) in the Chernoff bound for Bernstein\'s inequality is \\\\(\\\\lambda^* = t/(\\\\bar{\\\\sigma}^2 + bt)\\\\). Verify that \\\\(\\\\lambda^* \\\\in (0, 1/b)\\\\) for all \\\\(t &gt; 0\\\\).',
                    hint: 'Minimize \\\\(f(\\\\lambda) = -\\\\lambda n t + \\\\frac{n\\\\bar{\\\\sigma}^2 \\\\lambda^2}{2(1 - b\\\\lambda)}\\\\) over \\\\(\\\\lambda \\\\in (0, 1/b)\\\\). Take the derivative and set it to zero.',
                    solution: 'We need to minimize \\\\(g(\\\\lambda) = -\\\\lambda t + \\\\frac{\\\\bar{\\\\sigma}^2 \\\\lambda^2}{2(1 - b\\\\lambda)}\\\\). Setting \\\\(g\'(\\\\lambda) = 0\\\\): \\\\(-t + \\\\frac{\\\\bar{\\\\sigma}^2 \\\\lambda(2 - b\\\\lambda)}{2(1-b\\\\lambda)^2} = 0\\\\). After simplification, the optimal value is \\\\(\\\\lambda^* = t/(\\\\bar{\\\\sigma}^2 + bt)\\\\). Since \\\\(t &gt; 0\\\\), we have \\\\(\\\\lambda^* &gt; 0\\\\). Also \\\\(b\\\\lambda^* = bt/(\\\\bar{\\\\sigma}^2 + bt) &lt; 1\\\\) since \\\\(\\\\bar{\\\\sigma}^2 &gt; 0\\\\), confirming \\\\(\\\\lambda^* &lt; 1/b\\\\).'
                },
                {
                    question: 'Let \\\\(X_1, \\\\ldots, X_n\\\\) be i.i.d. \\\\(\\\\text{Exp}(1)\\\\) random variables with mean \\\\(\\\\mu = 1\\\\) and variance \\\\(\\\\sigma^2 = 1\\\\). Use Bernstein\'s inequality to bound \\\\(\\\\mathbb{P}(|\\\\bar{X}_n - 1| \\\\geq 0.5)\\\\) for \\\\(n = 50\\\\).',
                    hint: 'The centered variable \\\\(X_i - 1\\\\) satisfies the Bernstein condition with \\\\(b = 1\\\\) (since \\\\(\\\\mathbb{E}|(X_i - 1)|^k \\\\leq k!\\\\) for all \\\\(k\\\\)). Apply Bernstein directly with \\\\(\\\\bar{\\\\sigma}^2 = 1\\\\), \\\\(b = 1\\\\), \\\\(t = 0.5\\\\).',
                    solution: 'With \\\\(\\\\bar{\\\\sigma}^2 = 1\\\\), \\\\(b = 1\\\\), \\\\(t = 0.5\\\\), \\\\(n = 50\\\\): \\\\[\\\\mathbb{P}(|\\\\bar{X}_{50} - 1| \\\\geq 0.5) \\\\leq 2\\\\exp\\\\!\\\\left(-\\\\frac{50}{2} \\\\cdot \\\\frac{0.25}{1 + 0.5}\\\\right) = 2\\\\exp(-25/6) \\\\approx 2 \\\\cdot 0.0155 \\\\approx 0.031.\\\\]'
                }
            ]
        },
        // ============================================================
        // SECTION 3: Products and Compositions
        // ============================================================
        {
            id: 'ch02-sec03',
            title: 'Products and Compositions',
            content: `
                <h2>Products and Compositions</h2>

                <p>One of the key structural results connecting sub-Gaussian and sub-exponential families is that <strong>products of sub-Gaussian random variables are sub-exponential</strong>. This seemingly simple fact has far-reaching consequences.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 2.9 (Product of Sub-Gaussians is Sub-Exponential)</div>
                    <div class="env-body">
                        <p>If \\\\(X\\\\) and \\\\(Y\\\\) are sub-Gaussian random variables, then \\\\(XY\\\\) is sub-exponential. Specifically:</p>
                        \\\\[\\\\|XY\\\\|_{\\\\psi_1} \\\\leq \\\\|X\\\\|_{\\\\psi_2} \\\\cdot \\\\|Y\\\\|_{\\\\psi_2}.\\\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>By the AM-GM inequality, for any \\\\(t &gt; 0\\\\):</p>
                        \\\\[|XY| = |X| \\\\cdot |Y| \\\\leq \\\\frac{X^2 + Y^2}{2}.\\\\]
                        <p>More precisely, we use the moment characterization. For any \\\\(p \\\\geq 1\\\\):</p>
                        \\\\[(\\\\mathbb{E}|XY|^p)^{1/p} \\\\leq (\\\\mathbb{E}|X|^{2p})^{1/(2p)} \\\\cdot (\\\\mathbb{E}|Y|^{2p})^{1/(2p)}\\\\]
                        <p>by the Cauchy-Schwarz inequality. Since \\\\(X\\\\) is sub-Gaussian:</p>
                        \\\\[(\\\\mathbb{E}|X|^{2p})^{1/(2p)} \\\\leq C\\\\|X\\\\|_{\\\\psi_2} \\\\sqrt{2p}\\\\]
                        <p>and similarly for \\\\(Y\\\\). Therefore:</p>
                        \\\\[(\\\\mathbb{E}|XY|^p)^{1/p} \\\\leq C^2 \\\\|X\\\\|_{\\\\psi_2} \\\\|Y\\\\|_{\\\\psi_2} \\\\cdot 2p.\\\\]
                        <p>The linear growth in \\\\(p\\\\) is exactly the sub-exponential moment condition (Proposition 2.3(2)).</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Why does multiplying two sub-Gaussians produce a sub-exponential? Think of it this way: a sub-Gaussian variable \\\\(X\\\\) has tails like \\\\(e^{-ct^2}\\\\). The product \\\\(XY\\\\) is large when <em>both</em> \\\\(X\\\\) and \\\\(Y\\\\) are large. The probability of \\\\(|XY| \\\\geq t\\\\) involves events like \\\\(|X| \\\\geq \\\\sqrt{t}\\\\) and \\\\(|Y| \\\\geq \\\\sqrt{t}\\\\), each with probability \\\\(\\\\sim e^{-ct}\\\\). So the product's tail is \\\\(e^{-ct}\\\\), which is sub-exponential.</p>
                    </div>
                </div>

                <h3>Applications</h3>

                <div class="env-block example">
                    <div class="env-title">Example 2.10 (Sample Variance)</div>
                    <div class="env-body">
                        <p>If \\\\(X_1, \\\\ldots, X_n \\\\sim \\\\mathcal{N}(0,1)\\\\), the sample variance is:</p>
                        \\\\[S^2 = \\\\frac{1}{n-1}\\\\sum_{i=1}^n (X_i - \\\\bar{X})^2 = \\\\frac{1}{n-1}\\\\left(\\\\sum_{i=1}^n X_i^2 - n\\\\bar{X}^2\\\\right).\\\\]
                        <p>Each \\\\(X_i^2\\\\) is a product of sub-Gaussians (namely \\\\(X_i \\\\cdot X_i\\\\)), hence sub-exponential. Therefore \\\\(S^2\\\\) concentrates around its mean \\\\(\\\\sigma^2 = 1\\\\) by Bernstein's inequality applied to the sum of sub-exponential variables.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 2.11 (Covariance Estimation)</div>
                    <div class="env-body">
                        <p>For sub-Gaussian random vectors \\\\(X = (X_1, \\\\ldots, X_d)\\\\), the sample covariance matrix entries involve products \\\\(X_i X_j\\\\). Since each entry is sub-exponential, we can apply Bernstein-type bounds to control \\\\(\\\\|\\\\hat{\\\\Sigma}_n - \\\\Sigma\\\\|_{\\\\max}\\\\), the entry-wise maximum error in covariance estimation.</p>
                    </div>
                </div>

                <h3>Symmetrization and Rademacher Complexity (Preview)</h3>

                <p>A powerful technique in high-dimensional probability is <strong>symmetrization</strong>: replacing a sum of random variables by a sum involving independent Rademacher signs.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 2.12 (Rademacher Random Variable)</div>
                    <div class="env-body">
                        <p>A <strong>Rademacher</strong> random variable \\\\(\\\\varepsilon\\\\) takes values \\\\(\\\\pm 1\\\\) with equal probability: \\\\(\\\\mathbb{P}(\\\\varepsilon = +1) = \\\\mathbb{P}(\\\\varepsilon = -1) = 1/2\\\\).</p>
                    </div>
                </div>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 2.13 (Symmetrization Inequality)</div>
                    <div class="env-body">
                        <p>Let \\\\(X_1, \\\\ldots, X_n\\\\) be independent random variables with \\\\(\\\\mathbb{E}X_i = 0\\\\), and let \\\\(\\\\varepsilon_1, \\\\ldots, \\\\varepsilon_n\\\\) be independent Rademacher variables independent of the \\\\(X_i\\\\). Then:</p>
                        \\\\[\\\\mathbb{E}\\\\left[\\\\left|\\\\sum_{i=1}^n X_i\\\\right|\\\\right] \\\\leq 2\\\\,\\\\mathbb{E}\\\\left[\\\\left|\\\\sum_{i=1}^n \\\\varepsilon_i X_i\\\\right|\\\\right].\\\\]
                        <p>The sum \\\\(\\\\sum \\\\varepsilon_i X_i\\\\) is called the <strong>symmetrized</strong> version. Conditioned on the \\\\(X_i\\\\), it is a sub-Gaussian sum (since Rademacher variables are sub-Gaussian with \\\\(\\\\|\\\\varepsilon\\\\|_{\\\\psi_2} = O(1)\\\\)).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Why Symmetrize?)</div>
                    <div class="env-body">
                        <p>After symmetrization, the random signs \\\\(\\\\varepsilon_i\\\\) make the sum conditionally sub-Gaussian regardless of the distribution of the \\\\(X_i\\\\). This is the starting point for the theory of <strong>Rademacher complexity</strong> in learning theory and empirical process theory, which we will develop fully in later chapters.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Proposition 2.14 (Rademacher Complexity)</div>
                    <div class="env-body">
                        <p>Given a set of vectors \\\\(a_1, \\\\ldots, a_n \\\\in \\\\mathbb{R}^d\\\\), the <strong>Rademacher complexity</strong> is:</p>
                        \\\\[R_n = \\\\mathbb{E}\\\\left[\\\\sup_{\\\\|\\\\theta\\\\| \\\\leq 1} \\\\frac{1}{n}\\\\sum_{i=1}^n \\\\varepsilon_i \\\\langle a_i, \\\\theta \\\\rangle\\\\right].\\\\]
                        <p>This quantity measures the "complexity" of the data \\\\(\\\\{a_i\\\\}\\\\) as seen through random projections. We will see in Chapter 4 that \\\\(R_n\\\\) can be bounded using covering numbers.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Let \\\\(X \\\\sim \\\\mathcal{N}(0,1)\\\\) and \\\\(Y \\\\sim \\\\mathcal{N}(0,1)\\\\) be independent. Show that \\\\(XY\\\\) is sub-exponential by directly computing the MGF \\\\(\\\\mathbb{E}[e^{\\\\lambda XY}]\\\\) and showing it is finite for \\\\(|\\\\lambda| &lt; 1\\\\).',
                    hint: 'Condition on \\\\(Y\\\\) and use the Gaussian MGF: \\\\(\\\\mathbb{E}[e^{\\\\lambda Y X} \\\\mid Y] = \\\\exp(\\\\lambda^2 Y^2/2)\\\\). Then compute \\\\(\\\\mathbb{E}[\\\\exp(\\\\lambda^2 Y^2/2)]\\\\).',
                    solution: 'Conditioning on \\\\(Y\\\\): \\\\(\\\\mathbb{E}[e^{\\\\lambda XY}] = \\\\mathbb{E}_Y[\\\\mathbb{E}_X[e^{\\\\lambda XY} \\\\mid Y]] = \\\\mathbb{E}_Y[e^{\\\\lambda^2 Y^2/2}]\\\\). Since \\\\(Y \\\\sim \\\\mathcal{N}(0,1)\\\\), we need \\\\(\\\\mathbb{E}[e^{\\\\lambda^2 Y^2/2}] = \\\\int (2\\\\pi)^{-1/2} e^{-y^2/2 + \\\\lambda^2 y^2/2} dy = (1 - \\\\lambda^2)^{-1/2}\\\\) for \\\\(|\\\\lambda| &lt; 1\\\\). This is finite for \\\\(|\\\\lambda| &lt; 1\\\\), confirming sub-exponential behavior with parameter \\\\(\\\\alpha = 1\\\\).'
                },
                {
                    question: 'Prove that if \\\\(X\\\\) is sub-Gaussian with \\\\(\\\\|X\\\\|_{\\\\psi_2} \\\\leq K\\\\), then \\\\(X^2\\\\) is sub-exponential with \\\\(\\\\|X^2\\\\|_{\\\\psi_1} \\\\leq CK^2\\\\) for a universal constant \\\\(C\\\\).',
                    hint: 'Use the moment characterization: \\\\((\\\\mathbb{E}|X^2|^p)^{1/p} = (\\\\mathbb{E}|X|^{2p})^{1/p}\\\\). Bound this using the sub-Gaussian moment condition.',
                    solution: 'By the sub-Gaussian moment condition: \\\\((\\\\mathbb{E}|X|^{2p})^{1/(2p)} \\\\leq CK\\\\sqrt{2p}\\\\). Raising both sides to the power \\\\(2p\\\\): \\\\(\\\\mathbb{E}|X|^{2p} \\\\leq (CK)^{2p}(2p)^p\\\\). Therefore \\\\((\\\\mathbb{E}|X^2|^p)^{1/p} = (\\\\mathbb{E}|X|^{2p})^{1/p} \\\\leq C^2 K^2 \\\\cdot 2p\\\\). The linear growth in \\\\(p\\\\) is exactly the sub-exponential moment condition, so \\\\(\\\\|X^2\\\\|_{\\\\psi_1} \\\\leq C^2 K^2\\\\).'
                }
            ]
        },
        // ============================================================
        // SECTION 4: McDiarmid's Inequality
        // ============================================================
        {
            id: 'ch02-sec04',
            title: "McDiarmid's Inequality",
            content: `
                <h2>McDiarmid's Bounded Differences Inequality</h2>

                <p>So far, we have focused on concentration of <em>sums</em> of independent random variables. A much more powerful and general paradigm asks: when does a <em>function</em> \\\\(f(X_1, \\\\ldots, X_n)\\\\) of independent random variables concentrate around its mean?</p>

                <p>McDiarmid's inequality answers this whenever \\\\(f\\\\) has the <strong>bounded differences</strong> property --- changing any single input cannot change the output by too much.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 2.15 (Bounded Differences Property)</div>
                    <div class="env-body">
                        <p>A function \\\\(f: \\\\mathcal{X}_1 \\\\times \\\\cdots \\\\times \\\\mathcal{X}_n \\\\to \\\\mathbb{R}\\\\) satisfies the <strong>bounded differences property</strong> with constants \\\\(c_1, \\\\ldots, c_n\\\\) if for every \\\\(i = 1, \\\\ldots, n\\\\):</p>
                        \\\\[\\\\sup_{x_1, \\\\ldots, x_n, x_i'} \\\\bigl|f(x_1, \\\\ldots, x_i, \\\\ldots, x_n) - f(x_1, \\\\ldots, x_i', \\\\ldots, x_n)\\\\bigr| \\\\leq c_i.\\\\]
                        <p>That is, replacing the \\\\(i\\\\)-th coordinate by any other value changes \\\\(f\\\\) by at most \\\\(c_i\\\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 2.16 (McDiarmid's Inequality)</div>
                    <div class="env-body">
                        <p>Let \\\\(X_1, \\\\ldots, X_n\\\\) be independent random variables (taking values in arbitrary spaces \\\\(\\\\mathcal{X}_i\\\\)), and let \\\\(f\\\\) satisfy the bounded differences property with constants \\\\(c_1, \\\\ldots, c_n\\\\). Then for all \\\\(t &gt; 0\\\\):</p>
                        \\\\[\\\\mathbb{P}\\\\bigl(f(X_1, \\\\ldots, X_n) - \\\\mathbb{E}[f(X_1, \\\\ldots, X_n)] \\\\geq t\\\\bigr) \\\\leq \\\\exp\\\\!\\\\left(-\\\\frac{2t^2}{\\\\sum_{i=1}^n c_i^2}\\\\right).\\\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch (Martingale Method)</div>
                    <div class="env-body">
                        <p>Define the <strong>Doob martingale</strong>:</p>
                        \\\\[Z_0 = \\\\mathbb{E}[f], \\\\quad Z_i = \\\\mathbb{E}[f \\\\mid X_1, \\\\ldots, X_i], \\\\quad Z_n = f(X_1, \\\\ldots, X_n).\\\\]
                        <p>The differences \\\\(D_i = Z_i - Z_{i-1}\\\\) form a martingale difference sequence. The bounded differences property implies that each \\\\(D_i\\\\) is bounded in an interval of width \\\\(c_i\\\\) (conditionally). Applying Hoeffding's lemma to each \\\\(D_i\\\\) and Markov's inequality to \\\\(\\\\exp(\\\\lambda \\\\sum D_i)\\\\) yields the result after optimizing over \\\\(\\\\lambda\\\\).</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>McDiarmid's inequality is a vast generalization of Hoeffding's inequality. If \\\\(f(X_1, \\\\ldots, X_n) = \\\\frac{1}{n}\\\\sum X_i\\\\) with \\\\(X_i \\\\in [a_i, b_i]\\\\), then \\\\(c_i = (b_i - a_i)/n\\\\), and McDiarmid recovers Hoeffding. But McDiarmid applies to any measurable function with bounded differences --- no linearity required!</p>
                    </div>
                </div>

                <h3>Illustrative Applications</h3>

                <div class="env-block example">
                    <div class="env-title">Example 2.17 (Longest Increasing Subsequence)</div>
                    <div class="env-body">
                        <p>Let \\\\(\\\\pi\\\\) be a uniformly random permutation of \\\\(\\\\{1, 2, \\\\ldots, n\\\\}\\\\). Define \\\\(L_n(\\\\pi)\\\\) to be the length of the <strong>longest increasing subsequence</strong> (LIS) of \\\\(\\\\pi\\\\).</p>
                        <p>Changing a single element of the permutation can change the LIS by at most 1, so the bounded differences property holds with \\\\(c_i = 1\\\\) for all \\\\(i\\\\). By McDiarmid:</p>
                        \\\\[\\\\mathbb{P}(|L_n - \\\\mathbb{E}[L_n]| \\\\geq t) \\\\leq 2\\\\exp\\\\!\\\\left(-\\\\frac{2t^2}{n}\\\\right).\\\\]
                        <p>The famous Baik-Deift-Johansson theorem (1999) shows \\\\(\\\\mathbb{E}[L_n] \\\\approx 2\\\\sqrt{n}\\\\), so \\\\(L_n\\\\) is concentrated in a window of width \\\\(O(\\\\sqrt{n})\\\\) around \\\\(2\\\\sqrt{n}\\\\). (The true fluctuations are actually \\\\(O(n^{1/6})\\\\), showing McDiarmid is not always tight.)</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-mcdiarmid"></div>

                <div class="env-block example">
                    <div class="env-title">Example 2.18 (Kernel Density Estimation)</div>
                    <div class="env-body">
                        <p>Given i.i.d. observations \\\\(X_1, \\\\ldots, X_n \\\\sim f\\\\), the kernel density estimator is:</p>
                        \\\\[\\\\hat{f}_h(x) = \\\\frac{1}{nh}\\\\sum_{i=1}^n K\\\\!\\\\left(\\\\frac{x - X_i}{h}\\\\right)\\\\]
                        <p>where \\\\(K\\\\) is a bounded kernel with \\\\(\\\\|K\\\\|_\\\\infty \\\\leq M\\\\). For fixed \\\\(x\\\\), changing a single \\\\(X_i\\\\) changes \\\\(\\\\hat{f}_h(x)\\\\) by at most \\\\(2M/(nh)\\\\). So McDiarmid gives:</p>
                        \\\\[\\\\mathbb{P}(|\\\\hat{f}_h(x) - \\\\mathbb{E}[\\\\hat{f}_h(x)]| \\\\geq t) \\\\leq 2\\\\exp\\\\!\\\\left(-\\\\frac{nh^2 t^2}{2M^2}\\\\right).\\\\]
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 2.19 (Empirical Risk)</div>
                    <div class="env-body">
                        <p>In statistical learning, the empirical risk is \\\\(\\\\hat{R}_n(\\\\theta) = \\\\frac{1}{n}\\\\sum_{i=1}^n \\\\ell(\\\\theta, Z_i)\\\\). If the loss is bounded, \\\\(0 \\\\leq \\\\ell(\\\\theta, z) \\\\leq B\\\\), then \\\\(c_i = B/n\\\\), and McDiarmid gives:</p>
                        \\\\[\\\\mathbb{P}(|\\\\hat{R}_n(\\\\theta) - R(\\\\theta)| \\\\geq t) \\\\leq 2\\\\exp(-2nt^2/B^2).\\\\]
                        <p>This is the foundation for many PAC-learning guarantees.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-mcdiarmid',
                    title: "McDiarmid's Inequality: Longest Increasing Subsequence",
                    description: 'Generate many random permutations and observe the concentration of the longest increasing subsequence (LIS) length. The histogram shows the empirical distribution, the dashed lines mark the McDiarmid confidence band.',
                    setup: function(container, controls) {
                        var W = 680, H = 440;
                        var dpr = window.devicePixelRatio || 1;
                        var canvas = document.createElement('canvas');
                        canvas.width = W * dpr;
                        canvas.height = H * dpr;
                        canvas.style.width = W + 'px';
                        canvas.style.height = H + 'px';
                        var ctx = canvas.getContext('2d');
                        ctx.scale(dpr, dpr);
                        container.appendChild(canvas);

                        var colors = { bg:'#0c0c20', grid:'#1a1a40', axis:'#4a4a7a', text:'#8b949e',
                            white:'#f0f6fc', blue:'#58a6ff', teal:'#3fb9a0', orange:'#f0883e',
                            green:'#3fb950', purple:'#bc8cff', red:'#f85149' };

                        var nVal = 100;
                        var numTrials = 2000;
                        var lisData = [];

                        var nSlider = VizEngine.createSlider(controls, 'n', 20, 500, nVal, 10, function(v) {
                            nVal = Math.round(v);
                            runSimulation();
                        });

                        VizEngine.createButton(controls, 'Re-sample', function() {
                            runSimulation();
                        });

                        // Fisher-Yates shuffle
                        function randomPermutation(n) {
                            var arr = [];
                            for (var i = 0; i < n; i++) arr[i] = i + 1;
                            for (var i = n - 1; i > 0; i--) {
                                var j = Math.floor(Math.random() * (i + 1));
                                var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
                            }
                            return arr;
                        }

                        // LIS via patience sorting (O(n log n))
                        function lisLength(arr) {
                            var tails = [];
                            for (var i = 0; i < arr.length; i++) {
                                var lo = 0, hi = tails.length;
                                while (lo < hi) {
                                    var mid = (lo + hi) >> 1;
                                    if (tails[mid] < arr[i]) lo = mid + 1;
                                    else hi = mid;
                                }
                                tails[lo] = arr[i];
                            }
                            return tails.length;
                        }

                        function runSimulation() {
                            lisData = [];
                            // Limit trials for large n
                            var trials = nVal > 300 ? 1000 : numTrials;
                            for (var t = 0; t < trials; t++) {
                                lisData.push(lisLength(randomPermutation(nVal)));
                            }
                            draw();
                        }

                        function draw() {
                            ctx.fillStyle = colors.bg;
                            ctx.fillRect(0, 0, W, H);

                            if (lisData.length === 0) return;

                            var n = nVal;
                            var trials = lisData.length;

                            // Compute statistics
                            var sum = 0;
                            for (var i = 0; i < trials; i++) sum += lisData[i];
                            var mean = sum / trials;

                            // Expected value ~ 2*sqrt(n)
                            var expectedMean = 2 * Math.sqrt(n);

                            // Histogram
                            var minVal = lisData[0], maxVal = lisData[0];
                            for (var i = 1; i < trials; i++) {
                                if (lisData[i] < minVal) minVal = lisData[i];
                                if (lisData[i] > maxVal) maxVal = lisData[i];
                            }

                            // McDiarmid band: P(|L - E[L]| >= t) <= 2*exp(-2t^2/n)
                            // For 95% confidence: t = sqrt(n * ln(2/0.05) / 2)
                            var delta = 0.05;
                            var mcdiarmidWidth = Math.sqrt(n * Math.log(2 / delta) / 2);

                            // Extend histogram range to include McDiarmid bounds
                            var plotMin = Math.floor(Math.min(minVal, expectedMean - mcdiarmidWidth - 2));
                            var plotMax = Math.ceil(Math.max(maxVal, expectedMean + mcdiarmidWidth + 2));
                            if (plotMin < 0) plotMin = 0;
                            var numBins = Math.min(plotMax - plotMin + 1, 60);
                            var binWidth = (plotMax - plotMin) / numBins;

                            var bins = [];
                            for (var i = 0; i < numBins; i++) bins[i] = 0;
                            for (var i = 0; i < trials; i++) {
                                var bi = Math.floor((lisData[i] - plotMin) / binWidth);
                                if (bi >= numBins) bi = numBins - 1;
                                if (bi < 0) bi = 0;
                                bins[bi]++;
                            }
                            var maxCount = 0;
                            for (var i = 0; i < numBins; i++) {
                                if (bins[i] > maxCount) maxCount = bins[i];
                            }

                            // Plot area
                            var ml = 60, mr = 20, mt = 50, mb = 60;
                            var pw = W - ml - mr, ph = H - mt - mb;

                            // Axes
                            ctx.strokeStyle = colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(ml, mt);
                            ctx.lineTo(ml, H - mb);
                            ctx.lineTo(W - mr, H - mb);
                            ctx.stroke();

                            // Title
                            ctx.fillStyle = colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('LIS Length Distribution, n = ' + n + ' (' + trials + ' trials)', ml + pw / 2, 18);

                            // Draw histogram bars
                            var barW = pw / numBins;
                            for (var i = 0; i < numBins; i++) {
                                if (bins[i] === 0) continue;
                                var barH = (bins[i] / maxCount) * ph * 0.9;
                                var bx = ml + i * barW;
                                var by = H - mb - barH;
                                ctx.fillStyle = colors.blue + '99';
                                ctx.fillRect(bx, by, barW - 1, barH);
                                ctx.fillStyle = colors.blue;
                                ctx.fillRect(bx, by, barW - 1, 2);
                            }

                            // x-axis labels
                            ctx.fillStyle = colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            var step = Math.max(1, Math.ceil(numBins / 10));
                            for (var i = 0; i < numBins; i += step) {
                                var val = plotMin + (i + 0.5) * binWidth;
                                var sx = ml + (i + 0.5) * barW;
                                ctx.fillText(Math.round(val), sx, H - mb + 6);
                            }

                            // y-axis labels
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var f = 0; f <= 1; f += 0.25) {
                                var val = Math.round(f * maxCount);
                                var sy = H - mb - f * ph * 0.9;
                                ctx.fillText(val, ml - 8, sy);
                                ctx.strokeStyle = colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(ml, sy);
                                ctx.lineTo(W - mr, sy);
                                ctx.stroke();
                            }

                            // Mean line
                            function valToX(v) { return ml + ((v - plotMin) / (plotMax - plotMin)) * pw; }

                            var meanX = valToX(mean);
                            ctx.strokeStyle = colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(meanX, mt);
                            ctx.lineTo(meanX, H - mb);
                            ctx.stroke();

                            // Expected mean line
                            var expX = valToX(expectedMean);
                            ctx.strokeStyle = colors.teal;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([6, 3]);
                            ctx.beginPath();
                            ctx.moveTo(expX, mt);
                            ctx.lineTo(expX, H - mb);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // McDiarmid bounds
                            var mcLow = expectedMean - mcdiarmidWidth;
                            var mcHigh = expectedMean + mcdiarmidWidth;
                            var mcLowX = valToX(mcLow);
                            var mcHighX = valToX(mcHigh);

                            ctx.fillStyle = colors.red + '15';
                            ctx.fillRect(ml, mt, mcLowX - ml, ph + 10);
                            ctx.fillRect(mcHighX, mt, W - mr - mcHighX, ph + 10);

                            ctx.strokeStyle = colors.red;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([5, 3]);
                            ctx.beginPath();
                            ctx.moveTo(mcLowX, mt);
                            ctx.lineTo(mcLowX, H - mb);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(mcHighX, mt);
                            ctx.lineTo(mcHighX, H - mb);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Legend
                            var lx = ml + 10, ly = mt + 6;
                            var legendItems = [
                                { color: colors.orange, label: 'Sample mean: ' + mean.toFixed(1), dash: false },
                                { color: colors.teal, label: '2\u221An \u2248 ' + expectedMean.toFixed(1), dash: true },
                                { color: colors.red, label: '95% McDiarmid band', dash: true }
                            ];
                            for (var i = 0; i < legendItems.length; i++) {
                                var iy = ly + i * 18;
                                ctx.strokeStyle = legendItems[i].color;
                                ctx.lineWidth = 2;
                                if (legendItems[i].dash) ctx.setLineDash([5, 3]);
                                else ctx.setLineDash([]);
                                ctx.beginPath();
                                ctx.moveTo(lx, iy);
                                ctx.lineTo(lx + 20, iy);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = legendItems[i].color;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(legendItems[i].label, lx + 26, iy);
                            }

                            // Axis titles
                            ctx.fillStyle = colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('LIS Length', ml + pw / 2, H - 18);
                            ctx.save();
                            ctx.translate(16, mt + ph / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Frequency', 0, 0);
                            ctx.restore();
                        }

                        runSimulation();
                        return { stopAnimation: function() {} };
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\\\(X_1, \\\\ldots, X_n\\\\) be i.i.d. uniform on \\\\([0,1]\\\\), and define \\\\(f(X_1, \\\\ldots, X_n) = \\\\max_i X_i\\\\). Find the bounded differences constants \\\\(c_i\\\\) and apply McDiarmid to bound \\\\(\\\\mathbb{P}(\\\\max_i X_i - \\\\mathbb{E}[\\\\max_i X_i] \\\\geq t)\\\\).',
                    hint: 'Changing a single \\\\(X_i\\\\) can change the maximum by at most 1 (from 0 to 1). So \\\\(c_i = 1\\\\) for each \\\\(i\\\\).',
                    solution: 'Since \\\\(\\\\max_i X_i\\\\) changes by at most 1 when any single \\\\(X_i\\\\) is changed, \\\\(c_i = 1\\\\). McDiarmid gives: \\\\(\\\\mathbb{P}(\\\\max_i X_i - \\\\mathbb{E}[\\\\max_i X_i] \\\\geq t) \\\\leq \\\\exp(-2t^2/n)\\\\). Since \\\\(\\\\mathbb{E}[\\\\max_i X_i] = n/(n+1) \\\\to 1\\\\), this shows the maximum concentrates around 1 with deviations of order \\\\(\\\\sqrt{n}\\\\). Note: the true fluctuations are \\\\(O(1/n)\\\\), so McDiarmid is very loose here --- the \\\\(c_i = 1\\\\) is a crude bound.'
                }
            ]
        },
        // ============================================================
        // SECTION 5: Gaussian Concentration
        // ============================================================
        {
            id: 'ch02-sec05',
            title: 'Gaussian Concentration',
            content: `
                <h2>Gaussian Concentration</h2>

                <p>One of the most beautiful results in high-dimensional probability is that <strong>Lipschitz functions of Gaussian vectors concentrate sharply around their means</strong>. This Gaussian concentration inequality can be seen as an infinitesimal version of McDiarmid, but with much stronger conclusions.</p>

                <h3>Lipschitz Functions</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 2.20 (Lipschitz Function)</div>
                    <div class="env-body">
                        <p>A function \\\\(f: \\\\mathbb{R}^n \\\\to \\\\mathbb{R}\\\\) is <strong>\\\\(L\\\\)-Lipschitz</strong> (with respect to the Euclidean norm) if:</p>
                        \\\\[|f(x) - f(y)| \\\\leq L\\\\|x - y\\\\|_2 \\\\quad \\\\text{for all } x, y \\\\in \\\\mathbb{R}^n.\\\\]
                        <p>The smallest such \\\\(L\\\\) is the <strong>Lipschitz constant</strong> of \\\\(f\\\\), denoted \\\\(\\\\|f\\\\|_{\\\\mathrm{Lip}}\\\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 2.21 (Gaussian Concentration Inequality)</div>
                    <div class="env-body">
                        <p>Let \\\\(Z = (Z_1, \\\\ldots, Z_n) \\\\sim \\\\mathcal{N}(0, I_n)\\\\) be a standard Gaussian vector, and let \\\\(f: \\\\mathbb{R}^n \\\\to \\\\mathbb{R}\\\\) be \\\\(L\\\\)-Lipschitz. Then for all \\\\(t \\\\geq 0\\\\):</p>
                        \\\\[\\\\mathbb{P}\\\\bigl(f(Z) - \\\\mathbb{E}[f(Z)] \\\\geq t\\\\bigr) \\\\leq \\\\exp\\\\!\\\\left(-\\\\frac{t^2}{2L^2}\\\\right).\\\\]
                        <p>Equivalently, \\\\(f(Z) - \\\\mathbb{E}[f(Z)]\\\\) is sub-Gaussian with parameter \\\\(L\\\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Why Gaussian Concentration Is Remarkable</div>
                    <div class="env-body">
                        <p>The bound depends on the Lipschitz constant \\\\(L\\\\) but <strong>not on the dimension \\\\(n\\\\)</strong>. A 1-Lipschitz function of a million-dimensional Gaussian vector concentrates just as tightly as a 1-Lipschitz function of a single Gaussian. This is because the Gaussian measure is highly "concentrated" on a thin shell in high dimensions (as we saw in Chapter 0).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch (Herbst Argument)</div>
                    <div class="env-body">
                        <p>The proof uses the <strong>Gaussian log-Sobolev inequality</strong>: if \\\\(Z \\\\sim \\\\mathcal{N}(0, I_n)\\\\) and \\\\(g \\\\geq 0\\\\) with \\\\(\\\\mathbb{E}[g(Z)] = 1\\\\), then:</p>
                        \\\\[\\\\mathbb{E}[g(Z) \\\\log g(Z)] \\\\leq \\\\frac{1}{2}\\\\mathbb{E}\\\\!\\\\left[\\\\frac{\\\\|\\\\nabla g(Z)\\\\|^2}{g(Z)}\\\\right].\\\\]
                        <p>Applying this to \\\\(g(z) = e^{\\\\lambda f(z)} / \\\\mathbb{E}[e^{\\\\lambda f(Z)}]\\\\) and using the Lipschitz bound \\\\(\\\\|\\\\nabla f\\\\|_2 \\\\leq L\\\\), one obtains the differential inequality:</p>
                        \\\\[\\\\Lambda'(\\\\lambda) - \\\\Lambda(\\\\lambda)/\\\\lambda \\\\leq L^2 \\\\lambda / 2,\\\\]
                        <p>where \\\\(\\\\Lambda(\\\\lambda) = \\\\log \\\\mathbb{E}[e^{\\\\lambda f(Z)}] - \\\\lambda \\\\mathbb{E}[f(Z)]\\\\). This ODE implies \\\\(\\\\Lambda(\\\\lambda) \\\\leq L^2 \\\\lambda^2/2\\\\), which is the sub-Gaussian MGF bound.</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <h3>Applications</h3>

                <div class="env-block example">
                    <div class="env-title">Example 2.22 (Norm of a Gaussian Vector)</div>
                    <div class="env-body">
                        <p>The function \\\\(f(z) = \\\\|z\\\\|_2\\\\) is 1-Lipschitz. Since \\\\(\\\\mathbb{E}[\\\\|Z\\\\|_2] \\\\approx \\\\sqrt{n}\\\\) for \\\\(Z \\\\sim \\\\mathcal{N}(0, I_n)\\\\), Gaussian concentration gives:</p>
                        \\\\[\\\\mathbb{P}\\\\bigl(\\\\bigl|\\\\|Z\\\\|_2 - \\\\sqrt{n}\\\\bigr| \\\\geq t\\\\bigr) \\\\leq 2e^{-t^2/2}.\\\\]
                        <p>Thus \\\\(\\\\|Z\\\\|_2\\\\) is concentrated in a band of width \\\\(O(1)\\\\) around \\\\(\\\\sqrt{n}\\\\), even though \\\\(\\\\sqrt{n}\\\\) itself grows without bound. This is the <strong>concentration on the sphere</strong> phenomenon.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 2.23 (Maximum of Gaussian Coordinates)</div>
                    <div class="env-body">
                        <p>The function \\\\(f(z) = \\\\max_{1 \\\\leq i \\\\leq n} z_i\\\\) has Lipschitz constant \\\\(L = 1\\\\) (since changing any coordinate by \\\\(\\\\delta\\\\) changes the max by at most \\\\(\\\\delta\\\\), and \\\\(\\\\|\\\\delta e_i\\\\|_2 = |\\\\delta|\\\\)). Therefore:</p>
                        \\\\[\\\\mathbb{P}(\\\\max_i Z_i - \\\\mathbb{E}[\\\\max_i Z_i] \\\\geq t) \\\\leq e^{-t^2/2}.\\\\]
                        <p>Since \\\\(\\\\mathbb{E}[\\\\max_i Z_i] \\\\asymp \\\\sqrt{2 \\\\log n}\\\\) (a classical result), the Gaussian maximum concentrates on a scale of \\\\(O(1)\\\\) around \\\\(\\\\sqrt{2 \\\\log n}\\\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 2.24 (Largest Singular Value)</div>
                    <div class="env-body">
                        <p>For an \\\\(m \\\\times n\\\\) matrix \\\\(A\\\\) with i.i.d. \\\\(\\\\mathcal{N}(0,1)\\\\) entries, the largest singular value \\\\(f(A) = \\\\sigma_1(A)\\\\) is a 1-Lipschitz function of the \\\\(mn\\\\) entries (this follows from Weyl's inequality). Gaussian concentration gives:</p>
                        \\\\[\\\\mathbb{P}(|\\\\sigma_1(A) - \\\\mathbb{E}[\\\\sigma_1(A)]| \\\\geq t) \\\\leq 2e^{-t^2/2}.\\\\]
                        <p>Since \\\\(\\\\mathbb{E}[\\\\sigma_1(A)] \\\\approx \\\\sqrt{m} + \\\\sqrt{n}\\\\) (Marchenko-Pastur, Chapter 6), the largest singular value concentrates in a window of width \\\\(O(1)\\\\), regardless of the dimensions \\\\(m\\\\) and \\\\(n\\\\)!</p>
                    </div>
                </div>

                <h3>Comparison of Concentration Methods</h3>

                <p>We now have a rich toolkit. Here is a summary of the key results and when to use each:</p>

                <div class="env-block remark">
                    <div class="env-title">Remark (When to Use What)</div>
                    <div class="env-body">
                        <ul>
                            <li><strong>Hoeffding:</strong> Bounded random variables; variance-insensitive; simplest to apply.</li>
                            <li><strong>Bernstein:</strong> Sub-exponential variables; variance-sensitive; optimal in moderate-deviation regime.</li>
                            <li><strong>McDiarmid:</strong> General functions of independent variables with bounded differences; very broad applicability.</li>
                            <li><strong>Gaussian concentration:</strong> Lipschitz functions of Gaussian vectors; dimension-free; the sharpest of all for the Gaussian setting.</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 2.25 (Tsirelson-Ibragimov-Sudakov)</div>
                    <div class="env-body">
                        <p>Let \\\\(Z \\\\sim \\\\mathcal{N}(0, I_n)\\\\) and \\\\(f: \\\\mathbb{R}^n \\\\to \\\\mathbb{R}\\\\) be convex and \\\\(L\\\\)-Lipschitz. Then \\\\(f(Z)\\\\) has a <strong>median</strong> \\\\(M_f\\\\) satisfying \\\\(|M_f - \\\\mathbb{E}[f(Z)]| \\\\leq CL\\\\), and:</p>
                        \\\\[\\\\mathbb{P}(|f(Z) - M_f| \\\\geq t) \\\\leq 2\\\\exp(-t^2/(2L^2)).\\\\]
                        <p>Thus for convex Lipschitz functions, concentration around the median and mean are equivalent up to constants.</p>
                    </div>
                </div>

                <h3>Looking Ahead</h3>

                <p>The concentration inequalities of Chapters 1-2 form the foundation for all subsequent developments in this course. In Chapter 3, we will apply these tools to study random vectors in high dimensions, establishing fundamental results about covariance estimation and the behavior of random projections. In Chapter 4, we introduce covering numbers and metric entropy, which, combined with concentration, yield powerful uniform bounds over function classes.</p>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that \\\\(f(z) = \\\\|z\\\\|_2 = (z_1^2 + \\\\cdots + z_n^2)^{1/2}\\\\) is 1-Lipschitz with respect to the Euclidean norm.',
                    hint: 'Use the reverse triangle inequality: \\\\(|\\\\|x\\\\|_2 - \\\\|y\\\\|_2| \\\\leq \\\\|x - y\\\\|_2\\\\).',
                    solution: 'By the triangle inequality in \\\\(\\\\mathbb{R}^n\\\\): \\\\(\\\\|x\\\\|_2 = \\\\|(x - y) + y\\\\|_2 \\\\leq \\\\|x - y\\\\|_2 + \\\\|y\\\\|_2\\\\), so \\\\(\\\\|x\\\\|_2 - \\\\|y\\\\|_2 \\\\leq \\\\|x - y\\\\|_2\\\\). Swapping \\\\(x\\\\) and \\\\(y\\\\): \\\\(\\\\|y\\\\|_2 - \\\\|x\\\\|_2 \\\\leq \\\\|x - y\\\\|_2\\\\). Combining: \\\\(|\\\\|x\\\\|_2 - \\\\|y\\\\|_2| \\\\leq \\\\|x - y\\\\|_2\\\\). This is exactly the 1-Lipschitz condition.'
                },
                {
                    question: 'Let \\\\(A\\\\) be a fixed \\\\(m \\\\times n\\\\) matrix and \\\\(f(z) = \\\\|Az\\\\|_2\\\\). Show that \\\\(f\\\\) is \\\\(\\\\|A\\\\|_{\\\\mathrm{op}}\\\\)-Lipschitz, where \\\\(\\\\|A\\\\|_{\\\\mathrm{op}}\\\\) is the operator norm (largest singular value) of \\\\(A\\\\).',
                    hint: 'Use the fact that \\\\(f(x) - f(y) = \\\\|Ax\\\\|_2 - \\\\|Ay\\\\|_2 \\\\leq \\\\|A(x-y)\\\\|_2\\\\) and the definition of operator norm.',
                    solution: 'By the reverse triangle inequality: \\\\(|f(x) - f(y)| = |\\\\|Ax\\\\|_2 - \\\\|Ay\\\\|_2| \\\\leq \\\\|Ax - Ay\\\\|_2 = \\\\|A(x-y)\\\\|_2 \\\\leq \\\\|A\\\\|_{\\\\mathrm{op}} \\\\|x - y\\\\|_2\\\\). The last step uses the definition of operator norm: \\\\(\\\\|A\\\\|_{\\\\mathrm{op}} = \\\\sup_{\\\\|v\\\\|_2 = 1} \\\\|Av\\\\|_2\\\\). This shows \\\\(f\\\\) is \\\\(\\\\|A\\\\|_{\\\\mathrm{op}}\\\\)-Lipschitz.'
                }
            ]
        }
    ]
});
