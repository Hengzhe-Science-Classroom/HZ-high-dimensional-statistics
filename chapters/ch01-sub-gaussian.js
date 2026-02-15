window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch01',
    number: 1,
    title: 'Concentration I: Sub-Gaussian',
    subtitle: 'Tail bounds and the sub-Gaussian property',
    sections: [
        // ================================================================
        // SECTION 1: Classical Inequalities
        // ================================================================
        {
            id: 'ch01-sec01',
            title: 'Classical Inequalities',
            content: `
                <h2>Classical Inequalities: Markov and Chebyshev</h2>

                <p>The fundamental problem of concentration of measure is to determine how closely a random variable clusters around a typical value (its mean or median). The simplest answers come from classical moment-based inequalities. While these bounds are too loose for high-dimensional applications, they establish the conceptual framework upon which all stronger results are built.</p>

                <h3>Markov's Inequality</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.1 (Markov's Inequality)</div>
                    <div class="env-body">
                        <p>Let \\(X\\) be a nonnegative random variable. Then for every \\(t &gt; 0\\),</p>
                        \\[\\mathbb{P}(X \\geq t) \\leq \\frac{\\mathbb{E}[X]}{t}.\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Since \\(X \\geq 0\\), we have \\(X \\geq t \\cdot \\mathbf{1}_{\\{X \\geq t\\}}\\). Taking expectations:</p>
                        \\[\\mathbb{E}[X] \\geq \\mathbb{E}[t \\cdot \\mathbf{1}_{\\{X \\geq t\\}}] = t \\cdot \\mathbb{P}(X \\geq t).\\]
                        <p>Dividing both sides by \\(t &gt; 0\\) yields the result.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Markov's inequality is the weakest concentration bound: it only uses one piece of information (the mean), and it gives a bound that decays as \\(1/t\\). For instance, if \\(\\mathbb{E}[X] = 1\\), then \\(\\mathbb{P}(X \\geq 100) \\leq 1/100\\). This polynomial decay is far too slow for high-dimensional problems where we need exponential or even Gaussian-type tail behavior.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Tightness of Markov)</div>
                    <div class="env-body">
                        <p>Markov's inequality is tight in the sense that for any \\(t &gt; 0\\) and \\(\\mu &gt; 0\\), the random variable \\(X\\) taking value \\(t\\) with probability \\(\\mu/t\\) and \\(0\\) otherwise achieves equality. This shows we cannot improve Markov without additional assumptions.</p>
                    </div>
                </div>

                <h3>Chebyshev's Inequality</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.2 (Chebyshev's Inequality)</div>
                    <div class="env-body">
                        <p>Let \\(X\\) be a random variable with finite mean \\(\\mu = \\mathbb{E}[X]\\) and finite variance \\(\\sigma^2 = \\operatorname{Var}(X)\\). Then for every \\(t &gt; 0\\),</p>
                        \\[\\mathbb{P}(|X - \\mu| \\geq t) \\leq \\frac{\\sigma^2}{t^2}.\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Apply Markov's inequality to the nonnegative random variable \\((X - \\mu)^2\\):</p>
                        \\[\\mathbb{P}(|X - \\mu| \\geq t) = \\mathbb{P}((X - \\mu)^2 \\geq t^2) \\leq \\frac{\\mathbb{E}[(X - \\mu)^2]}{t^2} = \\frac{\\sigma^2}{t^2}.\\]
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Chebyshev improves upon Markov by using second-moment information: the tail probability decays as \\(1/t^2\\) rather than \\(1/t\\). But for high-dimensional applications, even \\(1/t^2\\) decay is insufficient. Consider the sample mean \\(\\bar{X}_n = \\frac{1}{n}\\sum_{i=1}^n X_i\\) of i.i.d. random variables with variance \\(\\sigma^2\\). Chebyshev gives \\(\\mathbb{P}(|\\bar{X}_n - \\mu| \\geq t) \\leq \\sigma^2/(nt^2)\\), which is the weak law of large numbers. But in high dimensions we need <em>exponential</em> decay in \\(n\\), and Chebyshev cannot provide this.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 1.3 (Looseness of Chebyshev for Gaussians)</div>
                    <div class="env-body">
                        <p>Let \\(X \\sim N(0, 1)\\). The true tail probability satisfies the well-known Gaussian tail bound:</p>
                        \\[\\mathbb{P}(|X| \\geq t) \\leq \\sqrt{\\frac{2}{\\pi}} \\cdot \\frac{e^{-t^2/2}}{t}, \\quad t &gt; 0.\\]
                        <p>Compare this with Chebyshev: \\(\\mathbb{P}(|X| \\geq t) \\leq 1/t^2\\). At \\(t = 4\\), Chebyshev gives \\(\\leq 0.0625\\), while the true probability is approximately \\(6.3 \\times 10^{-5}\\) -- off by three orders of magnitude. This exponential vs. polynomial gap motivates the entire theory of sub-Gaussian random variables.</p>
                    </div>
                </div>

                <h3>Higher Moment Bounds</h3>

                <p>The pattern behind Chebyshev generalizes: applying Markov to \\(|X - \\mu|^k\\) yields a bound decaying as \\(t^{-k}\\). Increasing \\(k\\) improves the polynomial rate, but we remain in the realm of polynomial decay.</p>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 1.4 (\\(k\\)-th Moment Bound)</div>
                    <div class="env-body">
                        <p>If \\(\\mathbb{E}[|X|^k] &lt; \\infty\\) for some integer \\(k \\geq 1\\), then</p>
                        \\[\\mathbb{P}(|X| \\geq t) \\leq \\frac{\\mathbb{E}[|X|^k]}{t^k}.\\]
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>For a standard Gaussian, \\(\\mathbb{E}[|X|^k] = 2^{k/2} \\Gamma((k+1)/2)/\\sqrt{\\pi}\\), which grows as \\(\\sim (k/e)^{k/2}\\). Optimizing the \\(k\\)-th moment bound over \\(k\\) yields a bound of the form \\(e^{-ct^2}\\), recovering the Gaussian tail. The Chernoff method, which we develop next, achieves this directly.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-tail-comparison"></div>
            `,
            visualizations: [
                {
                    id: 'viz-tail-comparison',
                    title: 'Tail Bound Comparison: Markov, Chebyshev, and Gaussian',
                    description: 'Compare the true Gaussian tail \\(\\mathbb{P}(|X| \\geq t)\\) with Markov, Chebyshev, and the Gaussian upper bound. Observe the enormous gap at moderate \\(t\\).',
                    setup: function(container, controls) {
                        const width = Math.min(container.clientWidth - 32, 700);
                        const height = Math.round(width * 0.6);
                        const canvas = document.createElement('canvas');
                        const dpr = window.devicePixelRatio || 1;
                        canvas.width = width * dpr;
                        canvas.height = height * dpr;
                        canvas.style.width = width + 'px';
                        canvas.style.height = height + 'px';
                        const ctx = canvas.getContext('2d');
                        ctx.scale(dpr, dpr);
                        container.appendChild(canvas);

                        // Standard normal CDF via approximation (Abramowitz & Stegun)
                        function normalCDF(x) {
                            if (x < -8) return 0;
                            if (x > 8) return 1;
                            var a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
                            var sign = 1;
                            if (x < 0) { sign = -1; x = -x; }
                            var t = 1.0 / (1.0 + p * x);
                            var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x / 2);
                            return 0.5 * (1.0 + sign * y);
                        }

                        function gaussianTail(t) { return 2 * (1 - normalCDF(t)); }
                        function markovBound(t) { return Math.sqrt(2 / Math.PI) / t; } // E[|X|] = sqrt(2/pi)
                        function chebyshevBound(t) { return 1.0 / (t * t); }
                        function gaussianUpperBound(t) { return Math.sqrt(2 / Math.PI) * Math.exp(-t * t / 2) / t; }

                        var tMax = 5;
                        var logMin = -8;

                        function draw() {
                            var padL = 60, padR = 20, padT = 30, padB = 50;
                            var plotW = width - padL - padR;
                            var plotH = height - padT - padB;

                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, width, height);

                            // Grid
                            ctx.strokeStyle = '#1a1a4066';
                            ctx.lineWidth = 0.5;
                            for (var i = 0; i <= 10; i++) {
                                var gy = padT + plotH * i / 10;
                                ctx.beginPath(); ctx.moveTo(padL, gy); ctx.lineTo(padL + plotW, gy); ctx.stroke();
                            }
                            for (var j = 0; j <= 10; j++) {
                                var gx = padL + plotW * j / 10;
                                ctx.beginPath(); ctx.moveTo(gx, padT); ctx.lineTo(gx, padT + plotH); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = '#4a4a7a';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(padL, padT + plotH); ctx.lineTo(padL + plotW, padT + plotH); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, padT + plotH); ctx.stroke();

                            // Axis labels
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var k = 0; k <= 5; k++) {
                                var lx = padL + plotW * k / 5;
                                ctx.fillText(k.toFixed(0), lx, padT + plotH + 8);
                            }
                            ctx.textAlign = 'center';
                            ctx.fillText('t', padL + plotW / 2, padT + plotH + 32);

                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var m = 0; m <= 8; m++) {
                                var logVal = logMin + m;
                                var ly = padT + plotH * (1 - (logVal - logMin) / (0 - logMin));
                                ctx.fillText('1e' + logVal, padL - 6, ly);
                            }

                            function toX(t) { return padL + plotW * t / tMax; }
                            function toY(p) {
                                if (p <= 0) return padT;
                                var lp = Math.log10(p);
                                if (lp < logMin) return padT + plotH;
                                return padT + plotH * (1 - (lp - logMin) / (0 - logMin));
                            }

                            function drawCurve(fn, color, lw, dashed) {
                                ctx.strokeStyle = color;
                                ctx.lineWidth = lw;
                                if (dashed) ctx.setLineDash([6, 4]);
                                ctx.beginPath();
                                var started = false;
                                for (var t = 0.1; t <= tMax; t += 0.02) {
                                    var val = fn(t);
                                    if (val > 1) val = 1;
                                    if (val <= 0) continue;
                                    var px = toX(t);
                                    var py = toY(val);
                                    if (!started) { ctx.moveTo(px, py); started = true; }
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                                if (dashed) ctx.setLineDash([]);
                            }

                            // Draw curves
                            drawCurve(markovBound, '#f85149', 2, true);       // red dashed
                            drawCurve(chebyshevBound, '#d29922', 2, true);    // yellow dashed
                            drawCurve(gaussianUpperBound, '#bc8cff', 2, false); // purple
                            drawCurve(gaussianTail, '#58a6ff', 2.5, false);   // blue (true)

                            // Legend
                            var legX = padL + plotW - 180;
                            var legY = padT + 14;
                            var legItems = [
                                { label: 'True P(|X|>=t)', color: '#58a6ff', dashed: false },
                                { label: 'Gaussian upper bound', color: '#bc8cff', dashed: false },
                                { label: 'Chebyshev', color: '#d29922', dashed: true },
                                { label: 'Markov (on |X|)', color: '#f85149', dashed: true }
                            ];
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'middle';
                            legItems.forEach(function(item, idx) {
                                var iy = legY + idx * 18;
                                ctx.strokeStyle = item.color;
                                ctx.lineWidth = 2;
                                if (item.dashed) ctx.setLineDash([4, 3]);
                                ctx.beginPath(); ctx.moveTo(legX, iy); ctx.lineTo(legX + 24, iy); ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = item.color;
                                ctx.fillText(item.label, legX + 30, iy);
                            });

                            // Title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('P(|X| >= t) for X ~ N(0,1)  [log scale]', padL + 4, padT - 22);
                        }

                        draw();
                        return { stopAnimation: function() {} };
                    }
                }
            ],
            exercises: [
                {
                    question: '<strong>Exercise 1.1.</strong> (Reverse Markov) Let \\(X\\) be a nonnegative random variable with \\(\\mathbb{E}[X] &gt; 0\\). Prove the <em>Paley-Zygmund inequality</em>: for \\(0 &lt; \\theta &lt; 1\\),\\[\\mathbb{P}(X \\geq \\theta \\, \\mathbb{E}[X]) \\geq (1 - \\theta)^2 \\frac{(\\mathbb{E}[X])^2}{\\mathbb{E}[X^2]}.\\]',
                    hint: 'Write \\(\\mathbb{E}[X] = \\mathbb{E}[X \\mathbf{1}_{X \\geq \\theta \\mathbb{E}[X]}] + \\mathbb{E}[X \\mathbf{1}_{X &lt; \\theta \\mathbb{E}[X]}]\\), bound the second term by \\(\\theta \\mathbb{E}[X]\\), then apply Cauchy-Schwarz to the first term.',
                    solution: '<p>Write \\(\\mathbb{E}[X] = \\mathbb{E}[X \\mathbf{1}_{X \\geq \\theta \\mu}] + \\mathbb{E}[X \\mathbf{1}_{X &lt; \\theta \\mu}]\\) where \\(\\mu = \\mathbb{E}[X]\\). The second term is at most \\(\\theta \\mu\\), so</p>\\[(1 - \\theta)\\mu \\leq \\mathbb{E}[X \\mathbf{1}_{X \\geq \\theta\\mu}].\\]<p>By Cauchy-Schwarz: \\(\\mathbb{E}[X \\mathbf{1}_{X \\geq \\theta\\mu}] \\leq \\sqrt{\\mathbb{E}[X^2]} \\cdot \\sqrt{\\mathbb{P}(X \\geq \\theta\\mu)}\\). Squaring and rearranging:</p>\\[\\mathbb{P}(X \\geq \\theta \\mu) \\geq \\frac{(1-\\theta)^2 \\mu^2}{\\mathbb{E}[X^2]}.\\]'
                },
                {
                    question: '<strong>Exercise 1.2.</strong> Let \\(X_1, \\ldots, X_n\\) be i.i.d. with mean \\(\\mu\\) and variance \\(\\sigma^2\\). Show that for any \\(\\varepsilon &gt; 0\\),\\[\\mathbb{P}\\left(|\\bar{X}_n - \\mu| \\geq \\varepsilon\\right) \\leq \\frac{\\sigma^2}{n\\varepsilon^2}\\]where \\(\\bar{X}_n = \\frac{1}{n}\\sum_{i=1}^n X_i\\). Explain why this is the weak law of large numbers, and why the \\(1/n\\) rate is inadequate for high-dimensional problems.',
                    hint: 'Compute \\(\\operatorname{Var}(\\bar{X}_n) = \\sigma^2/n\\) and apply Chebyshev.',
                    solution: '<p>We have \\(\\operatorname{Var}(\\bar{X}_n) = \\frac{1}{n^2}\\sum_{i=1}^n \\operatorname{Var}(X_i) = \\sigma^2/n\\). By Chebyshev:</p>\\[\\mathbb{P}(|\\bar{X}_n - \\mu| \\geq \\varepsilon) \\leq \\frac{\\operatorname{Var}(\\bar{X}_n)}{\\varepsilon^2} = \\frac{\\sigma^2}{n\\varepsilon^2}.\\]<p>This is the WLLN: for fixed \\(\\varepsilon &gt; 0\\), the probability tends to 0 as \\(n \\to \\infty\\). However, the polynomial rate \\(1/n\\) is too slow for union-bound arguments in high dimensions. If we want to control \\(\\max_{1 \\leq j \\leq p} |\\bar{X}_{n,j} - \\mu_j|\\) simultaneously over \\(p\\) coordinates with \\(p \\gg n\\), we need tail bounds that decay exponentially in \\(n\\), which is exactly what Hoeffding\'s inequality provides.</p>'
                }
            ]
        },

        // ================================================================
        // SECTION 2: The Chernoff Method
        // ================================================================
        {
            id: 'ch01-sec02',
            title: 'The Chernoff Method',
            content: `
                <h2>The Chernoff Method</h2>

                <p>The key idea that unlocks exponential tail bounds is the <strong>exponential moment method</strong>, also known as the <em>Chernoff bound</em>. Instead of applying Markov's inequality to \\(|X|^k\\), we apply it to the exponential function \\(e^{\\lambda X}\\), and then optimize over the free parameter \\(\\lambda\\).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 1.5 (Moment Generating Function)</div>
                    <div class="env-body">
                        <p>The <strong>moment generating function (MGF)</strong> of a random variable \\(X\\) is</p>
                        \\[M_X(\\lambda) = \\mathbb{E}[e^{\\lambda X}], \\quad \\lambda \\in \\mathbb{R},\\]
                        <p>defined on the set of \\(\\lambda\\) for which the expectation is finite. The <strong>cumulant generating function (CGF)</strong> is \\(\\psi_X(\\lambda) = \\log M_X(\\lambda)\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.6 (Chernoff Bound)</div>
                    <div class="env-body">
                        <p>For any random variable \\(X\\) and any \\(t \\in \\mathbb{R}\\),</p>
                        \\[\\mathbb{P}(X \\geq t) \\leq \\inf_{\\lambda &gt; 0} e^{-\\lambda t} \\, \\mathbb{E}[e^{\\lambda X}] = \\inf_{\\lambda &gt; 0} \\exp\\bigl(\\psi_X(\\lambda) - \\lambda t\\bigr).\\]
                        <p>Similarly, \\(\\mathbb{P}(X \\leq t) \\leq \\inf_{\\lambda &gt; 0} e^{\\lambda t} \\, \\mathbb{E}[e^{-\\lambda X}]\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>For any \\(\\lambda &gt; 0\\), the function \\(x \\mapsto e^{\\lambda x}\\) is increasing, so</p>
                        \\[\\mathbb{P}(X \\geq t) = \\mathbb{P}(e^{\\lambda X} \\geq e^{\\lambda t}) \\leq \\frac{\\mathbb{E}[e^{\\lambda X}]}{e^{\\lambda t}}\\]
                        <p>where the last step is Markov's inequality applied to the nonnegative random variable \\(e^{\\lambda X}\\). Since this holds for all \\(\\lambda &gt; 0\\), we take the infimum.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: The Chernoff Method as Legendre Transform</div>
                    <div class="env-body">
                        <p>The optimization \\(\\inf_{\\lambda &gt; 0} \\exp(\\psi_X(\\lambda) - \\lambda t) = \\exp(-\\psi_X^*(t))\\) where \\(\\psi_X^*(t) = \\sup_{\\lambda &gt; 0}(\\lambda t - \\psi_X(\\lambda))\\) is the <strong>Legendre-Fenchel transform</strong> of the CGF. This connects concentration to convex analysis: the rate function governing tail decay is the convex conjugate of the cumulant generating function. This perspective is central to the theory of large deviations.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 1.7 (Chernoff Bound for a Standard Gaussian)</div>
                    <div class="env-body">
                        <p>Let \\(X \\sim N(0, 1)\\). Then \\(M_X(\\lambda) = e^{\\lambda^2/2}\\), so the Chernoff bound gives</p>
                        \\[\\mathbb{P}(X \\geq t) \\leq \\inf_{\\lambda &gt; 0} e^{-\\lambda t + \\lambda^2/2}.\\]
                        <p>The exponent \\(f(\\lambda) = -\\lambda t + \\lambda^2/2\\) is minimized at \\(\\lambda^* = t\\), yielding</p>
                        \\[\\mathbb{P}(X \\geq t) \\leq e^{-t^2/2}.\\]
                        <p>This matches the correct Gaussian tail decay rate \\(e^{-t^2/2}\\) (up to polynomial prefactors), and is vastly superior to Chebyshev's \\(1/t^2\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 1.8 (Chernoff for Rademacher Sums)</div>
                    <div class="env-body">
                        <p>Let \\(\\varepsilon_1, \\ldots, \\varepsilon_n\\) be independent Rademacher random variables (\\(\\mathbb{P}(\\varepsilon_i = \\pm 1) = 1/2\\)) and let \\(S_n = \\sum_{i=1}^n \\varepsilon_i\\). Then:</p>
                        \\[M_{\\varepsilon_i}(\\lambda) = \\frac{e^\\lambda + e^{-\\lambda}}{2} = \\cosh(\\lambda).\\]
                        <p>By independence, \\(M_{S_n}(\\lambda) = \\cosh(\\lambda)^n\\). Using \\(\\cosh(\\lambda) \\leq e^{\\lambda^2/2}\\), we get</p>
                        \\[\\mathbb{P}(S_n \\geq t) \\leq \\inf_{\\lambda &gt; 0} e^{-\\lambda t + n\\lambda^2/2} = e^{-t^2/(2n)}.\\]
                        <p>This is the Hoeffding bound for Rademacher sums, giving Gaussian-like tail behavior.</p>
                    </div>
                </div>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 1.9 (Cosh Bound)</div>
                    <div class="env-body">
                        <p>For all \\(\\lambda \\in \\mathbb{R}\\),</p>
                        \\[\\cosh(\\lambda) = \\frac{e^{\\lambda} + e^{-\\lambda}}{2} \\leq e^{\\lambda^2/2}.\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Expand both sides in Taylor series:</p>
                        \\[\\cosh(\\lambda) = \\sum_{k=0}^{\\infty} \\frac{\\lambda^{2k}}{(2k)!}, \\quad e^{\\lambda^2/2} = \\sum_{k=0}^{\\infty} \\frac{\\lambda^{2k}}{2^k k!}.\\]
                        <p>It suffices to show \\((2k)! \\geq 2^k k!\\) for all \\(k \\geq 0\\). We verify: \\((2k)! = \\prod_{j=1}^{k}(2j)(2j-1) = 2^k k! \\prod_{j=1}^k (2j-1) \\geq 2^k k!\\), since each factor \\((2j-1) \\geq 1\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body">
                        <p>The Chernoff method requires the MGF to be finite. Heavy-tailed distributions (e.g., Cauchy, Pareto with small exponent) do not have finite MGFs and require different techniques. The sub-exponential theory (Chapter 2) handles distributions with heavier tails than sub-Gaussian but still with some exponential moment control.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: '<strong>Exercise 1.3.</strong> Let \\(X \\sim \\text{Poisson}(\\mu)\\). Show that the MGF is \\(M_X(\\lambda) = \\exp(\\mu(e^\\lambda - 1))\\). Using the Chernoff method, prove that for \\(t &gt; \\mu\\),\\[\\mathbb{P}(X \\geq t) \\leq \\left(\\frac{e\\mu}{t}\\right)^t e^{-\\mu}.\\]',
                    hint: 'Compute the MGF from the definition, then optimize \\(\\lambda\\) in \\(e^{-\\lambda t} M_X(\\lambda) = \\exp(-\\lambda t + \\mu(e^\\lambda - 1))\\). Set the derivative to zero to find \\(\\lambda^* = \\log(t/\\mu)\\).',
                    solution: '<p><strong>MGF:</strong> \\(M_X(\\lambda) = \\sum_{k=0}^\\infty e^{\\lambda k} \\frac{\\mu^k e^{-\\mu}}{k!} = e^{-\\mu} \\sum_{k=0}^\\infty \\frac{(\\mu e^\\lambda)^k}{k!} = e^{-\\mu} e^{\\mu e^\\lambda} = \\exp(\\mu(e^\\lambda - 1))\\).</p><p><strong>Chernoff bound:</strong> For \\(\\lambda &gt; 0\\): \\(\\mathbb{P}(X \\geq t) \\leq \\exp(-\\lambda t + \\mu(e^\\lambda - 1))\\). Taking derivative with respect to \\(\\lambda\\) and setting to zero: \\(-t + \\mu e^\\lambda = 0\\), so \\(\\lambda^* = \\log(t/\\mu)\\) (valid when \\(t &gt; \\mu\\)). Substituting:</p>\\[\\mathbb{P}(X \\geq t) \\leq \\exp\\left(-t\\log\\frac{t}{\\mu} + \\mu\\left(\\frac{t}{\\mu} - 1\\right)\\right) = \\exp(-t \\log(t/\\mu) + t - \\mu) = \\left(\\frac{e\\mu}{t}\\right)^t e^{-\\mu}.\\]'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Hoeffding's Inequality
        // ================================================================
        {
            id: 'ch01-sec03',
            title: "Hoeffding's Inequality",
            content: `
                <h2>Hoeffding's Inequality</h2>

                <p>We now apply the Chernoff method to bounded random variables, obtaining one of the most widely used concentration inequalities in probability and statistics.</p>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 1.10 (Hoeffding's Lemma)</div>
                    <div class="env-body">
                        <p>Let \\(X\\) be a random variable with \\(\\mathbb{E}[X] = 0\\) and \\(a \\leq X \\leq b\\). Then for all \\(\\lambda \\in \\mathbb{R}\\),</p>
                        \\[\\mathbb{E}[e^{\\lambda X}] \\leq \\exp\\left(\\frac{\\lambda^2(b-a)^2}{8}\\right).\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Since \\(x \\mapsto e^{\\lambda x}\\) is convex, for \\(x \\in [a, b]\\) we can write</p>
                        \\[e^{\\lambda x} \\leq \\frac{b - x}{b - a}\\, e^{\\lambda a} + \\frac{x - a}{b - a}\\, e^{\\lambda b}.\\]
                        <p>Taking expectations and using \\(\\mathbb{E}[X] = 0\\):</p>
                        \\[\\mathbb{E}[e^{\\lambda X}] \\leq \\frac{b}{b-a} e^{\\lambda a} + \\frac{-a}{b-a} e^{\\lambda b}.\\]
                        <p>Set \\(p = -a/(b-a)\\) and \\(h = \\lambda(b-a)\\), so the right side becomes</p>
                        \\[(1-p)e^{-ph} + pe^{(1-p)h} = e^{L(h)}\\]
                        <p>where \\(L(h) = -ph + \\log(1 - p + pe^h)\\). We have \\(L(0) = 0\\), \\(L'(0) = 0\\), and \\(L''(h) \\leq 1/4\\) for all \\(h\\) (since \\(L''(h)\\) is the variance of a Bernoulli, bounded by \\(1/4\\)). By Taylor's theorem with the remainder:</p>
                        \\[L(h) \\leq \\frac{h^2}{8} = \\frac{\\lambda^2(b-a)^2}{8}.\\]
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Why \\(1/8\\) and not \\(1/4\\)?)</div>
                    <div class="env-body">
                        <p>Although \\(L''(h) \\leq 1/4\\), the factor of \\(1/8\\) arises because \\(L(0) = L'(0) = 0\\), so by Taylor: \\(L(h) = \\frac{h^2}{2}L''(\\xi) \\leq \\frac{h^2}{2} \\cdot \\frac{1}{4} = \\frac{h^2}{8}\\). One can show this bound is tight for symmetric Bernoulli random variables (Rademacher), where \\(a = -1, b = 1\\), giving \\(\\mathbb{E}[e^{\\lambda X}] = \\cosh(\\lambda) \\leq e^{\\lambda^2/2} = e^{\\lambda^2 (b-a)^2/8}\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.11 (Hoeffding's Inequality)</div>
                    <div class="env-body">
                        <p>Let \\(X_1, \\ldots, X_n\\) be independent random variables with \\(X_i \\in [a_i, b_i]\\) almost surely. Let \\(S_n = \\sum_{i=1}^n X_i\\). Then for all \\(t &gt; 0\\):</p>
                        \\[\\mathbb{P}(S_n - \\mathbb{E}[S_n] \\geq t) \\leq \\exp\\left(-\\frac{2t^2}{\\sum_{i=1}^n (b_i - a_i)^2}\\right)\\]
                        <p>and symmetrically \\(\\mathbb{P}(S_n - \\mathbb{E}[S_n] \\leq -t) \\leq \\exp\\left(-\\frac{2t^2}{\\sum_{i=1}^n (b_i - a_i)^2}\\right)\\). In particular, for i.i.d. variables with \\(X_i \\in [a, b]\\) and sample mean \\(\\bar{X}_n\\):</p>
                        \\[\\mathbb{P}(|\\bar{X}_n - \\mu| \\geq t) \\leq 2\\exp\\left(-\\frac{2nt^2}{(b-a)^2}\\right).\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Without loss of generality, assume \\(\\mathbb{E}[X_i] = 0\\) (otherwise replace \\(X_i\\) by \\(X_i - \\mathbb{E}[X_i]\\) and adjust \\(a_i, b_i\\)). By the Chernoff method, for \\(\\lambda &gt; 0\\):</p>
                        \\[\\mathbb{P}(S_n \\geq t) \\leq e^{-\\lambda t} \\, \\mathbb{E}[e^{\\lambda S_n}] = e^{-\\lambda t} \\prod_{i=1}^n \\mathbb{E}[e^{\\lambda X_i}]\\]
                        <p>where the product factorizes by independence. Applying Hoeffding's Lemma to each factor:</p>
                        \\[\\mathbb{P}(S_n \\geq t) \\leq e^{-\\lambda t} \\prod_{i=1}^n \\exp\\left(\\frac{\\lambda^2(b_i - a_i)^2}{8}\\right) = \\exp\\left(-\\lambda t + \\frac{\\lambda^2}{8}\\sum_{i=1}^n(b_i - a_i)^2\\right).\\]
                        <p>Minimizing over \\(\\lambda &gt; 0\\): taking the derivative and setting it to zero gives \\(\\lambda^* = \\frac{4t}{\\sum_i (b_i - a_i)^2}\\). Substituting:</p>
                        \\[\\mathbb{P}(S_n \\geq t) \\leq \\exp\\left(-\\frac{2t^2}{\\sum_{i=1}^n(b_i - a_i)^2}\\right).\\]
                        <p>The two-sided bound follows by applying the same argument to \\(-S_n\\) and using the union bound.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Hoeffding's inequality provides <em>sub-Gaussian</em> tail behavior for bounded random variables: the tail probability decays as \\(e^{-Cnt^2}\\) where \\(C\\) depends on the ranges \\(b_i - a_i\\). This is exactly the exponential-in-\\(n\\) decay that Chebyshev could not achieve. The key mechanism: independence allows the MGF to factorize as a product, and each bounded factor is controlled by Hoeffding's Lemma.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-hoeffding"></div>

                <div class="env-block example">
                    <div class="env-title">Example 1.12 (Confidence Interval for a Proportion)</div>
                    <div class="env-body">
                        <p>Let \\(X_1, \\ldots, X_n \\sim \\text{Bernoulli}(p)\\) independently, and let \\(\\hat{p} = \\bar{X}_n\\). Since \\(X_i \\in [0, 1]\\), Hoeffding gives:</p>
                        \\[\\mathbb{P}(|\\hat{p} - p| \\geq \\varepsilon) \\leq 2e^{-2n\\varepsilon^2}.\\]
                        <p>Setting this equal to \\(\\delta\\) and solving for \\(\\varepsilon\\): with probability at least \\(1 - \\delta\\),</p>
                        \\[|\\hat{p} - p| \\leq \\sqrt{\\frac{\\log(2/\\delta)}{2n}}.\\]
                        <p>This gives a distribution-free confidence interval of width \\(O(1/\\sqrt{n})\\), matching the parametric rate. For \\(n = 1000\\) and \\(\\delta = 0.05\\), we get \\(\\varepsilon \\approx 0.043\\), a tight confidence interval without knowing \\(p\\).</p>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 1.13 (Bounded Differences Inequality)</div>
                    <div class="env-body">
                        <p>A function \\(f : \\mathcal{X}^n \\to \\mathbb{R}\\) has the <strong>bounded differences property</strong> with constants \\(c_1, \\ldots, c_n\\) if for all \\(i\\) and all \\(x_1, \\ldots, x_n, x_i'\\),</p>
                        \\[|f(x_1, \\ldots, x_i, \\ldots, x_n) - f(x_1, \\ldots, x_i', \\ldots, x_n)| \\leq c_i.\\]
                        <p>If \\(X_1, \\ldots, X_n\\) are independent, then for all \\(t &gt; 0\\),</p>
                        \\[\\mathbb{P}(f(X_1, \\ldots, X_n) - \\mathbb{E}[f(X_1, \\ldots, X_n)] \\geq t) \\leq \\exp\\left(-\\frac{2t^2}{\\sum_{i=1}^n c_i^2}\\right).\\]
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-hoeffding',
                    title: "Interactive: Hoeffding's Bound Tightness",
                    description: 'Sample average of \\(n\\) Bernoulli(\\(p\\)) trials vs. Hoeffding tail bound. Use sliders to change \\(n\\) and \\(p\\). The blue histogram shows the empirical distribution of \\(\\bar{X}_n\\); the orange curve is the Hoeffding upper bound on \\(\\mathbb{P}(|\\bar{X}_n - p| \\geq t)\\).',
                    setup: function(container, controls) {
                        var width = Math.min(container.clientWidth - 32, 700);
                        var height = Math.round(width * 0.6);
                        var canvas = document.createElement('canvas');
                        var dpr = window.devicePixelRatio || 1;
                        canvas.width = width * dpr;
                        canvas.height = height * dpr;
                        canvas.style.width = width + 'px';
                        canvas.style.height = height + 'px';
                        var ctx = canvas.getContext('2d');
                        ctx.scale(dpr, dpr);
                        container.appendChild(canvas);

                        var n = 20;
                        var p = 0.5;
                        var nTrials = 10000;

                        var sliderN = VizEngine.createSlider(controls, 'n', 5, 200, n, 5, function(val) { n = Math.round(val); draw(); });
                        var sliderP = VizEngine.createSlider(controls, 'p', 0.05, 0.95, p, 0.05, function(val) { p = val; draw(); });

                        // Simple seeded RNG for reproducibility within each draw
                        function mulberry32(a) {
                            return function() {
                                a |= 0; a = a + 0x6D2B79F5 | 0;
                                var t = Math.imul(a ^ a >>> 15, 1 | a);
                                t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
                                return ((t ^ t >>> 14) >>> 0) / 4294967296;
                            };
                        }

                        function draw() {
                            var padL = 60, padR = 30, padT = 30, padB = 50;
                            var plotW = width - padL - padR;
                            var plotH = height - padT - padB;

                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, width, height);

                            // Simulate
                            var rng = mulberry32(42);
                            var samples = [];
                            for (var trial = 0; trial < nTrials; trial++) {
                                var s = 0;
                                for (var i = 0; i < n; i++) {
                                    if (rng() < p) s++;
                                }
                                samples.push(s / n);
                            }

                            // Histogram
                            var nBins = Math.min(n + 1, 50);
                            var bins = new Array(nBins).fill(0);
                            for (var si = 0; si < samples.length; si++) {
                                var bi = Math.min(Math.floor(samples[si] * nBins), nBins - 1);
                                bins[bi]++;
                            }
                            var maxBin = Math.max.apply(null, bins);

                            // Draw grid
                            ctx.strokeStyle = '#1a1a4066';
                            ctx.lineWidth = 0.5;
                            for (var gi = 0; gi <= 5; gi++) {
                                var gy2 = padT + plotH * gi / 5;
                                ctx.beginPath(); ctx.moveTo(padL, gy2); ctx.lineTo(padL + plotW, gy2); ctx.stroke();
                            }

                            // Draw histogram bars
                            var barW = plotW / nBins;
                            for (var bj = 0; bj < nBins; bj++) {
                                var barH = (bins[bj] / maxBin) * plotH * 0.85;
                                var bx = padL + bj * barW;
                                var by = padT + plotH - barH;
                                ctx.fillStyle = '#58a6ff44';
                                ctx.fillRect(bx + 1, by, barW - 2, barH);
                                ctx.strokeStyle = '#58a6ff88';
                                ctx.lineWidth = 1;
                                ctx.strokeRect(bx + 1, by, barW - 2, barH);
                            }

                            // Compute empirical tail probabilities and Hoeffding bound
                            // P(|X_bar - p| >= t) for various t
                            var tVals = [];
                            var empiricalTail = [];
                            var hoeffdingTail = [];
                            var chebyshevTail = [];
                            var numT = 50;
                            var tMaxVal = 0.5;
                            for (var ti = 0; ti < numT; ti++) {
                                var tVal = 0.01 + ti * tMaxVal / numT;
                                tVals.push(tVal);
                                // Empirical
                                var count = 0;
                                for (var sj = 0; sj < samples.length; sj++) {
                                    if (Math.abs(samples[sj] - p) >= tVal) count++;
                                }
                                empiricalTail.push(count / nTrials);
                                // Hoeffding
                                hoeffdingTail.push(Math.min(1, 2 * Math.exp(-2 * n * tVal * tVal)));
                                // Chebyshev
                                var variance = p * (1 - p) / n;
                                chebyshevTail.push(Math.min(1, variance / (tVal * tVal)));
                            }

                            // Draw tail probability plot (bottom right inset)
                            var insetW = plotW * 0.42;
                            var insetH = plotH * 0.55;
                            var insetX = padL + plotW - insetW - 10;
                            var insetY = padT + 10;

                            // Inset background
                            ctx.fillStyle = '#0c0c20cc';
                            ctx.fillRect(insetX - 5, insetY - 5, insetW + 10, insetH + 10);
                            ctx.strokeStyle = '#30363d';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(insetX - 5, insetY - 5, insetW + 10, insetH + 10);

                            // Inset title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('P(|X_bar - p| >= t)', insetX + 2, insetY);

                            var logMinI = -5;
                            function toIX(t2) { return insetX + insetW * t2 / tMaxVal; }
                            function toIY(prob) {
                                if (prob <= 0) return insetY + insetH;
                                var lp = Math.log10(prob);
                                if (lp < logMinI) return insetY + insetH;
                                return insetY + 15 + (insetH - 15) * (1 - (lp - logMinI) / (0 - logMinI));
                            }

                            // Inset grid
                            ctx.strokeStyle = '#1a1a4066';
                            ctx.lineWidth = 0.3;
                            for (var ig = logMinI; ig <= 0; ig++) {
                                var igy = toIY(Math.pow(10, ig));
                                ctx.beginPath(); ctx.moveTo(insetX, igy); ctx.lineTo(insetX + insetW, igy); ctx.stroke();
                            }

                            // Inset axis labels
                            ctx.fillStyle = '#6e7681';
                            ctx.font = '9px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var ig2 = logMinI; ig2 <= 0; ig2 += 1) {
                                ctx.fillText('1e' + ig2, insetX - 2, toIY(Math.pow(10, ig2)));
                            }

                            // Draw curves on inset
                            function drawInsetCurve(arr, color, lw2, dashed2) {
                                ctx.strokeStyle = color;
                                ctx.lineWidth = lw2;
                                if (dashed2) ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                var started2 = false;
                                for (var ci = 0; ci < arr.length; ci++) {
                                    if (arr[ci] <= 0) continue;
                                    var cx = toIX(tVals[ci]);
                                    var cy = toIY(arr[ci]);
                                    if (!started2) { ctx.moveTo(cx, cy); started2 = true; }
                                    else ctx.lineTo(cx, cy);
                                }
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }

                            drawInsetCurve(chebyshevTail, '#d29922', 1.5, true);
                            drawInsetCurve(hoeffdingTail, '#f0883e', 2, false);
                            drawInsetCurve(empiricalTail, '#58a6ff', 2, false);

                            // Mini legend
                            var mly = insetY + insetH - 40;
                            var mlx = insetX + 4;
                            ctx.font = '9px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            [{label:'Empirical', color:'#58a6ff'}, {label:'Hoeffding', color:'#f0883e'}, {label:'Chebyshev', color:'#d29922'}].forEach(function(item, idx) {
                                ctx.fillStyle = item.color;
                                ctx.fillRect(mlx, mly + idx * 12, 12, 2);
                                ctx.fillText(item.label, mlx + 16, mly + idx * 12 + 3);
                            });

                            // Draw mean line on histogram
                            var meanPx = padL + p * plotW;
                            ctx.strokeStyle = '#3fb950';
                            ctx.lineWidth = 2;
                            ctx.setLineDash([6, 3]);
                            ctx.beginPath(); ctx.moveTo(meanPx, padT); ctx.lineTo(meanPx, padT + plotH); ctx.stroke();
                            ctx.setLineDash([]);

                            // Axis labels for histogram
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var al = 0; al <= 10; al++) {
                                var alv = al / 10;
                                var alx = padL + alv * plotW;
                                ctx.fillText(alv.toFixed(1), alx, padT + plotH + 6);
                            }
                            ctx.fillText('Sample mean X_bar', padL + plotW / 2, padT + plotH + 28);

                            // Title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Bernoulli(' + p.toFixed(2) + ') sample mean, n=' + n + ', ' + nTrials + ' trials', padL, padT - 22);

                            // Mean label
                            ctx.fillStyle = '#3fb950';
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('p=' + p.toFixed(2), meanPx + 4, padT + 6);
                        }

                        draw();
                        return { stopAnimation: function() {} };
                    }
                }
            ],
            exercises: [
                {
                    question: '<strong>Exercise 1.4.</strong> (Symmetric form of Hoeffding) Let \\(X_1, \\ldots, X_n\\) be independent with \\(X_i \\in [a_i, b_i]\\). Prove the two-sided bound:\\[\\mathbb{P}(|S_n - \\mathbb{E}[S_n]| \\geq t) \\leq 2\\exp\\left(-\\frac{2t^2}{\\sum_{i=1}^n (b_i - a_i)^2}\\right).\\]Then use this to show that the empirical mean of \\(n\\) i.i.d. bounded random variables satisfies \\(|\\bar{X}_n - \\mu| = O_P(\\sqrt{\\log n / n})\\).',
                    hint: 'For the two-sided bound, apply the one-sided result to both \\(S_n - \\mathbb{E}[S_n]\\) and \\(-(S_n - \\mathbb{E}[S_n])\\), then use a union bound. For the second part, set \\(t = C\\sqrt{\\log n / n}\\) and check the bound vanishes.',
                    solution: '<p>Apply Theorem 1.11 to \\(S_n\\) and to \\(-S_n\\) (noting \\(-X_i \\in [-b_i, -a_i]\\)) and take a union bound:</p>\\[\\mathbb{P}(|S_n - \\mathbb{E}[S_n]| \\geq t) \\leq \\mathbb{P}(S_n - \\mathbb{E}[S_n] \\geq t) + \\mathbb{P}(S_n - \\mathbb{E}[S_n] \\leq -t) \\leq 2\\exp\\!\\left(-\\frac{2t^2}{\\sum_i (b_i-a_i)^2}\\right).\\]<p>For the i.i.d. case with \\(X_i \\in [a,b]\\): setting \\(t = (b-a)\\sqrt{\\log n/(2n)}\\) gives \\(\\mathbb{P}(|\\bar{X}_n - \\mu| \\geq t) \\leq 2/n \\to 0\\), showing \\(|\\bar{X}_n - \\mu| = O_P(\\sqrt{\\log n / n})\\). This is much sharper than the Chebyshev rate \\(O_P(1/\\sqrt{n})\\) for the purpose of ensuring the tail probability decays to zero.</p>'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Sub-Gaussian Random Variables
        // ================================================================
        {
            id: 'ch01-sec04',
            title: 'Sub-Gaussian Random Variables',
            content: `
                <h2>Sub-Gaussian Random Variables</h2>

                <p>Hoeffding's inequality works for bounded random variables, but many natural distributions -- Gaussians, Rademacher variables, bounded perturbations of Gaussians -- share the same exponential tail behavior without being bounded. The theory of <strong>sub-Gaussian random variables</strong> provides a unified framework for all distributions with "Gaussian-like" or better tails.</p>

                <h3>Definition and Equivalent Characterizations</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 1.14 (Sub-Gaussian Random Variable)</div>
                    <div class="env-body">
                        <p>A random variable \\(X\\) with \\(\\mathbb{E}[X] = 0\\) is called <strong>sub-Gaussian</strong> if there exists a constant \\(\\sigma &gt; 0\\) such that</p>
                        \\[\\mathbb{E}[e^{\\lambda X}] \\leq e^{\\sigma^2 \\lambda^2 / 2} \\quad \\text{for all } \\lambda \\in \\mathbb{R}.\\]
                        <p>We call \\(\\sigma^2\\) the <strong>sub-Gaussian parameter</strong> (or <strong>variance proxy</strong>) of \\(X\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The defining condition says the MGF of \\(X\\) is dominated by the MGF of a Gaussian with variance \\(\\sigma^2\\). Since the MGF controls all moments and tail behavior, this single condition encodes that \\(X\\) has tails no heavier than a Gaussian. The name "sub-Gaussian" means "below Gaussian" in terms of tail weight.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.15 (Equivalent Characterizations of Sub-Gaussianity)</div>
                    <div class="env-body">
                        <p>Let \\(X\\) be a zero-mean random variable. The following properties are equivalent (with possibly different constants \\(K_1, \\ldots, K_4 &gt; 0\\) that differ by at most universal factors):</p>
                        <ol>
                            <li><strong>(MGF condition)</strong> \\(\\mathbb{E}[e^{\\lambda X}] \\leq e^{K_1^2 \\lambda^2 / 2}\\) for all \\(\\lambda \\in \\mathbb{R}\\).</li>
                            <li><strong>(Tail condition)</strong> \\(\\mathbb{P}(|X| \\geq t) \\leq 2 \\exp(-t^2 / (2K_2^2))\\) for all \\(t \\geq 0\\).</li>
                            <li><strong>(Moment condition)</strong> \\((\\mathbb{E}[|X|^p])^{1/p} \\leq K_3 \\sqrt{p}\\) for all \\(p \\geq 1\\).</li>
                            <li><strong>(Exponential moment condition)</strong> \\(\\mathbb{E}[e^{X^2/K_4^2}] \\leq 2\\).</li>
                        </ol>
                        <p>Moreover, if one property holds with constant \\(K_i\\), then the others hold with \\(K_j \\leq C K_i\\) for universal constants \\(C\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Key implications)</div>
                    <div class="env-body">
                        <p><strong>(1) \\(\\Rightarrow\\) (2):</strong> By the Chernoff bound,</p>
                        \\[\\mathbb{P}(X \\geq t) \\leq e^{-\\lambda t} \\mathbb{E}[e^{\\lambda X}] \\leq e^{-\\lambda t + K_1^2 \\lambda^2/2}.\\]
                        <p>Optimizing at \\(\\lambda = t/K_1^2\\): \\(\\mathbb{P}(X \\geq t) \\leq e^{-t^2/(2K_1^2)}\\). Applying the same to \\(-X\\) and using the union bound gives (2) with \\(K_2 = K_1\\).</p>

                        <p><strong>(2) \\(\\Rightarrow\\) (3):</strong> Using the tail-integral formula \\(\\mathbb{E}[|X|^p] = \\int_0^\\infty p t^{p-1} \\mathbb{P}(|X| \\geq t)\\, dt\\):</p>
                        \\[\\mathbb{E}[|X|^p] \\leq \\int_0^\\infty p t^{p-1} \\cdot 2e^{-t^2/(2K_2^2)}\\, dt = 2p \\cdot K_2^p \\cdot 2^{p/2-1} \\Gamma(p/2).\\]
                        <p>Using \\(\\Gamma(p/2) \\leq (p/2)^{p/2}\\) (Stirling), we get \\((\\mathbb{E}[|X|^p])^{1/p} \\leq C K_2 \\sqrt{p}\\).</p>

                        <p><strong>(3) \\(\\Rightarrow\\) (1):</strong> Expand the MGF: \\(\\mathbb{E}[e^{\\lambda X}] = \\sum_{p=0}^\\infty \\frac{\\lambda^p}{p!}\\mathbb{E}[X^p]\\). The odd moments may be nonzero, but using \\(|\\mathbb{E}[X^p]| \\leq \\mathbb{E}[|X|^p] \\leq (K_3\\sqrt{p})^p\\) and bounding the sum yields the MGF condition. (The detailed calculation uses \\(p^{p/2}/p! \\leq (Ce)^{p/2}/\\Gamma(p/2+1)\\) to close the bound.)</p>

                        <p><strong>(2) \\(\\Leftrightarrow\\) (4):</strong> By the tail-integral formula applied to \\(e^{X^2/K^2}\\):</p>
                        \\[\\mathbb{E}[e^{X^2/K^2}] = 1 + \\int_0^\\infty \\mathbb{P}(e^{X^2/K^2} \\geq u)\\, du = 1 + \\int_0^\\infty \\mathbb{P}(|X| \\geq K\\sqrt{\\log u})\\, du.\\]
                        <p>The tail condition (2) makes this integral converge if \\(K\\) is large enough relative to \\(K_2\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <h3>The Sub-Gaussian Norm</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 1.16 (Sub-Gaussian Norm \\(\\|X\\|_{\\psi_2}\\))</div>
                    <div class="env-body">
                        <p>The <strong>sub-Gaussian norm</strong> of a random variable \\(X\\) is defined as</p>
                        \\[\\|X\\|_{\\psi_2} = \\inf\\left\\{t &gt; 0 : \\mathbb{E}\\left[e^{X^2/t^2}\\right] \\leq 2\\right\\}.\\]
                        <p>Equivalently (up to universal constants):</p>
                        \\[\\|X\\|_{\\psi_2} \\sim \\sup_{p \\geq 1} \\frac{(\\mathbb{E}[|X|^p])^{1/p}}{\\sqrt{p}}.\\]
                        <p>A random variable \\(X\\) is sub-Gaussian if and only if \\(\\|X\\|_{\\psi_2} &lt; \\infty\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 1.17 (Standard Examples of Sub-Gaussian Variables)</div>
                    <div class="env-body">
                        <ol>
                            <li><strong>Gaussian:</strong> If \\(X \\sim N(0, \\sigma^2)\\), then \\(\\|X\\|_{\\psi_2} = C\\sigma\\) for a universal constant \\(C\\). The sub-Gaussian parameter equals \\(\\sigma^2\\).</li>
                            <li><strong>Rademacher:</strong> If \\(\\mathbb{P}(X = \\pm 1) = 1/2\\), then \\(\\|X\\|_{\\psi_2} = C\\) (bounded, hence sub-Gaussian with parameter 1).</li>
                            <li><strong>Bounded:</strong> If \\(|X - \\mathbb{E}[X]| \\leq M\\) a.s., then \\(\\|X - \\mathbb{E}[X]\\|_{\\psi_2} \\leq CM\\). Hoeffding's lemma shows the sub-Gaussian parameter is at most \\(M^2\\) (or \\((b-a)^2/4\\) for \\(X \\in [a,b]\\)).</li>
                            <li><strong>Not sub-Gaussian:</strong> If \\(X \\sim \\text{Exp}(1)\\), then \\(\\mathbb{P}(X \\geq t) = e^{-t}\\), which decays as \\(e^{-t}\\) rather than \\(e^{-t^2}\\). So \\(X\\) is <em>not</em> sub-Gaussian (it is sub-exponential; see Chapter 2).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 1.18 (Properties of the Sub-Gaussian Norm)</div>
                    <div class="env-body">
                        <p>Let \\(X, Y\\) be sub-Gaussian random variables and \\(a \\in \\mathbb{R}\\). Then:</p>
                        <ol>
                            <li>\\(\\|aX\\|_{\\psi_2} = |a| \\cdot \\|X\\|_{\\psi_2}\\) (homogeneity).</li>
                            <li>\\(\\|X\\|_{\\psi_2} = 0\\) if and only if \\(X = 0\\) a.s.</li>
                            <li>If \\(X\\) and \\(Y\\) are independent, \\(\\|X + Y\\|_{\\psi_2}^2 \\leq C(\\|X\\|_{\\psi_2}^2 + \\|Y\\|_{\\psi_2}^2)\\).</li>
                        </ol>
                        <p>In particular, \\(\\|\\cdot\\|_{\\psi_2}\\) is a norm on the space of sub-Gaussian random variables (modulo a.s. equality), often called the <strong>Orlicz norm</strong> associated with the Young function \\(\\psi_2(x) = e^{x^2} - 1\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Connection to Orlicz Spaces)</div>
                    <div class="env-body">
                        <p>The sub-Gaussian norm is a special case of the more general Orlicz norm theory. For a convex, increasing function \\(\\psi : [0, \\infty) \\to [0, \\infty)\\) with \\(\\psi(0) = 0\\), the Orlicz norm is \\(\\|X\\|_\\psi = \\inf\\{t &gt; 0 : \\mathbb{E}[\\psi(|X|/t)] \\leq 1\\}\\). Taking \\(\\psi(x) = e^{x^2} - 1\\) recovers the sub-Gaussian norm (with the threshold 2 adjusted to 1 by convention). Taking \\(\\psi(x) = e^x - 1\\) yields the sub-exponential norm \\(\\|\\cdot\\|_{\\psi_1}\\) of Chapter 2.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: '<strong>Exercise 1.5.</strong> Prove that if \\(X\\) is sub-Gaussian with \\(\\|X\\|_{\\psi_2} \\leq K\\), then \\(\\operatorname{Var}(X) \\leq CK^2\\) for a universal constant \\(C\\). Is the converse true?',
                    hint: 'Use the moment characterization: \\((\\mathbb{E}[|X|^p])^{1/p} \\leq CK\\sqrt{p}\\) with \\(p = 2\\). For the converse, consider heavy-tailed distributions.',
                    solution: '<p>From the moment characterization (property 3 of Theorem 1.15), with \\(p = 2\\): \\((\\mathbb{E}[X^2])^{1/2} \\leq CK\\sqrt{2}\\), so \\(\\operatorname{Var}(X) \\leq \\mathbb{E}[X^2] \\leq 2C^2 K^2\\).</p><p>The converse is <strong>false</strong>. A random variable can have finite (even small) variance yet not be sub-Gaussian. Example: let \\(X\\) take value \\(0\\) with probability \\(1 - 1/n\\) and value \\(\\sqrt{n}\\) with probability \\(1/n\\). Then \\(\\operatorname{Var}(X) \\leq 1\\), but \\(\\mathbb{P}(X \\geq \\sqrt{n}) = 1/n\\), which is polynomial -- not Gaussian -- decay. More strikingly, \\(X \\sim \\text{Exp}(1) - 1\\) has variance 1 but is only sub-exponential, not sub-Gaussian.</p>'
                },
                {
                    question: '<strong>Exercise 1.6.</strong> Let \\(X \\sim N(0, \\sigma^2)\\). Compute \\(\\mathbb{E}[e^{X^2/t^2}]\\) and determine \\(\\|X\\|_{\\psi_2}\\) exactly (up to the constant in the definition).',
                    hint: 'Use the Gaussian MGF: \\(\\mathbb{E}[e^{aX^2}] = (1 - 2a\\sigma^2)^{-1/2}\\) for \\(a &lt; 1/(2\\sigma^2)\\).',
                    solution: '<p>For \\(X \\sim N(0, \\sigma^2)\\):</p>\\[\\mathbb{E}[e^{X^2/t^2}] = \\frac{1}{\\sqrt{2\\pi}\\sigma}\\int_{-\\infty}^{\\infty} \\exp\\left(\\frac{x^2}{t^2} - \\frac{x^2}{2\\sigma^2}\\right) dx = \\frac{1}{\\sqrt{1 - 2\\sigma^2/t^2}}\\]<p>provided \\(t^2 &gt; 2\\sigma^2\\). Setting \\(\\mathbb{E}[e^{X^2/t^2}] = 2\\): \\((1 - 2\\sigma^2/t^2)^{-1/2} = 2\\), so \\(1 - 2\\sigma^2/t^2 = 1/4\\), giving \\(t^2 = 8\\sigma^2/3\\). Thus \\(\\|X\\|_{\\psi_2} = \\sigma\\sqrt{8/3} \\approx 1.633 \\sigma\\).</p>'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Sums and Maxima
        // ================================================================
        {
            id: 'ch01-sec05',
            title: 'Sums and Maxima',
            content: `
                <h2>Sums of Independent Sub-Gaussians and Maximal Inequalities</h2>

                <p>The power of the sub-Gaussian framework becomes fully apparent when we study sums of independent sub-Gaussian random variables and their suprema over finite (or infinite) index sets. These results form the backbone of high-dimensional statistics.</p>

                <h3>Hoeffding-Type Bound for Sub-Gaussian Sums</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.19 (Concentration of Sub-Gaussian Sums)</div>
                    <div class="env-body">
                        <p>Let \\(X_1, \\ldots, X_n\\) be independent, zero-mean, sub-Gaussian random variables with parameters \\(\\sigma_i^2\\) (i.e., \\(\\mathbb{E}[e^{\\lambda X_i}] \\leq e^{\\sigma_i^2 \\lambda^2/2}\\)). Let \\(S_n = \\sum_{i=1}^n X_i\\). Then for all \\(t \\geq 0\\):</p>
                        \\[\\mathbb{P}(|S_n| \\geq t) \\leq 2\\exp\\left(-\\frac{t^2}{2\\sum_{i=1}^n \\sigma_i^2}\\right).\\]
                        <p>In other words, \\(S_n\\) is sub-Gaussian with parameter \\(\\sigma^2 = \\sum_{i=1}^n \\sigma_i^2\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>By independence and the sub-Gaussian condition:</p>
                        \\[\\mathbb{E}[e^{\\lambda S_n}] = \\prod_{i=1}^n \\mathbb{E}[e^{\\lambda X_i}] \\leq \\prod_{i=1}^n e^{\\sigma_i^2 \\lambda^2/2} = \\exp\\left(\\frac{\\lambda^2}{2}\\sum_{i=1}^n \\sigma_i^2\\right).\\]
                        <p>Thus \\(S_n\\) is sub-Gaussian with parameter \\(\\sigma^2 = \\sum_i \\sigma_i^2\\). The tail bound follows from the Chernoff method (implication (1) \\(\\Rightarrow\\) (2) in Theorem 1.15).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 1.20</div>
                    <div class="env-body">
                        <p>If \\(X_1, \\ldots, X_n\\) are i.i.d. sub-Gaussian with parameter \\(\\sigma^2\\) and mean \\(\\mu\\), then</p>
                        \\[\\mathbb{P}(|\\bar{X}_n - \\mu| \\geq t) \\leq 2\\exp\\left(-\\frac{nt^2}{2\\sigma^2}\\right).\\]
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Sub-Gaussian Parameter vs. Variance)</div>
                    <div class="env-body">
                        <p>The sub-Gaussian parameter \\(\\sigma^2\\) is always at least \\(\\operatorname{Var}(X)\\) (since the MGF condition implies \\(\\operatorname{Var}(X) \\leq \\sigma^2\\) by expanding to second order). For Gaussians, \\(\\sigma^2 = \\operatorname{Var}(X)\\), so the bound is tight. For bounded random variables, Hoeffding's lemma gives \\(\\sigma^2 = (b-a)^2/4\\), which can be much larger than the true variance \\(\\operatorname{Var}(X)\\). This looseness is the price of distribution-free bounds.</p>
                    </div>
                </div>

                <h3>Maximal Inequalities</h3>

                <p>In high-dimensional statistics, we often need to control the maximum of many random variables simultaneously. If \\(X_1, \\ldots, X_N\\) are (not necessarily independent) sub-Gaussian, how large can \\(\\max_i X_i\\) be?</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.21 (Maximal Inequality for Sub-Gaussians)</div>
                    <div class="env-body">
                        <p>Let \\(X_1, \\ldots, X_N\\) be (not necessarily independent) sub-Gaussian random variables with \\(\\|X_i\\|_{\\psi_2} \\leq K\\). Then</p>
                        \\[\\mathbb{E}\\left[\\max_{1 \\leq i \\leq N} X_i\\right] \\leq CK\\sqrt{\\log N}\\]
                        <p>for a universal constant \\(C\\). Moreover, for every \\(t \\geq 0\\),</p>
                        \\[\\mathbb{P}\\left(\\max_{1 \\leq i \\leq N} X_i \\geq CK\\sqrt{\\log N} + t\\right) \\leq 2\\exp\\left(-\\frac{t^2}{2K^2}\\right).\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>For any \\(\\lambda &gt; 0\\), using the standard trick \\(\\max_i a_i \\leq \\frac{1}{\\lambda}\\log\\sum_i e^{\\lambda a_i}\\):</p>
                        \\[\\mathbb{E}\\left[\\max_{1 \\leq i \\leq N} X_i\\right] \\leq \\frac{1}{\\lambda}\\log\\left(\\sum_{i=1}^N \\mathbb{E}[e^{\\lambda X_i}]\\right) \\leq \\frac{1}{\\lambda}\\log\\left(N \\cdot e^{CK^2\\lambda^2/2}\\right) = \\frac{\\log N}{\\lambda} + \\frac{CK^2 \\lambda}{2}.\\]
                        <p>Optimizing over \\(\\lambda\\): setting \\(\\lambda = \\sqrt{2\\log N}/(CK)\\) (assuming \\(N \\geq 2\\)) yields</p>
                        \\[\\mathbb{E}\\left[\\max_{1 \\leq i \\leq N} X_i\\right] \\leq CK\\sqrt{2\\log N}.\\]
                        <p>The tail bound follows by combining this with the sub-Gaussian tail of \\(\\max_i X_i - \\mathbb{E}[\\max_i X_i]\\), which can be bounded via the union bound:</p>
                        \\[\\mathbb{P}\\left(\\max_i X_i \\geq u\\right) = \\mathbb{P}\\left(\\bigcup_i \\{X_i \\geq u\\}\\right) \\leq \\sum_{i=1}^N \\mathbb{P}(X_i \\geq u) \\leq 2N\\exp\\left(-\\frac{u^2}{2K^2}\\right).\\]
                        <p>Setting \\(u = CK\\sqrt{\\log N} + t\\) and simplifying gives the result.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: The \\(\\sqrt{\\log N}\\) Scale</div>
                    <div class="env-body">
                        <p>The maximal inequality reveals a fundamental fact: the maximum of \\(N\\) sub-Gaussian random variables grows as \\(\\sqrt{\\log N}\\), not \\(\\sqrt{N}\\) or \\(N\\). This is because sub-Gaussian tails decay so rapidly that even taking the maximum over exponentially many variables (\\(N = e^{cn}\\)) only inflates the scale by \\(\\sqrt{n}\\). This "logarithmic price of the union bound" is a recurring theme in high-dimensional statistics.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 1.22 (Maximum of i.i.d. Gaussians)</div>
                    <div class="env-body">
                        <p>Let \\(X_1, \\ldots, X_N \\sim N(0, 1)\\) independently. Then \\(\\mathbb{E}[\\max_i X_i] \\sim \\sqrt{2 \\log N}\\) as \\(N \\to \\infty\\). More precisely,</p>
                        \\[\\sqrt{2\\log N} - \\frac{\\log\\log N + \\log(4\\pi)}{2\\sqrt{2\\log N}} \\leq \\mathbb{E}[\\max_i X_i] \\leq \\sqrt{2\\log N}.\\]
                        <p>The upper bound is exactly the maximal inequality; the lower bound shows it is essentially tight. The maximum concentrates in an interval of width \\(O(1/\\sqrt{\\log N})\\) around \\(\\sqrt{2\\log N}\\), an extremely strong concentration phenomenon.</p>
                    </div>
                </div>

                <h3>Application: Uniform Convergence of Empirical Means</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.23 (Uniform Hoeffding Bound)</div>
                    <div class="env-body">
                        <p>Let \\(X_1, \\ldots, X_n\\) be i.i.d. random vectors in \\(\\mathbb{R}^p\\) with \\(\\mathbb{E}[X] = \\mu\\). Suppose each coordinate satisfies \\(X_{ij} \\in [a, b]\\). Then</p>
                        \\[\\mathbb{E}\\left[\\max_{1 \\leq j \\leq p} |\\bar{X}_{n,j} - \\mu_j|\\right] \\leq (b - a)\\sqrt{\\frac{2\\log(2p)}{n}}.\\]
                        <p>In particular, if \\(p = p(n) \\leq e^{cn}\\) for some \\(c &gt; 0\\), then \\(\\max_j |\\bar{X}_{n,j} - \\mu_j| \\to 0\\) as \\(n \\to \\infty\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>For each coordinate \\(j\\), by Hoeffding's inequality, \\(\\bar{X}_{n,j} - \\mu_j\\) is sub-Gaussian with parameter \\((b-a)^2/(4n)\\), so \\(\\|\\bar{X}_{n,j} - \\mu_j\\|_{\\psi_2} \\leq C(b-a)/\\sqrt{n}\\).</p>
                        <p>We need to control \\(\\max_j |\\bar{X}_{n,j} - \\mu_j| = \\max_j \\max(\\bar{X}_{n,j} - \\mu_j, -(\\bar{X}_{n,j} - \\mu_j))\\). Apply the maximal inequality (Theorem 1.21) to the \\(2p\\) random variables \\(\\{\\pm(\\bar{X}_{n,j} - \\mu_j)\\}_{j=1}^p\\):</p>
                        \\[\\mathbb{E}\\left[\\max_j |\\bar{X}_{n,j} - \\mu_j|\\right] \\leq C \\cdot \\frac{b-a}{\\sqrt{n}} \\cdot \\sqrt{\\log(2p)} = (b-a)\\sqrt{\\frac{C^2 \\log(2p)}{n}}.\\]
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (The High-Dimensional Regime)</div>
                    <div class="env-body">
                        <p>Theorem 1.23 is one of the key motivations for studying concentration inequalities: it allows us to perform \\(p\\) simultaneous statistical estimations with only a \\(\\sqrt{\\log p}\\) price for multiplicity. This is dramatically better than a naive Bonferroni correction (which would require \\(n \\sim p\\) for consistent estimation). The condition \\(p \\leq e^{cn}\\) means we can handle exponentially many parameters relative to the sample size -- the very heart of high-dimensional statistics.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-maximal-ineq"></div>
            `,
            visualizations: [
                {
                    id: 'viz-maximal-ineq',
                    title: 'Sub-Gaussian Tail Comparison and Maximal Inequality',
                    description: 'Overlay Gaussian tail, Hoeffding bound, and Chebyshev bound for bounded random variables. Also shows how \\(\\mathbb{E}[\\max_i X_i]\\) grows with \\(N\\).',
                    setup: function(container, controls) {
                        var width = Math.min(container.clientWidth - 32, 700);
                        var height = Math.round(width * 0.6);
                        var canvas = document.createElement('canvas');
                        var dpr = window.devicePixelRatio || 1;
                        canvas.width = width * dpr;
                        canvas.height = height * dpr;
                        canvas.style.width = width + 'px';
                        canvas.style.height = height + 'px';
                        var ctx = canvas.getContext('2d');
                        ctx.scale(dpr, dpr);
                        container.appendChild(canvas);

                        var sigma = 1.0;
                        VizEngine.createSlider(controls, 'sigma', 0.5, 3, sigma, 0.1, function(v) { sigma = v; draw(); });

                        function draw() {
                            var padL = 55, padR = 20, padT = 30, padB = 50;
                            var plotW = width - padL - padR;
                            var plotH = height - padT - padB;

                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, width, height);

                            // This plot shows E[max X_i] vs N for N sub-Gaussians
                            var NMax = 1000;

                            // Grid
                            ctx.strokeStyle = '#1a1a4066';
                            ctx.lineWidth = 0.5;
                            for (var gi = 0; gi <= 5; gi++) {
                                var gy = padT + plotH * gi / 5;
                                ctx.beginPath(); ctx.moveTo(padL, gy); ctx.lineTo(padL + plotW, gy); ctx.stroke();
                            }
                            for (var gj = 0; gj <= 10; gj++) {
                                var gx = padL + plotW * gj / 10;
                                ctx.beginPath(); ctx.moveTo(gx, padT); ctx.lineTo(gx, padT + plotH); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = '#4a4a7a';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(padL, padT + plotH); ctx.lineTo(padL + plotW, padT + plotH); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, padT + plotH); ctx.stroke();

                            // y-axis: E[max X_i]
                            var yMax = sigma * Math.sqrt(2 * Math.log(NMax)) * 1.3;

                            function toX(N) { return padL + plotW * Math.log(N + 1) / Math.log(NMax + 1); }
                            function toY(v) { return padT + plotH * (1 - v / yMax); }

                            // sqrt(2 log N) curve (theoretical bound)
                            ctx.strokeStyle = '#f0883e';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var N = 2; N <= NMax; N += 1) {
                                var val = sigma * Math.sqrt(2 * Math.log(N));
                                var px = toX(N);
                                var py = toY(val);
                                if (N === 2) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Simulated E[max X_i] using Monte Carlo
                            ctx.strokeStyle = '#58a6ff';
                            ctx.lineWidth = 2;
                            ctx.beginPath();

                            // Precompute for several N values
                            function mulberry32(a) {
                                return function() {
                                    a |= 0; a = a + 0x6D2B79F5 | 0;
                                    var t = Math.imul(a ^ a >>> 15, 1 | a);
                                    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
                                    return ((t ^ t >>> 14) >>> 0) / 4294967296;
                                };
                            }
                            // Box-Muller
                            function gaussRng(rng) {
                                var u1 = rng(), u2 = rng();
                                return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * sigma;
                            }

                            var nSim = 2000;
                            var rng = mulberry32(12345);
                            var nPoints = [2,3,5,8,10,15,20,30,50,80,100,150,200,300,500,800,1000];
                            var started = false;
                            for (var ni = 0; ni < nPoints.length; ni++) {
                                var NN = nPoints[ni];
                                var sumMax = 0;
                                for (var trial = 0; trial < nSim; trial++) {
                                    var mx = -Infinity;
                                    for (var jj = 0; jj < NN; jj++) {
                                        var g = gaussRng(rng);
                                        if (g > mx) mx = g;
                                    }
                                    sumMax += mx;
                                }
                                var eMax = sumMax / nSim;
                                var px2 = toX(NN);
                                var py2 = toY(eMax);
                                if (!started) { ctx.moveTo(px2, py2); started = true; }
                                else ctx.lineTo(px2, py2);

                                // Also draw points
                                ctx.fillStyle = '#58a6ff';
                                ctx.beginPath(); ctx.arc(px2, py2, 3, 0, Math.PI * 2); ctx.fill();
                            }
                            ctx.strokeStyle = '#58a6ff';
                            ctx.lineWidth = 2;
                            ctx.stroke();

                            // sqrt(2 log N) - correction term (lower bound)
                            ctx.strokeStyle = '#3fb9a0';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([5, 3]);
                            ctx.beginPath();
                            for (var N2 = 3; N2 <= NMax; N2 += 1) {
                                var logN = Math.log(N2);
                                var val2 = sigma * (Math.sqrt(2 * logN) - (Math.log(logN) + Math.log(4 * Math.PI)) / (2 * Math.sqrt(2 * logN)));
                                var px3 = toX(N2);
                                var py3 = toY(val2);
                                if (N2 === 3) ctx.moveTo(px3, py3);
                                else ctx.lineTo(px3, py3);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Axis labels
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            [2, 10, 50, 100, 500, 1000].forEach(function(nv) {
                                ctx.fillText(nv.toString(), toX(nv), padT + plotH + 6);
                            });
                            ctx.fillText('N (number of variables, log scale)', padL + plotW / 2, padT + plotH + 28);

                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var yi = 0; yi <= 5; yi++) {
                                var yv = yMax * yi / 5;
                                ctx.fillText(yv.toFixed(1), padL - 5, toY(yv));
                            }

                            // Legend
                            var legX = padL + 12;
                            var legY = padT + 8;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            var legItems = [
                                {label: 'Simulated E[max Xi]', color: '#58a6ff', dashed: false},
                                {label: 'Upper: sigma sqrt(2 log N)', color: '#f0883e', dashed: false},
                                {label: 'Lower (with correction)', color: '#3fb9a0', dashed: true}
                            ];
                            legItems.forEach(function(item, idx) {
                                var iy = legY + idx * 16;
                                ctx.strokeStyle = item.color;
                                ctx.lineWidth = 2;
                                if (item.dashed) ctx.setLineDash([4, 3]);
                                ctx.beginPath(); ctx.moveTo(legX, iy); ctx.lineTo(legX + 20, iy); ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = item.color;
                                ctx.fillText(item.label, legX + 26, iy + 1);
                            });

                            // Title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'top';
                            ctx.fillText('E[max_i X_i] for X_i ~ N(0, ' + sigma.toFixed(1) + '^2)', padL + plotW, padT - 22);
                        }

                        draw();
                        return { stopAnimation: function() {} };
                    }
                }
            ],
            exercises: [
                {
                    question: '<strong>Exercise 1.7.</strong> (Symmetrization and Rademacher averages) Let \\(X_1, \\ldots, X_n\\) be i.i.d. with values in \\([0, 1]\\) and \\(\\varepsilon_1, \\ldots, \\varepsilon_n\\) be independent Rademacher variables (independent of the \\(X_i\\)). Prove that the <em>Rademacher average</em> \\(R_n = \\frac{1}{n}\\sum_{i=1}^n \\varepsilon_i X_i\\) satisfies:\\[\\mathbb{P}(|R_n| \\geq t \\mid X_1, \\ldots, X_n) \\leq 2\\exp\\left(-\\frac{2n^2 t^2}{\\sum_{i=1}^n X_i^2}\\right).\\]Then use this to show \\(\\mathbb{E}[|R_n|] \\leq \\sqrt{\\frac{\\pi}{2n}}\\).',
                    hint: 'Conditionally on \\(X_1, \\ldots, X_n\\), the sum \\(\\sum_i \\varepsilon_i X_i\\) is a sum of independent bounded variables \\(\\varepsilon_i X_i \\in [-X_i, X_i]\\). Apply Hoeffding with ranges \\(2X_i\\). For the second part, integrate the tail bound and use \\(\\sum X_i^2 \\leq n\\).',
                    solution: '<p>Conditionally on \\(X = (X_1, \\ldots, X_n)\\), the random variable \\(\\varepsilon_i X_i\\) is bounded in \\([-X_i, X_i]\\) with mean zero. The \\(\\varepsilon_i X_i\\) are conditionally independent. By Hoeffding:</p>\\[\\mathbb{P}\\left(\\left|\\sum_i \\varepsilon_i X_i\\right| \\geq s \\mid X\\right) \\leq 2\\exp\\left(-\\frac{2s^2}{\\sum_i (2X_i)^2}\\right) = 2\\exp\\left(-\\frac{s^2}{2\\sum_i X_i^2}\\right).\\]<p>Setting \\(s = nt\\) gives the stated bound. For the expectation: using \\(\\sum X_i^2 \\leq n\\) (since \\(X_i \\in [0,1]\\)):</p>\\[\\mathbb{E}[|R_n|] = \\mathbb{E}\\left[\\frac{1}{n}\\left|\\sum_i \\varepsilon_i X_i\\right|\\right] \\leq \\frac{1}{n}\\sqrt{\\mathbb{E}\\left[\\left(\\sum_i \\varepsilon_i X_i\\right)^2\\right]} = \\frac{1}{n}\\sqrt{\\sum_i \\mathbb{E}[X_i^2]} \\leq \\frac{1}{\\sqrt{n}}.\\]<p>The sharper bound \\(\\sqrt{\\pi/(2n)}\\) follows by integrating the Gaussian-type tail: \\(\\mathbb{E}[|Z|] = \\sqrt{2/\\pi}\\) for \\(Z \\sim N(0,1)\\), and \\(R_n\\) behaves like a Gaussian with variance \\(\\leq 1/n\\).</p>'
                },
                {
                    question: '<strong>Exercise 1.8.</strong> (Maximal inequality -- sharpness) Construct a sequence of random variables \\(X_1, \\ldots, X_N\\) (which may be dependent) with \\(\\|X_i\\|_{\\psi_2} \\leq 1\\) such that \\(\\mathbb{E}[\\max_i X_i] \\geq c\\sqrt{\\log N}\\) for a universal constant \\(c &gt; 0\\). Conclude that the \\(\\sqrt{\\log N}\\) rate in Theorem 1.21 is optimal.',
                    hint: 'Take \\(X_1, \\ldots, X_N\\) to be i.i.d. \\(N(0, 1)\\). Use the known lower bound on \\(\\mathbb{E}[\\max_i g_i]\\) for i.i.d. standard Gaussians.',
                    solution: '<p>Let \\(X_1, \\ldots, X_N \\sim N(0, 1)\\) i.i.d. Then \\(\\|X_i\\|_{\\psi_2} = C\\) for a universal constant. The classical result on Gaussian maxima gives:</p>\\[\\mathbb{E}[\\max_i X_i] \\geq \\sqrt{2\\log N} - \\frac{\\log\\log N + \\log(4\\pi)}{2\\sqrt{2\\log N}} \\geq c\\sqrt{\\log N}\\]<p>for \\(N \\geq 2\\) and a universal \\(c &gt; 0\\). This can be proved by the second moment method or by direct calculation with the Gaussian density. Since the upper bound from Theorem 1.21 is \\(CK\\sqrt{\\log N}\\) and the lower bound is \\(cK\\sqrt{\\log N}\\) (with \\(K = \\|X_i\\|_{\\psi_2}\\)), the \\(\\sqrt{\\log N}\\) rate is sharp.</p>'
                }
            ]
        }
    ]
});
