window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch07',
    number: 7,
    title: 'Spiked Models & Tracy-Widom',
    subtitle: 'Phase transitions in high-dimensional PCA',
    sections: [
        // ============================================================
        // SECTION 1: The Spiked Covariance Model
        // ============================================================
        {
            id: 'ch07-sec01',
            title: 'The Spiked Covariance Model',
            content: `
                <h2>The Spiked Covariance Model</h2>

                <p>In classical statistics, principal component analysis (PCA) is the workhorse for dimensionality reduction. Given \\(n\\) samples from a \\(p\\)-dimensional distribution, we compute the sample covariance matrix and examine its eigenvalues: large eigenvalues indicate directions of high variance, which we interpret as <strong>signal</strong>.</p>

                <p>But what happens when \\(p\\) is comparable to \\(n\\)? The Marchenko-Pastur law (Chapter 6) taught us that even when the population covariance is \\(\\Sigma = I_p\\) (pure noise), the sample eigenvalues spread out over a wide interval \\([(1-\\sqrt{\\gamma})^2,\\,(1+\\sqrt{\\gamma})^2]\\), where \\(\\gamma = p/n\\). This creates a fundamental challenge: how can we distinguish genuine signal from the spurious spread of noise eigenvalues?</p>

                <p>The <strong>spiked covariance model</strong>, introduced by Johnstone (2001), provides the precise mathematical framework for studying this question.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 7.1 (Spiked Covariance Model)</div>
                    <div class="env-body">
                        <p>In the <strong>spiked covariance model</strong>, we observe \\(n\\) independent samples \\(x_1, \\ldots, x_n \\in \\mathbb{R}^p\\) drawn from</p>
                        \\[x_i \\sim N(0, \\Sigma)\\]
                        <p>where the population covariance has the structure</p>
                        \\[\\Sigma = I_p + \\sum_{i=1}^{r} \\theta_i \\, v_i v_i^\\top\\]
                        <p>Here \\(r\\) is a fixed (small) number of <strong>spikes</strong>, \\(\\theta_1 \\geq \\theta_2 \\geq \\cdots \\geq \\theta_r &gt; 0\\) are the spike strengths, and \\(v_1, \\ldots, v_r \\in \\mathbb{R}^p\\) are orthonormal vectors representing the signal directions. The asymptotic regime is \\(p, n \\to \\infty\\) with \\(p/n \\to \\gamma \\in (0, \\infty)\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The population covariance \\(\\Sigma\\) is the identity (isotropic noise) plus a finite number of rank-one perturbations. The eigenvalues of \\(\\Sigma\\) are \\(1 + \\theta_1, 1 + \\theta_2, \\ldots, 1 + \\theta_r\\) (each with multiplicity 1, in the direction \\(v_i\\)) and \\(1\\) with multiplicity \\(p - r\\). In population, the signal is obvious. The question is whether the sample covariance \\(\\hat{\\Sigma} = \\frac{1}{n}\\sum_{i=1}^n x_i x_i^\\top\\) can reliably detect these spikes when \\(p\\) is large.</p>
                    </div>
                </div>

                <h3>The Sample Covariance Matrix</h3>

                <p>Given the data matrix \\(X = [x_1 \\cdots x_n] \\in \\mathbb{R}^{p \\times n}\\), the sample covariance matrix is</p>
                \\[\\hat{\\Sigma} = \\frac{1}{n} X X^\\top.\\]
                <p>We denote its ordered eigenvalues by \\(\\hat{\\lambda}_1 \\geq \\hat{\\lambda}_2 \\geq \\cdots \\geq \\hat{\\lambda}_p\\) and the corresponding eigenvectors by \\(\\hat{v}_1, \\ldots, \\hat{v}_p\\).</p>

                <div class="env-block remark">
                    <div class="env-title">Remark (Why "Spiked"?)</div>
                    <div class="env-body">
                        <p>The name "spiked" comes from the spectral picture. The population spectrum has a bulk at \\(\\{1\\}\\) (from the identity) with a few isolated points (spikes) at \\(1 + \\theta_i\\) poking out above the bulk. In the sample spectrum, the MP bulk spreads out to \\([(1-\\sqrt{\\gamma})^2, (1+\\sqrt{\\gamma})^2]\\). The central question is: when does a population spike create a detectable sample spike that separates from this bulk?</p>
                    </div>
                </div>

                <h3>Key Questions</h3>

                <p>The spiked model leads to three fundamental questions:</p>
                <ol>
                    <li><strong>Detection:</strong> When can we tell that \\(\\Sigma \\neq I_p\\)? That is, when is at least one spike \\(\\theta_i\\) detectable?</li>
                    <li><strong>Eigenvalue behavior:</strong> Where does the top sample eigenvalue \\(\\hat{\\lambda}_1\\) land? Does it separate from the bulk?</li>
                    <li><strong>Eigenvector behavior:</strong> How well does the top sample eigenvector \\(\\hat{v}_1\\) estimate the true signal direction \\(v_1\\)?</li>
                </ol>

                <p>The answers to all three questions exhibit a <strong>phase transition</strong> at a critical threshold, discovered by Baik, Ben Arous, and Peche (2005). This is the BBP transition, which we study in the next section.</p>

                <div class="env-block example">
                    <div class="env-title">Example 7.2 (Single Spike)</div>
                    <div class="env-body">
                        <p>The simplest case: \\(r = 1\\), so \\(\\Sigma = I_p + \\theta \\, v v^\\top\\). The population has one eigenvalue \\(1 + \\theta\\) in the direction \\(v\\), and eigenvalue \\(1\\) with multiplicity \\(p - 1\\). Classical PCA (fixed \\(p\\), \\(n \\to \\infty\\)) consistently estimates both \\(\\theta\\) and \\(v\\). But when \\(p/n \\to \\gamma &gt; 0\\), consistency can fail entirely if \\(\\theta\\) is too small relative to \\(\\gamma\\).</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: []
        },

        // ============================================================
        // SECTION 2: BBP Phase Transition
        // ============================================================
        {
            id: 'ch07-sec02',
            title: 'BBP Phase Transition',
            content: `
                <h2>The BBP Phase Transition</h2>

                <p>The Baik-Ben Arous-Peche (BBP) phase transition is one of the most striking discoveries in high-dimensional statistics. It reveals that there is a <strong>sharp threshold</strong> for spike detection: spikes below the threshold are invisible to PCA, while spikes above it produce detectable outlier eigenvalues.</p>

                <h3>The Critical Threshold</h3>

                <p>Consider the single-spike model \\(\\Sigma = I_p + \\theta \\, v v^\\top\\) with \\(p/n \\to \\gamma\\). The critical threshold for detectability is</p>
                \\[\\theta_{\\mathrm{crit}} = \\sqrt{\\gamma}.\\]

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.3 (BBP Phase Transition — Baik, Ben Arous, Peche 2005)</div>
                    <div class="env-body">
                        <p>Consider the spiked model \\(\\Sigma = I_p + \\theta \\, vv^\\top\\) with \\(p/n \\to \\gamma \\in (0, \\infty)\\). Let \\(\\hat{\\lambda}_1\\) be the largest eigenvalue of \\(\\hat{\\Sigma} = \\frac{1}{n}XX^\\top\\). Then almost surely:</p>
                        <ol>
                            <li><strong>Subcritical regime</strong> (\\(\\theta \\leq \\sqrt{\\gamma}\\)): The top eigenvalue sticks to the bulk edge:
                            \\[\\hat{\\lambda}_1 \\xrightarrow{a.s.} (1 + \\sqrt{\\gamma})^2.\\]</li>
                            <li><strong>Supercritical regime</strong> (\\(\\theta &gt; \\sqrt{\\gamma}\\)): The top eigenvalue exits the bulk:
                            \\[\\hat{\\lambda}_1 \\xrightarrow{a.s.} \\left(1 + \\theta\\right)\\left(1 + \\frac{\\gamma}{\\theta}\\right) &gt; (1 + \\sqrt{\\gamma})^2.\\]</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Think of \\(\\sqrt{\\gamma}\\) as the "noise floor" of high-dimensional estimation. The Marchenko-Pastur bulk has right edge at \\((1+\\sqrt{\\gamma})^2\\). A spike must be strong enough — specifically \\(\\theta &gt; \\sqrt{\\gamma}\\) — to push an eigenvalue out beyond this edge. Below this threshold, the noise overwhelms the signal, and the spike's eigenvalue gets absorbed into the bulk, making it indistinguishable from noise.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-bbp"></div>

                <h3>The Supercritical Eigenvalue Formula</h3>

                <p>When \\(\\theta &gt; \\sqrt{\\gamma}\\), the limiting position of the top eigenvalue is given by the <em>BBP formula</em>:</p>
                \\[\\lambda^\\star(\\theta) = (1 + \\theta)\\left(1 + \\frac{\\gamma}{\\theta}\\right) = 1 + \\theta + \\gamma + \\frac{\\gamma}{\\theta}.\\]

                <div class="env-block remark">
                    <div class="env-title">Remark (Properties of the BBP Formula)</div>
                    <div class="env-body">
                        <p>Several notable properties:</p>
                        <ul>
                            <li>At the critical point \\(\\theta = \\sqrt{\\gamma}\\): \\(\\lambda^\\star(\\sqrt{\\gamma}) = (1+\\sqrt{\\gamma})^2\\), which matches the MP right edge. The transition is continuous.</li>
                            <li>For large \\(\\theta\\): \\(\\lambda^\\star(\\theta) \\approx 1 + \\theta + \\gamma\\), so the sample eigenvalue overestimates the population eigenvalue \\(1 + \\theta\\) by approximately \\(\\gamma\\). This <strong>upward bias</strong> is a universal phenomenon in high-dimensional PCA.</li>
                            <li>The function \\(\\theta \\mapsto \\lambda^\\star(\\theta)\\) is strictly increasing for \\(\\theta &gt; \\sqrt{\\gamma}\\).</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch (BBP Transition via Stieltjes Transform)</div>
                    <div class="env-body">
                        <p>The proof proceeds by analyzing the resolvent of the spiked sample covariance. One first establishes that the Stieltjes transform \\(m(z)\\) of the empirical spectral distribution satisfies the Marchenko-Pastur equation. The spike at \\(1 + \\theta\\) in the population perturbs this Stieltjes transform.</p>
                        <p>Define \\(f(\\lambda) = \\lambda - \\frac{1}{m(\\lambda)}\\). An outlier eigenvalue appears at \\(\\lambda^\\star\\) if the equation \\(f(\\lambda^\\star) = 1 + \\theta\\) has a solution outside the MP support. Computing the inverse Stieltjes transform at the edge, one finds that this equation has a solution outside \\([(1-\\sqrt{\\gamma})^2, (1+\\sqrt{\\gamma})^2]\\) if and only if \\(\\theta &gt; \\sqrt{\\gamma}\\), and the solution is precisely \\(\\lambda^\\star(\\theta) = (1+\\theta)(1+\\gamma/\\theta)\\).</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <h3>Multiple Spikes</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.4 (Multi-Spike BBP Transition)</div>
                    <div class="env-body">
                        <p>For the general spiked model \\(\\Sigma = I_p + \\sum_{i=1}^r \\theta_i v_i v_i^\\top\\), each spike \\(\\theta_i\\) undergoes its own phase transition independently:</p>
                        <ul>
                            <li>If \\(\\theta_i &gt; \\sqrt{\\gamma}\\), then \\(\\hat{\\lambda}_i \\xrightarrow{a.s.} (1+\\theta_i)(1+\\gamma/\\theta_i)\\).</li>
                            <li>If \\(\\theta_i \\leq \\sqrt{\\gamma}\\), then \\(\\hat{\\lambda}_i\\) converges to the MP right edge \\((1+\\sqrt{\\gamma})^2\\).</li>
                        </ul>
                        <p>In particular, the number of outlier eigenvalues equals the number of supercritical spikes \\(|\\{i : \\theta_i &gt; \\sqrt{\\gamma}\\}|\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 7.5 (Numerical Illustration)</div>
                    <div class="env-body">
                        <p>Take \\(\\gamma = 0.5\\), so the critical threshold is \\(\\sqrt{0.5} \\approx 0.707\\). The MP bulk has right edge \\((1 + \\sqrt{0.5})^2 \\approx 2.914\\). Consider two spikes:</p>
                        <ul>
                            <li>\\(\\theta_1 = 1.5 &gt; 0.707\\): supercritical. The top sample eigenvalue converges to \\((1+1.5)(1+0.5/1.5) = 2.5 \\times 1.333 \\approx 3.333\\), which exceeds the MP edge.</li>
                            <li>\\(\\theta_2 = 0.5 &lt; 0.707\\): subcritical. The second eigenvalue is absorbed into the MP bulk at \\(\\approx 2.914\\). This spike is invisible to PCA.</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-bbp',
                    title: 'BBP Phase Transition',
                    description: 'Observe how the top sample eigenvalue transitions from sticking to the Marchenko-Pastur bulk edge (subcritical) to separating as an outlier (supercritical). The vertical dashed line marks the critical threshold \\(\\theta_{\\mathrm{crit}} = \\sqrt{\\gamma}\\). The lower panel shows eigenvector correlation with the true spike direction.',
                    setup: function(container, controls) {
                        var width = 700, height = 500;
                        var viz = new VizEngine(container, { width: width, height: height, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var gamma = 0.5;
                        var thetaAnim = 0.0;
                        var animating = true;
                        var animDir = 1;

                        var gammaSlider = VizEngine.createSlider(controls, 'gamma', 0.1, 2.0, gamma, 0.05, function(v) {
                            gamma = v;
                        });
                        var thetaSlider = VizEngine.createSlider(controls, 'theta', 0.0, 3.0, 0.0, 0.02, function(v) {
                            thetaAnim = v;
                            animating = false;
                        });
                        VizEngine.createButton(controls, 'Animate', function() {
                            animating = true;
                            thetaAnim = 0.0;
                            animDir = 1;
                        });

                        // Margins
                        var mL = 70, mR = 30, mT = 30, mB = 60;
                        var mMid = 40; // gap between upper and lower panels
                        var upperH = 250;
                        var lowerH = height - mT - mB - upperH - mMid;
                        var plotW = width - mL - mR;

                        // Theta range
                        var thetaMax = 3.0;

                        function bbpEigenvalue(th, gam) {
                            var sqrtGam = Math.sqrt(gam);
                            if (th <= sqrtGam) return (1 + sqrtGam) * (1 + sqrtGam);
                            return (1 + th) * (1 + gam / th);
                        }

                        function eigenvectorCorrelation(th, gam) {
                            var sqrtGam = Math.sqrt(gam);
                            if (th <= sqrtGam) return 0;
                            return 1 - gam / (th * th);
                        }

                        function draw() {
                            viz.clear();

                            var sqrtGam = Math.sqrt(gamma);
                            var mpRight = (1 + sqrtGam) * (1 + sqrtGam);
                            var maxLambda = Math.max(bbpEigenvalue(thetaMax, gamma), mpRight + 1);

                            // --- Upper Panel: Eigenvalue vs theta ---
                            var upTop = mT;
                            var upBot = mT + upperH;

                            // Map functions for upper panel
                            function mapThX(th) { return mL + (th / thetaMax) * plotW; }
                            function mapLamY(lam) { return upBot - ((lam - 0) / maxLambda) * upperH; }

                            // Grid
                            ctx.strokeStyle = '#1a1a40';
                            ctx.lineWidth = 0.5;
                            for (var gx = 0; gx <= thetaMax; gx += 0.5) {
                                var gxp = mapThX(gx);
                                ctx.beginPath(); ctx.moveTo(gxp, upTop); ctx.lineTo(gxp, upBot); ctx.stroke();
                            }
                            for (var gy = 0; gy <= maxLambda; gy += 1) {
                                var gyp = mapLamY(gy);
                                ctx.beginPath(); ctx.moveTo(mL, gyp); ctx.lineTo(mL + plotW, gyp); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = '#4a4a7a';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(mL, upBot); ctx.lineTo(mL + plotW, upBot); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(mL, upTop); ctx.lineTo(mL, upBot); ctx.stroke();

                            // Axis labels
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var tx = 0; tx <= thetaMax; tx += 0.5) {
                                ctx.fillText(tx.toFixed(1), mapThX(tx), upBot + 4);
                            }
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var ly = 0; ly <= maxLambda; ly += 1) {
                                ctx.fillText(ly.toFixed(0), mL - 6, mapLamY(ly));
                            }

                            // MP bulk right edge (horizontal band)
                            ctx.fillStyle = 'rgba(88,166,255,0.12)';
                            var mpLeftEdge = (1 - sqrtGam) * (1 - sqrtGam);
                            ctx.fillRect(mL, mapLamY(mpRight), plotW, mapLamY(mpLeftEdge) - mapLamY(mpRight));
                            // MP right edge line
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            ctx.moveTo(mL, mapLamY(mpRight));
                            ctx.lineTo(mL + plotW, mapLamY(mpRight));
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('MP edge = (1+\u221A\u03B3)\u00B2 = ' + mpRight.toFixed(3), mL + plotW - 180, mapLamY(mpRight) - 3);

                            // Critical threshold vertical line
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(mapThX(sqrtGam), upTop);
                            ctx.lineTo(mapThX(sqrtGam), upBot);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.red;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('\u03B8_crit = \u221A\u03B3 = ' + sqrtGam.toFixed(3), mapThX(sqrtGam), upTop - 2);

                            // BBP curve
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var firstPoint = true;
                            for (var th = 0; th <= thetaMax; th += 0.005) {
                                var lam = bbpEigenvalue(th, gamma);
                                var px = mapThX(th);
                                var py = mapLamY(lam);
                                if (firstPoint) { ctx.moveTo(px, py); firstPoint = false; }
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Current point on BBP curve
                            var curLam = bbpEigenvalue(thetaAnim, gamma);
                            var curX = mapThX(thetaAnim);
                            var curY = mapLamY(curLam);
                            // Glow
                            ctx.fillStyle = 'rgba(240,136,62,0.3)';
                            ctx.beginPath(); ctx.arc(curX, curY, 10, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(curX, curY, 5, 0, Math.PI * 2); ctx.fill();

                            // Label the eigenvalue
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('\u03BB\u2081 = ' + curLam.toFixed(3), curX + 12, curY - 4);

                            // Upper panel title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Top Eigenvalue \u03BB\u2081 vs Spike Strength \u03B8', mL + 5, upTop + 3);

                            // --- Lower Panel: Eigenvector correlation ---
                            var loTop = upBot + mMid;
                            var loBot = loTop + lowerH;

                            function mapCorrY(c) { return loBot - (c / 1.0) * lowerH; }

                            // Grid
                            ctx.strokeStyle = '#1a1a40';
                            ctx.lineWidth = 0.5;
                            for (var gx2 = 0; gx2 <= thetaMax; gx2 += 0.5) {
                                var gxp2 = mapThX(gx2);
                                ctx.beginPath(); ctx.moveTo(gxp2, loTop); ctx.lineTo(gxp2, loBot); ctx.stroke();
                            }
                            for (var cy = 0; cy <= 1.0; cy += 0.25) {
                                var cyp = mapCorrY(cy);
                                ctx.beginPath(); ctx.moveTo(mL, cyp); ctx.lineTo(mL + plotW, cyp); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = '#4a4a7a';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(mL, loBot); ctx.lineTo(mL + plotW, loBot); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(mL, loTop); ctx.lineTo(mL, loBot); ctx.stroke();

                            // Axis labels
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var tx2 = 0; tx2 <= thetaMax; tx2 += 0.5) {
                                ctx.fillText(tx2.toFixed(1), mapThX(tx2), loBot + 4);
                            }
                            ctx.fillText('\u03B8 (spike strength)', mL + plotW / 2, loBot + 20);
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var cy2 = 0; cy2 <= 1.0; cy2 += 0.25) {
                                ctx.fillText(cy2.toFixed(2), mL - 6, mapCorrY(cy2));
                            }

                            // Critical threshold vertical line
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(mapThX(sqrtGam), loTop);
                            ctx.lineTo(mapThX(sqrtGam), loBot);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Correlation curve
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var firstCorr = true;
                            for (var th2 = 0; th2 <= thetaMax; th2 += 0.005) {
                                var corr = eigenvectorCorrelation(th2, gamma);
                                var cpx = mapThX(th2);
                                var cpy = mapCorrY(corr);
                                if (firstCorr) { ctx.moveTo(cpx, cpy); firstCorr = false; }
                                else ctx.lineTo(cpx, cpy);
                            }
                            ctx.stroke();

                            // Current point on correlation curve
                            var curCorr = eigenvectorCorrelation(thetaAnim, gamma);
                            var corrPx = mapThX(thetaAnim);
                            var corrPy = mapCorrY(curCorr);
                            ctx.fillStyle = 'rgba(63,185,160,0.3)';
                            ctx.beginPath(); ctx.arc(corrPx, corrPy, 10, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath(); ctx.arc(corrPx, corrPy, 5, 0, Math.PI * 2); ctx.fill();

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('|\u27E8v\u0302\u2081, v\u2081\u27E9|\u00B2 = ' + curCorr.toFixed(3), corrPx + 12, corrPy - 4);

                            // Lower panel title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Eigenvector Correlation |\u27E8v\u0302\u2081, v\u2081\u27E9|\u00B2 vs \u03B8', mL + 5, loTop + 3);

                            // Phase labels
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            var subX = mapThX(sqrtGam / 2);
                            var supX = mapThX((sqrtGam + thetaMax) / 2);
                            ctx.fillStyle = 'rgba(248,81,73,0.5)';
                            ctx.fillText('Subcritical', subX, loBot + 32);
                            ctx.fillStyle = 'rgba(63,185,160,0.5)';
                            ctx.fillText('Supercritical', supX, loBot + 32);
                        }

                        viz.animate(function(t) {
                            if (animating) {
                                thetaAnim += animDir * 0.008;
                                if (thetaAnim >= thetaMax) { thetaAnim = thetaMax; animDir = -1; }
                                if (thetaAnim <= 0) { thetaAnim = 0; animDir = 1; }
                                thetaSlider.value = thetaAnim.toFixed(2);
                                // Update displayed value
                                var valSpan = thetaSlider.parentNode.querySelector('.viz-slider-value');
                                if (valSpan) valSpan.textContent = thetaAnim.toFixed(2);
                            }
                            draw();
                        });

                        return viz;
                    }
                }
            ],
            exercises: []
        },

        // ============================================================
        // SECTION 3: Eigenvalue and Eigenvector Behavior
        // ============================================================
        {
            id: 'ch07-sec03',
            title: 'Eigenvalue and Eigenvector Behavior',
            content: `
                <h2>Eigenvalue and Eigenvector Behavior Above and Below Threshold</h2>

                <p>The BBP transition determines not only <em>whether</em> the spike is detected, but also <em>how well</em> PCA estimates the spike strength and direction. In this section, we give precise quantitative results for both the eigenvalue and eigenvector behavior in the two regimes.</p>

                <h3>Eigenvalue Behavior</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.6 (Eigenvalue Bias in the Supercritical Regime)</div>
                    <div class="env-body">
                        <p>For \\(\\theta &gt; \\sqrt{\\gamma}\\), the top sample eigenvalue satisfies \\(\\hat{\\lambda}_1 \\xrightarrow{a.s.} \\lambda^\\star(\\theta)\\) where</p>
                        \\[\\lambda^\\star(\\theta) = (1+\\theta)\\left(1 + \\frac{\\gamma}{\\theta}\\right).\\]
                        <p>In particular, \\(\\lambda^\\star(\\theta) &gt; 1 + \\theta\\) always (upward bias), and</p>
                        \\[\\lambda^\\star(\\theta) - (1+\\theta) = \\frac{\\gamma(1+\\theta)}{\\theta} = \\gamma + \\frac{\\gamma}{\\theta}.\\]
                        <p>For large \\(\\theta\\), the bias approaches \\(\\gamma\\); for \\(\\theta\\) near the threshold \\(\\sqrt{\\gamma}\\), the bias is approximately \\(\\gamma + \\sqrt{\\gamma}\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Consistent Spike Estimation)</div>
                    <div class="env-body">
                        <p>Since \\(\\hat{\\lambda}_1\\) is a biased estimator of the population eigenvalue \\(1 + \\theta\\), naive PCA overestimates the signal strength. However, the function \\(\\theta \\mapsto \\lambda^\\star(\\theta)\\) is invertible on \\((\\sqrt{\\gamma}, \\infty)\\). Given the limiting value \\(\\ell\\) of \\(\\hat{\\lambda}_1\\), one can solve</p>
                        \\[\\ell = (1+\\theta)(1 + \\gamma/\\theta)\\]
                        <p>for \\(\\theta\\), yielding a <strong>bias-corrected estimator</strong>. Explicitly:</p>
                        \\[\\hat{\\theta}_{\\mathrm{corrected}} = \\frac{\\ell - 1 - \\gamma + \\sqrt{(\\ell - 1 - \\gamma)^2 - 4\\gamma}}{2}.\\]
                    </div>
                </div>

                <h3>Eigenvector Behavior</h3>

                <p>Perhaps more important than the eigenvalue is the behavior of the top sample eigenvector \\(\\hat{v}_1\\). How well does it estimate the true signal direction \\(v_1\\)?</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.7 (Eigenvector Cosine — Paul 2007)</div>
                    <div class="env-body">
                        <p>Under the single-spike model with \\(p/n \\to \\gamma\\):</p>
                        <ol>
                            <li><strong>Subcritical</strong> (\\(\\theta \\leq \\sqrt{\\gamma}\\)):
                            \\[|\\langle \\hat{v}_1, v_1 \\rangle|^2 \\xrightarrow{a.s.} 0.\\]
                            The sample eigenvector is asymptotically orthogonal to the truth. PCA completely fails to recover the signal direction.</li>
                            <li><strong>Supercritical</strong> (\\(\\theta &gt; \\sqrt{\\gamma}\\)):
                            \\[|\\langle \\hat{v}_1, v_1 \\rangle|^2 \\xrightarrow{a.s.} \\frac{1 - \\gamma/\\theta^2}{1 + \\gamma/\\theta} = \\frac{\\theta^2 - \\gamma}{\\theta(\\theta + \\gamma)}.\\]</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The squared cosine \\(|\\langle \\hat{v}_1, v_1\\rangle|^2\\) measures what fraction of the sample eigenvector lies in the true signal direction. In the subcritical regime, this is zero: \\(\\hat{v}_1\\) points in a random direction having nothing to do with \\(v_1\\). Just above threshold, the correlation jumps discontinuously from 0 (since \\(\\lim_{\\theta \\downarrow \\sqrt{\\gamma}} (\\theta^2 - \\gamma)/(\\theta(\\theta + \\gamma)) = 0\\)) — wait, actually it transitions continuously from 0. At \\(\\theta = \\sqrt{\\gamma}\\), the correlation is exactly 0, and it increases smoothly. As \\(\\theta \\to \\infty\\), the correlation approaches 1: with a very strong spike, PCA recovers the direction almost perfectly.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 7.8 (Eigenvector Quality)</div>
                    <div class="env-body">
                        <p>With \\(\\gamma = 1\\) (a very high-dimensional regime where \\(p = n\\)):</p>
                        <ul>
                            <li>Critical threshold: \\(\\sqrt{\\gamma} = 1\\).</li>
                            <li>At \\(\\theta = 2\\): \\(|\\langle \\hat{v}_1, v_1 \\rangle|^2 = (4-1)/(2 \\cdot 3) = 1/2\\). Only half the variance is explained correctly.</li>
                            <li>At \\(\\theta = 5\\): \\(|\\langle \\hat{v}_1, v_1 \\rangle|^2 = (25-1)/(5 \\cdot 6) = 24/30 = 0.8\\). Still not perfect.</li>
                            <li>At \\(\\theta = 10\\): \\(|\\langle \\hat{v}_1, v_1 \\rangle|^2 = (100-1)/(10 \\cdot 11) \\approx 0.9\\).</li>
                        </ul>
                        <p>Even with a spike 10 times the noise level, the eigenvector only achieves \\(\\approx 90\\%\\) correlation in this regime. High-dimensional PCA is fundamentally harder than its classical counterpart.</p>
                    </div>
                </div>

                <h3>Shrinkage of Sample Eigenvectors</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 7.9 (Effective Shrinkage Factor)</div>
                    <div class="env-body">
                        <p>The <strong>shrinkage factor</strong> for the sample eigenvector projection is defined as</p>
                        \\[c(\\theta, \\gamma) = |\\langle \\hat{v}_1, v_1 \\rangle|^2 = \\frac{\\theta^2 - \\gamma}{\\theta(\\theta + \\gamma)} \\quad (\\theta &gt; \\sqrt{\\gamma}).\\]
                        <p>This can be rewritten as</p>
                        \\[c(\\theta, \\gamma) = 1 - \\frac{\\gamma(1 + \\theta)}{\\theta(\\theta + \\gamma)} = 1 - \\frac{\\gamma}{\\theta^2} \\cdot \\frac{1+\\theta}{1+\\gamma/\\theta}.\\]
                        <p>The "lost" fraction \\(1 - c(\\theta,\\gamma)\\) measures how much the eigenvector has been rotated away from the truth by high-dimensional noise.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch (Eigenvector Cosine Formula)</div>
                    <div class="env-body">
                        <p>The proof uses the matrix perturbation formula. Write \\(\\hat{\\Sigma} = \\hat{\\Sigma}_0 + \\theta \\cdot \\frac{1}{n}(Xv)(Xv)^\\top\\) where \\(\\hat{\\Sigma}_0\\) is the sample covariance under the null. By the resolvent identity, the projection of \\(\\hat{v}_1\\) onto \\(v_1\\) can be expressed in terms of the Stieltjes transform of the null empirical spectral distribution evaluated at the outlier eigenvalue \\(\\lambda^\\star(\\theta)\\). The key identity is:</p>
                        \\[|\\langle \\hat{v}_1, v_1 \\rangle|^2 = \\frac{1}{1 + \\theta^2 \\, m'_{\\gamma}(\\lambda^\\star(\\theta))}\\]
                        <p>where \\(m_{\\gamma}\\) is the MP Stieltjes transform. Evaluating this using the explicit form of \\(m_{\\gamma}\\) yields the stated formula.</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: []
        },

        // ============================================================
        // SECTION 4: Tracy-Widom Distribution
        // ============================================================
        {
            id: 'ch07-sec04',
            title: 'Tracy-Widom Distribution',
            content: `
                <h2>The Tracy-Widom Distribution</h2>

                <p>In the null case (no spikes, \\(\\Sigma = I_p\\)), the Marchenko-Pastur law tells us that the bulk of the eigenvalues of \\(\\hat{\\Sigma}\\) converges to a deterministic distribution. But what about the <strong>fluctuations</strong> of the largest eigenvalue \\(\\hat{\\lambda}_1\\) around the right edge \\((1+\\sqrt{\\gamma})^2\\)?</p>

                <p>Classical probability would suggest Gaussian fluctuations (CLT). Remarkably, the fluctuations are <strong>not Gaussian</strong> — they follow a universal distribution discovered by Tracy and Widom (1994, 1996).</p>

                <h3>The GOE and GUE Tracy-Widom Laws</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 7.10 (Tracy-Widom Distributions)</div>
                    <div class="env-body">
                        <p>The <strong>Tracy-Widom distributions</strong> \\(\\mathrm{TW}_1\\) and \\(\\mathrm{TW}_2\\) are probability distributions on \\(\\mathbb{R}\\) defined through solutions to the Painleve II differential equation</p>
                        \\[q''(s) = s\\, q(s) + 2q(s)^3, \\quad q(s) \\sim \\mathrm{Ai}(s) \\text{ as } s \\to +\\infty,\\]
                        <p>where \\(\\mathrm{Ai}\\) is the Airy function. The distribution functions are:</p>
                        \\[F_2(s) = \\exp\\left(-\\int_s^\\infty (x-s)\\, q(x)^2 \\, dx\\right), \\quad (\\mathrm{TW}_2)\\]
                        \\[F_1(s) = \\exp\\left(-\\frac{1}{2}\\int_s^\\infty q(x)\\,dx\\right) \\cdot F_2(s)^{1/2}. \\quad (\\mathrm{TW}_1)\\]
                        <p>Here \\(\\mathrm{TW}_1\\) arises from the GOE (Gaussian Orthogonal Ensemble, real symmetric matrices) and \\(\\mathrm{TW}_2\\) from the GUE (Gaussian Unitary Ensemble, complex Hermitian matrices).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Properties of TW Distributions)</div>
                    <div class="env-body">
                        <p>Key properties of the Tracy-Widom distributions:</p>
                        <ul>
                            <li><strong>Non-Gaussian:</strong> Both \\(\\mathrm{TW}_1\\) and \\(\\mathrm{TW}_2\\) are skewed to the left, with a heavier left tail and a rapidly decaying right tail.</li>
                            <li><strong>Mean and variance:</strong> \\(\\mathrm{TW}_1\\) has mean \\(\\approx -1.2065\\) and variance \\(\\approx 1.6078\\). \\(\\mathrm{TW}_2\\) has mean \\(\\approx -1.7711\\) and variance \\(\\approx 0.8132\\).</li>
                            <li><strong>Tail behavior:</strong> The right tail decays like \\(\\exp(-\\frac{2}{3}s^{3/2})\\), much faster than Gaussian \\(\\exp(-s^2/2)\\). The left tail decays like \\(\\exp(-\\frac{1}{12}|s|^3)\\).</li>
                        </ul>
                    </div>
                </div>

                <h3>Tracy-Widom Limit for Sample Covariance</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.11 (Tracy-Widom Law for Largest Eigenvalue)</div>
                    <div class="env-body">
                        <p>Let \\(X \\in \\mathbb{R}^{p \\times n}\\) have i.i.d. \\(N(0,1)\\) entries, and let \\(\\hat{\\lambda}_1\\) be the largest eigenvalue of \\(W = \\frac{1}{n}XX^\\top\\). Define the centering and scaling</p>
                        \\[\\mu_{n,p} = \\left(\\sqrt{n} + \\sqrt{p}\\right)^2, \\quad \\sigma_{n,p} = \\left(\\sqrt{n} + \\sqrt{p}\\right)\\left(\\frac{1}{\\sqrt{n}} + \\frac{1}{\\sqrt{p}}\\right)^{1/3}.\\]
                        <p>Then as \\(n, p \\to \\infty\\):</p>
                        \\[\\frac{n \\hat{\\lambda}_1 - \\mu_{n,p}}{\\sigma_{n,p}} \\xrightarrow{d} \\mathrm{TW}_1.\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Why not Gaussian? The largest eigenvalue is not a simple sum of independent quantities. It arises from a complex interplay among all matrix entries. The Tracy-Widom distribution captures the universal fluctuation pattern at the spectral edge of random matrices, much as the Gaussian captures fluctuations of sums of independent variables.</p>
                        <p>The \\(n^{2/3}\\) scaling (hidden in \\(\\sigma_{n,p}\\)) is characteristic: bulk eigenvalue fluctuations scale as \\(n^{-1/2}\\) (CLT rate), but edge fluctuations scale as \\(n^{-2/3}\\), a slower rate reflecting the "soft edge" phenomenon.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-tracy-widom"></div>

                <h3>Wigner Matrices and Universality</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.12 (TW for Wigner Matrices)</div>
                    <div class="env-body">
                        <p>Let \\(W_n\\) be an \\(n \\times n\\) Wigner matrix from the GOE (entries i.i.d. \\(N(0, 1/n)\\) above diagonal, \\(N(0, 2/n)\\) on diagonal). Let \\(\\lambda_1\\) be its largest eigenvalue. Then</p>
                        \\[\\frac{\\lambda_1 - 2}{n^{-2/3}} \\xrightarrow{d} \\mathrm{TW}_1.\\]
                        <p>For the GUE (complex Hermitian with i.i.d. complex Gaussian entries):</p>
                        \\[\\frac{\\lambda_1 - 2}{n^{-2/3}} \\xrightarrow{d} \\mathrm{TW}_2.\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.13 (Universality — Soshnikov, Erdos-Yau)</div>
                    <div class="env-body">
                        <p>The Tracy-Widom limit holds far beyond Gaussian entries. If \\(W_n\\) is a Wigner matrix with i.i.d. (up to symmetry) entries having mean 0, variance \\(1/n\\), and <strong>sub-exponential tails</strong>, then \\(n^{2/3}(\\lambda_1 - 2) \\xrightarrow{d} \\mathrm{TW}_1\\). This is the celebrated <strong>edge universality</strong> phenomenon.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 7.14 (TW Quantiles)</div>
                    <div class="env-body">
                        <p>Some quantiles of \\(\\mathrm{TW}_1\\):</p>
                        <ul>
                            <li>\\(P(\\mathrm{TW}_1 \\leq -3.90) \\approx 0.01\\)</li>
                            <li>\\(P(\\mathrm{TW}_1 \\leq -2.02) \\approx 0.05\\)</li>
                            <li>\\(P(\\mathrm{TW}_1 \\leq -1.27) \\approx 0.10\\)</li>
                            <li>\\(P(\\mathrm{TW}_1 \\leq 0.98) \\approx 0.95\\)</li>
                            <li>\\(P(\\mathrm{TW}_1 \\leq 2.02) \\approx 0.99\\)</li>
                        </ul>
                        <p>Notice the asymmetry: the 5th percentile is at \\(-2.02\\) while the 95th is at \\(0.98\\). The distribution is markedly left-skewed.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-tracy-widom',
                    title: 'Tracy-Widom Distribution',
                    description: 'Histogram of the rescaled largest eigenvalue \\((\\lambda_{\\max} - \\mu)/\\sigma\\) for null Wigner (GOE) matrices. The overlay shows a TW\\(_1\\) density approximation (solid curve) versus a Gaussian (dashed). Notice the left skew and the sharply decaying right tail.',
                    setup: function(container, controls) {
                        var width = 700, height = 420;
                        var viz = new VizEngine(container, { width: width, height: height, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var matSize = 50;
                        var numTrials = 2000;
                        var samples = [];
                        var needsResample = true;

                        var sizeSlider = VizEngine.createSlider(controls, 'n', 10, 200, matSize, 10, function(v) {
                            matSize = Math.round(v);
                            needsResample = true;
                        });
                        VizEngine.createButton(controls, 'Resample', function() {
                            needsResample = true;
                        });

                        // Generate a symmetric GOE matrix and return its largest eigenvalue
                        function goeMaxEigenvalue(n) {
                            // Build symmetric matrix with N(0,1/n) off-diagonal, N(0,2/n) diagonal
                            // Use power iteration approximation for speed
                            // Actually, for moderate n, let us use the tridiagonal reduction approach
                            // For a GOE matrix, the eigenvalues can be obtained via tridiagonal beta-ensemble
                            // Beta=1 tridiagonal model: diagonal N(0,2), off-diagonal chi_{n-k}
                            var diag = [];
                            var offdiag = [];
                            for (var i = 0; i < n; i++) {
                                diag.push(randn() * Math.sqrt(2));
                            }
                            for (var i = 0; i < n - 1; i++) {
                                // chi_{n-1-i} distribution: sqrt of chi-squared with (n-1-i) dof
                                var df = n - 1 - i;
                                var chi = 0;
                                for (var j = 0; j < df; j++) {
                                    var z = randn();
                                    chi += z * z;
                                }
                                offdiag.push(Math.sqrt(chi));
                            }
                            // Largest eigenvalue of tridiagonal matrix via bisection or power iteration
                            // Use QR / Sturm sequence for largest eigenvalue
                            // For simplicity and speed, use power iteration on tridiagonal
                            var v = new Array(n);
                            for (var i = 0; i < n; i++) v[i] = randn();
                            var norm = 0;
                            for (var i = 0; i < n; i++) norm += v[i] * v[i];
                            norm = Math.sqrt(norm);
                            for (var i = 0; i < n; i++) v[i] /= norm;

                            var lam = 0;
                            for (var iter = 0; iter < 80; iter++) {
                                // Multiply tridiagonal by v
                                var w = new Array(n);
                                for (var i = 0; i < n; i++) {
                                    w[i] = diag[i] * v[i];
                                    if (i > 0) w[i] += offdiag[i - 1] * v[i - 1];
                                    if (i < n - 1) w[i] += offdiag[i] * v[i + 1];
                                }
                                lam = 0;
                                for (var i = 0; i < n; i++) lam += w[i] * v[i];
                                norm = 0;
                                for (var i = 0; i < n; i++) norm += w[i] * w[i];
                                norm = Math.sqrt(norm);
                                if (norm < 1e-15) break;
                                for (var i = 0; i < n; i++) v[i] = w[i] / norm;
                            }
                            // Rescale: the tridiagonal has entries sqrt(2)*N(0,1) on diag
                            // and chi_{n-k} on off-diag. The scaling gives eigenvalues of order sqrt(n).
                            // For GOE with variance 1/n, the edge is at 2.
                            // Our tridiagonal has edge at 2*sqrt(n), so divide by sqrt(n).
                            return lam / Math.sqrt(n);
                        }

                        function randn() {
                            var u = 0, v = 0;
                            while (u === 0) u = Math.random();
                            while (v === 0) v = Math.random();
                            return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
                        }

                        function generateSamples() {
                            samples = [];
                            var n = matSize;
                            var mu = 2; // Wigner semicircle edge
                            var sigma = Math.pow(n, -2 / 3);
                            for (var t = 0; t < numTrials; t++) {
                                var lamMax = goeMaxEigenvalue(n);
                                samples.push((lamMax - mu) / sigma);
                            }
                            needsResample = false;
                        }

                        // TW1 density approximation (using a shifted & scaled approximation)
                        // Based on the well-known numerical approximation
                        function tw1Density(s) {
                            // Numerical approximation to the TW1 density
                            // Using the fact that TW1 can be approximated reasonably by
                            // a shifted Gamma-type distribution or a numerical fit.
                            // We use the Bornemann numerical approximation approach:
                            // f(s) ~ C * exp(-2/3 * s^(3/2)) for s >> 0
                            // f(s) ~ C * exp(-|s|^3 / 12) for s << 0
                            // A practical approximation due to Prahofer-Spohn / numerical tables:
                            var mean = -1.2065;
                            var variance = 1.6078;
                            var skewness = 0.2935;
                            var kurtosis = 0.1652;
                            // Use a Pearson type distribution or simple numerical fit
                            // For visualization, we use a tabulated spline approach
                            // Approximate with shifted generalized extreme value
                            var mu_gev = -1.77;
                            var sig_gev = 0.90;
                            var xi_gev = -0.30; // shape
                            // GEV density: (1/sig)*t^(-1-1/xi)*exp(-t^(-1/xi))
                            // where t = (1 + xi*(s-mu)/sig)
                            var t = 1 + xi_gev * (s - mu_gev) / sig_gev;
                            if (t <= 0) return 0;
                            var logf = -Math.log(sig_gev) + (-1 - 1 / xi_gev) * Math.log(t) - Math.pow(t, -1 / xi_gev);
                            return Math.exp(logf);
                        }

                        function draw() {
                            if (needsResample) generateSamples();

                            viz.clear();
                            if (samples.length === 0) return;

                            var mL = 70, mR = 30, mT = 30, mB = 55;
                            var plotW = width - mL - mR;
                            var plotH = height - mT - mB;

                            // Determine histogram range
                            var sMin = -6, sMax = 4;
                            var nBins = 50;
                            var binW = (sMax - sMin) / nBins;
                            var bins = new Array(nBins).fill(0);
                            var validCount = 0;
                            for (var i = 0; i < samples.length; i++) {
                                var idx = Math.floor((samples[i] - sMin) / binW);
                                if (idx >= 0 && idx < nBins) { bins[idx]++; validCount++; }
                            }
                            // Normalize to density
                            var maxDensity = 0;
                            for (var i = 0; i < nBins; i++) {
                                bins[i] = bins[i] / (validCount * binW);
                                if (bins[i] > maxDensity) maxDensity = bins[i];
                            }

                            // Also compute TW1 max density in range
                            for (var s = sMin; s <= sMax; s += 0.05) {
                                var d = tw1Density(s);
                                if (d > maxDensity) maxDensity = d;
                            }
                            // And Gaussian density
                            var sampleMean = 0, sampleVar = 0;
                            for (var i = 0; i < samples.length; i++) sampleMean += samples[i];
                            sampleMean /= samples.length;
                            for (var i = 0; i < samples.length; i++) sampleVar += (samples[i] - sampleMean) * (samples[i] - sampleMean);
                            sampleVar /= (samples.length - 1);
                            var sampleStd = Math.sqrt(sampleVar);
                            for (var s = sMin; s <= sMax; s += 0.05) {
                                var gd = Math.exp(-0.5 * Math.pow((s - sampleMean) / sampleStd, 2)) / (sampleStd * Math.sqrt(2 * Math.PI));
                                if (gd > maxDensity) maxDensity = gd;
                            }

                            maxDensity *= 1.15; // padding

                            function mapX(s) { return mL + (s - sMin) / (sMax - sMin) * plotW; }
                            function mapY(d) { return mT + plotH - (d / maxDensity) * plotH; }

                            // Grid
                            ctx.strokeStyle = '#1a1a40';
                            ctx.lineWidth = 0.5;
                            for (var gs = Math.ceil(sMin); gs <= Math.floor(sMax); gs++) {
                                var gxp = mapX(gs);
                                ctx.beginPath(); ctx.moveTo(gxp, mT); ctx.lineTo(gxp, mT + plotH); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = '#4a4a7a';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(mL, mT + plotH); ctx.lineTo(mL + plotW, mT + plotH); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(mL, mT); ctx.lineTo(mL, mT + plotH); ctx.stroke();

                            // Histogram bars
                            for (var i = 0; i < nBins; i++) {
                                if (bins[i] === 0) continue;
                                var bx = mapX(sMin + i * binW);
                                var bw = mapX(sMin + (i + 1) * binW) - bx;
                                var by = mapY(bins[i]);
                                var bh = (mT + plotH) - by;
                                ctx.fillStyle = 'rgba(88,166,255,0.35)';
                                ctx.fillRect(bx, by, bw, bh);
                                ctx.strokeStyle = 'rgba(88,166,255,0.6)';
                                ctx.lineWidth = 0.8;
                                ctx.strokeRect(bx, by, bw, bh);
                            }

                            // TW1 density curve
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var first = true;
                            for (var s = sMin; s <= sMax; s += 0.05) {
                                var px = mapX(s);
                                var py = mapY(tw1Density(s));
                                if (first) { ctx.moveTo(px, py); first = false; }
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Gaussian density curve (dashed)
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            first = true;
                            for (var s = sMin; s <= sMax; s += 0.05) {
                                var gd = Math.exp(-0.5 * Math.pow((s - sampleMean) / sampleStd, 2)) / (sampleStd * Math.sqrt(2 * Math.PI));
                                var px = mapX(s);
                                var py = mapY(gd);
                                if (first) { ctx.moveTo(px, py); first = false; }
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Zero line
                            ctx.strokeStyle = 'rgba(248,81,73,0.4)';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([3, 3]);
                            ctx.beginPath(); ctx.moveTo(mapX(0), mT); ctx.lineTo(mapX(0), mT + plotH); ctx.stroke();
                            ctx.setLineDash([]);

                            // Axis labels
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var gs2 = Math.ceil(sMin); gs2 <= Math.floor(sMax); gs2++) {
                                ctx.fillText(gs2, mapX(gs2), mT + plotH + 4);
                            }
                            ctx.fillText('(\u03BB_max \u2212 \u03BC) / \u03C3', mL + plotW / 2, mT + plotH + 22);

                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Density', mL - 8, mT + 10);

                            // Legend
                            var legX = mL + plotW - 180, legY = mT + 15;
                            ctx.fillStyle = 'rgba(12,12,32,0.7)';
                            ctx.fillRect(legX - 5, legY - 5, 185, 68);

                            ctx.fillStyle = 'rgba(88,166,255,0.5)';
                            ctx.fillRect(legX, legY, 16, 12);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Simulation (n=' + matSize + ', ' + numTrials + ' trials)', legX + 22, legY + 6);

                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(legX, legY + 25); ctx.lineTo(legX + 16, legY + 25); ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('TW\u2081 approximation', legX + 22, legY + 25);

                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath(); ctx.moveTo(legX, legY + 44); ctx.lineTo(legX + 16, legY + 44); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('Matched Gaussian', legX + 22, legY + 44);

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Tracy-Widom TW\u2081: Rescaled \u03BB_max of GOE Matrices', mL + 5, mT + 3);

                            // Stats
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Sample mean: ' + sampleMean.toFixed(3) + '  (TW\u2081 mean \u2248 \u22121.21)', mL + 5, mT + plotH - 35);
                            ctx.fillText('Sample std: ' + sampleStd.toFixed(3) + '  (TW\u2081 std \u2248 1.27)', mL + 5, mT + plotH - 20);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: []
        },

        // ============================================================
        // SECTION 5: Statistical Testing
        // ============================================================
        {
            id: 'ch07-sec05',
            title: 'Statistical Testing',
            content: `
                <h2>Statistical Testing: Detecting Signal in High-Dimensional PCA</h2>

                <p>The theoretical results of the preceding sections have direct statistical consequences. We now formalize the problem of testing for the presence of a signal (spike) in a high-dimensional dataset.</p>

                <h3>The Hypothesis Testing Problem</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 7.15 (Spiked Hypothesis Test)</div>
                    <div class="env-body">
                        <p>Given \\(x_1, \\ldots, x_n \\sim N(0, \\Sigma)\\) with \\(x_i \\in \\mathbb{R}^p\\), we wish to test:</p>
                        \\[H_0: \\Sigma = I_p \\quad \\text{(no signal)}\\]
                        \\[H_1: \\Sigma = I_p + \\theta \\, vv^\\top \\quad \\text{for some } \\theta &gt; 0,\\, \\|v\\| = 1.\\]
                        <p>The natural test statistic is the <strong>Roy's largest root</strong>:</p>
                        \\[T_n = \\hat{\\lambda}_1 = \\lambda_{\\max}\\left(\\frac{1}{n}XX^\\top\\right).\\]
                    </div>
                </div>

                <h3>Tracy-Widom Test</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.16 (Tracy-Widom Test for Spiked Signals)</div>
                    <div class="env-body">
                        <p>Under \\(H_0: \\Sigma = I_p\\) with \\(p/n \\to \\gamma\\), the standardized Roy statistic</p>
                        \\[T^\\star = \\frac{n \\hat{\\lambda}_1 - \\mu_{n,p}}{\\sigma_{n,p}}\\]
                        <p>converges in distribution to \\(\\mathrm{TW}_1\\). The test rejects \\(H_0\\) at significance level \\(\\alpha\\) if \\(T^\\star &gt; q_{\\alpha}\\), where \\(q_{\\alpha}\\) is the \\((1-\\alpha)\\)-quantile of \\(\\mathrm{TW}_1\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Centering and Scaling Constants)</div>
                    <div class="env-body">
                        <p>Recall the constants from Theorem 7.11:</p>
                        \\[\\mu_{n,p} = (\\sqrt{n} + \\sqrt{p})^2, \\qquad \\sigma_{n,p} = (\\sqrt{n} + \\sqrt{p})\\left(\\frac{1}{\\sqrt{n}} + \\frac{1}{\\sqrt{p}}\\right)^{1/3}.\\]
                        <p>These depend only on \\(n\\) and \\(p\\), not on the data. In practice, one can also use refined centering constants (e.g., using exact moments of \\(\\hat{\\lambda}_1\\) for finite \\(n, p\\)) for better finite-sample performance.</p>
                    </div>
                </div>

                <h3>Power of the Test and BBP Implications</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.17 (Power at the BBP Threshold)</div>
                    <div class="env-body">
                        <p>The power of the Tracy-Widom test exhibits the following behavior:</p>
                        <ol>
                            <li><strong>Subcritical</strong> (\\(\\theta &lt; \\sqrt{\\gamma}\\)): The power converges to the significance level \\(\\alpha\\). The test cannot distinguish \\(H_1\\) from \\(H_0\\). The spike is statistically undetectable.</li>
                            <li><strong>Critical</strong> (\\(\\theta = \\sqrt{\\gamma}\\)): The standardized statistic \\(T^\\star\\) still converges to \\(\\mathrm{TW}_1\\). The power remains at \\(\\alpha\\).</li>
                            <li><strong>Supercritical</strong> (\\(\\theta &gt; \\sqrt{\\gamma}\\)): The power converges to 1. As \\(n \\to \\infty\\), the outlier eigenvalue separates from the bulk, and the test detects the signal with probability tending to 1.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The BBP phase transition is a <strong>statistical phase transition</strong>: it delineates the boundary between regimes where detection is possible and impossible. In the subcritical regime, no test based on eigenvalues — and in fact no test at all — can do better than random guessing (in the asymptotic limit). This is not a limitation of PCA specifically; it is an information-theoretic impossibility. The signal is simply too weak relative to the high-dimensional noise.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.18 (Information-Theoretic Lower Bound — Onatski, Moreira, Hallin 2013)</div>
                    <div class="env-body">
                        <p>Consider testing \\(H_0: \\theta = 0\\) versus \\(H_1: \\theta = \\theta_0\\) in the single-spike model with \\(p/n \\to \\gamma\\). If \\(\\theta_0 &lt; \\sqrt{\\gamma}\\), then the sum of type I and type II errors for any test converges to 1:</p>
                        \\[\\inf_{\\phi} \\left[\\mathbb{P}_{H_0}(\\phi = 1) + \\mathbb{P}_{H_1}(\\phi = 0)\\right] \\to 1.\\]
                        <p>That is, \\(\\theta = \\sqrt{\\gamma}\\) is the <strong>optimal detection boundary</strong>, not just for PCA but for any statistical procedure.</p>
                    </div>
                </div>

                <h3>Practical Implementation</h3>

                <div class="env-block example">
                    <div class="env-title">Example 7.19 (Gene Expression Testing)</div>
                    <div class="env-body">
                        <p>Suppose we have \\(n = 100\\) patient samples with \\(p = 500\\) gene expression measurements. Then \\(\\gamma = 5\\) and \\(\\sqrt{\\gamma} \\approx 2.236\\). The MP right edge is \\((1 + \\sqrt{5})^2 \\approx 10.47\\).</p>
                        <p>The centering and scaling are \\(\\mu = (10+\\sqrt{500})^2 \\approx 972.4\\) and \\(\\sigma \\approx 30.5\\cdot 0.783 \\approx 23.9\\).</p>
                        <p>If the observed \\(n\\hat{\\lambda}_1 = 1050\\), then \\(T^\\star = (1050 - 972.4)/23.9 \\approx 3.25\\). Since the 99th percentile of \\(\\mathrm{TW}_1\\) is about 2.02, we reject \\(H_0\\) with high confidence, concluding that there is a detectable signal component in the gene expression data.</p>
                    </div>
                </div>

                <h3>Summary of the Phase Transition Picture</h3>

                <p>We can now paint the complete picture of high-dimensional PCA under the spiked model:</p>

                <table style="width:100%;border-collapse:collapse;margin:16px 0;">
                <tr style="border-bottom:2px solid #30363d;">
                    <th style="padding:8px;text-align:left;color:#f0f6fc;">Property</th>
                    <th style="padding:8px;text-align:center;color:#f85149;">Subcritical (\\(\\theta \\leq \\sqrt{\\gamma}\\))</th>
                    <th style="padding:8px;text-align:center;color:#3fb950;">Supercritical (\\(\\theta &gt; \\sqrt{\\gamma}\\))</th>
                </tr>
                <tr style="border-bottom:1px solid #21262d;">
                    <td style="padding:8px;">Top eigenvalue</td>
                    <td style="padding:8px;text-align:center;">\\((1+\\sqrt{\\gamma})^2\\) (at MP edge)</td>
                    <td style="padding:8px;text-align:center;">\\((1+\\theta)(1+\\gamma/\\theta)\\) (outlier)</td>
                </tr>
                <tr style="border-bottom:1px solid #21262d;">
                    <td style="padding:8px;">Eigenvector cosine</td>
                    <td style="padding:8px;text-align:center;">\\(0\\) (orthogonal to truth)</td>
                    <td style="padding:8px;text-align:center;">\\((\\theta^2-\\gamma)/(\\theta(\\theta+\\gamma))\\)</td>
                </tr>
                <tr style="border-bottom:1px solid #21262d;">
                    <td style="padding:8px;">Fluctuations of \\(\\hat{\\lambda}_1\\)</td>
                    <td style="padding:8px;text-align:center;">Tracy-Widom at scale \\(n^{-2/3}\\)</td>
                    <td style="padding:8px;text-align:center;">Gaussian at scale \\(n^{-1/2}\\)</td>
                </tr>
                <tr>
                    <td style="padding:8px;">Detection</td>
                    <td style="padding:8px;text-align:center;">Impossible</td>
                    <td style="padding:8px;text-align:center;">Consistent</td>
                </tr>
                </table>

                <div class="env-block remark">
                    <div class="env-title">Remark (Beyond Gaussian Entries)</div>
                    <div class="env-body">
                        <p>The BBP transition and Tracy-Widom fluctuations extend far beyond Gaussian data, thanks to universality results. For data with i.i.d. entries having finite fourth moments, the same phase transition occurs at \\(\\theta = \\sqrt{\\gamma}\\) with the same limiting eigenvalue and eigenvector formulas. The Tracy-Widom fluctuations in the null case hold under even weaker moment conditions. This universality makes the spiked model framework a robust tool for practical high-dimensional data analysis.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Consider the single-spike model \\(\\Sigma = I_p + \\theta \\, vv^\\top\\) with \\(p/n \\to \\gamma = 0.25\\). Compute the critical threshold \\(\\theta_{\\mathrm{crit}}\\). For \\(\\theta = 1\\), find the limiting position of the top sample eigenvalue and the squared cosine \\(|\\langle \\hat{v}_1, v_1\\rangle|^2\\).',
                    hint: 'The critical threshold is \\(\\sqrt{\\gamma}\\). For the eigenvalue, use the BBP formula \\(\\lambda^\\star(\\theta) = (1+\\theta)(1+\\gamma/\\theta)\\). For the eigenvector cosine, use \\(c = (\\theta^2 - \\gamma)/(\\theta(\\theta + \\gamma))\\).',
                    solution: 'The critical threshold is \\(\\theta_{\\mathrm{crit}} = \\sqrt{0.25} = 0.5\\). Since \\(\\theta = 1 > 0.5\\), we are in the supercritical regime. The top eigenvalue converges to \\(\\lambda^\\star(1) = (1+1)(1+0.25/1) = 2 \\times 1.25 = 2.5\\). The population eigenvalue is \\(1 + \\theta = 2\\), so there is a bias of \\(0.5\\). The squared cosine is \\(c = (1 - 0.25)/(1 \\times 1.25) = 0.75/1.25 = 0.6\\). So PCA recovers 60% of the true signal direction.'
                },
                {
                    question: 'Show that the BBP formula \\(\\lambda^\\star(\\theta) = (1+\\theta)(1+\\gamma/\\theta)\\) can be inverted: given an observed outlier eigenvalue \\(\\ell > (1+\\sqrt{\\gamma})^2\\), express \\(\\theta\\) as a function of \\(\\ell\\) and \\(\\gamma\\).',
                    hint: 'Expand \\(\\lambda^\\star(\\theta) = 1 + \\theta + \\gamma + \\gamma/\\theta = \\ell\\) and solve the resulting quadratic in \\(\\theta\\).',
                    solution: 'From \\(\\ell = 1 + \\theta + \\gamma + \\gamma/\\theta\\), multiply through by \\(\\theta\\): \\(\\ell \\theta = \\theta + \\theta^2 + \\gamma\\theta + \\gamma\\), so \\(\\theta^2 - (\\ell - 1 - \\gamma)\\theta + \\gamma = 0\\). By the quadratic formula: \\(\\theta = \\frac{(\\ell - 1 - \\gamma) \\pm \\sqrt{(\\ell - 1 - \\gamma)^2 - 4\\gamma}}{2}\\). Since \\(\\theta > \\sqrt{\\gamma} > 0\\) and \\(\\ell > (1+\\sqrt{\\gamma})^2\\), both roots are positive. The correct root is the larger one (the "+" branch): \\(\\theta = \\frac{(\\ell - 1 - \\gamma) + \\sqrt{(\\ell - 1 - \\gamma)^2 - 4\\gamma}}{2}\\). One can verify that at \\(\\ell = (1+\\sqrt{\\gamma})^2\\), the discriminant vanishes and \\(\\theta = \\sqrt{\\gamma}\\).'
                },
                {
                    question: 'Explain why the Tracy-Widom distribution, not the Gaussian, governs the fluctuations of \\(\\lambda_{\\max}\\) in random matrices. What is the fundamental difference between the \\(n^{-1/2}\\) scale (for bulk eigenvalue statistics) and the \\(n^{-2/3}\\) scale (for edge statistics)?',
                    hint: 'Think about the density of the Marchenko-Pastur (or semicircle) distribution near the edge versus the bulk. The density vanishes at the edge like a square root, which changes the fluctuation scale.',
                    solution: 'In the bulk of the spectrum, the eigenvalue density is bounded away from zero, and each eigenvalue feels the "repulsion" of many nearby eigenvalues. Individual eigenvalue spacings are of order \\(1/n\\), and linear statistics of bulk eigenvalues satisfy a CLT with \\(n^{-1/2}\\) fluctuations. At the edge, the density vanishes as \\(\\rho(\\lambda) \\sim C \\cdot (\\lambda_{\\mathrm{edge}} - \\lambda)^{1/2}\\) (the square-root vanishing of the MP/semicircle law). This means eigenvalues near the edge are more spread out, with typical spacing \\(\\sim n^{-2/3}\\) instead of \\(n^{-1}\\). The largest eigenvalue, being at the very tip of this soft edge, fluctuates on the \\(n^{-2/3}\\) scale. The Tracy-Widom distribution captures the specific competition between the repulsive eigenvalue interactions and the confining potential at the spectral edge — a balance that has no simple CLT description.'
                },
                {
                    question: 'In a gene expression study with \\(p = 1000\\) genes and \\(n = 200\\) samples, the largest sample eigenvalue is \\(\\hat{\\lambda}_1 = 12.5\\). Perform a Tracy-Widom test at significance level \\(\\alpha = 0.05\\) to determine whether there is a detectable signal. If you reject \\(H_0\\), estimate the spike strength \\(\\theta\\) using the bias-corrected estimator.',
                    hint: 'Compute \\(\\gamma = p/n = 5\\). The centering constant is \\(\\mu_{n,p} = (\\sqrt{n} + \\sqrt{p})^2\\) and the scaling is \\(\\sigma_{n,p} = (\\sqrt{n} + \\sqrt{p})(1/\\sqrt{n} + 1/\\sqrt{p})^{1/3}\\). The \\(\\mathrm{TW}_1\\) 95th percentile is approximately \\(0.98\\).',
                    solution: 'We have \\(\\gamma = 1000/200 = 5\\), \\(\\sqrt{n} = \\sqrt{200} \\approx 14.14\\), \\(\\sqrt{p} = \\sqrt{1000} \\approx 31.62\\). The centering: \\(\\mu_{n,p} = (14.14 + 31.62)^2 \\approx (45.76)^2 \\approx 2094.0\\). The scaling: \\(\\sigma_{n,p} = 45.76 \\times (1/14.14 + 1/31.62)^{1/3} = 45.76 \\times (0.0707 + 0.0316)^{1/3} = 45.76 \\times (0.1023)^{1/3} \\approx 45.76 \\times 0.4677 \\approx 21.4\\). The test statistic: \\(T^\\star = (200 \\times 12.5 - 2094.0)/21.4 = (2500 - 2094)/21.4 \\approx 406/21.4 \\approx 19.0\\). This massively exceeds the 95th percentile of \\(\\mathrm{TW}_1\\) (\\(\\approx 0.98\\)), so we strongly reject \\(H_0\\). For the spike estimate: \\(\\ell = \\hat{\\lambda}_1 = 12.5\\), \\(\\ell - 1 - \\gamma = 12.5 - 1 - 5 = 6.5\\). Then \\(\\hat{\\theta} = (6.5 + \\sqrt{6.5^2 - 4 \\times 5})/2 = (6.5 + \\sqrt{42.25 - 20})/2 = (6.5 + \\sqrt{22.25})/2 = (6.5 + 4.717)/2 \\approx 5.61\\). The estimated population eigenvalue is \\(1 + \\hat{\\theta} \\approx 6.61\\), considerably less than the naive estimate of \\(12.5\\). This demonstrates the severity of eigenvalue inflation in high dimensions.'
                }
            ]
        }
    ]
});
