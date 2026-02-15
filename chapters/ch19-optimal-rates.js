window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch19',
    number: 19,
    title: 'Optimal Rates & Adaptation',
    subtitle: 'Minimax optimal estimation and adaptive procedures',
    sections: [
        // ============================================================
        // Section 1: Minimax Rates for Nonparametric Problems
        // ============================================================
        {
            id: 'ch19-sec01',
            title: 'Minimax Rates for Nonparametric Problems',
            content: `
                <h2>Minimax Rates for Nonparametric Problems</h2>

                <p>In Chapter 18, we developed the general toolkit for establishing minimax lower bounds: Fano's inequality, Assouad's lemma, and Le Cam's two-point method. We now apply these tools to determine the exact minimax rates for the two canonical nonparametric estimation problems: density estimation and nonparametric regression. The rates we derive are among the most fundamental results in mathematical statistics, revealing a precise and unavoidable tension between the smoothness of the unknown function, the ambient dimension, and the sample size.</p>

                <h3>The Nonparametric Regression Model</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.1 (Nonparametric Regression)</div>
                    <div class="env-body">
                        <p>In the <strong>nonparametric regression model</strong>, we observe pairs \\((X_1, Y_1), \\ldots, (X_n, Y_n)\\) satisfying</p>
                        \\[Y_i = f(X_i) + \\varepsilon_i, \\qquad i = 1, \\ldots, n,\\]
                        <p>where \\(f : [0,1]^d \\to \\mathbb{R}\\) is an unknown regression function, \\(X_i\\) are design points (either fixed or random), and \\(\\varepsilon_i \\sim N(0, \\sigma^2)\\) are independent noise terms. The goal is to estimate \\(f\\) under the integrated squared error</p>
                        \\[R(\\hat{f}, f) = \\mathbb{E}\\left[\\int_{[0,1]^d} (\\hat{f}(x) - f(x))^2 \\, dx\\right].\\]
                    </div>
                </div>

                <p>The key question is: how fast can we estimate \\(f\\) as a function of \\(n\\), and how does this rate depend on the smoothness of \\(f\\) and the dimension \\(d\\)? The answer is given by Stone's celebrated theorem.</p>

                <h3>Smoothness Classes</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.2 (H&ouml;lder Smoothness Class)</div>
                    <div class="env-body">
                        <p>For \\(s &gt; 0\\), write \\(s = \\lfloor s \\rfloor + \\{s\\}\\) where \\(\\lfloor s \\rfloor\\) is the integer part and \\(\\{s\\} \\in (0, 1]\\) is the fractional part. The <strong>H&ouml;lder class</strong> \\(\\Sigma(s, L)\\) on \\([0,1]^d\\) consists of all functions \\(f : [0,1]^d \\to \\mathbb{R}\\) such that for every multi-index \\(\\alpha\\) with \\(|\\alpha| = \\lfloor s \\rfloor\\),</p>
                        \\[|D^\\alpha f(x) - D^\\alpha f(y)| \\le L \\|x - y\\|_2^{\\{s\\}} \\quad \\text{for all } x, y \\in [0,1]^d.\\]
                        <p>The parameter \\(s\\) measures the <strong>degree of smoothness</strong>: larger \\(s\\) means the function is smoother and hence easier to estimate.</p>
                    </div>
                </div>

                <h3>Stone's Theorem</h3>

                <p>The following theorem, due to Charles Stone (1982), is one of the cornerstones of nonparametric statistics. It gives the exact minimax rate for estimating functions of known smoothness in arbitrary dimension.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.1 (Stone's Theorem, 1982)</div>
                    <div class="env-body">
                        <p>Let \\(\\mathcal{F} = \\Sigma(s, L)\\) be the H&ouml;lder class on \\([0,1]^d\\) with smoothness \\(s &gt; 0\\) and radius \\(L &gt; 0\\). Then the minimax rate for nonparametric regression under integrated squared error satisfies</p>
                        \\[\\inf_{\\hat{f}} \\sup_{f \\in \\mathcal{F}} \\mathbb{E}\\left[\\int (\\hat{f} - f)^2\\right] \\asymp n^{-2s/(2s+d)},\\]
                        <p>where the infimum is over all measurable estimators \\(\\hat{f}\\), and \\(\\asymp\\) means both upper and lower bounds hold up to constants depending only on \\(s\\), \\(d\\), \\(L\\), and \\(\\sigma^2\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch (Upper Bound via Local Polynomials)</div>
                    <div class="env-body">
                        <p><strong>Upper bound:</strong> Partition \\([0,1]^d\\) into \\(m^d\\) cubes of side length \\(h = 1/m\\). On each cube, fit a polynomial of degree \\(\\lfloor s \\rfloor\\) using the observations falling in that cube. The bias of this local estimator is \\(O(h^s)\\) (from the H&ouml;lder condition), and the variance is \\(O(\\sigma^2 / (nh^d))\\) (since approximately \\(nh^d\\) observations fall in each cube). The integrated squared error is</p>
                        \\[\\text{Risk} \\asymp h^{2s} + \\frac{\\sigma^2}{nh^d}.\\]
                        <p>Optimizing over \\(h\\): set \\(h^{2s} = \\sigma^2/(nh^d)\\), giving \\(h^{2s+d} = \\sigma^2/n\\), so \\(h_{\\text{opt}} = (\\sigma^2/n)^{1/(2s+d)}\\). Substituting:</p>
                        \\[\\text{Risk}_{\\text{opt}} \\asymp \\left(\\frac{\\sigma^2}{n}\\right)^{2s/(2s+d)} = n^{-2s/(2s+d)}.\\]
                        <p><strong>Lower bound:</strong> Construct a packing of \\(\\Sigma(s, L)\\) using bump functions supported on disjoint cubes of side length \\(h\\). By Fano's inequality (Chapter 18), the minimax risk is at least \\(h^{2s} \\cdot (1 - \\delta)\\) where \\(\\delta \\to 0\\) when the number of hypotheses exceeds \\(\\exp(nD_{\\text{KL}})\\). Balancing gives the same rate \\(n^{-2s/(2s+d)}\\).</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark 19.1 (The Exponent \\(2s/(2s+d)\\))</div>
                    <div class="env-body">
                        <p>The exponent \\(2s/(2s+d)\\) encapsulates the entire story of nonparametric estimation:</p>
                        <ul>
                            <li>When \\(d = 0\\) (a degenerate case), the rate is \\(n^{-1}\\), the parametric rate.</li>
                            <li>When \\(s \\to \\infty\\) (infinitely smooth functions), the rate approaches \\(n^{-1}\\): smooth functions are nearly as easy as parametric problems.</li>
                            <li>When \\(d \\to \\infty\\) with \\(s\\) fixed, the exponent \\(2s/(2s+d) \\to 0\\): estimation becomes impossible.</li>
                            <li>When \\(s\\) is fixed and finite, the rate is always strictly slower than \\(n^{-1}\\): this is the <strong>price of nonparametric flexibility</strong>.</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-nonparam-rates"></div>

                <h3>Density Estimation</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.2 (Minimax Rate for Density Estimation)</div>
                    <div class="env-body">
                        <p>Let \\(X_1, \\ldots, X_n\\) be i.i.d. with density \\(f \\in \\Sigma(s, L)\\) on \\([0,1]^d\\) (with \\(f\\) bounded below by some \\(c_0 &gt; 0\\)). Then under the integrated squared error \\(\\|\\hat{f} - f\\|_2^2 = \\int (\\hat{f} - f)^2\\),</p>
                        \\[\\inf_{\\hat{f}} \\sup_{f \\in \\Sigma(s, L)} \\mathbb{E}\\|\\hat{f} - f\\|_2^2 \\asymp n^{-2s/(2s+d)}.\\]
                        <p>The same rate \\(n^{-2s/(2s+d)}\\) governs density estimation as nonparametric regression. This universality is a deep fact: the rate depends on the <strong>function space complexity</strong>, not on the specific estimation task.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Bias-Variance Tradeoff Determines the Rate</div>
                    <div class="env-body">
                        <p>In both density estimation and regression, the minimax rate emerges from the same bias-variance tradeoff. Smoothing more (larger bandwidth \\(h\\)) reduces variance but increases bias; smoothing less does the opposite. The optimal bandwidth \\(h^* \\asymp n^{-1/(2s+d)}\\) balances these two forces. The resulting rate \\(n^{-2s/(2s+d)}\\) is a direct consequence of this balance. This tradeoff is universal across kernel estimators, local polynomials, wavelets, and splines -- all achieve the same optimal rate when properly tuned.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 19.1 (Concrete Rates)</div>
                    <div class="env-body">
                        <p>Some important special cases of the rate \\(n^{-2s/(2s+d)}\\):</p>
                        <ul>
                            <li><strong>\\(d = 1, s = 1\\)</strong> (Lipschitz functions): rate = \\(n^{-2/3}\\).</li>
                            <li><strong>\\(d = 1, s = 2\\)</strong> (twice differentiable): rate = \\(n^{-4/5}\\).</li>
                            <li><strong>\\(d = 2, s = 1\\)</strong> (Lipschitz in 2D): rate = \\(n^{-1/2}\\).</li>
                            <li><strong>\\(d = 10, s = 2\\)</strong>: rate = \\(n^{-4/14} = n^{-2/7} \\approx n^{-0.286}\\). Very slow.</li>
                            <li><strong>\\(d = 100, s = 2\\)</strong>: rate = \\(n^{-4/104} \\approx n^{-0.038}\\). Essentially useless for any practical \\(n\\).</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-nonparam-rates',
                    title: 'Minimax Rates: log(risk) vs log(n) for Different Smoothness and Dimension',
                    description: 'The minimax rate is \\(n^{-2s/(2s+d)}\\). Adjust smoothness \\(s\\) and dimension \\(d\\) to see how the rate (slope of the log-log line) changes. Steeper slopes mean faster convergence.',
                    setup: function(body, controls) {
                        var width = Math.min(body.clientWidth || 560, 700);
                        var height = Math.round(width * 0.65);
                        var dpr = window.devicePixelRatio || 1;
                        var canvas = document.createElement('canvas');
                        canvas.width = width * dpr;
                        canvas.height = height * dpr;
                        canvas.style.width = width + 'px';
                        canvas.style.height = height + 'px';
                        var ctx = canvas.getContext('2d');
                        ctx.scale(dpr, dpr);
                        body.appendChild(canvas);

                        var colors = {
                            bg: '#0c0c20', blue: '#58a6ff', teal: '#3fb9a0',
                            orange: '#f0883e', text: '#8b949e', white: '#f0f6fc',
                            grid: '#1a1a40', red: '#f85149', green: '#3fb950',
                            purple: '#bc8cff', yellow: '#d29922', pink: '#f778ba'
                        };

                        var sVal = 2.0;
                        var dVal = 1;

                        // Fixed reference lines for comparison
                        var refLines = [
                            { s: 1, d: 1, color: colors.blue, label: 's=1, d=1' },
                            { s: 2, d: 1, color: colors.teal, label: 's=2, d=1' },
                            { s: 1, d: 5, color: colors.purple, label: 's=1, d=5' },
                            { s: 2, d: 10, color: colors.yellow, label: 's=2, d=10' }
                        ];

                        function draw() {
                            ctx.fillStyle = colors.bg;
                            ctx.fillRect(0, 0, width, height);

                            var mL = 65, mR = 25, mT = 40, mB = 55;
                            var pW = width - mL - mR;
                            var pH = height - mT - mB;

                            // log(n) range: from 2 to 14 (i.e. n from ~7 to ~10^6)
                            var logNmin = 2, logNmax = 14;
                            // log(risk) range: from -14 to 0
                            var logRmin = -14, logRmax = 0;

                            function toX(logN) { return mL + (logN - logNmin) / (logNmax - logNmin) * pW; }
                            function toY(logR) { return mT + pH - (logR - logRmin) / (logRmax - logRmin) * pH; }

                            // Grid
                            ctx.strokeStyle = colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var ln = 2; ln <= 14; ln += 2) {
                                var gx = toX(ln);
                                ctx.beginPath(); ctx.moveTo(gx, mT); ctx.lineTo(gx, mT + pH); ctx.stroke();
                            }
                            for (var lr = -14; lr <= 0; lr += 2) {
                                var gy = toY(lr);
                                ctx.beginPath(); ctx.moveTo(mL, gy); ctx.lineTo(mL + pW, gy); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = colors.text;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(mL, mT); ctx.lineTo(mL, mT + pH); ctx.lineTo(mL + pW, mT + pH); ctx.stroke();

                            // Axis labels
                            ctx.fillStyle = colors.text;
                            ctx.font = '11px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var ln = 2; ln <= 14; ln += 2) {
                                ctx.fillText(ln.toString(), toX(ln), mT + pH + 5);
                            }
                            ctx.fillStyle = colors.white;
                            ctx.font = '12px -apple-system, sans-serif';
                            ctx.fillText('log(n)', mL + pW / 2, height - 10);

                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillStyle = colors.text;
                            ctx.font = '11px -apple-system, sans-serif';
                            for (var lr = -14; lr <= 0; lr += 2) {
                                ctx.fillText(lr.toString(), mL - 6, toY(lr));
                            }
                            ctx.save();
                            ctx.translate(14, mT + pH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillStyle = colors.white;
                            ctx.font = '12px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('log(risk)', 0, 0);
                            ctx.restore();

                            // Title
                            ctx.fillStyle = colors.white;
                            ctx.font = 'bold 13px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Minimax Rate: risk ~ n^{-2s/(2s+d)}', width / 2, 18);

                            // Draw reference lines (dashed)
                            for (var ri = 0; ri < refLines.length; ri++) {
                                var ref = refLines[ri];
                                var slope = -2 * ref.s / (2 * ref.s + ref.d);
                                ctx.strokeStyle = ref.color;
                                ctx.lineWidth = 1;
                                ctx.globalAlpha = 0.4;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                ctx.moveTo(toX(logNmin), toY(slope * logNmin));
                                ctx.lineTo(toX(logNmax), toY(slope * logNmax));
                                ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.globalAlpha = 1.0;
                                // Label at right end
                                var labelY = toY(slope * logNmax);
                                if (labelY > mT + 10 && labelY < mT + pH - 5) {
                                    ctx.fillStyle = ref.color;
                                    ctx.font = '9px -apple-system, sans-serif';
                                    ctx.textAlign = 'right';
                                    ctx.globalAlpha = 0.6;
                                    ctx.fillText(ref.label, mL + pW - 3, labelY - 8);
                                    ctx.globalAlpha = 1.0;
                                }
                            }

                            // Draw current user-selected line (solid, thick)
                            var mainSlope = -2 * sVal / (2 * sVal + dVal);
                            ctx.strokeStyle = colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            ctx.moveTo(toX(logNmin), toY(mainSlope * logNmin));
                            ctx.lineTo(toX(logNmax), toY(mainSlope * logNmax));
                            ctx.stroke();

                            // Annotation
                            var exponent = (2 * sVal / (2 * sVal + dVal));
                            ctx.fillStyle = colors.orange;
                            ctx.font = 'bold 13px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('s = ' + sVal.toFixed(1) + ',  d = ' + dVal, mL + 10, mT + 16);
                            ctx.fillText('Rate: n^{-' + exponent.toFixed(3) + '}', mL + 10, mT + 34);
                            ctx.font = '11px -apple-system, sans-serif';
                            ctx.fillStyle = colors.text;
                            ctx.fillText('Slope = -' + exponent.toFixed(3), mL + 10, mT + 52);

                            // Parametric rate reference line (n^{-1})
                            ctx.strokeStyle = colors.green;
                            ctx.lineWidth = 1;
                            ctx.globalAlpha = 0.3;
                            ctx.setLineDash([2, 3]);
                            ctx.beginPath();
                            ctx.moveTo(toX(logNmin), toY(-1 * logNmin));
                            ctx.lineTo(toX(logNmax), toY(-1 * logNmax));
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.globalAlpha = 1.0;
                            ctx.fillStyle = colors.green;
                            ctx.font = '9px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            ctx.globalAlpha = 0.5;
                            ctx.fillText('parametric (n^{-1})', toX(logNmin) + 4, toY(-1 * logNmin) - 8);
                            ctx.globalAlpha = 1.0;
                        }

                        VizEngine.createSlider(controls, 'Smoothness s', 0.5, 5.0, sVal, 0.5, function(val) {
                            sVal = val;
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Dimension d', 1, 30, dVal, 1, function(val) {
                            dVal = Math.round(val);
                            draw();
                        });

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Consider the nonparametric regression model \\(Y_i = f(X_i) + \\varepsilon_i\\) with \\(f \\in \\Sigma(s, L)\\) on \\([0,1]\\) and a kernel estimator \\(\\hat{f}_h(x) = \\sum_{i=1}^n Y_i K_h(x - X_i) / \\sum_{i=1}^n K_h(x - X_i)\\) with bandwidth \\(h\\). Show that the pointwise bias is \\(O(h^s)\\) and the pointwise variance is \\(O(1/(nh))\\), and derive the optimal bandwidth \\(h^* \\asymp n^{-1/(2s+1)}\\).',
                    hint: 'For the bias, use the H&ouml;lder condition: \\(|f(x) - f(z)| \\le L|x-z|^s\\) for \\(|x - z| \\le h\\). For the variance, note that the effective number of observations in a window of width \\(h\\) is \\(\\sim nh\\).',
                    solution: 'The kernel estimator averages observations within a window of width \\(\\sim h\\) around \\(x\\). <strong>Bias:</strong> For \\(|X_i - x| \\le h\\), we have \\(|f(X_i) - f(x)| \\le L|X_i - x|^s \\le Lh^s\\), so the bias of \\(\\hat{f}_h(x)\\) is bounded by \\(Lh^s\\). <strong>Variance:</strong> The number of observations in the window is \\(\\sim nh\\) (for uniform \\(X_i\\)). The variance of an average of \\(nh\\) noisy observations is \\(\\sigma^2/(nh)\\). <strong>MSE:</strong> \\(\\text{MSE}(x) \\asymp L^2 h^{2s} + \\sigma^2/(nh)\\). Minimizing over \\(h\\): \\(d/dh[L^2 h^{2s} + \\sigma^2/(nh)] = 2sL^2 h^{2s-1} - \\sigma^2/(nh^2) = 0\\), giving \\(h^{2s+1} \\asymp \\sigma^2/(nL^2)\\), so \\(h^* \\asymp n^{-1/(2s+1)}\\). The resulting MSE is \\(n^{-2s/(2s+1)}\\), matching Stone\'s theorem for \\(d=1\\).'
                }
            ]
        },
        // ============================================================
        // Section 2: Function Spaces
        // ============================================================
        {
            id: 'ch19-sec02',
            title: 'Function Spaces',
            content: `
                <h2>Function Spaces: Sobolev and Besov Classes</h2>

                <p>The H&ouml;lder classes introduced in Section 1 capture pointwise smoothness. For a richer and more flexible theory, we need function spaces defined through integral or frequency-domain conditions. The two most important such spaces are Sobolev spaces (defined via \\(L^2\\) integrability of derivatives) and Besov spaces (defined via wavelet coefficients). These spaces provide the natural setting for minimax theory and adaptive estimation.</p>

                <h3>Sobolev Spaces</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.3 (Sobolev Space \\(W^s_2\\))</div>
                    <div class="env-body">
                        <p>For a positive integer \\(s\\), the <strong>Sobolev space</strong> \\(W^s_2([0,1]^d)\\) consists of all functions \\(f \\in L^2([0,1]^d)\\) whose weak partial derivatives up to order \\(s\\) are all in \\(L^2\\). The associated Sobolev ball of radius \\(L\\) is</p>
                        \\[\\mathcal{W}^s_2(L) = \\left\\{f \\in W^s_2([0,1]^d) : \\sum_{|\\alpha| = s} \\int_{[0,1]^d} |D^\\alpha f(x)|^2 \\, dx \\le L^2 \\right\\}.\\]
                        <p>For non-integer \\(s &gt; 0\\), the Sobolev space \\(W^s_2\\) is defined via the Fourier transform: \\(f \\in W^s_2\\) if</p>
                        \\[\\sum_{k \\in \\mathbb{Z}^d} (1 + \\|k\\|_2^2)^s |\\hat{f}(k)|^2 &lt; \\infty,\\]
                        <p>where \\(\\hat{f}(k)\\) are the Fourier coefficients.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.3 (Minimax Rate over Sobolev Balls)</div>
                    <div class="env-body">
                        <p>The minimax rate of estimation over the Sobolev ball \\(\\mathcal{W}^s_2(L)\\) under the \\(L^2\\) loss is</p>
                        \\[\\inf_{\\hat{f}} \\sup_{f \\in \\mathcal{W}^s_2(L)} \\mathbb{E}\\|\\hat{f} - f\\|_2^2 \\asymp n^{-2s/(2s+d)}.\\]
                        <p>This is the same rate as for H&ouml;lder classes of the same smoothness \\(s\\). The minimax rate depends on \\(s\\) only through the "effective smoothness" -- the rate at which the function can be approximated by simple objects -- not on the specific definition of the function class.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark 19.2 (Sobolev Embedding)</div>
                    <div class="env-body">
                        <p>The Sobolev embedding theorem states that \\(W^s_2([0,1]^d) \\hookrightarrow C^{s - d/2}([0,1]^d)\\) when \\(s &gt; d/2\\), where \\(C^\\alpha\\) denotes the H&ouml;lder space. This means that \\(L^2\\)-smooth functions are automatically pointwise smooth when the smoothness index exceeds half the dimension. The condition \\(s &gt; d/2\\) is sharp.</p>
                    </div>
                </div>

                <h3>Besov Spaces and Wavelet Characterization</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.4 (Besov Space \\(B^s_{p,q}\\))</div>
                    <div class="env-body">
                        <p>Let \\(\\{\\psi_{j,k}\\}\\) be a wavelet basis of \\(L^2([0,1]^d)\\), where \\(j \\ge 0\\) is the resolution level and \\(k\\) indexes the spatial location. For \\(s &gt; 0\\), \\(1 \\le p, q \\le \\infty\\), the <strong>Besov space</strong> \\(B^s_{p,q}\\) consists of functions \\(f\\) with wavelet coefficients \\(\\beta_{j,k} = \\langle f, \\psi_{j,k} \\rangle\\) satisfying</p>
                        \\[\\|f\\|_{B^s_{p,q}} = \\left( \\sum_{j \\ge 0} 2^{jq(s + d/2 - d/p)} \\left(\\sum_k |\\beta_{j,k}|^p\\right)^{q/p} \\right)^{1/q} &lt; \\infty.\\]
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark 19.3 (Why Besov Spaces Matter)</div>
                    <div class="env-body">
                        <p>Besov spaces interpolate between and generalize both H&ouml;lder and Sobolev spaces:</p>
                        <ul>
                            <li>\\(B^s_{\\infty, \\infty} = \\Sigma(s, L)\\) (H&ouml;lder space) when \\(s\\) is not an integer.</li>
                            <li>\\(B^s_{2,2} = W^s_2\\) (Sobolev space).</li>
                            <li>\\(B^s_{p,q}\\) with \\(p &lt; 2\\) allows <strong>spatially inhomogeneous smoothness</strong>: functions that are smooth in most places but have isolated singularities.</li>
                        </ul>
                        <p>This last property is crucial for adaptation. Wavelet thresholding estimators (Donoho and Johnstone, 1994) achieve the minimax rate over \\(B^s_{p,q}\\) <strong>simultaneously for all \\(s\\)</strong>, without knowing \\(s\\) in advance.</p>
                    </div>
                </div>

                <h3>Metric Entropy and Rates</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.5 (Metric Entropy)</div>
                    <div class="env-body">
                        <p>The <strong>\\(\\varepsilon\\)-covering number</strong> \\(N(\\varepsilon, \\mathcal{F}, \\|\\cdot\\|)\\) is the minimum number of \\(\\varepsilon\\)-balls in norm \\(\\|\\cdot\\|\\) needed to cover \\(\\mathcal{F}\\). The <strong>metric entropy</strong> is \\(\\log N(\\varepsilon, \\mathcal{F}, \\|\\cdot\\|)\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.4 (Metric Entropy of Sobolev Balls)</div>
                    <div class="env-body">
                        <p>The metric entropy of the Sobolev ball \\(\\mathcal{W}^s_2(L)\\) in \\(L^2([0,1]^d)\\) satisfies</p>
                        \\[\\log N(\\varepsilon, \\mathcal{W}^s_2(L), L^2) \\asymp \\varepsilon^{-d/s}.\\]
                        <p>This result, due to Birman and Solomjak, connects the geometry of the function space to the statistical rate. The minimax rate \\(n^{-2s/(2s+d)}\\) can be recovered from the metric entropy by solving \\(\\varepsilon^{-d/s} \\asymp n\\varepsilon^2\\) (equating the log-covering number with the statistical resolution), giving \\(\\varepsilon^2 \\asymp n^{-2s/(2s+d)}\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Metric Entropy as Effective Dimension</div>
                    <div class="env-body">
                        <p>The metric entropy \\(\\log N(\\varepsilon, \\mathcal{F}, \\|\\cdot\\|)\\) measures the "effective number of parameters" needed to approximate functions in \\(\\mathcal{F}\\) to accuracy \\(\\varepsilon\\). For Sobolev balls, this effective dimension grows as \\(\\varepsilon^{-d/s}\\) -- polynomially in \\(1/\\varepsilon\\). The exponent \\(d/s\\) captures the tension between dimension (which increases complexity) and smoothness (which decreases it). The minimax rate arises when the effective dimension at resolution \\(\\varepsilon\\) matches the statistical capacity \\(n\\varepsilon^2\\) of the data.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Consider the Gaussian white noise model \\(dY(t) = f(t)\\,dt + n^{-1/2}\\,dW(t)\\) on \\([0,1]\\), which is the continuous analogue of nonparametric regression. Show that if \\(f(t) = \\sum_{k=1}^\\infty \\theta_k \\varphi_k(t)\\) in an orthonormal basis \\(\\{\\varphi_k\\}\\) (e.g., Fourier), then the problem reduces to a sequence space model \\(Y_k = \\theta_k + n^{-1/2} Z_k\\) with \\(Z_k \\sim N(0,1)\\) i.i.d. If the Sobolev constraint requires \\(\\sum_k k^{2s} \\theta_k^2 \\le L^2\\), find the minimax rate for estimating \\(\\theta\\) under \\(\\ell_2\\) loss.',
                    hint: 'In the sequence model, the optimal estimator for each \\(\\theta_k\\) is a shrinkage estimator. The Pinsker bound gives the optimal linear shrinkage. Balance the total bias \\(\\sum_{k &gt; K} \\theta_k^2\\) against the total variance \\(K/n\\).',
                    solution: 'In the sequence model, \\(Y_k = \\theta_k + n^{-1/2} Z_k\\). A truncation estimator keeps the first \\(K\\) coefficients: \\(\\hat{\\theta}_k = Y_k\\) for \\(k \\le K\\), \\(\\hat{\\theta}_k = 0\\) for \\(k &gt; K\\). The risk is \\(R = \\sum_{k=1}^K n^{-1} + \\sum_{k &gt; K} \\theta_k^2 = K/n + \\text{bias}^2\\). For the worst case over the Sobolev ellipsoid, the bias is at most \\(L^2 K^{-2s}\\) (since the tail \\(\\sum_{k &gt; K} \\theta_k^2 \\le \\sum_{k &gt; K} k^{-2s} \\cdot k^{2s}\\theta_k^2 \\le K^{-2s} L^2\\)). Optimizing: \\(K/n \\asymp L^2 K^{-2s}\\), so \\(K \\asymp (nL^2)^{1/(2s+1)}\\), and the risk is \\(R^* \\asymp n^{-2s/(2s+1)}\\). This matches Stone\'s theorem for \\(d=1\\). The Pinsker (1980) constant gives the exact constant in the minimax risk for this Gaussian sequence model.'
                }
            ]
        },
        // ============================================================
        // Section 3: The Curse of Dimensionality
        // ============================================================
        {
            id: 'ch19-sec03',
            title: 'The Curse of Dimensionality',
            content: `
                <h2>The Curse of Dimensionality in Nonparametric Estimation</h2>

                <p>Stone's theorem reveals a fundamental and sobering truth: the rate \\(n^{-2s/(2s+d)}\\) degrades dramatically as the dimension \\(d\\) increases. This section quantifies this degradation and explores its consequences for practical estimation, connecting it to the broader question of why modern machine learning methods seem to defy the curse.</p>

                <h3>Quantifying the Curse</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.5 (The Curse of Dimensionality)</div>
                    <div class="env-body">
                        <p>Consider estimation of an \\(s\\)-smooth function on \\([0,1]^d\\) at the minimax rate \\(R_n^* = n^{-2s/(2s+d)}\\). To achieve a target accuracy \\(R_n^* \\le \\varepsilon^2\\), we need</p>
                        \\[n \\ge \\varepsilon^{-(2s+d)/s} = \\varepsilon^{-2} \\cdot \\varepsilon^{-d/s}.\\]
                        <p>The first factor \\(\\varepsilon^{-2}\\) is the parametric cost; the second factor \\(\\varepsilon^{-d/s}\\) is the <strong>nonparametric penalty</strong>, which grows exponentially in \\(d\\). For fixed accuracy \\(\\varepsilon\\) and smoothness \\(s\\), the required sample size is</p>
                        \\[n \\asymp \\varepsilon^{-d/s} \\cdot \\varepsilon^{-2} \\sim e^{(d/s) \\log(1/\\varepsilon)},\\]
                        <p>which is <strong>exponential in the dimension \\(d\\)</strong>.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 19.2 (Sample Size Requirements)</div>
                    <div class="env-body">
                        <p>Suppose we want to estimate a twice-differentiable (\\(s = 2\\)) function to accuracy \\(\\varepsilon^2 = 0.01\\) (root mean squared error of 0.1). The required sample size is \\(n \\asymp 0.1^{-(2 \\cdot 2 + d) / 2} = 10^{(4 + d)/2}\\):</p>
                        <ul>
                            <li>\\(d = 1\\): \\(n \\approx 10^{2.5} \\approx 316\\). Completely feasible.</li>
                            <li>\\(d = 5\\): \\(n \\approx 10^{4.5} \\approx 31{,}623\\). Manageable with modern data.</li>
                            <li>\\(d = 10\\): \\(n \\approx 10^7\\). Requires a large dataset.</li>
                            <li>\\(d = 20\\): \\(n \\approx 10^{12}\\). Beyond any foreseeable dataset.</li>
                            <li>\\(d = 100\\): \\(n \\approx 10^{52}\\). Vastly exceeds the number of atoms in the observable universe (\\(\\approx 10^{80}\\) total, but data points are much more expensive).</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-curse-nonparam"></div>

                <h3>Kernel Regression and the Curse</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.6 (Nadaraya-Watson Kernel Estimator)</div>
                    <div class="env-body">
                        <p>The <strong>Nadaraya-Watson estimator</strong> with kernel \\(K\\) and bandwidth \\(h\\) is</p>
                        \\[\\hat{f}_h(x) = \\frac{\\sum_{i=1}^n Y_i K\\left(\\frac{x - X_i}{h}\\right)}{\\sum_{i=1}^n K\\left(\\frac{x - X_i}{h}\\right)},\\]
                        <p>where \\(K : \\mathbb{R}^d \\to \\mathbb{R}\\) is a kernel function (e.g., the Gaussian kernel \\(K(u) = (2\\pi)^{-d/2} e^{-\\|u\\|^2/2}\\)).</p>
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 19.1 (Kernel Regression in \\(d\\) Dimensions)</div>
                    <div class="env-body">
                        <p>For kernel regression with an \\(s\\)-smooth function on \\([0,1]^d\\):</p>
                        <ul>
                            <li><strong>Bias</strong> at any point \\(x\\): \\(O(h^s)\\), determined by the smoothness of \\(f\\).</li>
                            <li><strong>Variance</strong> at any point \\(x\\): \\(O(1/(nh^d))\\), determined by the effective sample size in the local neighborhood \\(B(x, h)\\).</li>
                            <li><strong>Optimal bandwidth:</strong> \\(h^* \\asymp n^{-1/(2s+d)}\\).</li>
                            <li><strong>Effective local sample size at \\(h^*\\):</strong> \\(nh^{*d} \\asymp n^{2s/(2s+d)}\\).</li>
                        </ul>
                        <p>In \\(d = 20\\) with \\(s = 2\\) and \\(n = 10{,}000\\): \\(h^* \\approx 0.63\\) (the bandwidth spans 63% of the domain!) and the effective local sample size is \\(nh^{*20} \\approx 10{,}000 \\cdot 0.63^{20} \\approx 0.01\\). Fewer than one observation per local neighborhood!</p>
                    </div>
                </div>

                <h3>Breaking the Curse: Structural Assumptions</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.6 (Additive Models Circumvent the Curse)</div>
                    <div class="env-body">
                        <p>If the true regression function has the <strong>additive structure</strong></p>
                        \\[f(x_1, \\ldots, x_d) = \\sum_{j=1}^d f_j(x_j),\\]
                        <p>where each \\(f_j : [0,1] \\to \\mathbb{R}\\) is \\(s\\)-smooth, then the minimax rate for estimating \\(f\\) is</p>
                        \\[n^{-2s/(2s+1)},\\]
                        <p>which depends on the dimension only through a multiplicative constant (not through the exponent). The curse of dimensionality is <strong>completely eliminated</strong> by the additive structure.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark 19.4 (Compositional Structure and Neural Networks)</div>
                    <div class="env-body">
                        <p>More generally, if \\(f\\) has <strong>compositional structure</strong> -- meaning \\(f = g_L \\circ g_{L-1} \\circ \\cdots \\circ g_1\\) where each \\(g_\\ell\\) acts on a small number of inputs -- then the minimax rate depends on the intrinsic dimensions of the components, not the ambient dimension \\(d\\). This observation, developed by Barron (1993), Schmidt-Hieber (2020), and others, provides a theoretical foundation for why deep neural networks can circumvent the curse of dimensionality: they implicitly exploit compositional structure in the target function.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: The Curse is About Assumption-Free Estimation</div>
                    <div class="env-body">
                        <p>The curse of dimensionality is not an inherent limitation of high-dimensional data. It is a statement about the worst case over a <strong>large function class</strong>. The worst-case function in \\(\\Sigma(s, L)\\) on \\([0,1]^d\\) exploits all \\(d\\) dimensions equally, requiring the estimator to resolve structure in every direction. Real-world functions often have much simpler structure: they may depend on only a few variables (sparsity), have additive or compositional form, or lie near a low-dimensional manifold. The art of modern statistics and machine learning is to exploit this hidden structure.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-curse-nonparam',
                    title: 'The Curse of Dimensionality in Kernel Regression',
                    description: 'With fixed n, watch how kernel regression degrades as dimension d increases. In low d, we resolve the function well; in high d, the estimate is nearly flat (no local information).',
                    setup: function(body, controls) {
                        var width = Math.min(body.clientWidth || 560, 700);
                        var height = Math.round(width * 0.62);
                        var dpr = window.devicePixelRatio || 1;
                        var canvas = document.createElement('canvas');
                        canvas.width = width * dpr;
                        canvas.height = height * dpr;
                        canvas.style.width = width + 'px';
                        canvas.style.height = height + 'px';
                        var ctx = canvas.getContext('2d');
                        ctx.scale(dpr, dpr);
                        body.appendChild(canvas);

                        var colors = {
                            bg: '#0c0c20', blue: '#58a6ff', teal: '#3fb9a0',
                            orange: '#f0883e', text: '#8b949e', white: '#f0f6fc',
                            grid: '#1a1a40', red: '#f85149', green: '#3fb950',
                            purple: '#bc8cff', muted: '#6e7681'
                        };

                        var nSamples = 200;
                        var sSmooth = 2;
                        var currentD = 1;

                        // Box-Muller
                        function randn() {
                            var u1 = Math.random(), u2 = Math.random();
                            return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
                        }

                        // True function: depends only on first coordinate for visualization
                        // f(x) = sin(2*pi*x_1) + 0.5*cos(4*pi*x_1) -- s=2 smooth
                        function trueF(x1) {
                            return Math.sin(2 * Math.PI * x1) + 0.5 * Math.cos(4 * Math.PI * x1);
                        }

                        // Generate data in d dimensions, y depends on x_1 only
                        var dataX = []; // each entry is [x_1, ..., x_d] but we only store x_1 for viz
                        var dataXfull = []; // full d-dimensional data
                        var dataY = [];
                        var sigma = 0.3;

                        function generateData() {
                            dataX = [];
                            dataXfull = [];
                            dataY = [];
                            for (var i = 0; i < nSamples; i++) {
                                var xFull = [];
                                for (var j = 0; j < 30; j++) { // pre-generate up to d=30
                                    xFull.push(Math.random());
                                }
                                dataXfull.push(xFull);
                                dataX.push(xFull[0]);
                                dataY.push(trueF(xFull[0]) + sigma * randn());
                            }
                        }

                        generateData();

                        // Kernel regression with product Gaussian kernel in d dimensions
                        function kernelEstimate(xQuery, d) {
                            // Optimal bandwidth for smoothness s=2 in d dimensions
                            var h = Math.pow(nSamples, -1.0 / (2 * sSmooth + d));
                            h = Math.max(h, 0.01);
                            h = Math.min(h, 2.0);

                            var num = 0, den = 0;
                            for (var i = 0; i < nSamples; i++) {
                                // Distance in d dimensions
                                var distSq = 0;
                                // First dimension: distance to xQuery
                                distSq += (dataXfull[i][0] - xQuery) * (dataXfull[i][0] - xQuery);
                                // Remaining dimensions: distance to 0.5 (we query at center)
                                for (var j = 1; j < d; j++) {
                                    var diff = dataXfull[i][j] - 0.5;
                                    distSq += diff * diff;
                                }
                                var w = Math.exp(-distSq / (2 * h * h));
                                num += w * dataY[i];
                                den += w;
                            }
                            return den > 1e-10 ? num / den : 0;
                        }

                        function draw() {
                            ctx.fillStyle = colors.bg;
                            ctx.fillRect(0, 0, width, height);

                            var mL = 55, mR = 20, mT = 45, mB = 50;
                            var pW = width - mL - mR;
                            var pH = height - mT - mB;

                            // Plot range
                            var xMin = 0, xMax = 1;
                            var yMin = -2.0, yMax = 2.0;

                            function toSX(x) { return mL + (x - xMin) / (xMax - xMin) * pW; }
                            function toSY(y) { return mT + pH - (y - yMin) / (yMax - yMin) * pH; }

                            // Grid
                            ctx.strokeStyle = colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var gx = 0; gx <= 1; gx += 0.2) {
                                ctx.beginPath(); ctx.moveTo(toSX(gx), mT); ctx.lineTo(toSX(gx), mT + pH); ctx.stroke();
                            }
                            for (var gy = -2; gy <= 2; gy += 0.5) {
                                ctx.beginPath(); ctx.moveTo(mL, toSY(gy)); ctx.lineTo(mL + pW, toSY(gy)); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = colors.text;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(mL, mT);
                            ctx.lineTo(mL, mT + pH);
                            ctx.lineTo(mL + pW, mT + pH);
                            ctx.stroke();

                            // Axis labels
                            ctx.fillStyle = colors.text;
                            ctx.font = '10px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var gx = 0; gx <= 1; gx += 0.2) {
                                ctx.fillText(gx.toFixed(1), toSX(gx), mT + pH + 5);
                            }
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var gy = -2; gy <= 2; gy += 1) {
                                ctx.fillText(gy.toFixed(0), mL - 6, toSY(gy));
                            }
                            ctx.fillStyle = colors.white;
                            ctx.font = '12px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('x\u2081', mL + pW / 2, height - 8);

                            // Data points (faded)
                            ctx.globalAlpha = 0.25;
                            for (var i = 0; i < nSamples; i++) {
                                var sx = toSX(dataX[i]);
                                var sy = toSY(dataY[i]);
                                if (sy > mT && sy < mT + pH) {
                                    ctx.fillStyle = colors.muted;
                                    ctx.beginPath();
                                    ctx.arc(sx, sy, 2, 0, Math.PI * 2);
                                    ctx.fill();
                                }
                            }
                            ctx.globalAlpha = 1.0;

                            // True function
                            ctx.strokeStyle = colors.green;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([6, 3]);
                            ctx.beginPath();
                            var nPts = 150;
                            for (var i = 0; i <= nPts; i++) {
                                var x = i / nPts;
                                var y = trueF(x);
                                var sx = toSX(x);
                                var sy = toSY(y);
                                if (i === 0) ctx.moveTo(sx, sy);
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Kernel estimate
                            ctx.strokeStyle = colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i <= nPts; i++) {
                                var x = i / nPts;
                                var yHat = kernelEstimate(x, currentD);
                                var sx = toSX(x);
                                var sy = toSY(yHat);
                                sy = Math.max(mT, Math.min(mT + pH, sy));
                                if (i === 0) ctx.moveTo(sx, sy);
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Title and info
                            ctx.fillStyle = colors.white;
                            ctx.font = 'bold 13px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Kernel Regression, d = ' + currentD + ', n = ' + nSamples, mL + 8, mT - 8);

                            // Optimal bandwidth
                            var hOpt = Math.pow(nSamples, -1.0 / (2 * sSmooth + currentD));
                            var rate = Math.pow(nSamples, -2 * sSmooth / (2 * sSmooth + currentD));
                            ctx.font = '11px -apple-system, sans-serif';
                            ctx.fillStyle = colors.text;
                            ctx.fillText('h* = ' + hOpt.toFixed(4) + ',  rate = n^{-' + (2*sSmooth/(2*sSmooth+currentD)).toFixed(3) + '} = ' + rate.toFixed(4), mL + 8, mT + 10);
                            ctx.fillText('Effective local n: ' + (nSamples * Math.pow(hOpt, currentD)).toFixed(1), mL + 8, mT + 24);

                            // Legend
                            var legX = mL + pW - 160, legY = mT + 8;
                            ctx.setLineDash([6, 3]);
                            ctx.strokeStyle = colors.green;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(legX, legY + 5); ctx.lineTo(legX + 25, legY + 5); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = colors.green;
                            ctx.font = '11px -apple-system, sans-serif';
                            ctx.fillText('True f', legX + 30, legY + 9);

                            ctx.strokeStyle = colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(legX, legY + 22); ctx.lineTo(legX + 25, legY + 22); ctx.stroke();
                            ctx.fillStyle = colors.orange;
                            ctx.fillText('Kernel est.', legX + 30, legY + 26);
                        }

                        VizEngine.createSlider(controls, 'Dimension d', 1, 25, currentD, 1, function(val) {
                            currentD = Math.round(val);
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Sample size n', 50, 1000, nSamples, 50, function(val) {
                            nSamples = Math.round(val);
                            generateData();
                            draw();
                        });

                        VizEngine.createButton(controls, 'Resample', function() {
                            generateData();
                            draw();
                        });

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Fix smoothness \\(s = 2\\) and target accuracy \\(\\varepsilon^2 = 0.01\\). For \\(d = 1, 5, 10, 20, 50\\), compute the required sample size \\(n \\asymp \\varepsilon^{-(2s+d)/s}\\) and the optimal bandwidth \\(h^* \\asymp n^{-1/(2s+d)}\\). At what dimension \\(d\\) does the required sample size exceed \\(10^9\\)?',
                    hint: 'With \\(s=2\\), \\(\\varepsilon^2 = 0.01\\), we need \\(n \\asymp (0.01)^{-(2 \\cdot 2 + d)/(2 \\cdot 2)} = 100^{(4+d)/4} = 10^{(4+d)/2}\\).',
                    solution: 'We have \\(n \\asymp 10^{(4+d)/2}\\). For \\(d=1\\): \\(n \\approx 10^{2.5} \\approx 316\\), \\(h^* \\approx 316^{-1/5} \\approx 0.32\\). For \\(d=5\\): \\(n \\approx 10^{4.5} \\approx 31{,}623\\), \\(h^* \\approx 31623^{-1/9} \\approx 0.35\\). For \\(d=10\\): \\(n \\approx 10^7\\), \\(h^* \\approx 10^{-7/14} = 10^{-0.5} \\approx 0.32\\). For \\(d=20\\): \\(n \\approx 10^{12}\\), \\(h^* \\approx 10^{-12/24} \\approx 0.32\\). For \\(d=50\\): \\(n \\approx 10^{27}\\), \\(h^* \\approx 10^{-27/54} \\approx 0.32\\). The required \\(n\\) exceeds \\(10^9\\) when \\((4+d)/2 &gt; 9\\), i.e., \\(d &gt; 14\\). So at \\(d = 15\\) we already need more than a billion observations to achieve modest accuracy.'
                }
            ]
        },
        // ============================================================
        // Section 4: Adaptation
        // ============================================================
        {
            id: 'ch19-sec04',
            title: 'Adaptation',
            content: `
                <h2>Adaptation: Achieving Optimal Rates Without Knowing Smoothness</h2>

                <p>The minimax rates derived in the previous sections assume that the smoothness parameter \\(s\\) is <strong>known</strong> to the statistician. The optimal bandwidth \\(h^* \\asymp n^{-1/(2s+d)}\\) depends explicitly on \\(s\\). But in practice, we never know the smoothness of the unknown function. This raises a fundamental question: <strong>can we achieve the optimal rate \\(n^{-2s/(2s+d)}\\) simultaneously for all \\(s\\), without knowing \\(s\\) in advance?</strong></p>

                <p>An estimator that achieves (or nearly achieves) the minimax rate for every smoothness level is called <strong>adaptive</strong>. The construction of adaptive estimators is one of the great achievements of modern nonparametric statistics.</p>

                <h3>The Adaptation Problem</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.7 (Adaptive Estimator)</div>
                    <div class="env-body">
                        <p>An estimator \\(\\hat{f}_n\\) is <strong>rate-adaptive</strong> over a family of function classes \\(\\{\\mathcal{F}_s : s \\in \\mathcal{S}\\}\\) if, for every \\(s \\in \\mathcal{S}\\),</p>
                        \\[\\sup_{f \\in \\mathcal{F}_s} \\mathbb{E}\\|\\hat{f}_n - f\\|_2^2 \\le C(s) \\cdot n^{-2s/(2s+d)},\\]
                        <p>where the constant \\(C(s)\\) may depend on \\(s\\) but the estimator \\(\\hat{f}_n\\) does <strong>not</strong> depend on \\(s\\). If the rate is achieved up to a logarithmic factor, we say the estimator is <strong>nearly adaptive</strong>.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.7 (The Price of Adaptation)</div>
                    <div class="env-body">
                        <p>For \\(L^2\\) loss and Sobolev classes in \\(d = 1\\), exact adaptation is possible: there exist estimators that achieve the rate \\(n^{-2s/(2s+1)}\\) simultaneously for all \\(s &gt; 0\\), with no logarithmic penalty. However, for pointwise loss (estimating \\(f(x_0)\\) at a fixed point), exact adaptation incurs an unavoidable logarithmic cost: the best adaptive rate for estimating \\(f(x_0)\\) is</p>
                        \\[\\left(\\frac{\\log n}{n}\\right)^{2s/(2s+1)},\\]
                        <p>which is strictly worse than the non-adaptive rate \\(n^{-2s/(2s+1)}\\) by a factor of \\((\\log n)^{2s/(2s+1)}\\).</p>
                    </div>
                </div>

                <h3>Lepski's Method</h3>

                <p>Lepski's method (1990, 1997) is a powerful and elegant approach to adaptive bandwidth selection. The key idea is to start with the smallest bandwidth (highest resolution) and increase it until the estimates at consecutive bandwidths become statistically indistinguishable.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.8 (Lepski's Method)</div>
                    <div class="env-body">
                        <p>Let \\(\\hat{f}_{h}\\) denote a kernel estimator with bandwidth \\(h\\), and let \\(\\mathcal{H} = \\{h_1 &lt; h_2 &lt; \\cdots &lt; h_M\\}\\) be a grid of bandwidths. For a fixed point \\(x\\), define the <strong>Lepski bandwidth</strong></p>
                        \\[\\hat{h}(x) = \\max\\left\\{h_j \\in \\mathcal{H} : |\\hat{f}_{h_j}(x) - \\hat{f}_{h_k}(x)| \\le 2\\sigma\\sqrt{\\frac{\\kappa \\log n}{nh_k^d}} \\;\\text{ for all } k \\le j\\right\\},\\]
                        <p>where \\(\\kappa &gt; 0\\) is a universal constant. The adaptive estimator is \\(\\hat{f}_{\\hat{h}(x)}(x)\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: How Lepski's Method Works</div>
                    <div class="env-body">
                        <p>Lepski's method works by a clever monotonicity argument:</p>
                        <ul>
                            <li><strong>Small bandwidths</strong> have low bias but high variance. The estimates at different small bandwidths will fluctuate wildly.</li>
                            <li><strong>Large bandwidths</strong> have high bias but low variance. Different large bandwidths give similar estimates -- but these estimates may all be biased.</li>
                            <li>The method selects the <strong>largest bandwidth</strong> for which the estimates at all smaller bandwidths are consistent (within a variance-calibrated tolerance). This is the point where the bias starts to dominate, which is precisely the optimal tradeoff point.</li>
                        </ul>
                        <p>Crucially, the method is <strong>local</strong>: the bandwidth \\(\\hat{h}(x)\\) can vary with \\(x\\), automatically adapting to spatially varying smoothness.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-lepski"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.8 (Lepski's Oracle Inequality)</div>
                    <div class="env-body">
                        <p>Under appropriate regularity conditions, the Lepski estimator \\(\\hat{f}_{\\hat{h}(x)}(x)\\) satisfies the pointwise oracle inequality</p>
                        \\[\\mathbb{E}\\bigl[\\bigl(\\hat{f}_{\\hat{h}(x)}(x) - f(x)\\bigr)^2\\bigr] \\le C \\inf_{h \\in \\mathcal{H}} \\left\\{\\text{bias}^2(h, x) + \\frac{\\sigma^2 \\log n}{nh^d}\\right\\},\\]
                        <p>where the infimum is over all bandwidths in the grid. In particular, if \\(f \\in \\Sigma(s, L)\\) for some unknown \\(s\\), the estimator achieves the near-optimal rate \\((\\log n / n)^{2s/(2s+d)}\\) at every point, <strong>without knowing \\(s\\)</strong>.</p>
                    </div>
                </div>

                <h3>Wavelet Thresholding</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.9 (Donoho-Johnstone Wavelet Thresholding)</div>
                    <div class="env-body">
                        <p>Consider the Gaussian sequence model \\(Y_k = \\theta_k + n^{-1/2} Z_k\\). The <strong>universal thresholding</strong> estimator</p>
                        \\[\\hat{\\theta}_k = Y_k \\cdot \\mathbf{1}\\bigl(|Y_k| \\ge \\lambda\\bigr), \\qquad \\lambda = \\sigma\\sqrt{\\frac{2\\log p}{n}},\\]
                        <p>achieves, over the Besov ball \\(B^s_{p,q}(L)\\),</p>
                        \\[\\sup_{\\theta \\in B^s_{p,q}(L)} \\mathbb{E}\\|\\hat{\\theta} - \\theta\\|_2^2 \\le C(s,p,q,L) \\cdot \\left(\\frac{\\log n}{n}\\right)^{2s/(2s+1)}.\\]
                        <p>This bound holds <strong>simultaneously for all \\(s &gt; 0\\)</strong> and \\(1 \\le p \\le \\infty\\), with only a logarithmic cost for adaptation. The threshold \\(\\lambda\\) does not depend on \\(s\\) -- it is the universal threshold.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark 19.5 (Adaptation is Free for \\(L^2\\) Risk)</div>
                    <div class="env-body">
                        <p>A remarkable result of Efromovich and Pinsker shows that for global \\(L^2\\) risk, adaptation is <strong>free</strong>: there exist estimators (based on blockwise James-Stein shrinkage) that achieve the exact minimax rate \\(n^{-2s/(2s+1)}\\) over Sobolev balls for all \\(s\\) simultaneously, with no logarithmic penalty. The logarithmic cost appears only for pointwise risk and for \\(L^\\infty\\) risk. This distinction between global and local adaptation is one of the subtlest phenomena in nonparametric theory.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-lepski',
                    title: "Lepski's Method: Adaptive Bandwidth Selection",
                    description: 'Lepski\'s method selects a bandwidth adaptively at each point x. Compare the Lepski-selected bandwidth (orange) with the oracle bandwidth (green dashed) that knows the true smoothness. The bandwidth adapts to local smoothness variations.',
                    setup: function(body, controls) {
                        var width = Math.min(body.clientWidth || 560, 700);
                        var height = Math.round(width * 0.7);
                        var dpr = window.devicePixelRatio || 1;
                        var canvas = document.createElement('canvas');
                        canvas.width = width * dpr;
                        canvas.height = height * dpr;
                        canvas.style.width = width + 'px';
                        canvas.style.height = height + 'px';
                        var ctx = canvas.getContext('2d');
                        ctx.scale(dpr, dpr);
                        body.appendChild(canvas);

                        var colors = {
                            bg: '#0c0c20', blue: '#58a6ff', teal: '#3fb9a0',
                            orange: '#f0883e', text: '#8b949e', white: '#f0f6fc',
                            grid: '#1a1a40', red: '#f85149', green: '#3fb950',
                            purple: '#bc8cff', muted: '#6e7681'
                        };

                        var nObs = 500;
                        var sigma = 0.2;
                        var kappa = 2.0;

                        function randn() {
                            var u1 = Math.random(), u2 = Math.random();
                            return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
                        }

                        // True function with varying local smoothness
                        // Smooth on [0,0.5], less smooth on [0.5,0.75], has a bump on [0.75,1]
                        function trueF(x) {
                            if (x < 0.5) {
                                return 0.5 * Math.sin(2 * Math.PI * x); // very smooth
                            } else if (x < 0.75) {
                                return 0.5 * Math.sin(2 * Math.PI * x) + 0.8 * Math.sin(8 * Math.PI * x); // oscillatory
                            } else {
                                return 0.5 * Math.sin(2 * Math.PI * x) + 1.2 * Math.exp(-200 * (x - 0.85) * (x - 0.85)); // bump
                            }
                        }

                        // Generate data
                        var obsX = [], obsY = [];
                        function generateData() {
                            obsX = []; obsY = [];
                            for (var i = 0; i < nObs; i++) {
                                var x = (i + 0.5) / nObs;
                                obsX.push(x);
                                obsY.push(trueF(x) + sigma * randn());
                            }
                        }
                        generateData();

                        // Gaussian kernel estimator
                        function kernelEst(x, h) {
                            var num = 0, den = 0;
                            for (var i = 0; i < nObs; i++) {
                                var u = (x - obsX[i]) / h;
                                var w = Math.exp(-0.5 * u * u);
                                num += w * obsY[i];
                                den += w;
                            }
                            return den > 1e-12 ? num / den : 0;
                        }

                        // Lepski bandwidth selection
                        var bandwidths = [];
                        for (var i = 0; i < 20; i++) {
                            bandwidths.push(0.005 * Math.pow(1.35, i));
                        }

                        function lepskiBandwidth(x) {
                            var M = bandwidths.length;
                            var ests = [];
                            for (var j = 0; j < M; j++) {
                                ests.push(kernelEst(x, bandwidths[j]));
                            }
                            var chosen = 0;
                            for (var j = 1; j < M; j++) {
                                var ok = true;
                                for (var k = 0; k < j; k++) {
                                    var threshold = kappa * sigma * Math.sqrt(Math.log(nObs) / (nObs * bandwidths[k]));
                                    if (Math.abs(ests[j] - ests[k]) > threshold) {
                                        ok = false;
                                        break;
                                    }
                                }
                                if (ok) chosen = j;
                                else break;
                            }
                            return { h: bandwidths[chosen], est: ests[chosen] };
                        }

                        // Oracle bandwidth (knows true function)
                        function oracleBandwidth(x) {
                            var bestMSE = Infinity, bestH = bandwidths[0];
                            var fTrue = trueF(x);
                            for (var j = 0; j < bandwidths.length; j++) {
                                var h = bandwidths[j];
                                var biasSq = Math.pow(kernelEst(x, h) - fTrue, 2); // not quite oracle, but approximate
                                // True oracle would use expected bias, but this serves for visualization
                                var variance = sigma * sigma / (nObs * h);
                                var mse = biasSq + variance;
                                // Approximate oracle: use bias based on true function structure
                                if (mse < bestMSE) { bestMSE = mse; bestH = h; }
                            }
                            return bestH;
                        }

                        function draw() {
                            ctx.fillStyle = colors.bg;
                            ctx.fillRect(0, 0, width, height);

                            // Two panels: top = function estimates, bottom = bandwidths
                            var mL = 50, mR = 20, mT = 35, mM = 20, mB = 40;
                            var topH = Math.round((height - mT - mM - mB) * 0.6);
                            var botH = height - mT - mM - mB - topH;
                            var pW = width - mL - mR;

                            var xMin = 0, xMax = 1;

                            function toSX(x) { return mL + (x - xMin) / (xMax - xMin) * pW; }

                            // === TOP PANEL: Function estimates ===
                            var yMin = -1.5, yMax = 2.2;
                            function toSY_top(y) { return mT + topH - (y - yMin) / (yMax - yMin) * topH; }

                            // Grid
                            ctx.strokeStyle = colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var gx = 0; gx <= 1; gx += 0.25) {
                                ctx.beginPath(); ctx.moveTo(toSX(gx), mT); ctx.lineTo(toSX(gx), mT + topH); ctx.stroke();
                            }
                            for (var gy = -1; gy <= 2; gy += 0.5) {
                                ctx.beginPath(); ctx.moveTo(mL, toSY_top(gy)); ctx.lineTo(mL + pW, toSY_top(gy)); ctx.stroke();
                            }

                            // Data (faded)
                            ctx.globalAlpha = 0.15;
                            for (var i = 0; i < nObs; i++) {
                                var sx = toSX(obsX[i]);
                                var sy = toSY_top(obsY[i]);
                                if (sy > mT && sy < mT + topH) {
                                    ctx.fillStyle = colors.muted;
                                    ctx.beginPath(); ctx.arc(sx, sy, 1.5, 0, Math.PI * 2); ctx.fill();
                                }
                            }
                            ctx.globalAlpha = 1.0;

                            // True function
                            var nPts = 200;
                            ctx.strokeStyle = colors.green;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([5, 3]);
                            ctx.beginPath();
                            for (var i = 0; i <= nPts; i++) {
                                var x = i / nPts;
                                var y = trueF(x);
                                var sx = toSX(x), sy = toSY_top(y);
                                if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Lepski estimate and bandwidths
                            var lepskiH = [], lepskiEst = [], oracleH = [];
                            var evalPts = 100;
                            for (var i = 0; i <= evalPts; i++) {
                                var x = i / evalPts;
                                var lep = lepskiBandwidth(x);
                                lepskiH.push(lep.h);
                                lepskiEst.push(lep.est);
                                oracleH.push(oracleBandwidth(x));
                            }

                            // Lepski estimate curve
                            ctx.strokeStyle = colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i <= evalPts; i++) {
                                var x = i / evalPts;
                                var sx = toSX(x);
                                var sy = toSY_top(lepskiEst[i]);
                                sy = Math.max(mT, Math.min(mT + topH, sy));
                                if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Axes
                            ctx.strokeStyle = colors.text;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(mL, mT); ctx.lineTo(mL, mT + topH); ctx.lineTo(mL + pW, mT + topH);
                            ctx.stroke();

                            // Labels
                            ctx.fillStyle = colors.white;
                            ctx.font = 'bold 12px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Function Estimates', mL + 5, mT + 14);

                            // Legend
                            var legX = mL + pW - 145, legY = mT + 6;
                            ctx.setLineDash([5, 3]);
                            ctx.strokeStyle = colors.green; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(legX, legY + 5); ctx.lineTo(legX + 20, legY + 5); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = colors.green; ctx.font = '10px -apple-system, sans-serif';
                            ctx.fillText('True f(x)', legX + 25, legY + 9);

                            ctx.strokeStyle = colors.orange; ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(legX, legY + 20); ctx.lineTo(legX + 20, legY + 20); ctx.stroke();
                            ctx.fillStyle = colors.orange;
                            ctx.fillText('Lepski est.', legX + 25, legY + 24);

                            // Smoothness region labels
                            ctx.font = '9px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = colors.teal;
                            ctx.globalAlpha = 0.6;
                            ctx.fillText('smooth', toSX(0.25), mT + topH - 8);
                            ctx.fillText('oscillatory', toSX(0.625), mT + topH - 8);
                            ctx.fillText('bump', toSX(0.875), mT + topH - 8);
                            ctx.globalAlpha = 1.0;

                            // === BOTTOM PANEL: Bandwidths ===
                            var botTop = mT + topH + mM;
                            var hMin = 0, hMax = 0;
                            for (var i = 0; i <= evalPts; i++) {
                                if (lepskiH[i] > hMax) hMax = lepskiH[i];
                                if (oracleH[i] > hMax) hMax = oracleH[i];
                            }
                            hMax = hMax * 1.2;
                            if (hMax < 0.01) hMax = 0.1;

                            function toSY_bot(h) { return botTop + botH - (h - hMin) / (hMax - hMin) * botH; }

                            // Grid
                            ctx.strokeStyle = colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var gx = 0; gx <= 1; gx += 0.25) {
                                ctx.beginPath(); ctx.moveTo(toSX(gx), botTop); ctx.lineTo(toSX(gx), botTop + botH); ctx.stroke();
                            }

                            // Lepski bandwidths
                            ctx.strokeStyle = colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = 0; i <= evalPts; i++) {
                                var x = i / evalPts;
                                var sx = toSX(x);
                                var sy = toSY_bot(lepskiH[i]);
                                if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Oracle bandwidths
                            ctx.strokeStyle = colors.green;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath();
                            for (var i = 0; i <= evalPts; i++) {
                                var x = i / evalPts;
                                var sx = toSX(x);
                                var sy = toSY_bot(oracleH[i]);
                                if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Axes
                            ctx.strokeStyle = colors.text;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(mL, botTop); ctx.lineTo(mL, botTop + botH); ctx.lineTo(mL + pW, botTop + botH);
                            ctx.stroke();

                            ctx.fillStyle = colors.white;
                            ctx.font = 'bold 12px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Selected Bandwidth h(x)', mL + 5, botTop + 14);

                            // X-axis labels
                            ctx.fillStyle = colors.text;
                            ctx.font = '10px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var gx = 0; gx <= 1; gx += 0.25) {
                                ctx.fillText(gx.toFixed(2), toSX(gx), botTop + botH + 5);
                            }
                            ctx.fillStyle = colors.white;
                            ctx.font = '12px -apple-system, sans-serif';
                            ctx.fillText('x', mL + pW / 2, botTop + botH + 20);

                            // Y-axis labels for bandwidth
                            ctx.fillStyle = colors.text;
                            ctx.font = '9px -apple-system, sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            var nTicks = 4;
                            for (var i = 0; i <= nTicks; i++) {
                                var hv = hMin + (hMax - hMin) * i / nTicks;
                                ctx.fillText(hv.toFixed(3), mL - 5, toSY_bot(hv));
                            }

                            // Legend for bottom panel
                            legX = mL + pW - 150;
                            legY = botTop + 6;
                            ctx.strokeStyle = colors.orange; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(legX, legY + 5); ctx.lineTo(legX + 20, legY + 5); ctx.stroke();
                            ctx.fillStyle = colors.orange; ctx.font = '10px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Lepski h(x)', legX + 25, legY + 9);

                            ctx.setLineDash([4, 3]);
                            ctx.strokeStyle = colors.green; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(legX, legY + 20); ctx.lineTo(legX + 20, legY + 20); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = colors.green;
                            ctx.fillText('Oracle h(x)', legX + 25, legY + 24);
                        }

                        VizEngine.createSlider(controls, 'Threshold \u03ba', 0.5, 5.0, kappa, 0.5, function(val) {
                            kappa = val;
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Noise \u03c3', 0.05, 0.5, sigma, 0.05, function(val) {
                            sigma = val;
                            generateData();
                            draw();
                        });

                        VizEngine.createButton(controls, 'Resample', function() {
                            generateData();
                            draw();
                        });

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Consider the Gaussian sequence model \\(Y_k = \\theta_k + n^{-1/2} Z_k\\), \\(k = 1, 2, \\ldots\\), and the hard thresholding estimator \\(\\hat{\\theta}_k = Y_k \\cdot \\mathbf{1}(|Y_k| \\ge \\lambda)\\) with \\(\\lambda = \\sigma\\sqrt{2\\log p / n}\\). Show that the risk of this estimator over the Sobolev ellipsoid \\(\\Theta_s(L) = \\{\\theta : \\sum_k k^{2s} \\theta_k^2 \\le L^2\\}\\) satisfies \\(R \\le C(s, L)(\\log n / n)^{2s/(2s+1)}\\).',
                    hint: 'Split the risk into two parts: (1) coordinates with \\(|\\theta_k| \\ge \\lambda\\) (where the estimator is unbiased up to thresholding effects), and (2) coordinates with \\(|\\theta_k| &lt; \\lambda\\) (where the estimator sets \\(\\hat{\\theta}_k\\) to 0 or leaves noise). Use the Sobolev constraint to bound the number of large coordinates.',
                    solution: 'For each coordinate, the MSE of the hard thresholding estimator satisfies \\(\\mathbb{E}(\\hat{\\theta}_k - \\theta_k)^2 \\le \\min(\\theta_k^2, C\\sigma^2/n + \\lambda^2)\\) (the min arises because estimating \\(\\theta_k\\) by 0 costs \\(\\theta_k^2\\), while thresholding costs at most the variance plus threshold level). The total risk is \\(R \\le \\sum_k \\min(\\theta_k^2, C\\lambda^2)\\). Split at \\(K\\): for \\(k \\le K\\), use the bound \\(C\\lambda^2\\); for \\(k &gt; K\\), use \\(\\theta_k^2\\). This gives \\(R \\le CK\\lambda^2 + \\sum_{k &gt; K} \\theta_k^2 \\le CK(\\log n)/n + L^2 K^{-2s}\\). Optimizing over \\(K\\): \\(K \\asymp (nL^2/\\log n)^{1/(2s+1)}\\), giving \\(R \\le C(s,L)(\\log n / n)^{2s/(2s+1)}\\). The log factor is the price of not knowing which coordinates are large.'
                }
            ]
        },
        // ============================================================
        // Section 5: Model Selection & Aggregation
        // ============================================================
        {
            id: 'ch19-sec05',
            title: 'Model Selection & Aggregation',
            content: `
                <h2>Model Selection, Aggregation, and Connections to Deep Learning</h2>

                <p>Beyond bandwidth selection, the problem of adaptation has a broader formulation: given a collection of candidate estimators (corresponding to different models, tuning parameters, or algorithms), how do we select the best one or combine them optimally? This is the domain of <strong>model selection</strong> and <strong>aggregation</strong>, which connects minimax theory to practical methods like cross-validation, information criteria, and ensemble learning.</p>

                <h3>Model Selection via Penalized Criteria</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.9 (Penalized Model Selection)</div>
                    <div class="env-body">
                        <p>Given a collection of models \\(\\{\\mathcal{M}_1, \\ldots, \\mathcal{M}_M\\}\\) with associated estimators \\(\\hat{f}_1, \\ldots, \\hat{f}_M\\), a <strong>penalized criterion</strong> selects the model</p>
                        \\[\\hat{m} = \\arg\\min_{m = 1, \\ldots, M} \\left\\{\\|Y - \\hat{f}_m\\|_n^2 + \\text{pen}(m)\\right\\},\\]
                        <p>where \\(\\|Y - \\hat{f}_m\\|_n^2 = n^{-1}\\sum_{i=1}^n (Y_i - \\hat{f}_m(X_i))^2\\) is the empirical risk and \\(\\text{pen}(m)\\) is a complexity penalty.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.10 (AIC and BIC)</div>
                    <div class="env-body">
                        <p>The two most classical information criteria are:</p>
                        <ul>
                            <li><strong>AIC</strong> (Akaike Information Criterion): \\(\\text{pen}_{\\text{AIC}}(m) = \\frac{2\\sigma^2 d_m}{n}\\), where \\(d_m\\) is the number of parameters in model \\(m\\).</li>
                            <li><strong>BIC</strong> (Bayesian Information Criterion): \\(\\text{pen}_{\\text{BIC}}(m) = \\frac{\\sigma^2 d_m \\log n}{n}\\).</li>
                        </ul>
                        <p>AIC is asymptotically efficient (minimax rate-optimal) but inconsistent. BIC is consistent (selects the true model as \\(n \\to \\infty\\)) but pays a logarithmic price. In the nonparametric setting with infinitely many models, heavier penalties are needed.</p>
                    </div>
                </div>

                <h3>Oracle Inequalities</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.11 (Oracle Inequality)</div>
                    <div class="env-body">
                        <p>An <strong>oracle inequality</strong> for a model selection procedure \\(\\hat{m}\\) is a bound of the form</p>
                        \\[\\mathbb{E}\\|\\hat{f}_{\\hat{m}} - f\\|^2 \\le C \\cdot \\inf_{m = 1, \\ldots, M} \\mathbb{E}\\|\\hat{f}_m - f\\|^2 + r_n,\\]
                        <p>where \\(C \\ge 1\\) is a <strong>leading constant</strong> and \\(r_n\\) is a <strong>remainder term</strong>. The oracle on the right-hand side knows the true \\(f\\) and picks the best model. An oracle inequality with \\(C = 1\\) is called <strong>exact</strong>; with \\(C &gt; 1\\) it is called <strong>sharp</strong>.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.10 (Oracle Inequality for Penalized Selection)</div>
                    <div class="env-body">
                        <p>In the Gaussian regression model with known \\(\\sigma^2\\), consider model selection among \\(M\\) linear estimators (projections onto nested subspaces of dimensions \\(d_1 &lt; d_2 &lt; \\cdots &lt; d_M\\)). With penalty</p>
                        \\[\\text{pen}(m) = \\frac{\\sigma^2}{n}\\left(d_m + \\sqrt{2d_m \\cdot x_m} + x_m\\right),\\]
                        <p>where \\(x_m = \\log(M/m)\\) (or any weights summing to a constant), the selected model \\(\\hat{m}\\) satisfies the exact oracle inequality</p>
                        \\[\\mathbb{E}\\|\\hat{f}_{\\hat{m}} - f\\|_n^2 \\le \\inf_{m} \\left\\{\\|f_m - f\\|^2 + \\frac{\\sigma^2 d_m}{n}\\right\\} + \\frac{C\\sigma^2}{n},\\]
                        <p>where \\(f_m\\) is the projection of \\(f\\) onto model \\(m\\). This bound holds with leading constant \\(C = 1\\) and a remainder of order \\(\\sigma^2/n\\).</p>
                    </div>
                </div>

                <h3>Aggregation of Estimators</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.12 (Aggregation)</div>
                    <div class="env-body">
                        <p>Given estimators \\(\\hat{f}_1, \\ldots, \\hat{f}_M\\), <strong>aggregation</strong> constructs a combined estimator</p>
                        \\[\\tilde{f} = \\sum_{m=1}^M w_m \\hat{f}_m,\\]
                        <p>with data-dependent weights \\(w_m \\ge 0\\), \\(\\sum_m w_m = 1\\). Three standard formulations are:</p>
                        <ul>
                            <li><strong>Model selection (MS) aggregation:</strong> pick a single \\(\\hat{f}_m\\) (i.e., \\(w_m \\in \\{0, 1\\}\\)).</li>
                            <li><strong>Convex (C) aggregation:</strong> take a convex combination (\\(w_m \\ge 0\\), \\(\\sum w_m = 1\\)).</li>
                            <li><strong>Linear (L) aggregation:</strong> take an arbitrary linear combination (no sign constraint).</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.11 (Optimal Rates of Aggregation, Tsybakov 2003)</div>
                    <div class="env-body">
                        <p>In the Gaussian regression model, the minimax optimal rates for the three types of aggregation are:</p>
                        <ul>
                            <li><strong>MS aggregation:</strong> excess risk \\(\\asymp \\frac{\\sigma^2 \\log M}{n}\\). The logarithmic factor reflects the cost of searching among \\(M\\) candidates.</li>
                            <li><strong>C aggregation:</strong> excess risk \\(\\asymp \\frac{\\sigma^2 \\log M}{n}\\). Same rate as MS, but the convex combination can be strictly better in non-worst-case scenarios.</li>
                            <li><strong>L aggregation:</strong> excess risk \\(\\asymp \\frac{\\sigma^2 M}{n}\\). The linear case pays the full parametric cost \\(M/n\\).</li>
                        </ul>
                        <p>These rates are achieved by exponential weighting (Gibbs estimator): \\(w_m \\propto \\exp(-n\\|Y - \\hat{f}_m\\|_n^2 / (2\\sigma^2))\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark 19.6 (Exponential Weighting and PAC-Bayes)</div>
                    <div class="env-body">
                        <p>The exponential weighting scheme \\(w_m \\propto \\exp(-n\\|Y - \\hat{f}_m\\|_n^2 / (2T))\\) with "temperature" \\(T\\) has deep connections to Bayesian model averaging and the PAC-Bayes framework. The optimal temperature \\(T = \\sigma^2\\) corresponds to the Gibbs posterior with the Gaussian likelihood. PAC-Bayes bounds (McAllester, 1999; Catoni, 2007) provide oracle inequalities for such weighted combinations that hold with high probability, not just in expectation.</p>
                    </div>
                </div>

                <h3>Connections to Deep Learning</h3>

                <div class="env-block remark">
                    <div class="env-title">Remark 19.7 (Why Deep Networks Might Circumvent the Curse)</div>
                    <div class="env-body">
                        <p>Classical nonparametric theory predicts that estimating an \\(s\\)-smooth function in \\(d\\) dimensions requires \\(n \\gg \\varepsilon^{-d/s}\\) samples. Yet deep neural networks routinely produce excellent predictions in \\(d = 10^3\\) or higher dimensions with moderate sample sizes. Several theoretical explanations have emerged:</p>
                        <ol>
                            <li><strong>Compositional structure</strong> (Schmidt-Hieber, 2020): if \\(f = g_L \\circ \\cdots \\circ g_1\\) where each \\(g_\\ell\\) is a low-dimensional smooth function, then deep networks can achieve rates depending on the intrinsic dimensions of the \\(g_\\ell\\), not the ambient dimension \\(d\\).</li>
                            <li><strong>Barron's theorem</strong> (Barron, 1993): for functions in the Barron class (those with bounded Fourier moment \\(\\int \\|\\omega\\| |\\hat{f}(\\omega)| d\\omega &lt; \\infty\\)), a single hidden layer network achieves the rate \\(O(1/n)\\) <strong>independent of \\(d\\)</strong>, circumventing the curse entirely.</li>
                            <li><strong>Implicit regularization</strong>: gradient descent on overparameterized networks may implicitly select low-complexity solutions (functions of bounded RKHS norm or variation), providing a form of automatic adaptation analogous to Lepski's method.</li>
                            <li><strong>Manifold hypothesis</strong>: if the data lie on a \\(d_0\\)-dimensional manifold in \\(\\mathbb{R}^d\\) with \\(d_0 \\ll d\\), then the effective dimension is \\(d_0\\), and nonparametric rates apply with \\(d_0\\) in place of \\(d\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.12 (Barron's Approximation Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(f : \\mathbb{R}^d \\to \\mathbb{R}\\) satisfy the <strong>Barron condition</strong></p>
                        \\[C_f = \\int_{\\mathbb{R}^d} \\|\\omega\\|_2 |\\tilde{f}(\\omega)| \\, d\\omega &lt; \\infty,\\]
                        <p>where \\(\\tilde{f}\\) is the Fourier transform of \\(f\\). Then for every \\(k \\ge 1\\), there exists a single hidden layer neural network \\(f_k\\) with \\(k\\) sigmoidal units such that</p>
                        \\[\\int_{B} |f(x) - f_k(x)|^2 \\, d\\mu(x) \\le \\frac{C_f^2}{k},\\]
                        <p>where \\(B\\) is any ball and \\(\\mu\\) is any probability measure on \\(B\\). The approximation error is \\(O(1/k)\\) regardless of the dimension \\(d\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Adaptation as the Unifying Theme</div>
                    <div class="env-body">
                        <p>The central message of this chapter -- and indeed of the entire course -- is that <strong>adaptation</strong> is the key to effective statistical estimation. The curse of dimensionality is a statement about worst-case estimation over large function classes. Adaptation circumvents this curse by automatically exploiting structure in the data, whether that structure takes the form of smoothness, sparsity, low rank, compositional form, or manifold geometry. From Lepski's method to wavelet thresholding to deep neural networks, the most successful estimation methods are those that adapt to unknown structure without requiring the statistician to specify it in advance.</p>
                    </div>
                </div>

                <h3>Conclusion: The Landscape of High-Dimensional Statistics</h3>

                <p>We close this course by surveying the intellectual landscape we have traversed and highlighting directions for future research.</p>

                <p>Over 19 chapters, we have developed a coherent framework for statistical inference in high-dimensional settings. The three pillars of this framework are:</p>

                <ol>
                    <li><strong>Concentration of measure</strong> (Chapters 1--4): Sub-Gaussian and sub-exponential inequalities, covering numbers, and chaining provide the probabilistic tools for controlling high-dimensional random objects.</li>
                    <li><strong>Structural estimation</strong> (Chapters 5--17): Sparsity, low rank, graphical structure, and other constraints reduce the effective dimensionality of the problem, enabling consistent estimation with regularized methods like the Lasso, nuclear norm minimization, and the graphical Lasso.</li>
                    <li><strong>Information-theoretic limits</strong> (Chapters 18--19): Fano's inequality, Assouad's lemma, and metric entropy arguments establish fundamental lower bounds, proving that no estimator -- regardless of computational cost -- can beat certain rates.</li>
                </ol>

                <p>Several frontiers remain active areas of research:</p>

                <ul>
                    <li><strong>Computational-statistical gaps:</strong> For some problems (e.g., planted clique, sparse PCA in certain regimes), there is a gap between the information-theoretic optimal rate and the best rate achievable by polynomial-time algorithms. Understanding these gaps is one of the deepest open questions at the intersection of statistics and computational complexity.</li>
                    <li><strong>Distribution-free inference:</strong> Conformal prediction and related methods provide finite-sample valid prediction intervals without parametric assumptions. Extending these methods to structured high-dimensional settings is an active frontier.</li>
                    <li><strong>Causal inference in high dimensions:</strong> Estimating treatment effects and causal graphs when the number of variables is large combines high-dimensional statistics with causal reasoning, requiring new theoretical frameworks.</li>
                    <li><strong>Foundation models and overparameterization:</strong> Modern neural networks operate in the extreme overparameterized regime (\\(p \\gg n\\)) yet generalize well. Explaining this phenomenon through the lens of implicit regularization, neural tangent kernels, and benign overfitting is a major open challenge.</li>
                </ul>

                <p>The tools developed in this course -- concentration inequalities, minimax theory, sparsity, and adaptation -- provide the mathematical foundation for engaging with all of these frontiers. High-dimensional statistics is not merely a set of techniques; it is a way of thinking about the interplay between data, structure, and uncertainty that will continue to shape the development of statistics and machine learning for decades to come.</p>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Consider \\(M = n\\) candidate estimators (e.g., kernel estimators at \\(n\\) different bandwidths). The exponential weighting estimator is \\(\\tilde{f} = \\sum_{m=1}^M w_m \\hat{f}_m\\) with \\(w_m \\propto \\exp(-n\\|Y - \\hat{f}_m\\|_n^2 / (2\\sigma^2))\\). Show that the excess risk satisfies \\(\\mathbb{E}\\|\\tilde{f} - f\\|_n^2 - \\inf_m \\mathbb{E}\\|\\hat{f}_m - f\\|_n^2 \\le \\frac{\\sigma^2 \\log M}{n} = \\frac{\\sigma^2 \\log n}{n}\\).',
                    hint: 'Use the PAC-Bayes or "online-to-batch" argument. The key identity is: for the Gibbs distribution \\(w_m \\propto \\exp(-nL_m / T)\\), we have \\(\\sum_m w_m L_m \\le \\inf_m L_m + T \\log M / n\\), where \\(L_m = \\|Y - \\hat{f}_m\\|_n^2\\) and \\(T = \\sigma^2\\).',
                    solution: 'Define \\(L_m = \\|Y - \\hat{f}_m\\|_n^2\\) and \\(w_m = \\exp(-nL_m/(2\\sigma^2)) / Z\\) where \\(Z = \\sum_{m\'} \\exp(-nL_{m\'}/(2\\sigma^2))\\). The key inequality uses convexity: \\(-\\log Z = -\\log \\sum_m \\exp(-nL_m/(2\\sigma^2)) \\le -(-nL_{m^*}/(2\\sigma^2)) - \\log(1) = nL_{m^*}/(2\\sigma^2)\\) for any fixed \\(m^*\\). Actually, more precisely: \\(\\sum_m w_m L_m = -(2\\sigma^2/n) \\sum_m w_m \\log(w_m Z) = -(2\\sigma^2/n)[\\sum_m w_m \\log w_m + \\log Z]\\). Using \\(\\log Z \\ge \\max_m (-nL_m/(2\\sigma^2)) - \\log M^{-1} \\cdot M\\), we bound: \\(\\sum_m w_m L_m \\le L_{m^*} + (2\\sigma^2/n)[\\text{KL}(w \\| \\text{uniform})]\\). For the uniform prior, \\(\\text{KL}(w \\| \\text{uniform}) \\le \\log M\\). Taking expectations: \\(\\mathbb{E}[\\sum_m w_m L_m] \\le \\mathbb{E}[L_{m^*}] + \\sigma^2 \\log M / n\\). Since \\(L_{m^*} = \\inf_m L_m\\), the excess risk is bounded by \\(\\sigma^2 \\log M / n = \\sigma^2 \\log n / n\\). For \\(M = n\\) candidates, this is \\(\\sigma^2 \\log n / n\\), which is the optimal rate for model selection aggregation.'
                }
            ]
        }
    ]
});
