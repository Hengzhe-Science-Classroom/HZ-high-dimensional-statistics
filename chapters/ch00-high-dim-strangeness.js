window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch00',
    number: 0,
    title: 'The Strangeness of High Dimensions',
    subtitle: 'Why high-dimensional statistics is fundamentally different',
    sections: [
        // ============================================================
        // Section 1: Welcome to High Dimensions
        // ============================================================
        {
            id: 'ch00-sec01',
            title: 'Welcome to High Dimensions',
            content: `
                <h2>Welcome to High Dimensions</h2>

                <p>Classical statistics was built for a world where the number of observations \\(n\\) vastly exceeds the number of parameters \\(p\\). The central limit theorem, maximum likelihood theory, and chi-squared goodness-of-fit tests all rely, explicitly or implicitly, on the regime \\(n \\to \\infty\\) with \\(p\\) held fixed. In such settings, the statistician has abundant data relative to the complexity of the model, and the familiar asymptotic machinery works beautifully.</p>

                <p>Modern data has shattered this assumption. In genomics, we may observe \\(n = 200\\) patients but measure \\(p = 20{,}000\\) gene expression levels. In neuroimaging, a single brain scan produces \\(p \\approx 10^5\\) voxels from \\(n \\approx 50\\) subjects. In natural language processing, document representations live in spaces of dimension \\(p \\approx 10^4\\) or higher. The defining feature of modern high-dimensional statistics is the regime where \\(p\\) is comparable to or much larger than \\(n\\).</p>

                <div class="env-block warning">
                    <div class="env-title">The High-Dimensional Regime</div>
                    <div class="env-body">
                        <p>When \\(p \\gg n\\), most classical statistical procedures <strong>fail catastrophically</strong>. The sample covariance matrix is singular. Ordinary least squares has infinitely many solutions. Maximum likelihood estimators may not exist, and if they do, they are wildly inconsistent. The classical \\(\\chi^2\\) approximations break down. We need fundamentally different tools.</p>
                    </div>
                </div>

                <p>This chapter introduces the geometric and probabilistic phenomena that make high-dimensional statistics so different from its classical counterpart. These phenomena are not mere technicalities; they represent a genuine shift in mathematical structure that necessitates entirely new frameworks for estimation, testing, and inference.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.1 (High-Dimensional Setting)</div>
                    <div class="env-body">
                        <p>We say that a statistical problem is <strong>high-dimensional</strong> if the ambient dimension \\(p\\) grows with (and possibly exceeds) the sample size \\(n\\). More precisely, we work in asymptotic frameworks where \\(p = p(n) \\to \\infty\\) as \\(n \\to \\infty\\), and often \\(p(n) / n \\to \\gamma \\in (0, \\infty]\\).</p>
                    </div>
                </div>

                <p>There are several distinct asymptotic regimes of interest:</p>

                <ul>
                    <li><strong>Classical regime:</strong> \\(p\\) fixed, \\(n \\to \\infty\\). Standard asymptotics apply.</li>
                    <li><strong>Proportional regime:</strong> \\(p/n \\to \\gamma \\in (0, \\infty)\\). Random matrix theory is the natural tool. The Marchenko-Pastur law governs the spectrum of the sample covariance.</li>
                    <li><strong>High-dimensional regime:</strong> \\(p \\gg n\\), possibly \\(p = e^{n^\\alpha}\\). Sparsity or other structural assumptions are essential. Non-asymptotic methods dominate.</li>
                </ul>

                <div class="env-block example">
                    <div class="env-title">Example 0.1 (Failure of OLS in High Dimensions)</div>
                    <div class="env-body">
                        <p>Consider the linear model \\(Y = X\\beta^* + \\varepsilon\\) where \\(X \\in \\mathbb{R}^{n \\times p}\\), \\(\\beta^* \\in \\mathbb{R}^p\\), and \\(\\varepsilon \\sim N(0, \\sigma^2 I_n)\\). The OLS estimator is \\(\\hat{\\beta}_{\\text{OLS}} = (X^\\top X)^{-1} X^\\top Y\\).</p>
                        <p>When \\(p &gt; n\\), the matrix \\(X^\\top X \\in \\mathbb{R}^{p \\times p}\\) has rank at most \\(n &lt; p\\), so it is <strong>singular</strong>. The OLS estimator does not exist. Even when \\(p\\) is slightly less than \\(n\\), the condition number of \\(X^\\top X\\) explodes, making the estimator numerically unstable and statistically inconsistent:</p>
                        \\[\\mathbb{E}\\|\\hat{\\beta}_{\\text{OLS}} - \\beta^*\\|_2^2 = \\sigma^2 \\operatorname{tr}\\bigl((X^\\top X)^{-1}\\bigr) \\to \\infty \\quad \\text{as } p/n \\to 1^-.\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Why Does Classical Statistics Break?</div>
                    <div class="env-body">
                        <p>In low dimensions, having many observations means we can estimate each parameter direction well. Think of fitting a line (\\(p = 2\\)) through 1000 points: the line is very well-determined. But when \\(p\\) is comparable to \\(n\\), we have roughly one observation per dimension. The data cloud is so sparse in the ambient space that there is no hope of estimating the full parameter vector without additional structure. The key insight of modern high-dimensional statistics is that <strong>structural assumptions</strong> (sparsity, low rank, smoothness) can rescue us.</p>
                    </div>
                </div>

                <p>The three pillars of this course are:</p>
                <ol>
                    <li><strong>Concentration inequalities</strong> (Chapters 1--4): controlling the fluctuations of random objects in high dimensions.</li>
                    <li><strong>Structural estimation</strong> (Chapters 8--17): exploiting sparsity, low-rank structure, and other constraints to achieve consistent estimation when \\(p \\gg n\\).</li>
                    <li><strong>Minimax theory</strong> (Chapters 18--19): establishing fundamental limits on what any estimator can achieve.</li>
                </ol>

                <p>Before diving into the technical machinery, we spend this chapter building geometric and probabilistic intuition for why high-dimensional spaces behave so counterintuitively.</p>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Consider the linear model \\(Y = X\\beta^* + \\varepsilon\\) with \\(X \\in \\mathbb{R}^{n \\times p}\\) having i.i.d. \\(N(0,1)\\) entries and \\(\\varepsilon \\sim N(0, \\sigma^2 I_n)\\). Show that when \\(p &lt; n\\), the risk of the OLS estimator satisfies \\(\\mathbb{E}\\|\\hat{\\beta}_{\\text{OLS}} - \\beta^*\\|_2^2 = \\sigma^2 p / (n - p - 1)\\) (for \\(n &gt; p + 1\\)).',
                    hint: 'Use the fact that \\((X^\\top X)^{-1}\\) follows an inverse Wishart distribution. The expected trace of the inverse of a Wishart matrix \\(W_p(n, I_p)\\) is \\(p/(n-p-1)\\) when \\(n &gt; p + 1\\).',
                    solution: 'We have \\(\\hat{\\beta}_{\\text{OLS}} - \\beta^* = (X^\\top X)^{-1} X^\\top \\varepsilon\\). Thus \\(\\mathbb{E}\\|\\hat{\\beta}_{\\text{OLS}} - \\beta^*\\|_2^2 = \\sigma^2 \\mathbb{E}[\\operatorname{tr}((X^\\top X)^{-1})]\\). Since the rows of \\(X\\) are i.i.d. \\(N(0, I_p)\\), we have \\(X^\\top X \\sim W_p(n, I_p)\\) (Wishart distribution). For \\(n &gt; p + 1\\), the expectation of the inverse is \\(\\mathbb{E}[(X^\\top X)^{-1}] = \\frac{1}{n-p-1} I_p\\). Taking the trace: \\(\\mathbb{E}[\\operatorname{tr}((X^\\top X)^{-1})] = p/(n-p-1)\\). Therefore \\(\\mathbb{E}\\|\\hat{\\beta}_{\\text{OLS}} - \\beta^*\\|_2^2 = \\sigma^2 p/(n-p-1)\\). This diverges as \\(p \\to n - 1\\), confirming that OLS breaks in the proportional regime.'
                }
            ]
        },
        // ============================================================
        // Section 2: The Curse of Dimensionality
        // ============================================================
        {
            id: 'ch00-sec02',
            title: 'The Curse of Dimensionality',
            content: `
                <h2>The Curse of Dimensionality</h2>

                <p>The term "curse of dimensionality" was coined by Richard Bellman in the 1960s to describe the exponential growth of computational cost in dynamic programming as the state-space dimension increases. In statistics and probability, it refers to a family of phenomena where high-dimensional geometry defies low-dimensional intuition. We examine three manifestations: volume ratios, distance concentration, and the failure of nearest-neighbor methods.</p>

                <h3>Volume Ratios</h3>

                <p>Consider the unit ball \\(B_2^d = \\{x \\in \\mathbb{R}^d : \\|x\\|_2 \\le 1\\}\\) inscribed in the cube \\([-1, 1]^d\\). In \\(d = 2\\), the ball (a disk) occupies about 78.5% of the square. What happens as \\(d\\) grows?</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.1 (Volume of the Unit Ball)</div>
                    <div class="env-body">
                        <p>The volume of the Euclidean unit ball \\(B_2^d\\) in \\(\\mathbb{R}^d\\) is</p>
                        \\[\\operatorname{vol}(B_2^d) = \\frac{\\pi^{d/2}}{\\Gamma(d/2 + 1)},\\]
                        <p>where \\(\\Gamma\\) is the gamma function. The volume of the cube \\([-1, 1]^d\\) is \\(2^d\\). Their ratio satisfies</p>
                        \\[\\frac{\\operatorname{vol}(B_2^d)}{\\operatorname{vol}([-1,1]^d)} = \\frac{\\pi^{d/2}}{2^d \\,\\Gamma(d/2 + 1)} \\;\\longrightarrow\\; 0 \\quad \\text{as } d \\to \\infty.\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Rate of Decay)</div>
                    <div class="env-body">
                        <p>By Stirling's approximation, \\(\\Gamma(d/2 + 1) \\sim \\sqrt{\\pi d}\\,(d/(2e))^{d/2}\\). Therefore</p>
                        \\[\\frac{\\pi^{d/2}}{\\Gamma(d/2 + 1)} \\sim \\frac{\\pi^{d/2}}{\\sqrt{\\pi d}\\,(d/(2e))^{d/2}} = \\frac{1}{\\sqrt{\\pi d}} \\left(\\frac{2\\pi e}{d}\\right)^{d/2}.\\]
                        <p>For \\(d &gt; 2\\pi e \\approx 17.1\\), the base \\(2\\pi e / d &lt; 1\\), so the expression decays exponentially. Dividing by \\(2^d\\) only makes it decay faster:</p>
                        \\[\\frac{\\operatorname{vol}(B_2^d)}{2^d} \\sim \\frac{1}{\\sqrt{\\pi d}} \\left(\\frac{\\pi e}{2d}\\right)^{d/2} \\to 0 \\quad \\text{super-exponentially.}\\]
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: The Corners Win</div>
                    <div class="env-body">
                        <p>In high dimensions, the cube has \\(2^d\\) corners, each at distance \\(\\sqrt{d}\\) from the origin (far outside the unit ball). The vast majority of the cube's volume is concentrated in these exponentially many corners. The inscribed ball, constrained to stay within distance 1 of the origin, occupies a vanishingly small fraction of the cube.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-curse-dim"></div>

                <h3>Distance Concentration</h3>

                <p>Another manifestation of the curse is that distances between random points become nearly indistinguishable. This is catastrophic for methods like \\(k\\)-nearest neighbors that rely on meaningful distance rankings.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.2 (Distance Concentration for Uniform Points)</div>
                    <div class="env-body">
                        <p>Let \\(X_1, \\ldots, X_n\\) be i.i.d. uniform on \\([0, 1]^d\\). For any fixed point \\(q \\in [0, 1]^d\\), define \\(D_{\\max} = \\max_i \\|X_i - q\\|_2\\) and \\(D_{\\min} = \\min_i \\|X_i - q\\|_2\\). Then as \\(d \\to \\infty\\) (with \\(n\\) fixed),</p>
                        \\[\\frac{D_{\\max} - D_{\\min}}{D_{\\min}} \\;\\xrightarrow{\\;p\\;}\\; 0.\\]
                        <p>That is, the relative difference between the nearest and farthest neighbors vanishes.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>For a single random point \\(X\\) uniform on \\([0,1]^d\\), the squared distance \\(\\|X - q\\|_2^2 = \\sum_{j=1}^d (X_j - q_j)^2\\) is a sum of \\(d\\) independent bounded random variables. Each term has mean \\(\\mu_j\\) and variance \\(\\sigma_j^2\\) bounded by \\(1/4\\). By the law of large numbers,</p>
                        \\[\\frac{\\|X - q\\|_2^2}{d} \\;\\xrightarrow{\\;p\\;}\\; \\bar{\\mu} = \\frac{1}{d}\\sum_{j=1}^d \\mu_j.\\]
                        <p>So \\(\\|X - q\\|_2 \\approx \\sqrt{d\\bar{\\mu}}\\) for all \\(n\\) points simultaneously. The fluctuations of each squared distance are of order \\(O(\\sqrt{d})\\), so the relative fluctuations of the distance are \\(O(d^{-1/2}) \\to 0\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark 0.1</div>
                    <div class="env-body">
                        <p>The distance concentration phenomenon does <strong>not</strong> mean that nearest-neighbor methods are useless in high dimensions. Rather, it means that they require much stronger structural assumptions. If the data lie near a low-dimensional manifold in \\(\\mathbb{R}^d\\), then the <em>intrinsic</em> dimension rather than the ambient dimension governs the behavior. This insight underlies manifold learning and dimensionality reduction techniques.</p>
                    </div>
                </div>

                <h3>Sparsity of Sampling</h3>

                <p>How many data points do we need to "fill" a region of \\(\\mathbb{R}^d\\)? If we partition \\([0,1]^d\\) into a grid with \\(m\\) bins per dimension, we get \\(m^d\\) cells. To have at least one point per cell (on average), we need \\(n \\ge m^d\\). Even with \\(m = 2\\) (a very coarse grid), we need \\(n \\ge 2^d\\) points. In \\(d = 100\\), this is \\(n \\ge 2^{100} \\approx 10^{30}\\), far exceeding any conceivable dataset.</p>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 0.1 (Sample Complexity of Nonparametric Estimation)</div>
                    <div class="env-body">
                        <p>For nonparametric regression over a \\(\\beta\\)-smooth function class on \\([0,1]^d\\), the minimax optimal rate is</p>
                        \\[\\inf_{\\hat{f}} \\sup_{f \\in \\mathcal{F}_\\beta} \\mathbb{E}\\|\\hat{f} - f\\|_2^2 \\;\\asymp\\; n^{-2\\beta/(2\\beta + d)}.\\]
                        <p>This rate degrades dramatically as \\(d\\) grows. For fixed smoothness \\(\\beta\\), the rate approaches \\(n^0 = 1\\) as \\(d \\to \\infty\\), meaning no estimator can learn anything.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: The Blessing of Structure</div>
                    <div class="env-body">
                        <p>The curse of dimensionality is not a death sentence. It tells us that <strong>assumption-free</strong> estimation is impossible in high dimensions. The way forward is to impose structural assumptions on the parameter space: sparsity (\\(\\beta^*\\) has few nonzero entries), low rank (the covariance matrix has low effective dimension), or manifold structure (the data lie near a low-dimensional surface). The entire edifice of high-dimensional statistics rests on the interplay between <em>structural assumptions</em> and <em>regularized estimators</em> that exploit them.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-curse-dim',
                    title: 'The Curse of Dimensionality: Ball-to-Cube Volume Ratio',
                    description: 'Watch how the ratio vol(ball)/vol(cube) decays as dimension d grows. The inscribed Euclidean ball becomes a vanishingly small fraction of the surrounding cube.',
                    setup: function(body, controls) {
                        // Create canvas manually for bar chart (no coordinate system needed)
                        var width = Math.min(body.clientWidth || 560, 700);
                        var height = Math.round(width * 0.6);
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
                            grid: '#1a1a40', red: '#f85149', green: '#3fb950'
                        };

                        var maxD = 50;
                        var currentD = 20;

                        // Compute log-gamma using Stirling for large values, exact for small
                        function logGamma(x) {
                            if (x <= 0) return Infinity;
                            if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - logGamma(1 - x);
                            x -= 1;
                            var g = 7;
                            var c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
                                771.32342877765313, -176.61502916214059, 12.507343278686905,
                                -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
                            var sum = c[0];
                            for (var i = 1; i < g + 2; i++) sum += c[i] / (x + i);
                            var t = x + g + 0.5;
                            return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(sum);
                        }

                        function volumeRatio(d) {
                            // vol(B_2^d) / vol([-1,1]^d) = pi^(d/2) / (2^d * Gamma(d/2 + 1))
                            var logRatio = (d / 2) * Math.log(Math.PI) - d * Math.log(2) - logGamma(d / 2 + 1);
                            return Math.exp(logRatio);
                        }

                        function draw() {
                            ctx.fillStyle = colors.bg;
                            ctx.fillRect(0, 0, width, height);

                            var marginLeft = 70;
                            var marginRight = 30;
                            var marginTop = 40;
                            var marginBottom = 50;
                            var plotW = width - marginLeft - marginRight;
                            var plotH = height - marginTop - marginBottom;

                            // Title
                            ctx.fillStyle = colors.white;
                            ctx.font = 'bold 14px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('vol(B\u2082\u1D48) / vol([-1,1]\u1D48) as d grows', width / 2, 20);

                            // Compute ratios
                            var ratios = [];
                            for (var d = 1; d <= currentD; d++) {
                                ratios.push(volumeRatio(d));
                            }
                            var maxRatio = Math.max.apply(null, ratios);
                            maxRatio = Math.max(maxRatio, 0.01);

                            // Draw grid lines
                            ctx.strokeStyle = colors.grid;
                            ctx.lineWidth = 0.5;
                            var nGrid = 5;
                            for (var i = 0; i <= nGrid; i++) {
                                var gy = marginTop + plotH - (i / nGrid) * plotH;
                                ctx.beginPath();
                                ctx.moveTo(marginLeft, gy);
                                ctx.lineTo(marginLeft + plotW, gy);
                                ctx.stroke();
                                // Y-axis labels
                                ctx.fillStyle = colors.text;
                                ctx.font = '11px -apple-system, sans-serif';
                                ctx.textAlign = 'right';
                                ctx.textBaseline = 'middle';
                                var val = (i / nGrid) * maxRatio;
                                ctx.fillText(val.toFixed(3), marginLeft - 8, gy);
                            }

                            // Draw bars
                            var barW = Math.max(2, (plotW / currentD) * 0.7);
                            var gap = plotW / currentD;

                            for (var d = 1; d <= currentD; d++) {
                                var ratio = ratios[d - 1];
                                var barH = (ratio / maxRatio) * plotH;
                                var x = marginLeft + (d - 0.5) * gap - barW / 2;
                                var y = marginTop + plotH - barH;

                                // Color gradient: blue -> red as dimension grows
                                var t = (d - 1) / Math.max(currentD - 1, 1);
                                var r = Math.round(88 + t * (248 - 88));
                                var g2 = Math.round(166 - t * (166 - 81));
                                var b = Math.round(255 - t * (255 - 73));
                                ctx.fillStyle = 'rgb(' + r + ',' + g2 + ',' + b + ')';
                                ctx.fillRect(x, y, barW, barH);

                                // X-axis labels (every few)
                                if (currentD <= 20 || d % 5 === 0 || d === 1) {
                                    ctx.fillStyle = colors.text;
                                    ctx.font = '10px -apple-system, sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'top';
                                    ctx.fillText(d, marginLeft + (d - 0.5) * gap, marginTop + plotH + 6);
                                }
                            }

                            // Axes
                            ctx.strokeStyle = colors.text;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(marginLeft, marginTop);
                            ctx.lineTo(marginLeft, marginTop + plotH);
                            ctx.lineTo(marginLeft + plotW, marginTop + plotH);
                            ctx.stroke();

                            // Axis labels
                            ctx.fillStyle = colors.text;
                            ctx.font = '12px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Dimension d', width / 2, height - 8);

                            // Current value annotation
                            var lastRatio = ratios[currentD - 1];
                            ctx.fillStyle = colors.orange;
                            ctx.font = 'bold 12px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('d = ' + currentD + ':  ratio = ' + lastRatio.toExponential(3), marginLeft + 10, marginTop + 16);
                        }

                        VizEngine.createSlider(controls, 'Max dimension d', 2, 50, currentD, 1, function(val) {
                            currentD = Math.round(val);
                            draw();
                        });

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that for a point \\(X\\) drawn uniformly at random from the unit cube \\([0,1]^d\\), the probability that \\(X\\) falls inside the inscribed ball of radius \\(1/2\\) (centered at \\((1/2, \\ldots, 1/2)\\)) goes to 0 as \\(d \\to \\infty\\).',
                    hint: 'The probability equals \\(\\operatorname{vol}(B_2^d(1/2)) / \\operatorname{vol}([0,1]^d) = (1/2)^d \\cdot \\operatorname{vol}(B_2^d)\\). Use the volume formula for the ball.',
                    solution: 'The inscribed ball has radius \\(1/2\\) and center \\((1/2,\\ldots,1/2)\\). Its volume is \\((1/2)^d \\operatorname{vol}(B_2^d) = \\frac{(\\pi/4)^{d/2}}{\\Gamma(d/2+1)}\\). Since the cube \\([0,1]^d\\) has volume 1, the probability equals this volume. By Stirling, \\(\\Gamma(d/2+1) \\sim \\sqrt{\\pi d}(d/(2e))^{d/2}\\), so the probability is approximately \\(\\frac{1}{\\sqrt{\\pi d}} \\left(\\frac{\\pi e}{2d}\\right)^{d/2}\\), which goes to 0 super-exponentially. For concrete values: \\(d=2\\): 78.5%, \\(d=10\\): 0.25%, \\(d=100\\): \\(\\approx 10^{-70}\\).'
                },
                {
                    question: 'Let \\(X_1, X_2\\) be independent and uniform on \\([0,1]^d\\). Compute \\(\\mathbb{E}[\\|X_1 - X_2\\|_2^2]\\) and \\(\\operatorname{Var}(\\|X_1 - X_2\\|_2^2)\\). Use these to show that \\(\\|X_1 - X_2\\|_2 / \\sqrt{d} \\to 1/\\sqrt{6}\\) in probability.',
                    hint: 'If \\(U\\) is uniform on \\([0,1]\\), then \\(\\mathbb{E}[U^2] = 1/3\\) and \\(\\operatorname{Var}(U^2) = 4/45\\). For the difference \\(D = U_1 - U_2\\), compute \\(\\mathbb{E}[D^2]\\) and \\(\\operatorname{Var}(D^2)\\).',
                    solution: 'Let \\(D_j = X_{1j} - X_{2j}\\). Each \\(D_j\\) has \\(\\mathbb{E}[D_j] = 0\\), \\(\\mathbb{E}[D_j^2] = 2\\operatorname{Var}(U) = 2 \\cdot 1/12 = 1/6\\), and \\(\\mathbb{E}[D_j^4] = 2\\mathbb{E}[U^4] + 6(\\mathbb{E}[U^2])^2 - 8\\mathbb{E}[U^3]\\mathbb{E}[U] + \\ldots\\). A direct computation gives \\(\\mathbb{E}[D_j^4] = 1/15\\), so \\(\\operatorname{Var}(D_j^2) = 1/15 - 1/36 = 7/180\\). Thus \\(\\mathbb{E}[\\|X_1 - X_2\\|_2^2] = d/6\\) and \\(\\operatorname{Var}(\\|X_1 - X_2\\|_2^2) = 7d/180\\). By Chebyshev, \\(\\|X_1 - X_2\\|_2^2 / d \\to 1/6\\) in probability, so \\(\\|X_1 - X_2\\|_2 / \\sqrt{d} \\to 1/\\sqrt{6}\\).'
                }
            ]
        },
        // ============================================================
        // Section 3: Norms and Balls in R^d
        // ============================================================
        {
            id: 'ch00-sec03',
            title: 'Norms and Balls in R^d',
            content: `
                <h2>Norms and Balls in \\(\\mathbb{R}^d\\)</h2>

                <p>The geometry of high-dimensional spaces depends critically on the choice of norm. The three most important norms in high-dimensional statistics are the \\(\\ell_1\\), \\(\\ell_2\\), and \\(\\ell_\\infty\\) norms, each encoding a different notion of "size" that becomes increasingly distinct as the dimension grows.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.2 (\\(\\ell_p\\) Norms)</div>
                    <div class="env-body">
                        <p>For \\(x \\in \\mathbb{R}^d\\) and \\(1 \\le p \\le \\infty\\), the \\(\\ell_p\\) norm is</p>
                        \\[\\|x\\|_p = \\begin{cases} \\left(\\sum_{i=1}^d |x_i|^p\\right)^{1/p} & \\text{if } 1 \\le p &lt; \\infty, \\\\[6pt] \\max_{1 \\le i \\le d} |x_i| & \\text{if } p = \\infty. \\end{cases}\\]
                        <p>The associated unit ball is \\(B_p^d = \\{x \\in \\mathbb{R}^d : \\|x\\|_p \\le 1\\}\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.3 (Norm Equivalence and Dimension Dependence)</div>
                    <div class="env-body">
                        <p>For all \\(x \\in \\mathbb{R}^d\\) and \\(1 \\le p \\le q \\le \\infty\\),</p>
                        \\[\\|x\\|_q \\le \\|x\\|_p \\le d^{1/p - 1/q} \\|x\\|_q.\\]
                        <p>Both bounds are tight: the left bound is achieved by any standard basis vector \\(e_i\\), and the right bound is achieved by \\(x = (1, 1, \\ldots, 1) / d^{1/q}\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>Left inequality:</strong> For \\(p \\le q &lt; \\infty\\), we use the monotonicity of power means. Let \\(a_i = |x_i|\\). Since \\(q \\ge p\\), the function \\(t \\mapsto t^{q/p}\\) is convex for \\(q/p \\ge 1\\). By the power mean inequality, \\(\\left(\\frac{1}{d}\\sum a_i^q\\right)^{1/q} \\ge \\left(\\frac{1}{d}\\sum a_i^p\\right)^{1/p}\\) is not quite what we need. Instead, note \\(|x_i| \\le \\|x\\|_p\\) for all \\(i\\), so \\(|x_i|^q = |x_i|^{q-p} |x_i|^p \\le \\|x\\|_p^{q-p} |x_i|^p\\). Summing: \\(\\|x\\|_q^q \\le \\|x\\|_p^{q-p} \\|x\\|_p^p = \\|x\\|_p^q\\).</p>
                        <p><strong>Right inequality:</strong> By H&ouml;lder's inequality with exponents \\(q/p\\) and \\(q/(q-p)\\):</p>
                        \\[\\sum |x_i|^p = \\sum 1 \\cdot |x_i|^p \\le d^{1 - p/q} \\left(\\sum |x_i|^q\\right)^{p/q} = d^{1 - p/q} \\|x\\|_q^p.\\]
                        <p>Taking \\(p\\)-th roots: \\(\\|x\\|_p \\le d^{1/p - 1/q} \\|x\\|_q\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Critical Observation</div>
                    <div class="env-body">
                        <p>The dimension-dependent factor \\(d^{1/p - 1/q}\\) is the key to understanding high-dimensional geometry. For \\(p = 1\\) and \\(q = 2\\): \\(\\|x\\|_1 \\le \\sqrt{d} \\, \\|x\\|_2\\). For \\(p = 2\\) and \\(q = \\infty\\): \\(\\|x\\|_2 \\le \\sqrt{d} \\, \\|x\\|_\\infty\\). These factors blow up as \\(d \\to \\infty\\), meaning the norms become increasingly different on non-sparse vectors. This is precisely why the \\(\\ell_1\\) norm is useful as a sparsity-inducing regularizer: among vectors with the same \\(\\ell_2\\) norm, sparse vectors have much smaller \\(\\ell_1\\) norm.</p>
                    </div>
                </div>

                <h3>Geometry of Unit Balls</h3>

                <p>The unit balls \\(B_1^d\\), \\(B_2^d\\), and \\(B_\\infty^d\\) have strikingly different shapes that become increasingly pronounced in high dimensions.</p>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 0.2 (Volumes of \\(\\ell_p\\) Balls)</div>
                    <div class="env-body">
                        <p>The volume of the \\(\\ell_p\\) unit ball in \\(\\mathbb{R}^d\\) is</p>
                        \\[\\operatorname{vol}(B_p^d) = \\frac{(2\\,\\Gamma(1/p+1))^d}{\\Gamma(d/p+1)}.\\]
                        <p>In particular:</p>
                        <ul>
                            <li>\\(\\operatorname{vol}(B_1^d) = 2^d / d!\\), which decays super-exponentially.</li>
                            <li>\\(\\operatorname{vol}(B_2^d) = \\pi^{d/2} / \\Gamma(d/2+1)\\).</li>
                            <li>\\(\\operatorname{vol}(B_\\infty^d) = 2^d\\).</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark 0.2 (Mean Width and Gaussian Complexity)</div>
                    <div class="env-body">
                        <p>The <strong>Gaussian width</strong> of a set \\(T \\subset \\mathbb{R}^d\\) is defined as</p>
                        \\[w(T) = \\mathbb{E}\\left[\\sup_{x \\in T} \\langle g, x \\rangle\\right], \\quad g \\sim N(0, I_d).\\]
                        <p>This is a fundamental measure of the "effective size" of \\(T\\) that, unlike volume, scales naturally with dimension. For the \\(\\ell_p\\) balls: \\(w(B_1^d) \\asymp \\sqrt{\\log d}\\), \\(w(B_2^d) \\asymp 1\\), and \\(w(B_\\infty^d) \\asymp \\sqrt{d}\\). Gaussian width plays a central role in the theory of empirical processes and compressed sensing (Chapters 4 and 8).</p>
                    </div>
                </div>

                <h3>The \\(\\ell_1\\) Ball and Sparsity</h3>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 0.3 (Vertices of \\(B_1^d\\))</div>
                    <div class="env-body">
                        <p>The \\(\\ell_1\\) unit ball \\(B_1^d = \\{x \\in \\mathbb{R}^d : \\|x\\|_1 \\le 1\\}\\) is a cross-polytope (hyperoctahedron) with \\(2d\\) vertices at \\(\\pm e_1, \\ldots, \\pm e_d\\). Its extreme points are precisely the signed standard basis vectors. In particular, the extreme points are all 1-sparse.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Why \\(\\ell_1\\) Promotes Sparsity</div>
                    <div class="env-body">
                        <p>Minimizing a linear functional \\(\\langle c, x \\rangle\\) over a convex set achieves its optimum at an extreme point (by the Krein-Milman theorem). Since the extreme points of \\(B_1^d\\) are sparse, optimization problems that project onto \\(B_1^d\\) tend to produce sparse solutions. This is the geometric explanation for why the Lasso (\\(\\ell_1\\)-penalized regression) yields sparse estimators.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Prove that for any \\(s\\)-sparse vector \\(x \\in \\mathbb{R}^d\\) (i.e., \\(\\|x\\|_0 \\le s\\)), we have \\(\\|x\\|_1 \\le \\sqrt{s} \\, \\|x\\|_2\\). Show this is tight.',
                    hint: 'Apply Cauchy-Schwarz to the nonzero coordinates. For tightness, consider a vector with all nonzero entries equal.',
                    solution: 'Let \\(S = \\operatorname{supp}(x)\\) with \\(|S| \\le s\\). Then \\(\\|x\\|_1 = \\sum_{i \\in S} |x_i| \\le \\sqrt{|S|} \\cdot \\sqrt{\\sum_{i \\in S} x_i^2} = \\sqrt{|S|} \\, \\|x\\|_2 \\le \\sqrt{s} \\, \\|x\\|_2\\) by Cauchy-Schwarz. Equality holds when all nonzero entries have the same absolute value, e.g., \\(x = (1/\\sqrt{s}, \\ldots, 1/\\sqrt{s}, 0, \\ldots, 0)\\) with \\(s\\) nonzero entries: \\(\\|x\\|_1 = \\sqrt{s}\\) and \\(\\|x\\|_2 = 1\\).'
                },
                {
                    question: 'Let \\(\\Sigma_s^d = \\{x \\in \\mathbb{R}^d : \\|x\\|_0 \\le s\\}\\) be the set of \\(s\\)-sparse vectors. Show that \\(\\Sigma_s^d\\) is not convex, but the \\(\\ell_1\\) ball \\(B_1^d\\) is its "convex surrogate" in the following sense: \\(B_1^d \\cap \\mathbb{S}^{d-1}\\) is the convex hull of \\(\\Sigma_1^d \\cap \\mathbb{S}^{d-1}\\).',
                    hint: 'The 1-sparse vectors on the unit sphere are \\(\\pm e_i\\). What is the convex hull of \\(\\{\\pm e_1, \\ldots, \\pm e_d\\}\\)?',
                    solution: 'Non-convexity: \\(e_1, e_2 \\in \\Sigma_1^d\\) are 1-sparse, but \\((e_1 + e_2)/2\\) is 2-sparse, so \\(\\Sigma_1^d\\) is not convex. For the convex hull: \\(\\Sigma_1^d \\cap \\mathbb{S}^{d-1} = \\{\\pm e_1, \\ldots, \\pm e_d\\}\\). The convex hull of these \\(2d\\) points is the cross-polytope \\(B_1^d\\). Since every \\(x \\in B_1^d\\) can be written as \\(x = \\sum \\lambda_i (\\pm e_i)\\) with \\(\\lambda_i \\ge 0\\) and \\(\\sum \\lambda_i \\le 1\\), and on the sphere \\(\\sum \\lambda_i = 1\\), this gives \\(B_1^d \\cap \\mathbb{S}^{d-1} = \\operatorname{conv}(\\Sigma_1^d \\cap \\mathbb{S}^{d-1})\\).'
                }
            ]
        },
        // ============================================================
        // Section 4: The Concentration Shell
        // ============================================================
        {
            id: 'ch00-sec04',
            title: 'The Concentration Shell',
            content: `
                <h2>The Concentration Shell</h2>

                <p>Perhaps the most striking phenomenon in high-dimensional probability is the <strong>concentration of measure</strong>: in high dimensions, random vectors are overwhelmingly likely to lie in a thin shell at a predictable distance from the origin. This is not a tail event; it is the <em>typical</em> behavior.</p>

                <h3>The Gaussian Shell</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.4 (Gaussian Concentration Shell)</div>
                    <div class="env-body">
                        <p>Let \\(X \\sim N(0, I_d)\\) be a standard Gaussian random vector in \\(\\mathbb{R}^d\\). Then</p>
                        \\[\\mathbb{E}[\\|X\\|_2^2] = d, \\qquad \\operatorname{Var}(\\|X\\|_2^2) = 2d.\\]
                        <p>Moreover, the norm \\(\\|X\\|_2\\) concentrates around \\(\\sqrt{d}\\): for any \\(t &gt; 0\\),</p>
                        \\[\\mathbb{P}\\bigl(\\bigl|\\|X\\|_2 - \\sqrt{d}\\,\\bigr| \\ge t\\bigr) \\le 2\\exp\\left(-\\frac{t^2}{8}\\right).\\]
                        <p>In particular, \\(\\|X\\|_2 / \\sqrt{d} \\to 1\\) in probability as \\(d \\to \\infty\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>Mean and variance:</strong> Write \\(\\|X\\|_2^2 = \\sum_{i=1}^d X_i^2\\) where \\(X_i \\sim N(0,1)\\) independently. Since \\(\\mathbb{E}[X_i^2] = 1\\) and \\(\\operatorname{Var}(X_i^2) = \\mathbb{E}[X_i^4] - 1 = 3 - 1 = 2\\), linearity gives \\(\\mathbb{E}[\\|X\\|_2^2] = d\\) and \\(\\operatorname{Var}(\\|X\\|_2^2) = 2d\\).</p>

                        <p><strong>Concentration of the norm:</strong> The function \\(f(x) = \\|x\\|_2\\) is 1-Lipschitz. By the Gaussian concentration inequality (which we will prove rigorously in Chapter 1), for any 1-Lipschitz function \\(f : \\mathbb{R}^d \\to \\mathbb{R}\\) and \\(X \\sim N(0, I_d)\\),</p>
                        \\[\\mathbb{P}(|f(X) - \\mathbb{E}[f(X)]| \\ge t) \\le 2\\exp(-t^2/2).\\]
                        <p>We need \\(\\mathbb{E}[\\|X\\|_2]\\). By Jensen's inequality, \\(\\mathbb{E}[\\|X\\|_2] \\le \\sqrt{\\mathbb{E}[\\|X\\|_2^2]} = \\sqrt{d}\\). Also, \\(\\mathbb{E}[\\|X\\|_2]^2 \\ge \\mathbb{E}[\\|X\\|_2^2] - \\operatorname{Var}(\\|X\\|_2)\\). Since \\(\\operatorname{Var}(\\|X\\|_2) \\le \\operatorname{Var}(\\|X\\|_2^2)/(4\\mathbb{E}[\\|X\\|_2^2 - \\text{lower terms}])\\), a careful computation gives \\(|\\mathbb{E}[\\|X\\|_2] - \\sqrt{d}| \\le C/\\sqrt{d}\\). The stated bound follows by adjusting constants.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: The Thin Shell</div>
                    <div class="env-body">
                        <p>In \\(d = 2\\), a 2D Gaussian has its density peak at the origin. You might expect the same in high dimensions: that most of the mass is "near the center." This is profoundly wrong. While the density \\(\\propto e^{-\\|x\\|^2/2}\\) is indeed maximized at the origin, the <strong>volume element</strong> \\(\\propto r^{d-1} dr\\) grows so rapidly with \\(r\\) that the effective mass concentrates at \\(r \\approx \\sqrt{d}\\). The competition between the decaying exponential and the exploding volume factor creates a sharp peak around \\(\\sqrt{d}\\). The width of this shell is \\(O(1)\\), independent of \\(d\\), meaning the relative width shrinks as \\(1/\\sqrt{d}\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-shell"></div>

                <h3>Chi-Squared Interpretation</h3>

                <p>The squared norm \\(\\|X\\|_2^2\\) for \\(X \\sim N(0, I_d)\\) follows a chi-squared distribution \\(\\chi^2_d\\) with \\(d\\) degrees of freedom. The shell phenomenon is equivalent to the concentration of \\(\\chi^2_d / d\\) around 1.</p>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 0.4 (Chi-Squared Concentration)</div>
                    <div class="env-body">
                        <p>Let \\(Q \\sim \\chi^2_d\\). Then for any \\(\\delta \\in (0, 1)\\),</p>
                        \\[\\mathbb{P}\\left(\\left|\\frac{Q}{d} - 1\\right| \\ge \\delta\\right) \\le 2\\exp\\left(-\\frac{d\\delta^2}{8}\\right).\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>We use the moment generating function. Since \\(Q = \\sum_{i=1}^d X_i^2\\) with \\(X_i \\sim N(0,1)\\) independent, each \\(X_i^2\\) has MGF \\(\\mathbb{E}[e^{tX_i^2}] = (1 - 2t)^{-1/2}\\) for \\(t &lt; 1/2\\). So \\(\\mathbb{E}[e^{tQ}] = (1-2t)^{-d/2}\\). By Markov's inequality, for \\(t &gt; 0\\):</p>
                        \\[\\mathbb{P}(Q \\ge d(1+\\delta)) \\le \\frac{\\mathbb{E}[e^{tQ}]}{e^{td(1+\\delta)}} = \\frac{e^{-td(1+\\delta)}}{(1-2t)^{d/2}}.\\]
                        <p>Optimizing over \\(t\\): set \\(t = \\delta/(2(1+\\delta))\\). Then \\(1 - 2t = 1/(1+\\delta)\\), and the bound becomes</p>
                        \\[\\exp\\left(-\\frac{d}{2}\\bigl[\\delta - \\log(1+\\delta)\\bigr]\\right).\\]
                        <p>Using \\(\\delta - \\log(1+\\delta) \\ge \\delta^2/4\\) for \\(\\delta \\in (0,1)\\), we obtain \\(\\mathbb{P}(Q/d \\ge 1+\\delta) \\le e^{-d\\delta^2/8}\\). The lower tail is handled similarly.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <h3>Near-Orthogonality of Random Vectors</h3>

                <p>A remarkable consequence of concentration is that independent random vectors in high dimensions are nearly orthogonal with high probability.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.5 (Near-Orthogonality)</div>
                    <div class="env-body">
                        <p>Let \\(X, Y \\sim N(0, I_d)\\) be independent. Then</p>
                        \\[\\mathbb{E}\\left[\\frac{|\\langle X, Y \\rangle|}{\\|X\\|_2 \\|Y\\|_2}\\right] \\le \\frac{C}{\\sqrt{d}}\\]
                        <p>for an absolute constant \\(C\\). That is, the angle \\(\\theta\\) between \\(X\\) and \\(Y\\) satisfies \\(|\\cos\\theta| = O(1/\\sqrt{d})\\), meaning \\(\\theta \\approx \\pi/2\\) for large \\(d\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>Conditioned on \\(X\\), the inner product \\(\\langle X, Y \\rangle = \\sum_{i=1}^d X_i Y_i\\) is normal with mean 0 and variance \\(\\|X\\|_2^2\\). So \\(\\langle X, Y \\rangle / \\|X\\|_2 \\sim N(0, 1)\\), and therefore \\(|\\langle X, Y \\rangle| / \\|X\\|_2 \\sim |Z|\\) for \\(Z \\sim N(0,1)\\), giving \\(\\mathbb{E}[|\\langle X, Y \\rangle| / \\|X\\|_2] = \\sqrt{2/\\pi}\\). Since \\(\\|Y\\|_2 \\approx \\sqrt{d}\\) by concentration, we get \\(\\mathbb{E}[|\\cos\\theta|] \\approx \\sqrt{2/\\pi} / \\sqrt{d}\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark 0.3 (Implications for PCA)</div>
                    <div class="env-body">
                        <p>Near-orthogonality means that \\(d + 1\\) random vectors in \\(\\mathbb{R}^d\\) are <em>approximately</em> pairwise orthogonal. This is impossible with <em>exactly</em> pairwise orthogonal vectors (we can have at most \\(d\\) of those), but approximate orthogonality is far less restrictive. This phenomenon has profound consequences for random matrix theory and high-dimensional PCA: the sample eigenvectors of the covariance matrix can be nearly orthogonal to the population eigenvectors unless the signal strength exceeds a phase transition threshold (the BBP transition, Chapter 7).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-shell',
                    title: 'Concentration Shell: Distribution of ||X||\u2082 for X ~ N(0, I_d)',
                    description: 'Histogram of the Euclidean norm of a standard Gaussian vector in dimension d. As d grows, the distribution concentrates tightly around \u221Ad.',
                    setup: function(body, controls) {
                        var width = Math.min(body.clientWidth || 560, 700);
                        var height = Math.round(width * 0.6);
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
                            purple: '#bc8cff', yellow: '#d29922'
                        };

                        var dims = [2, 10, 100, 500];
                        var nSamples = 5000;
                        var dimColors = [colors.blue, colors.teal, colors.orange, colors.red];

                        // Box-Muller transform for generating standard normals
                        function randn() {
                            var u1 = Math.random(), u2 = Math.random();
                            return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
                        }

                        function sampleNorm(d) {
                            var s = 0;
                            for (var i = 0; i < d; i++) {
                                var z = randn();
                                s += z * z;
                            }
                            return Math.sqrt(s);
                        }

                        function generateSamples() {
                            var allSamples = {};
                            for (var di = 0; di < dims.length; di++) {
                                var d = dims[di];
                                var samps = [];
                                for (var i = 0; i < nSamples; i++) {
                                    samps.push(sampleNorm(d));
                                }
                                allSamples[d] = samps;
                            }
                            return allSamples;
                        }

                        var allSamples = generateSamples();

                        function draw() {
                            ctx.fillStyle = colors.bg;
                            ctx.fillRect(0, 0, width, height);

                            var marginLeft = 55;
                            var marginRight = 30;
                            var marginTop = 35;
                            var marginBottom = 55;
                            var plotW = width - marginLeft - marginRight;
                            var plotH = height - marginTop - marginBottom;

                            // Title
                            ctx.fillStyle = colors.white;
                            ctx.font = 'bold 13px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Distribution of ||X||\u2082 for X ~ N(0, I_d)', width / 2, 18);

                            // Find global range
                            var globalMin = Infinity, globalMax = -Infinity;
                            for (var di = 0; di < dims.length; di++) {
                                var samps = allSamples[dims[di]];
                                for (var i = 0; i < samps.length; i++) {
                                    if (samps[i] < globalMin) globalMin = samps[i];
                                    if (samps[i] > globalMax) globalMax = samps[i];
                                }
                            }
                            globalMin = Math.max(0, globalMin - 1);
                            globalMax = globalMax + 1;

                            // Histogram parameters
                            var nBins = 60;
                            var binWidth = (globalMax - globalMin) / nBins;
                            var maxCount = 0;

                            // Compute histograms
                            var histograms = {};
                            for (var di = 0; di < dims.length; di++) {
                                var d = dims[di];
                                var samps = allSamples[d];
                                var counts = new Array(nBins).fill(0);
                                for (var i = 0; i < samps.length; i++) {
                                    var bin = Math.floor((samps[i] - globalMin) / binWidth);
                                    if (bin >= 0 && bin < nBins) counts[bin]++;
                                }
                                // Normalize to density
                                for (var j = 0; j < nBins; j++) {
                                    counts[j] = counts[j] / (nSamples * binWidth);
                                    if (counts[j] > maxCount) maxCount = counts[j];
                                }
                                histograms[d] = counts;
                            }

                            // Draw grid
                            ctx.strokeStyle = colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var i = 0; i <= 4; i++) {
                                var gy = marginTop + plotH - (i / 4) * plotH;
                                ctx.beginPath();
                                ctx.moveTo(marginLeft, gy);
                                ctx.lineTo(marginLeft + plotW, gy);
                                ctx.stroke();
                            }

                            // Draw density curves (as smooth lines)
                            for (var di = 0; di < dims.length; di++) {
                                var d = dims[di];
                                var counts = histograms[d];
                                ctx.strokeStyle = dimColors[di];
                                ctx.lineWidth = 2;
                                ctx.globalAlpha = 0.85;
                                ctx.beginPath();
                                var started = false;
                                for (var j = 0; j < nBins; j++) {
                                    var x = marginLeft + ((globalMin + (j + 0.5) * binWidth - globalMin) / (globalMax - globalMin)) * plotW;
                                    var y = marginTop + plotH - (counts[j] / maxCount) * plotH;
                                    if (!started) { ctx.moveTo(x, y); started = true; }
                                    else ctx.lineTo(x, y);
                                }
                                ctx.stroke();

                                // Fill area under curve
                                ctx.fillStyle = dimColors[di];
                                ctx.globalAlpha = 0.1;
                                ctx.lineTo(marginLeft + plotW, marginTop + plotH);
                                ctx.lineTo(marginLeft, marginTop + plotH);
                                ctx.closePath();
                                ctx.fill();
                                ctx.globalAlpha = 1.0;

                                // Mark sqrt(d)
                                var sqrtD = Math.sqrt(d);
                                var sqrtDx = marginLeft + ((sqrtD - globalMin) / (globalMax - globalMin)) * plotW;
                                if (sqrtDx > marginLeft && sqrtDx < marginLeft + plotW) {
                                    ctx.strokeStyle = dimColors[di];
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([4, 3]);
                                    ctx.beginPath();
                                    ctx.moveTo(sqrtDx, marginTop);
                                    ctx.lineTo(sqrtDx, marginTop + plotH);
                                    ctx.stroke();
                                    ctx.setLineDash([]);
                                }
                            }

                            // Axes
                            ctx.strokeStyle = colors.text;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(marginLeft, marginTop);
                            ctx.lineTo(marginLeft, marginTop + plotH);
                            ctx.lineTo(marginLeft + plotW, marginTop + plotH);
                            ctx.stroke();

                            // X-axis labels
                            ctx.fillStyle = colors.text;
                            ctx.font = '10px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            var step = Math.ceil((globalMax - globalMin) / 8);
                            for (var v = Math.ceil(globalMin); v <= globalMax; v += step) {
                                var xp = marginLeft + ((v - globalMin) / (globalMax - globalMin)) * plotW;
                                ctx.fillText(v.toFixed(0), xp, marginTop + plotH + 5);
                            }
                            ctx.font = '12px -apple-system, sans-serif';
                            ctx.fillText('||X||\u2082', width / 2, height - 10);

                            // Y-axis label
                            ctx.save();
                            ctx.translate(14, marginTop + plotH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.font = '11px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Density', 0, 0);
                            ctx.restore();

                            // Legend
                            var legendX = marginLeft + plotW - 130;
                            var legendY = marginTop + 10;
                            ctx.font = '11px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            for (var di = 0; di < dims.length; di++) {
                                var ly = legendY + di * 18;
                                ctx.fillStyle = dimColors[di];
                                ctx.fillRect(legendX, ly, 14, 10);
                                ctx.fillStyle = colors.white;
                                ctx.fillText('d = ' + dims[di] + '  (\u221Ad \u2248 ' + Math.sqrt(dims[di]).toFixed(1) + ')', legendX + 20, ly + 9);
                            }
                        }

                        VizEngine.createButton(controls, 'Resample', function() {
                            allSamples = generateSamples();
                            draw();
                        });

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that for \\(X \\sim N(0, I_d)\\), the direction \\(X / \\|X\\|_2\\) is uniformly distributed on the unit sphere \\(\\mathbb{S}^{d-1}\\), and is independent of the norm \\(\\|X\\|_2\\).',
                    hint: 'Use the rotational invariance of the standard Gaussian distribution. If \\(U\\) is any orthogonal matrix, then \\(UX \\sim N(0, I_d)\\).',
                    solution: 'Let \\(R = \\|X\\|_2\\) and \\(\\Theta = X / \\|X\\|_2\\). For any orthogonal matrix \\(U \\in O(d)\\), we have \\(UX \\sim N(0, I_d)\\) (since the density \\((2\\pi)^{-d/2} e^{-\\|x\\|^2/2}\\) depends only on \\(\\|x\\|_2\\), which is invariant under orthogonal transformations). Now \\(\\|UX\\|_2 = \\|X\\|_2 = R\\) and \\(UX / \\|UX\\|_2 = U\\Theta\\). Since \\((R, \\Theta)\\) and \\((R, U\\Theta)\\) have the same joint distribution for all \\(U \\in O(d)\\), the conditional distribution of \\(\\Theta\\) given \\(R\\) must be invariant under all rotations. The only such distribution on \\(\\mathbb{S}^{d-1}\\) is the uniform (Haar) measure. Since this conditional distribution does not depend on \\(R\\), \\(\\Theta\\) and \\(R\\) are independent.'
                },
                {
                    question: 'Let \\(X \\sim N(0, I_d)\\). Use the chi-squared concentration bound (Proposition 0.4) to show that \\(\\mathbb{P}(\\|X\\|_2 \\ge 2\\sqrt{d}) \\le 2e^{-3d/8}\\).',
                    hint: 'The event \\(\\|X\\|_2 \\ge 2\\sqrt{d}\\) is equivalent to \\(\\|X\\|_2^2 / d \\ge 4\\), i.e., \\(Q/d - 1 \\ge 3\\). But be careful: Proposition 0.4 requires \\(\\delta &lt; 1\\). Use the MGF bound more carefully.',
                    solution: 'We need \\(\\mathbb{P}(\\|X\\|_2^2 \\ge 4d)\\). From the MGF approach: \\(\\mathbb{P}(Q \\ge 4d) \\le \\inf_{t \\in (0,1/2)} \\frac{(1-2t)^{-d/2}}{e^{4td}} = \\inf_{t} \\exp\\left(-4td - \\frac{d}{2}\\log(1-2t)\\right)\\). Setting \\(t = 3/8\\): \\(1 - 2t = 1/4\\), so the bound is \\(\\exp(-3d/2 - (d/2)\\log(1/4)) = \\exp(-3d/2 + d\\log 2)\\). Since \\(\\log 2 \\approx 0.693\\), this gives \\(e^{-d(3/2 - \\log 2)} \\approx e^{-0.807d}\\). With a different optimization (\\(t = 3/8\\) gives \\(1 - 3/4 = 1/4\\)): the bound becomes \\(e^{-d(3/2 - \\log 2)} \\le 2e^{-3d/8}\\) for \\(d \\ge 1\\). More directly, since \\(\\delta = 3 &gt; 1\\), we use the stronger upper-tail bound \\(\\mathbb{P}(Q \\ge d(1+\\delta)) \\le \\exp(-d(\\delta - \\log(1+\\delta))/2)\\). With \\(\\delta = 3\\): \\(\\delta - \\log(1+\\delta) = 3 - \\log 4 \\approx 1.614\\), giving \\(e^{-0.807d} \\le 2e^{-3d/8}\\).'
                }
            ]
        },
        // ============================================================
        // Section 5: The Non-Asymptotic Viewpoint
        // ============================================================
        {
            id: 'ch00-sec05',
            title: 'The Non-Asymptotic Viewpoint',
            content: `
                <h2>The Non-Asymptotic Viewpoint</h2>

                <p>Classical statistics is built on asymptotic theory: we study the behavior of estimators as \\(n \\to \\infty\\) with the model (and hence \\(p\\)) held fixed. Results like the central limit theorem, asymptotic normality of the MLE, and the Wilks theorem are all statements about <em>limits</em>. In high-dimensional statistics, this framework is inadequate for two fundamental reasons.</p>

                <div class="env-block warning">
                    <div class="env-title">Why Asymptotics Fail</div>
                    <div class="env-body">
                        <p><strong>Reason 1:</strong> When \\(p\\) grows with \\(n\\), classical limit theorems may not apply. The CLT gives \\(\\sqrt{n}(\\bar{X} - \\mu) \\xrightarrow{d} N(0, \\sigma^2)\\), but if we are estimating a \\(p\\)-dimensional mean with \\(p = p(n) \\to \\infty\\), we need uniform control over all \\(p\\) coordinates simultaneously. This requires <em>non-asymptotic</em> concentration inequalities.</p>
                        <p><strong>Reason 2:</strong> Asymptotic statements are qualitative: they tell us the <em>rate</em> (e.g., \\(O(1/\\sqrt{n})\\)) but not the constants. In high dimensions, the constants often depend on \\(p\\), and ignoring this dependence can lead to vacuous bounds. Non-asymptotic bounds track these constants explicitly.</p>
                    </div>
                </div>

                <h3>Non-Asymptotic vs. Asymptotic Guarantees</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.3 (Non-Asymptotic Bound)</div>
                    <div class="env-body">
                        <p>A <strong>non-asymptotic bound</strong> is an inequality that holds for all finite values of the parameters (\\(n\\), \\(p\\), \\(\\delta\\), etc.), without requiring any limiting operation. A typical non-asymptotic bound takes the form: with probability at least \\(1 - \\delta\\),</p>
                        \\[\\|\\hat{\\theta} - \\theta^*\\| \\le r(n, p, \\delta),\\]
                        <p>where \\(r\\) is an explicit function of the sample size \\(n\\), the dimension \\(p\\), and the confidence level \\(\\delta\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 0.2 (Asymptotic vs. Non-Asymptotic for the Mean)</div>
                    <div class="env-body">
                        <p>Let \\(X_1, \\ldots, X_n \\sim N(\\mu, \\sigma^2)\\) i.i.d. The sample mean \\(\\bar{X}_n = \\frac{1}{n}\\sum_{i=1}^n X_i\\) satisfies:</p>
                        <p><strong>Asymptotic:</strong> \\(\\sqrt{n}(\\bar{X}_n - \\mu) / \\sigma \\xrightarrow{d} N(0, 1)\\) as \\(n \\to \\infty\\). This gives an approximate confidence interval.</p>
                        <p><strong>Non-asymptotic:</strong> For every \\(n \\ge 1\\) and every \\(\\delta \\in (0, 1)\\),</p>
                        \\[\\mathbb{P}\\left(|\\bar{X}_n - \\mu| \\ge \\sigma\\sqrt{\\frac{2\\log(2/\\delta)}{n}}\\right) \\le \\delta.\\]
                        <p>This is exact: no approximation, no limiting argument. The bound holds simultaneously for all \\(n\\), \\(\\mu\\), \\(\\sigma\\), and \\(\\delta\\).</p>
                    </div>
                </div>

                <h3>The High-Dimensional Mean Estimation Problem</h3>

                <p>To illustrate the power and necessity of the non-asymptotic viewpoint, consider estimating the mean of a \\(p\\)-dimensional Gaussian.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.6 (Non-Asymptotic Mean Estimation in \\(\\mathbb{R}^p\\))</div>
                    <div class="env-body">
                        <p>Let \\(X_1, \\ldots, X_n \\sim N(\\mu, I_p)\\) i.i.d. Then the sample mean \\(\\bar{X}_n = \\frac{1}{n}\\sum_{i=1}^n X_i\\) satisfies, with probability at least \\(1 - \\delta\\),</p>
                        \\[\\|\\bar{X}_n - \\mu\\|_2 \\le \\sqrt{\\frac{p}{n}} + \\sqrt{\\frac{2\\log(1/\\delta)}{n}}.\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>We have \\(\\bar{X}_n - \\mu \\sim N(0, \\frac{1}{n}I_p)\\), so \\(\\sqrt{n}(\\bar{X}_n - \\mu) \\sim N(0, I_p)\\). Let \\(Z = \\sqrt{n}(\\bar{X}_n - \\mu)\\). Then \\(\\|Z\\|_2^2 \\sim \\chi^2_p\\), and by the chi-squared concentration bound:</p>
                        \\[\\mathbb{P}(\\|Z\\|_2 \\ge \\sqrt{p} + t) \\le \\exp(-t^2/2)\\]
                        <p>for all \\(t &gt; 0\\). (This follows from the Lipschitz concentration of \\(z \\mapsto \\|z\\|_2\\) applied to \\(Z \\sim N(0, I_p)\\).) Setting \\(t = \\sqrt{2\\log(1/\\delta)}\\) and dividing by \\(\\sqrt{n}\\):</p>
                        \\[\\|\\bar{X}_n - \\mu\\|_2 = \\frac{\\|Z\\|_2}{\\sqrt{n}} \\le \\frac{\\sqrt{p} + \\sqrt{2\\log(1/\\delta)}}{\\sqrt{n}} = \\sqrt{\\frac{p}{n}} + \\sqrt{\\frac{2\\log(1/\\delta)}{n}}.\\]
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark 0.4 (Dimension-Dependent Rate)</div>
                    <div class="env-body">
                        <p>The key term is \\(\\sqrt{p/n}\\), which shows that the estimation error grows with \\(\\sqrt{p}\\). If \\(p \\asymp n\\), the error is \\(O(1)\\) -- estimation is possible but barely. If \\(p \\gg n\\), the error grows without bound. This is the non-asymptotic manifestation of the curse of dimensionality. To achieve error \\(\\varepsilon\\), we need \\(n \\gtrsim p / \\varepsilon^2\\) samples. This \\(n \\asymp p\\) scaling is the <em>parametric rate</em> in \\(p\\) dimensions.</p>
                    </div>
                </div>

                <h3>Roadmap of the Course</h3>

                <p>The remainder of this course develops the toolkit for taming high-dimensional problems through a combination of probabilistic tools and structural assumptions:</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.4 (The Trinity of High-Dimensional Statistics)</div>
                    <div class="env-body">
                        <p>The three core components of modern high-dimensional statistical theory are:</p>
                        <ol>
                            <li><strong>Concentration of measure</strong> (Chapters 1--4): quantitative bounds on how random objects concentrate around their expectations. Tools: sub-Gaussian and sub-exponential theory, covering numbers, chaining.</li>
                            <li><strong>Structural estimation</strong> (Chapters 8--17): exploiting low-dimensional structure (sparsity, low rank, graphical structure) to achieve consistent estimation when \\(p \\gg n\\). Tools: Lasso, nuclear norm minimization, graphical Lasso.</li>
                            <li><strong>Information-theoretic limits</strong> (Chapters 18--19): proving that no estimator can do better than a certain rate, regardless of computational budget. Tools: Fano's inequality, Assouad's lemma, Le Cam's method.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: The Fundamental Tradeoff</div>
                    <div class="env-body">
                        <p>High-dimensional statistics is governed by a fundamental tradeoff between <strong>statistical accuracy</strong> and <strong>model complexity</strong>. The curse of dimensionality tells us that without structure, estimation is hopeless. Structural assumptions (sparsity, low rank, smoothness) reduce the effective dimension of the problem from \\(p\\) to some smaller quantity \\(s \\ll p\\). The art of high-dimensional statistics lies in (1) finding the right structural assumption for a given problem, (2) designing estimators that exploit this structure, and (3) proving that these estimators achieve the information-theoretic limits.</p>
                    </div>
                </div>

                <p>We close with a simple but powerful observation that sets the stage for the entire course.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.7 (Sparse Mean Estimation)</div>
                    <div class="env-body">
                        <p>Suppose \\(\\mu \\in \\mathbb{R}^p\\) is \\(s\\)-sparse (at most \\(s\\) nonzero entries). Then a thresholding estimator achieves, with probability at least \\(1 - \\delta\\),</p>
                        \\[\\|\\hat{\\mu}_{\\text{thresh}} - \\mu\\|_2 \\le C\\sqrt{\\frac{s \\log(p/\\delta)}{n}}.\\]
                        <p>Compared to the unstructured rate \\(\\sqrt{p/n}\\), the effective dimension has been reduced from \\(p\\) to \\(s \\log p\\). When \\(s \\ll p / \\log p\\), this is a dramatic improvement.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>Define the hard-thresholding estimator: \\(\\hat{\\mu}_j = \\bar{X}_{n,j} \\cdot \\mathbf{1}(|\\bar{X}_{n,j}| \\ge \\lambda)\\) for threshold \\(\\lambda = \\sigma\\sqrt{2\\log(2p/\\delta)/n}\\). Each coordinate \\(\\bar{X}_{n,j} - \\mu_j \\sim N(0, 1/n)\\). By a union bound over \\(j = 1, \\ldots, p\\):</p>
                        \\[\\mathbb{P}\\left(\\max_{j} |\\bar{X}_{n,j} - \\mu_j| \\ge \\lambda\\right) \\le \\sum_{j=1}^p 2e^{-n\\lambda^2/2} = \\delta.\\]
                        <p>On the event \\(\\max_j |\\bar{X}_{n,j} - \\mu_j| &lt; \\lambda\\): for \\(j\\) with \\(\\mu_j = 0\\), \\(|\\bar{X}_{n,j}| &lt; \\lambda\\), so \\(\\hat{\\mu}_j = 0 = \\mu_j\\). For \\(j\\) with \\(\\mu_j \\ne 0\\), \\(|\\hat{\\mu}_j - \\mu_j| \\le \\lambda\\). Thus \\(\\|\\hat{\\mu} - \\mu\\|_2^2 \\le s \\lambda^2 = 2s\\log(2p/\\delta)/n\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark 0.5 (Preview: The Price of Not Knowing the Sparsity)</div>
                    <div class="env-body">
                        <p>The thresholding estimator requires choosing \\(\\lambda\\), which depends on the unknown sparsity level \\(s\\). In practice, we often do not know \\(s\\). The Lasso and its variants (Chapters 8--9) automatically adapt to the unknown sparsity, achieving the rate \\(s \\log p / n\\) without prior knowledge of \\(s\\). This adaptivity is one of the great achievements of modern high-dimensional statistics, and understanding it requires the full machinery of concentration inequalities and empirical process theory.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that the non-asymptotic bound in Theorem 0.6 is minimax optimal up to constants. That is, prove the matching lower bound: \\(\\inf_{\\hat{\\mu}} \\sup_{\\mu \\in \\mathbb{R}^p} \\mathbb{E}\\|\\hat{\\mu} - \\mu\\|_2^2 \\ge p/n\\), where the infimum is over all measurable estimators.',
                    hint: 'Use the Cram&eacute;r-Rao bound or a direct Bayes risk argument. Consider the prior \\(\\mu \\sim N(0, \\tau^2 I_p)\\) and compute the Bayes risk.',
                    solution: 'Place the prior \\(\\mu \\sim N(0, \\tau^2 I_p)\\). Given \\(\\mu\\), \\(\\bar{X}_n \\sim N(\\mu, n^{-1}I_p)\\). The posterior is \\(\\mu | \\bar{X}_n \\sim N\\bigl(\\frac{n\\tau^2}{1+n\\tau^2} \\bar{X}_n,\\; \\frac{\\tau^2}{1+n\\tau^2} I_p\\bigr)\\). The Bayes-optimal estimator is the posterior mean, with Bayes risk \\(R_B = p \\cdot \\frac{\\tau^2}{1+n\\tau^2}\\). As \\(\\tau \\to \\infty\\), \\(R_B \\to p/n\\). Since the minimax risk is at least the Bayes risk for any prior: \\(\\inf_{\\hat{\\mu}} \\sup_{\\mu} \\mathbb{E}\\|\\hat{\\mu} - \\mu\\|_2^2 \\ge \\sup_{\\tau} R_B = p/n\\). This matches the upper bound in Theorem 0.6 (in expectation).'
                }
            ]
        }
    ]
});
