window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch11',
    number: 11,
    title: 'Multiple Testing & FDR',
    subtitle: 'Controlling false discoveries in high-dimensional inference',
    sections: [
        // ============================================================
        // SECTION 1: The Multiple Testing Problem
        // ============================================================
        {
            id: 'ch11-sec01',
            title: 'The Multiple Testing Problem',
            content: `
                <h2>The Multiple Testing Problem</h2>

                <p>In modern high-dimensional statistics, we routinely face situations where thousands or even millions of hypothesis tests are conducted simultaneously. A genome-wide association study may test \\(m = 500{,}000\\) SNPs for association with a disease. A neuroimaging study may test \\(m = 100{,}000\\) voxels for activation. In these settings, classical single-test methodology breaks down catastrophically.</p>

                <h3>Setup</h3>

                <p>We consider \\(m\\) simultaneous hypothesis tests:</p>
                \\[H_{0,i} \\quad \\text{vs.} \\quad H_{1,i}, \\quad i = 1, \\ldots, m.\\]
                <p>For each test, we observe a <strong>p-value</strong> \\(p_i\\). Under the null hypothesis \\(H_{0,i}\\), the p-value satisfies \\(\\mathbb{P}(p_i \\leq t) \\leq t\\) for all \\(t \\in [0,1]\\). Under the alternative \\(H_{1,i}\\), the p-value tends to be small.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 11.1 (Multiple Testing Framework)</div>
                    <div class="env-body">
                        <p>Among the \\(m\\) hypotheses, let \\(\\mathcal{H}_0 \\subseteq \\{1, \\ldots, m\\}\\) denote the set of <strong>true nulls</strong>, with \\(m_0 = |\\mathcal{H}_0|\\). The remaining \\(m_1 = m - m_0\\) hypotheses are true alternatives. We call \\(\\pi_0 = m_0/m\\) the <strong>null proportion</strong>.</p>
                        <p>A multiple testing procedure selects a <strong>rejection set</strong> \\(\\mathcal{R} \\subseteq \\{1, \\ldots, m\\}\\). Write \\(R = |\\mathcal{R}|\\). The outcomes are summarized in the following table:</p>
                        <table style="margin:12px auto;border-collapse:collapse;font-size:0.92em;">
                            <tr style="border-bottom:2px solid #30363d;">
                                <td style="padding:6px 16px;"></td>
                                <td style="padding:6px 16px;color:#3fb950;font-weight:600;">Not Rejected</td>
                                <td style="padding:6px 16px;color:#f85149;font-weight:600;">Rejected</td>
                                <td style="padding:6px 16px;font-weight:600;">Total</td>
                            </tr>
                            <tr>
                                <td style="padding:6px 16px;font-weight:600;">True Null</td>
                                <td style="padding:6px 16px;">\\(U\\)</td>
                                <td style="padding:6px 16px;">\\(V\\) (false discoveries)</td>
                                <td style="padding:6px 16px;">\\(m_0\\)</td>
                            </tr>
                            <tr>
                                <td style="padding:6px 16px;font-weight:600;">True Alt.</td>
                                <td style="padding:6px 16px;">\\(T\\) (missed)</td>
                                <td style="padding:6px 16px;">\\(S\\) (true discoveries)</td>
                                <td style="padding:6px 16px;">\\(m_1\\)</td>
                            </tr>
                            <tr style="border-top:2px solid #30363d;">
                                <td style="padding:6px 16px;font-weight:600;">Total</td>
                                <td style="padding:6px 16px;">\\(m - R\\)</td>
                                <td style="padding:6px 16px;">\\(R\\)</td>
                                <td style="padding:6px 16px;">\\(m\\)</td>
                            </tr>
                        </table>
                        <p>Here \\(V\\) counts <strong>false positives</strong> (type I errors among the rejections), and \\(S\\) counts <strong>true positives</strong>. Note that \\(V\\) and \\(S\\) are unobservable random variables: we see \\(R = V + S\\), but not the decomposition.</p>
                    </div>
                </div>

                <h3>The Danger of Ignoring Multiplicity</h3>

                <p>If each test is conducted at level \\(\\alpha = 0.05\\) independently, and all \\(m\\) nulls are true, the expected number of false rejections is \\(m\\alpha\\). For \\(m = 10{,}000\\), we expect <strong>500 spurious discoveries</strong> even when nothing is going on. The probability of <em>at least one</em> false rejection is:</p>
                \\[1 - (1 - \\alpha)^m \\approx 1 - e^{-m\\alpha}\\]
                <p>which is essentially 1 for any moderately large \\(m\\).</p>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Why multiplicity matters</div>
                    <div class="env-body">
                        <p>If you test a single coin for fairness, seeing 10 heads in a row is remarkable (\\(p \\approx 0.001\\)). But if you test 1000 coins, you <em>expect</em> about one of them to produce 10 heads. The evidence must be evaluated relative to the number of opportunities for a false positive.</p>
                    </div>
                </div>

                <h3>Family-Wise Error Rate</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 11.2 (FWER)</div>
                    <div class="env-body">
                        <p>The <strong>family-wise error rate</strong> is the probability of making at least one false discovery:</p>
                        \\[\\text{FWER} = \\mathbb{P}(V \\geq 1).\\]
                        <p>A procedure controls FWER at level \\(\\alpha\\) if \\(\\text{FWER} \\leq \\alpha\\) under any configuration of true and false nulls.</p>
                    </div>
                </div>

                <h3>The Bonferroni Correction</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 11.3 (Bonferroni Correction)</div>
                    <div class="env-body">
                        <p>Reject \\(H_{0,i}\\) whenever \\(p_i \\leq \\alpha/m\\). Then \\(\\text{FWER} \\leq \\alpha\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>By a union bound:</p>
                        \\[\\text{FWER} = \\mathbb{P}\\bigl(\\exists\\, i \\in \\mathcal{H}_0 : p_i \\leq \\alpha/m\\bigr) \\leq \\sum_{i \\in \\mathcal{H}_0} \\mathbb{P}(p_i \\leq \\alpha/m) \\leq m_0 \\cdot \\frac{\\alpha}{m} \\leq \\alpha.\\]
                        <p>No assumption on the dependence structure among the p-values is required.</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>Bonferroni is extremely conservative. For \\(m = 10{,}000\\) and \\(\\alpha = 0.05\\), the per-test threshold is \\(5 \\times 10^{-6}\\). Only very strong signals survive. This motivates the search for less conservative error criteria.</p>
                    </div>
                </div>

                <h3>Holm's Step-Down Procedure</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 11.4 (Holm's Procedure, 1979)</div>
                    <div class="env-body">
                        <p>Sort the p-values: \\(p_{(1)} \\leq p_{(2)} \\leq \\cdots \\leq p_{(m)}\\). Let \\(k^*\\) be the smallest index such that \\(p_{(k)} &gt; \\alpha/(m - k + 1)\\). Reject \\(H_{0,(1)}, \\ldots, H_{0,(k^*-1)}\\).</p>
                        <p>Then \\(\\text{FWER} \\leq \\alpha\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof sketch</div>
                    <div class="env-body">
                        <p>Let \\(p_{(j_1)} \\leq p_{(j_2)} \\leq \\cdots \\leq p_{(j_{m_0})}\\) be the sorted p-values corresponding to true nulls. If FWER is violated, then \\(p_{(j_1)}\\) is rejected. At the step when \\(p_{(j_1)}\\) is considered, at least \\(m_0\\) hypotheses remain untested, so the threshold is at most \\(\\alpha/m_0\\). Hence:</p>
                        \\[\\text{FWER} \\leq \\mathbb{P}\\bigl(p_{(j_1)} \\leq \\alpha/m_0\\bigr) \\leq \\mathbb{P}\\Bigl(\\min_{i \\in \\mathcal{H}_0} p_i \\leq \\alpha/m_0\\Bigr) \\leq m_0 \\cdot \\frac{\\alpha}{m_0} = \\alpha.\\]
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 11.5</div>
                    <div class="env-body">
                        <p>Suppose \\(m = 5\\) and the sorted p-values are \\(0.001, 0.009, 0.02, 0.04, 0.12\\) with \\(\\alpha = 0.05\\). Then:</p>
                        <ul>
                            <li>Bonferroni threshold: \\(0.05/5 = 0.01\\). Rejects: \\(p_{(1)} = 0.001, p_{(2)} = 0.009\\). (2 rejections)</li>
                            <li>Holm thresholds: \\(0.05/5, 0.05/4, 0.05/3, 0.05/2, 0.05/1 = 0.01, 0.0125, 0.0167, 0.025, 0.05\\). Rejections: \\(p_{(1)} \\leq 0.01\\) (yes), \\(p_{(2)} \\leq 0.0125\\) (yes), \\(p_{(3)} \\leq 0.0167\\) (no, \\(0.02 &gt; 0.0167\\)). Stop: 2 rejections.</li>
                        </ul>
                        <p>In this case they coincide, but Holm is uniformly more powerful than Bonferroni.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">The conservatism of FWER</div>
                    <div class="env-body">
                        <p>FWER control requires that \\(\\mathbb{P}(V \\geq 1) \\leq \\alpha\\), treating even a single false positive among thousands of tests as unacceptable. In exploratory high-dimensional settings, this is often too stringent: it leads to extremely low power. We need a more permissive error criterion.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Let \\(p_1, \\ldots, p_m\\) be independent uniform p-values (all nulls true). Compute the exact FWER when rejecting at level \\(\\alpha/m\\) (Bonferroni). Show that \\(\\text{FWER} = 1 - (1 - \\alpha/m)^m \\to 1 - e^{-\\alpha}\\) as \\(m \\to \\infty\\), which is strictly less than \\(\\alpha\\). How large is the gap for \\(\\alpha = 0.05\\)?',
                    hint: 'Use independence to write \\(\\mathbb{P}(V = 0) = (1 - \\alpha/m)^m\\). Then use \\(\\lim_{m \\to \\infty}(1 - x/m)^m = e^{-x}\\).',
                    solution: 'Under the global null with independence, \\(\\text{FWER} = 1 - (1 - \\alpha/m)^m\\). As \\(m \\to \\infty\\), this converges to \\(1 - e^{-\\alpha}\\). For \\(\\alpha = 0.05\\), the limit is \\(1 - e^{-0.05} \\approx 0.04877\\), whereas the Bonferroni guarantee is \\(\\alpha = 0.05\\). The gap is about \\(0.00123\\), illustrating that Bonferroni is slightly conservative even in the best case.'
                },
                {
                    question: 'Prove that Holm\'s procedure is uniformly more powerful than the Bonferroni correction: any hypothesis rejected by Bonferroni is also rejected by Holm.',
                    hint: 'If \\(p_i \\leq \\alpha/m\\), where does \\(p_i\\) sit in the sorted order? What is the Holm threshold at that position?',
                    solution: 'Suppose Bonferroni rejects \\(H_{0,i}\\), i.e., \\(p_i \\leq \\alpha/m\\). In Holm\'s procedure, the threshold for the \\(k\\)-th smallest p-value is \\(\\alpha/(m - k + 1) \\geq \\alpha/m\\). At step \\(k\\) where \\(p_i = p_{(k)}\\), we have \\(p_{(k)} \\leq \\alpha/m \\leq \\alpha/(m - k + 1)\\). Moreover, all previous p-values \\(p_{(1)}, \\ldots, p_{(k-1)}\\) also satisfy \\(p_{(j)} \\leq p_{(k)} \\leq \\alpha/m \\leq \\alpha/(m - j + 1)\\), so the procedure has not stopped before step \\(k\\). Hence Holm also rejects \\(H_{0,i}\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 2: False Discovery Rate
        // ============================================================
        {
            id: 'ch11-sec02',
            title: 'False Discovery Rate',
            content: `
                <h2>False Discovery Rate</h2>

                <p>The key insight of Benjamini and Hochberg (1995) was to shift the focus from controlling the probability of <em>any</em> false discovery to controlling the expected <em>proportion</em> of false discoveries among all discoveries.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 11.6 (False Discovery Proportion and Rate)</div>
                    <div class="env-body">
                        <p>The <strong>false discovery proportion</strong> (FDP) is</p>
                        \\[\\text{FDP} = \\frac{V}{R \\vee 1} = \\frac{V}{\\max(R, 1)},\\]
                        <p>where \\(V\\) is the number of false rejections and \\(R\\) is the total number of rejections. The convention \\(R \\vee 1\\) avoids division by zero when \\(R = 0\\).</p>
                        <p>The <strong>false discovery rate</strong> (FDR) is the expectation:</p>
                        \\[\\text{FDR} = \\mathbb{E}\\left[\\frac{V}{R \\vee 1}\\right].\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Why FDR is the right criterion</div>
                    <div class="env-body">
                        <p>In a genomics study reporting 200 significant genes, a scientist might tolerate that 10 of them (5%) are false leads. What matters is the <em>fraction</em> of reported discoveries that are wrong, not whether any single one is wrong. FDR at level \\(q = 0.05\\) guarantees that, on average, no more than 5% of reported discoveries are false.</p>
                    </div>
                </div>

                <h3>Basic Properties of FDR</h3>

                <div class="env-block theorem">
                    <div class="env-title">Proposition 11.7 (FDR vs. FWER)</div>
                    <div class="env-body">
                        <ol>
                            <li>\\(\\text{FDR} \\leq \\text{FWER}\\) always.</li>
                            <li>If all nulls are true (\\(m_0 = m\\)), then \\(\\text{FDR} = \\text{FWER}\\).</li>
                            <li>If \\(m_1 &gt; 0\\), then \\(\\text{FDR} &lt; \\text{FWER}\\) typically.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof of (1) and (2)</div>
                    <div class="env-body">
                        <p>For (1): Note that \\(V/(R \\vee 1) \\leq \\mathbf{1}\\{V \\geq 1\\}\\), since if \\(V \\geq 1\\) then \\(R \\geq 1\\) and \\(V/R \\leq 1\\). Taking expectations: \\(\\text{FDR} \\leq \\mathbb{P}(V \\geq 1) = \\text{FWER}\\).</p>
                        <p>For (2): When all nulls are true, \\(R = V\\), so \\(V/(R \\vee 1) = V/(V \\vee 1) = \\mathbf{1}\\{V \\geq 1\\}\\). Hence \\(\\text{FDR} = \\mathbb{P}(V \\geq 1) = \\text{FWER}\\).</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: The gain from FDR</div>
                    <div class="env-body">
                        <p>Part (2) shows that under the global null, FDR and FWER coincide. The gain from FDR comes precisely when there are many true alternatives: FDR allows more rejections because it tolerates a controlled fraction of false positives <em>among the discoveries</em>, rather than demanding no false positives at all.</p>
                    </div>
                </div>

                <h3>The Power Advantage</h3>

                <p>Consider a concrete scenario. Suppose \\(m = 10{,}000\\), \\(m_1 = 500\\) true signals, and \\(\\alpha = q = 0.05\\).</p>

                <ul>
                    <li><strong>Bonferroni</strong>: per-test threshold \\(\\alpha/m = 5 \\times 10^{-6}\\). Only the very strongest signals are detected.</li>
                    <li><strong>BH at level \\(q\\)</strong>: the effective threshold adapts to the data and is typically much larger, leading to far more discoveries with a controlled false discovery proportion.</li>
                </ul>

                <div class="viz-placeholder" data-viz="viz-fdr-power"></div>

                <p>The visualization above demonstrates the dramatic power gain of BH over Bonferroni across different signal sparsity levels. When signals are sparse, Bonferroni has almost no power, while BH can still make many true discoveries.</p>

                <div class="env-block example">
                    <div class="env-title">Example 11.8 (Genomics motivation)</div>
                    <div class="env-body">
                        <p>In a genome-wide association study with \\(m = 500{,}000\\) SNPs and significance level \\(\\alpha = 0.05\\):</p>
                        <ul>
                            <li><strong>No correction</strong>: expect \\(25{,}000\\) false positives under the null — useless.</li>
                            <li><strong>Bonferroni</strong>: threshold \\(10^{-7}\\) (the "genome-wide significance" standard). Only the strongest effects survive.</li>
                            <li><strong>BH at \\(q = 0.05\\)</strong>: adapts to the data, typically yielding 5-50x more discoveries with a controlled false discovery rate.</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-fdr-power',
                    title: 'FDR vs FWER: Power Comparison',
                    description: 'Simulate m=1000 tests with varying sparsity. Compare power and realized FDR/FWER for Bonferroni vs BH. Click "Resimulate" for a fresh draw.',
                    setup: function(container, controls) {
                        var width = 700, height = 420;
                        var viz = new VizEngine(container, { width: width, height: height, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var m = 1000;
                        var pi1 = 0.05;
                        var mu = 3.0;
                        var qLevel = 0.10;

                        VizEngine.createSlider(controls, 'Signal frac', 0.01, 0.30, pi1, 0.01, function(v) { pi1 = v; simulate(); });
                        VizEngine.createSlider(controls, 'Signal strength', 1.0, 6.0, mu, 0.5, function(v) { mu = v; simulate(); });
                        VizEngine.createSlider(controls, 'q / alpha', 0.01, 0.20, qLevel, 0.01, function(v) { qLevel = v; simulate(); });
                        VizEngine.createButton(controls, 'Resimulate', function() { simulate(); });

                        // Simple normal CDF approximation
                        function normalCDF(x) {
                            var t = 1 / (1 + 0.2316419 * Math.abs(x));
                            var d = 0.3989422804014327 * Math.exp(-x * x / 2);
                            var p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.8212560 + t * 1.330274))));
                            return x > 0 ? 1 - p : p;
                        }

                        // Box-Muller for normal random variates
                        function randn() {
                            var u1 = Math.random(), u2 = Math.random();
                            return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
                        }

                        function simulate() {
                            var m1 = Math.round(m * pi1);
                            var m0 = m - m1;

                            // Generate z-scores: null ~ N(0,1), alt ~ N(mu,1)
                            var pvals = [];
                            var isNull = [];
                            for (var i = 0; i < m; i++) {
                                var z;
                                if (i < m0) {
                                    z = randn();
                                    isNull.push(true);
                                } else {
                                    z = mu + randn();
                                    isNull.push(false);
                                }
                                // Two-sided p-value
                                var p = 2 * (1 - normalCDF(Math.abs(z)));
                                pvals.push({ p: Math.max(p, 1e-15), isNull: isNull[i], idx: i });
                            }

                            // Sort by p-value
                            pvals.sort(function(a, b) { return a.p - b.p; });

                            // Bonferroni
                            var bonfThresh = qLevel / m;
                            var bonfR = 0, bonfV = 0, bonfS = 0;
                            for (var i = 0; i < m; i++) {
                                if (pvals[i].p <= bonfThresh) {
                                    bonfR++;
                                    if (pvals[i].isNull) bonfV++;
                                    else bonfS++;
                                }
                            }

                            // BH procedure
                            var bhK = 0;
                            for (var i = m - 1; i >= 0; i--) {
                                if (pvals[i].p <= (i + 1) / m * qLevel) {
                                    bhK = i + 1;
                                    break;
                                }
                            }
                            var bhR = bhK, bhV = 0, bhS = 0;
                            for (var i = 0; i < bhK; i++) {
                                if (pvals[i].isNull) bhV++;
                                else bhS++;
                            }

                            // Draw
                            viz.clear();
                            var lm = 80, rm = 30, tm = 50, bm = 60;
                            var plotW = (width - lm - rm - 40) / 2;
                            var plotH = height - tm - bm;

                            // --- Left panel: Power comparison ---
                            var leftX = lm;

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Power (True Positive Rate)', leftX + plotW / 2, tm - 30);

                            // Bar chart
                            var barW = plotW / 5;
                            var bonfPower = m1 > 0 ? bonfS / m1 : 0;
                            var bhPower = m1 > 0 ? bhS / m1 : 0;
                            var maxPow = Math.max(bonfPower, bhPower, 0.01);

                            // Y-axis
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(leftX, tm);
                            ctx.lineTo(leftX, tm + plotH);
                            ctx.lineTo(leftX + plotW, tm + plotH);
                            ctx.stroke();

                            // Y ticks
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var t = 0; t <= 1.001; t += 0.2) {
                                var yy = tm + plotH - t * plotH;
                                ctx.fillText(t.toFixed(1), leftX - 6, yy);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(leftX, yy);
                                ctx.lineTo(leftX + plotW, yy);
                                ctx.stroke();
                            }

                            // Bonferroni bar
                            var b1x = leftX + plotW * 0.2;
                            var b1h = bonfPower * plotH;
                            ctx.fillStyle = viz.colors.orange + 'aa';
                            ctx.fillRect(b1x, tm + plotH - b1h, barW, b1h);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(b1x, tm + plotH - b1h, barW, b1h);

                            // BH bar
                            var b2x = leftX + plotW * 0.55;
                            var b2h = bhPower * plotH;
                            ctx.fillStyle = viz.colors.blue + 'aa';
                            ctx.fillRect(b2x, tm + plotH - b2h, barW, b2h);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(b2x, tm + plotH - b2h, barW, b2h);

                            // Labels
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('Bonf', b1x + barW / 2, tm + plotH + 6);
                            ctx.fillText((bonfPower * 100).toFixed(1) + '%', b1x + barW / 2, tm + plotH + 22);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('BH', b2x + barW / 2, tm + plotH + 6);
                            ctx.fillText((bhPower * 100).toFixed(1) + '%', b2x + barW / 2, tm + plotH + 22);

                            // --- Right panel: FDP realized ---
                            var rightX = lm + plotW + 40;

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Realized FDP', rightX + plotW / 2, tm - 30);

                            // Y-axis
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(rightX, tm);
                            ctx.lineTo(rightX, tm + plotH);
                            ctx.lineTo(rightX + plotW, tm + plotH);
                            ctx.stroke();

                            // Y ticks
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var t = 0; t <= 1.001; t += 0.2) {
                                var yy = tm + plotH - t * plotH;
                                ctx.fillText(t.toFixed(1), rightX - 6, yy);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(rightX, yy);
                                ctx.lineTo(rightX + plotW, yy);
                                ctx.stroke();
                            }

                            // Target line
                            var targetY = tm + plotH - qLevel * plotH;
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([5, 3]);
                            ctx.beginPath();
                            ctx.moveTo(rightX, targetY);
                            ctx.lineTo(rightX + plotW, targetY);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.red;
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'bottom';
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('q = ' + qLevel.toFixed(2), rightX + plotW + 4, targetY + 4);

                            // FDP bars
                            var bonfFDP = bonfR > 0 ? bonfV / bonfR : 0;
                            var bhFDP = bhR > 0 ? bhV / bhR : 0;

                            var b3x = rightX + plotW * 0.2;
                            var b3h = Math.min(bonfFDP, 1) * plotH;
                            ctx.fillStyle = viz.colors.orange + 'aa';
                            ctx.fillRect(b3x, tm + plotH - b3h, barW, b3h);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(b3x, tm + plotH - b3h, barW, b3h);

                            var b4x = rightX + plotW * 0.55;
                            var b4h = Math.min(bhFDP, 1) * plotH;
                            ctx.fillStyle = viz.colors.blue + 'aa';
                            ctx.fillRect(b4x, tm + plotH - b4h, barW, b4h);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(b4x, tm + plotH - b4h, barW, b4h);

                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Bonf', b3x + barW / 2, tm + plotH + 6);
                            ctx.fillText((bonfFDP * 100).toFixed(1) + '%', b3x + barW / 2, tm + plotH + 22);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('BH', b4x + barW / 2, tm + plotH + 6);
                            ctx.fillText((bhFDP * 100).toFixed(1) + '%', b4x + barW / 2, tm + plotH + 22);

                            // Summary text
                            ctx.fillStyle = viz.colors.muted;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('m=' + m + '  m\u2081=' + m1 + '  Bonf: R=' + bonfR + ' V=' + bonfV + '  BH: R=' + bhR + ' V=' + bhV, width / 2, height - 16);
                        }

                        simulate();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that under the global null (\\(m_0 = m\\)), any procedure controlling FDR at level \\(q\\) also controls FWER at level \\(q\\).',
                    hint: 'When \\(m_0 = m\\), what is \\(V/R\\) when \\(R \\geq 1\\)?',
                    solution: 'When \\(m_0 = m\\), every rejection is a false discovery, so \\(V = R\\). Hence \\(V/(R \\vee 1) = \\mathbf{1}\\{R \\geq 1\\}\\), so \\(\\text{FDR} = \\mathbb{E}[\\mathbf{1}\\{R \\geq 1\\}] = \\mathbb{P}(R \\geq 1) = \\text{FWER}\\). Thus FDR control at level \\(q\\) implies \\(\\text{FWER} \\leq q\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 3: The Benjamini-Hochberg Procedure
        // ============================================================
        {
            id: 'ch11-sec03',
            title: 'Benjamini-Hochberg Procedure',
            content: `
                <h2>The Benjamini-Hochberg Procedure</h2>

                <p>The Benjamini-Hochberg (BH) procedure is one of the most influential contributions to modern statistics. Its elegance lies in the simplicity of the algorithm and the depth of the proof.</p>

                <h3>The Algorithm</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 11.9 (BH Procedure)</div>
                    <div class="env-body">
                        <p>Given p-values \\(p_1, \\ldots, p_m\\) and target FDR level \\(q \\in (0,1)\\):</p>
                        <ol>
                            <li>Sort the p-values: \\(p_{(1)} \\leq p_{(2)} \\leq \\cdots \\leq p_{(m)}\\).</li>
                            <li>Find the largest \\(k\\) such that \\(p_{(k)} \\leq \\frac{k}{m} \\cdot q\\).</li>
                            <li>Reject \\(H_{0,(1)}, H_{0,(2)}, \\ldots, H_{0,(k)}\\) (all hypotheses with p-values \\(\\leq p_{(k)}\\)).</li>
                        </ol>
                        <p>Equivalently, we reject all \\(H_{0,i}\\) with \\(p_i \\leq \\hat{t}\\), where the data-adaptive threshold is</p>
                        \\[\\hat{t} = \\max\\left\\{p_{(k)} : p_{(k)} \\leq \\frac{k}{m} \\cdot q\\right\\}.\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Geometric Intuition: The BH line</div>
                    <div class="env-body">
                        <p>Plot the sorted p-values \\(p_{(i)}\\) against their rank \\(i\\). Draw the line \\(y = (i/m) \\cdot q\\) from the origin. The BH procedure finds the rightmost point where the p-value staircase crosses below this line. Everything to the left of that crossing is rejected.</p>
                        <p>The slope of the line is \\(q/m\\). When there are many true alternatives, the small p-values pile up near zero, creating a large gap below the line, which allows many rejections.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-bh"></div>

                <h3>The Main Theorem</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 11.10 (Benjamini &amp; Hochberg, 1995)</div>
                    <div class="env-body">
                        <p>If the p-values are independent, then the BH procedure controls FDR at level \\(\\pi_0 \\cdot q \\leq q\\):</p>
                        \\[\\text{FDR} = \\frac{m_0}{m} \\cdot q = \\pi_0 q \\leq q.\\]
                    </div>
                </div>

                <p>The proof is a beautiful piece of mathematics. We present a version based on the elegant argument of Storey, Taylor, and Siegmund (2004).</p>

                <div class="env-block proof">
                    <div class="env-title">Proof of Theorem 11.10</div>
                    <div class="env-body">
                        <p>Let \\(\\mathcal{H}_0 = \\{i : H_{0,i} \\text{ is true}\\}\\) with \\(|\\mathcal{H}_0| = m_0\\). For each \\(i \\in \\mathcal{H}_0\\), let \\(p_i \\sim \\text{Uniform}(0,1)\\) (independent of all other p-values).</p>

                        <p><strong>Step 1: Rewrite FDR as a sum.</strong></p>
                        \\[\\text{FDR} = \\mathbb{E}\\left[\\frac{V}{R \\vee 1}\\right] = \\mathbb{E}\\left[\\sum_{i \\in \\mathcal{H}_0} \\frac{\\mathbf{1}\\{p_i \\leq \\hat{t}\\}}{R \\vee 1}\\right] = \\sum_{i \\in \\mathcal{H}_0} \\mathbb{E}\\left[\\frac{\\mathbf{1}\\{p_i \\leq \\hat{t}\\}}{R \\vee 1}\\right].\\]

                        <p><strong>Step 2: Key observation.</strong> When \\(p_i \\leq \\hat{t}\\), hypothesis \\(i\\) is rejected, so \\(R \\geq 1\\) and hence \\(R \\vee 1 = R\\). Moreover, define \\(R_{-i}\\) as the number of rejections that the BH procedure would make if we removed p-value \\(p_i\\) (on the remaining \\(m-1\\) tests). A crucial monotonicity property gives:</p>
                        \\[R \\geq R_{-i} + 1 \\quad \\text{when } p_i \\leq \\hat{t}.\\]
                        <p>This is because adding a p-value that is itself rejected can only increase the total count of rejections by at most 1 (it can also allow more rejections by raising the threshold, so \\(R \\geq R_{-i} + 1\\)). Hence:</p>
                        \\[\\frac{\\mathbf{1}\\{p_i \\leq \\hat{t}\\}}{R} \\leq \\frac{\\mathbf{1}\\{p_i \\leq \\hat{t}\\}}{R_{-i} + 1}.\\]

                        <p><strong>Step 3: Condition and integrate.</strong> Since \\(p_i\\) is independent of the other p-values, and \\(R_{-i}\\) depends only on the other p-values, we can condition on \\(\\{p_j : j \\neq i\\}\\). Given these, \\(R_{-i}\\) is fixed and the BH threshold based on all \\(m\\) p-values is a function of \\(p_i\\) and the other p-values. A careful analysis (using the structure of the BH threshold) shows:</p>
                        \\[\\mathbb{E}\\left[\\frac{\\mathbf{1}\\{p_i \\leq \\hat{t}\\}}{R_{-i} + 1} \\,\\Big|\\, \\{p_j\\}_{j \\neq i}\\right] \\leq \\frac{q}{m}.\\]

                        <p>This is the heart of the proof. The key idea is that when \\(p_i \\sim \\text{Uniform}(0,1)\\), the probability that \\(p_i\\) falls below the BH line at rank \\(R_{-i} + 1\\) is exactly \\((R_{-i} + 1) \\cdot q / m\\) divided by \\(R_{-i} + 1\\), giving \\(q/m\\).</p>

                        <p><strong>Step 4: Sum over true nulls.</strong></p>
                        \\[\\text{FDR} \\leq \\sum_{i \\in \\mathcal{H}_0} \\frac{q}{m} = \\frac{m_0}{m} \\cdot q = \\pi_0 q.\\]
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: Sharpness</div>
                    <div class="env-body">
                        <p>The bound \\(\\text{FDR} = \\pi_0 q\\) is in fact an <em>equality</em> (not just an upper bound) when the null p-values are independent \\(\\text{Uniform}(0,1)\\) and the alternative p-values are independent of the null p-values. This means the BH procedure achieves \\(\\text{FDR} &lt; q\\) when \\(\\pi_0 &lt; 1\\), leaving room for improvement.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 11.11</div>
                    <div class="env-body">
                        <p>Suppose \\(m = 10\\) and the sorted p-values are:</p>
                        <p style="text-align:center;">\\(0.001,\\ 0.005,\\ 0.009,\\ 0.02,\\ 0.04,\\ 0.06,\\ 0.10,\\ 0.30,\\ 0.60,\\ 0.90\\)</p>
                        <p>At level \\(q = 0.10\\), the BH thresholds \\(iq/m\\) are:</p>
                        <p style="text-align:center;">\\(0.01,\\ 0.02,\\ 0.03,\\ 0.04,\\ 0.05,\\ 0.06,\\ 0.07,\\ 0.08,\\ 0.09,\\ 0.10\\)</p>
                        <p>Comparing: \\(p_{(1)} \\leq 0.01\\) &#10004;, \\(p_{(2)} \\leq 0.02\\) &#10004;, \\(p_{(3)} \\leq 0.03\\) &#10004;, \\(p_{(4)} \\leq 0.04\\) &#10004;, \\(p_{(5)} \\leq 0.05\\) &#10004;, \\(p_{(6)} \\leq 0.06\\) &#10004;, \\(p_{(7)} \\leq 0.07\\) &#10008;. The largest passing is \\(k = 6\\), so BH rejects 6 hypotheses.</p>
                        <p>By contrast, Bonferroni at \\(\\alpha = 0.10\\) has threshold \\(0.01\\), rejecting only 1 hypothesis.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-bh',
                    title: 'BH Threshold Animation',
                    description: 'Sorted p-values are plotted against rank. The BH line y = (i/m)q determines the rejection threshold. Adjust parameters to see how signal strength and sparsity affect discoveries.',
                    setup: function(container, controls) {
                        var width = 700, height = 440;
                        var viz = new VizEngine(container, { width: width, height: height, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var m = 100;
                        var pi0 = 0.80;
                        var mu = 3.0;
                        var qLevel = 0.10;

                        VizEngine.createSlider(controls, 'm', 20, 500, m, 10, function(v) { m = Math.round(v); generate(); });
                        VizEngine.createSlider(controls, '\u03C0\u2080', 0.50, 0.99, pi0, 0.01, function(v) { pi0 = v; generate(); });
                        VizEngine.createSlider(controls, 'Signal \u03BC', 1.0, 6.0, mu, 0.5, function(v) { mu = v; generate(); });
                        VizEngine.createSlider(controls, 'q', 0.01, 0.30, qLevel, 0.01, function(v) { qLevel = v; draw(); });
                        VizEngine.createButton(controls, 'New sample', function() { generate(); });

                        var pvals = [];
                        var isNullArr = [];

                        function normalCDF(x) {
                            var t = 1 / (1 + 0.2316419 * Math.abs(x));
                            var d = 0.3989422804014327 * Math.exp(-x * x / 2);
                            var p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.8212560 + t * 1.330274))));
                            return x > 0 ? 1 - p : p;
                        }

                        function randn() {
                            var u1 = Math.random(), u2 = Math.random();
                            return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
                        }

                        function generate() {
                            var m0 = Math.round(m * pi0);
                            var m1 = m - m0;
                            pvals = [];
                            isNullArr = [];

                            for (var i = 0; i < m; i++) {
                                var z;
                                if (i < m0) {
                                    z = randn();
                                    isNullArr.push(true);
                                } else {
                                    z = mu + randn();
                                    isNullArr.push(false);
                                }
                                var p = 2 * (1 - normalCDF(Math.abs(z)));
                                pvals.push({ p: Math.max(p, 1e-15), isNull: isNullArr[i] });
                            }
                            pvals.sort(function(a, b) { return a.p - b.p; });
                            draw();
                        }

                        function draw() {
                            viz.clear();
                            if (pvals.length === 0) return;

                            var lm = 70, rm = 30, tm = 40, bm = 60;
                            var plotW = width - lm - rm;
                            var plotH = height - tm - bm;

                            // Find BH rejection count
                            var bhK = 0;
                            for (var i = pvals.length - 1; i >= 0; i--) {
                                if (pvals[i].p <= (i + 1) / pvals.length * qLevel) {
                                    bhK = i + 1;
                                    break;
                                }
                            }

                            // Y-axis scale: show up to max of 1 or max p-value in view
                            var yMax = 1.0;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(lm, tm);
                            ctx.lineTo(lm, tm + plotH);
                            ctx.lineTo(lm + plotW, tm + plotH);
                            ctx.stroke();

                            // Grid and Y labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var t = 0; t <= 1.001; t += 0.1) {
                                var yy = tm + plotH - (t / yMax) * plotH;
                                if (yy < tm - 5) break;
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(t.toFixed(1), lm - 8, yy);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.4;
                                ctx.beginPath();
                                ctx.moveTo(lm, yy);
                                ctx.lineTo(lm + plotW, yy);
                                ctx.stroke();
                            }

                            // X labels
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = viz.colors.text;
                            var xStep = Math.max(1, Math.round(pvals.length / 10));
                            for (var i = 0; i <= pvals.length; i += xStep) {
                                var xx = lm + (i / pvals.length) * plotW;
                                ctx.fillText(i, xx, tm + plotH + 6);
                            }
                            ctx.fillText('Rank i', lm + plotW / 2, tm + plotH + 30);
                            ctx.save();
                            ctx.translate(15, tm + plotH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('p-value', 0, 0);
                            ctx.restore();

                            // Draw BH line y = (i/m)*q
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(lm, tm + plotH);
                            var lineEndY = tm + plotH - (qLevel / yMax) * plotH;
                            ctx.lineTo(lm + plotW, lineEndY);
                            ctx.stroke();

                            // Label BH line
                            ctx.fillStyle = viz.colors.red;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('y = (i/m)\u00B7q', lm + plotW - 80, lineEndY - 4);

                            // Shade rejection region
                            if (bhK > 0) {
                                var rejEndX = lm + (bhK / pvals.length) * plotW;
                                ctx.fillStyle = viz.colors.blue + '15';
                                ctx.fillRect(lm, tm, rejEndX - lm, plotH);

                                // Rejection boundary
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                ctx.moveTo(rejEndX, tm);
                                ctx.lineTo(rejEndX, tm + plotH);
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }

                            // Plot p-values as dots
                            for (var i = 0; i < pvals.length; i++) {
                                var px = lm + ((i + 1) / pvals.length) * plotW;
                                var py = tm + plotH - (pvals[i].p / yMax) * plotH;
                                py = Math.max(tm, Math.min(tm + plotH, py));

                                var rejected = (i < bhK);
                                var dotColor;
                                if (pvals[i].isNull) {
                                    dotColor = rejected ? viz.colors.red : viz.colors.muted;
                                } else {
                                    dotColor = rejected ? viz.colors.green : viz.colors.orange;
                                }

                                var r = pvals.length > 200 ? 2 : (pvals.length > 100 ? 3 : 4);
                                ctx.fillStyle = dotColor;
                                ctx.beginPath();
                                ctx.arc(px, py, r, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Legend
                            var legX = lm + plotW - 180, legY = tm + 10;
                            ctx.font = '11px -apple-system,sans-serif';

                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath(); ctx.arc(legX, legY, 4, 0, Math.PI * 2); ctx.fill();
                            ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                            ctx.fillText('True positive', legX + 10, legY);

                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath(); ctx.arc(legX, legY + 16, 4, 0, Math.PI * 2); ctx.fill();
                            ctx.fillText('False positive', legX + 10, legY + 16);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(legX, legY + 32, 4, 0, Math.PI * 2); ctx.fill();
                            ctx.fillText('Missed signal', legX + 10, legY + 32);

                            ctx.fillStyle = viz.colors.muted;
                            ctx.beginPath(); ctx.arc(legX, legY + 48, 4, 0, Math.PI * 2); ctx.fill();
                            ctx.fillText('True negative', legX + 10, legY + 48);

                            // Stats
                            var V = 0, S = 0;
                            for (var i = 0; i < bhK; i++) {
                                if (pvals[i].isNull) V++;
                                else S++;
                            }
                            var fdp = bhK > 0 ? V / bhK : 0;

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Rejections: ' + bhK + '   True+: ' + S + '   False+: ' + V + '   FDP: ' + (fdp * 100).toFixed(1) + '%', lm + 4, tm + 4);
                        }

                        generate();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'In Example 11.11, compute the BH threshold at level \\(q = 0.05\\) instead of \\(q = 0.10\\). How many hypotheses are rejected?',
                    hint: 'Recompute the BH thresholds \\(iq/m\\) with \\(q = 0.05\\) and \\(m = 10\\). Compare each sorted p-value against its threshold.',
                    solution: 'The BH thresholds at \\(q = 0.05\\) are \\(0.005, 0.01, 0.015, 0.02, 0.025, 0.03, 0.035, 0.04, 0.045, 0.05\\). Comparing with sorted p-values: \\(0.001 \\leq 0.005\\) (yes), \\(0.005 \\leq 0.01\\) (yes), \\(0.009 \\leq 0.015\\) (yes), \\(0.02 \\leq 0.02\\) (yes), \\(0.04 \\leq 0.025\\) (no). The largest passing index is \\(k = 4\\), so BH at \\(q = 0.05\\) rejects 4 hypotheses (compared to 6 at \\(q = 0.10\\)).'
                },
                {
                    question: 'Prove that the BH procedure is monotone: if \\(q_1 &lt; q_2\\), then the rejection set at level \\(q_1\\) is contained in the rejection set at level \\(q_2\\).',
                    hint: 'Compare the BH threshold functions \\((i/m) \\cdot q_1\\) and \\((i/m) \\cdot q_2\\).',
                    solution: 'Let \\(k_1 = \\max\\{k : p_{(k)} \\leq kq_1/m\\}\\) and \\(k_2 = \\max\\{k : p_{(k)} \\leq kq_2/m\\}\\). Since \\(q_1 &lt; q_2\\), we have \\(kq_1/m &lt; kq_2/m\\) for all \\(k\\). Therefore, if \\(p_{(k)} \\leq kq_1/m\\), then \\(p_{(k)} \\leq kq_2/m\\). This means \\(k_1 \\leq k_2\\), and since the rejection set at level \\(q_j\\) is \\(\\{H_{0,(1)}, \\ldots, H_{0,(k_j)}\\}\\), the inclusion follows.'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Adaptive FDR — Storey's Method and q-values
        // ============================================================
        {
            id: 'ch11-sec04',
            title: 'Adaptive FDR',
            content: `
                <h2>Adaptive FDR: Storey's Method and q-values</h2>

                <p>We saw that the BH procedure actually controls FDR at \\(\\pi_0 q\\), not \\(q\\). When \\(\\pi_0\\) is substantially less than 1 (many true signals), this is conservative. <strong>Adaptive FDR</strong> methods estimate \\(\\pi_0\\) from the data and use this to sharpen the procedure.</p>

                <h3>Estimating \\(\\pi_0\\)</h3>

                <div class="env-block intuition">
                    <div class="env-title">Key idea</div>
                    <div class="env-body">
                        <p>Null p-values are uniform on \\([0,1]\\), while alternative p-values concentrate near 0. For a threshold \\(\\lambda\\) close to 1, most p-values above \\(\\lambda\\) come from true nulls. Since null p-values exceed \\(\\lambda\\) with probability \\(1 - \\lambda\\), we can estimate:</p>
                        \\[m_0 \\approx \\frac{\\#\\{p_i &gt; \\lambda\\}}{1 - \\lambda}.\\]
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 11.12 (Storey's estimator of \\(\\pi_0\\))</div>
                    <div class="env-body">
                        <p>For a tuning parameter \\(\\lambda \\in (0,1)\\), define</p>
                        \\[\\hat{\\pi}_0(\\lambda) = \\frac{\\#\\{i : p_i &gt; \\lambda\\}}{m(1 - \\lambda)} = \\frac{W(\\lambda)}{m(1 - \\lambda)},\\]
                        <p>where \\(W(\\lambda) = \\#\\{i : p_i &gt; \\lambda\\}\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Proposition 11.13 (Properties of \\(\\hat{\\pi}_0\\))</div>
                    <div class="env-body">
                        <ol>
                            <li>\\(\\mathbb{E}[\\hat{\\pi}_0(\\lambda)] \\geq \\pi_0\\) (conservative bias).</li>
                            <li>As \\(\\lambda \\to 1\\), \\(\\hat{\\pi}_0(\\lambda) \\to \\pi_0\\) in probability (but with increasing variance).</li>
                            <li>For any fixed \\(\\lambda\\), \\(\\hat{\\pi}_0(\\lambda) \\leq 1/(1-\\lambda)\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof of (1)</div>
                    <div class="env-body">
                        <p>We have \\(\\mathbb{E}[W(\\lambda)] = \\sum_{i=1}^m \\mathbb{P}(p_i &gt; \\lambda)\\). For \\(i \\in \\mathcal{H}_0\\), \\(\\mathbb{P}(p_i &gt; \\lambda) = 1 - \\lambda\\). For \\(i \\notin \\mathcal{H}_0\\), \\(\\mathbb{P}(p_i &gt; \\lambda) \\geq 0\\). Therefore:</p>
                        \\[\\mathbb{E}[W(\\lambda)] \\geq m_0(1 - \\lambda),\\]
                        <p>so \\(\\mathbb{E}[\\hat{\\pi}_0(\\lambda)] \\geq m_0/m = \\pi_0\\).</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <h3>Storey's Adaptive BH Procedure</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 11.14 (Storey's Procedure)</div>
                    <div class="env-body">
                        <p>Given target level \\(q\\) and tuning parameter \\(\\lambda\\):</p>
                        <ol>
                            <li>Estimate \\(\\hat{\\pi}_0 = \\hat{\\pi}_0(\\lambda)\\).</li>
                            <li>Apply the BH procedure at level \\(q / \\hat{\\pi}_0\\) (i.e., use the more liberal threshold \\(p_{(k)} \\leq \\frac{k}{m \\hat{\\pi}_0} \\cdot q\\)).</li>
                        </ol>
                        <p>Since \\(\\hat{\\pi}_0 \\leq 1\\), the adjusted level is \\(\\geq q\\), yielding more rejections.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: Finite-sample guarantee</div>
                    <div class="env-body">
                        <p>Storey, Taylor, and Siegmund (2004) showed that the adaptive BH procedure controls FDR at level \\(q\\) in finite samples, provided \\(\\lambda\\) is chosen independently of the data (e.g., fixed at \\(\\lambda = 0.5\\)). The proof requires careful handling of the dependence between \\(\\hat{\\pi}_0\\) and the rejection decision.</p>
                    </div>
                </div>

                <h3>q-values</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 11.15 (q-value)</div>
                    <div class="env-body">
                        <p>The <strong>q-value</strong> of hypothesis \\(i\\) is the minimum FDR level \\(q\\) at which \\(H_{0,i}\\) would be rejected by the BH procedure:</p>
                        \\[\\hat{q}_i = \\min_{\\{k \\geq r_i\\}} \\frac{m \\cdot p_{(k)}}{k},\\]
                        <p>where \\(r_i\\) is the rank of \\(p_i\\) among all p-values. In the adaptive version:</p>
                        \\[\\hat{q}_i^{\\text{ST}} = \\min_{\\{k \\geq r_i\\}} \\frac{m \\cdot \\hat{\\pi}_0 \\cdot p_{(k)}}{k}.\\]
                        <p>The q-value is the FDR analogue of the p-value: a hypothesis is rejected by BH at level \\(q\\) if and only if \\(\\hat{q}_i \\leq q\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: p-value vs. q-value</div>
                    <div class="env-body">
                        <ul>
                            <li>A <strong>p-value</strong> measures evidence against one hypothesis in isolation.</li>
                            <li>A <strong>q-value</strong> measures the minimum false discovery rate at which this hypothesis would be called significant, in the context of the full family of tests.</li>
                        </ul>
                        <p>The q-value incorporates both the strength of the individual evidence and the multiplicity of testing.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-qvalue"></div>

                <div class="env-block example">
                    <div class="env-title">Example 11.16 (Computing q-values)</div>
                    <div class="env-body">
                        <p>For the p-values from Example 11.11 (\\(m = 10\\)), the q-values are computed by working from right to left:</p>
                        <ul>
                            <li>\\(\\hat{q}_{(10)} = \\frac{10 \\cdot 0.90}{10} = 0.90\\)</li>
                            <li>\\(\\hat{q}_{(9)} = \\min\\bigl(\\frac{10 \\cdot 0.60}{9},\\ 0.90\\bigr) = \\min(0.667, 0.90) = 0.667\\)</li>
                            <li>Continuing: \\(\\hat{q}_{(6)} = \\min\\bigl(\\frac{10 \\cdot 0.06}{6},\\ \\hat{q}_{(7)}\\bigr) = \\min(0.100, \\ldots) = 0.100\\)</li>
                        </ul>
                        <p>Hypotheses with \\(\\hat{q}_i \\leq 0.10\\) are those rejected at FDR level \\(q = 0.10\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-qvalue',
                    title: 'q-value Step Function & Adaptive \u03C0\u2080 Estimation',
                    description: 'The q-value function maps each p-value to its minimum FDR level. The dashed line shows the adaptive Storey estimate of \u03C0\u2080 and how it affects the q-values.',
                    setup: function(container, controls) {
                        var width = 700, height = 440;
                        var viz = new VizEngine(container, { width: width, height: height, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var m = 200;
                        var pi0true = 0.75;
                        var mu = 3.5;
                        var lambda = 0.50;

                        VizEngine.createSlider(controls, 'm', 50, 500, m, 50, function(v) { m = Math.round(v); generate(); });
                        VizEngine.createSlider(controls, '\u03C0\u2080', 0.50, 0.95, pi0true, 0.05, function(v) { pi0true = v; generate(); });
                        VizEngine.createSlider(controls, '\u03BC', 2.0, 6.0, mu, 0.5, function(v) { mu = v; generate(); });
                        VizEngine.createSlider(controls, '\u03BB', 0.1, 0.9, lambda, 0.1, function(v) { lambda = v; draw(); });
                        VizEngine.createButton(controls, 'New sample', function() { generate(); });

                        var pvals = [];
                        var isNullArr = [];

                        function normalCDF(x) {
                            var t = 1 / (1 + 0.2316419 * Math.abs(x));
                            var d = 0.3989422804014327 * Math.exp(-x * x / 2);
                            var p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.8212560 + t * 1.330274))));
                            return x > 0 ? 1 - p : p;
                        }

                        function randn() {
                            var u1 = Math.random(), u2 = Math.random();
                            return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
                        }

                        function generate() {
                            var m0 = Math.round(m * pi0true);
                            var m1 = m - m0;
                            pvals = [];
                            isNullArr = [];
                            for (var i = 0; i < m; i++) {
                                var z;
                                if (i < m0) {
                                    z = randn();
                                    isNullArr.push(true);
                                } else {
                                    z = mu + randn();
                                    isNullArr.push(false);
                                }
                                var p = 2 * (1 - normalCDF(Math.abs(z)));
                                pvals.push(Math.max(p, 1e-15));
                            }
                            // Sort
                            var indices = [];
                            for (var i = 0; i < m; i++) indices.push(i);
                            indices.sort(function(a, b) { return pvals[a] - pvals[b]; });
                            var sortedP = indices.map(function(idx) { return pvals[idx]; });
                            var sortedNull = indices.map(function(idx) { return isNullArr[idx]; });
                            pvals = sortedP;
                            isNullArr = sortedNull;
                            draw();
                        }

                        function draw() {
                            viz.clear();
                            if (pvals.length === 0) return;
                            var n = pvals.length;

                            var lm = 70, rm = 30, tm = 40, bm = 70;
                            var plotW = width - lm - rm;
                            var plotH = (height - tm - bm - 20) / 2; // Two sub-plots

                            // --- Top panel: p-value histogram and pi0 estimate ---
                            var topY = tm;

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('p-value histogram & Storey \u03C0\u0302\u2080 estimate', lm + plotW / 2, topY - 25);

                            // Histogram
                            var nBins = 20;
                            var bins = new Array(nBins).fill(0);
                            var nullBins = new Array(nBins).fill(0);
                            for (var i = 0; i < n; i++) {
                                var b = Math.min(Math.floor(pvals[i] * nBins), nBins - 1);
                                bins[b]++;
                                if (isNullArr[i]) nullBins[b]++;
                            }
                            var maxBin = Math.max.apply(null, bins);

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(lm, topY);
                            ctx.lineTo(lm, topY + plotH);
                            ctx.lineTo(lm + plotW, topY + plotH);
                            ctx.stroke();

                            var barW = plotW / nBins;
                            for (var b = 0; b < nBins; b++) {
                                var bx = lm + b * barW;
                                var bh = maxBin > 0 ? (bins[b] / maxBin) * (plotH - 10) : 0;

                                ctx.fillStyle = viz.colors.blue + '66';
                                ctx.fillRect(bx + 1, topY + plotH - bh, barW - 2, bh);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 0.5;
                                ctx.strokeRect(bx + 1, topY + plotH - bh, barW - 2, bh);
                            }

                            // pi0 estimate line (uniform height)
                            var W = 0;
                            for (var i = 0; i < n; i++) {
                                if (pvals[i] > lambda) W++;
                            }
                            var pi0hat = Math.min(W / (n * (1 - lambda)), 1.5);
                            var uniformHeight = n / nBins; // expected count per bin if all null
                            var pi0Line = pi0hat * uniformHeight;
                            var pi0LineY = maxBin > 0 ? topY + plotH - (pi0Line / maxBin) * (plotH - 10) : topY + plotH;

                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            ctx.moveTo(lm, pi0LineY);
                            ctx.lineTo(lm + plotW, pi0LineY);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Lambda threshold line
                            var lambdaX = lm + lambda * plotW;
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath();
                            ctx.moveTo(lambdaX, topY);
                            ctx.lineTo(lambdaX, topY + plotH);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('\u03BB=' + lambda.toFixed(1), lambdaX + 4, topY + 4);

                            ctx.fillStyle = viz.colors.teal;
                            ctx.textAlign = 'right';
                            ctx.fillText('\u03C0\u0302\u2080=' + pi0hat.toFixed(3) + ' (true: ' + pi0true.toFixed(2) + ')', lm + plotW - 4, pi0LineY - 12);

                            // X labels for histogram
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var t = 0; t <= 1.001; t += 0.2) {
                                ctx.fillText(t.toFixed(1), lm + t * plotW, topY + plotH + 4);
                            }

                            // --- Bottom panel: q-value function ---
                            var botY = topY + plotH + 40;

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('q-value as a function of p-value', lm + plotW / 2, botY - 18);

                            // Compute q-values (standard BH)
                            var qvals = new Array(n);
                            qvals[n - 1] = Math.min(n * pvals[n - 1] / n, 1);
                            for (var i = n - 2; i >= 0; i--) {
                                qvals[i] = Math.min(n * pvals[i] / (i + 1), qvals[i + 1]);
                                qvals[i] = Math.min(qvals[i], 1);
                            }

                            // Compute adaptive q-values (Storey)
                            var qvalsAdapt = new Array(n);
                            var pi0Clamp = Math.min(pi0hat, 1);
                            qvalsAdapt[n - 1] = Math.min(n * pi0Clamp * pvals[n - 1] / n, 1);
                            for (var i = n - 2; i >= 0; i--) {
                                qvalsAdapt[i] = Math.min(n * pi0Clamp * pvals[i] / (i + 1), qvalsAdapt[i + 1]);
                                qvalsAdapt[i] = Math.min(qvalsAdapt[i], 1);
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(lm, botY);
                            ctx.lineTo(lm, botY + plotH);
                            ctx.lineTo(lm + plotW, botY + plotH);
                            ctx.stroke();

                            // Grid
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var t = 0; t <= 1.001; t += 0.2) {
                                var yy = botY + plotH - t * plotH;
                                ctx.fillText(t.toFixed(1), lm - 6, yy);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.4;
                                ctx.beginPath();
                                ctx.moveTo(lm, yy);
                                ctx.lineTo(lm + plotW, yy);
                                ctx.stroke();
                            }
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var t = 0; t <= 1.001; t += 0.2) {
                                ctx.fillText(t.toFixed(1), lm + t * plotW, botY + plotH + 4);
                            }
                            ctx.fillText('p-value', lm + plotW / 2, botY + plotH + 20);
                            ctx.save();
                            ctx.translate(14, botY + plotH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.textAlign = 'center';
                            ctx.fillText('q-value', 0, 0);
                            ctx.restore();

                            // 45-degree line
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 0.8;
                            ctx.setLineDash([3, 3]);
                            ctx.beginPath();
                            ctx.moveTo(lm, botY + plotH);
                            ctx.lineTo(lm + plotW, botY);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Plot standard q-values
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = 0; i < n; i++) {
                                var px = lm + pvals[i] * plotW;
                                var py = botY + plotH - qvals[i] * plotH;
                                if (i === 0) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Plot adaptive q-values
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([4, 2]);
                            ctx.beginPath();
                            for (var i = 0; i < n; i++) {
                                var px = lm + pvals[i] * plotW;
                                var py = botY + plotH - qvalsAdapt[i] * plotH;
                                if (i === 0) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Legend
                            var legX = lm + plotW - 170, legY2 = botY + 8;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';

                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([]);
                            ctx.beginPath();
                            ctx.moveTo(legX, legY2);
                            ctx.lineTo(legX + 20, legY2);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.blue;
                            ctx.textBaseline = 'middle';
                            ctx.fillText('BH q-value', legX + 25, legY2);

                            ctx.strokeStyle = viz.colors.teal;
                            ctx.setLineDash([4, 2]);
                            ctx.beginPath();
                            ctx.moveTo(legX, legY2 + 16);
                            ctx.lineTo(legX + 20, legY2 + 16);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Storey q-value', legX + 25, legY2 + 16);
                        }

                        generate();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that Storey\'s estimator \\(\\hat{\\pi}_0(\\lambda)\\) has variance \\(\\text{Var}(\\hat{\\pi}_0(\\lambda)) = \\frac{\\sum_{i=1}^m \\mathbb{P}(p_i &gt; \\lambda)(1 - \\mathbb{P}(p_i &gt; \\lambda))}{m^2(1-\\lambda)^2}\\) under independence. Explain qualitatively what happens to the bias-variance tradeoff as \\(\\lambda \\to 1\\).',
                    hint: 'Write \\(W(\\lambda)\\) as a sum of independent Bernoulli variables. As \\(\\lambda \\to 1\\), fewer p-values exceed \\(\\lambda\\), so the denominator \\(m(1-\\lambda)\\) shrinks.',
                    solution: 'Under independence, \\(W(\\lambda) = \\sum_{i=1}^m \\mathbf{1}\\{p_i > \\lambda\\}\\) is a sum of independent Bernoulli variables with parameters \\(q_i = \\mathbb{P}(p_i > \\lambda)\\). So \\(\\text{Var}(W) = \\sum_i q_i(1-q_i)\\). Since \\(\\hat{\\pi}_0 = W/(m(1-\\lambda))\\), we get \\(\\text{Var}(\\hat{\\pi}_0) = \\text{Var}(W)/(m(1-\\lambda))^2\\). As \\(\\lambda \\to 1\\): (a) bias decreases because fewer alternative p-values exceed \\(\\lambda\\); (b) variance increases because \\(W\\) becomes a sum of fewer "successes" divided by a vanishing denominator. This is the fundamental bias-variance tradeoff in estimating \\(\\pi_0\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 5: Dependence Structures — PRDS and the BY Procedure
        // ============================================================
        {
            id: 'ch11-sec05',
            title: 'Dependence Structures',
            content: `
                <h2>Dependence Structures: PRDS and the BY Procedure</h2>

                <p>The independence assumption in Theorem 11.10 is often unrealistic. Gene expression levels are correlated, brain voxels are spatially dependent, and financial asset returns exhibit complex dependence. How robust is the BH procedure to dependence?</p>

                <h3>Positive Regression Dependence on a Subset (PRDS)</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 11.17 (PRDS)</div>
                    <div class="env-body">
                        <p>The p-values \\(p_1, \\ldots, p_m\\) satisfy <strong>positive regression dependence on the subset \\(\\mathcal{H}_0\\)</strong> (PRDS on \\(\\mathcal{H}_0\\)) if for each \\(i \\in \\mathcal{H}_0\\), and for every non-decreasing set \\(D\\) (i.e., \\(x \\in D\\) and \\(y \\geq x\\) componentwise implies \\(y \\in D\\)):</p>
                        \\[\\mathbb{P}\\bigl((p_1, \\ldots, p_m) \\in D \\,\\big|\\, p_i = p\\bigr) \\text{ is non-decreasing in } p.\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>PRDS captures the idea of "positive dependence": conditioning on a null p-value being small (strong evidence against the null) makes the other p-values stochastically smaller too. This is natural in many settings:</p>
                        <ul>
                            <li><strong>One-sided tests from multivariate normal</strong>: if \\(X \\sim N(\\mu, \\Sigma)\\) with \\(\\Sigma\\) having non-negative entries and \\(p_i = 1 - \\Phi(X_i)\\), then PRDS holds.</li>
                            <li><strong>Independent p-values</strong>: trivially PRDS.</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 11.18 (Benjamini &amp; Yekutieli, 2001)</div>
                    <div class="env-body">
                        <p>If the p-values satisfy PRDS on \\(\\mathcal{H}_0\\), then the BH procedure at level \\(q\\) controls FDR:</p>
                        \\[\\text{FDR} \\leq \\pi_0 q \\leq q.\\]
                        <p>That is, the BH procedure requires <strong>no modification</strong> under PRDS dependence.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The PRDS condition is remarkably general. It covers the vast majority of practical applications in genomics, neuroimaging, and signal processing. The proof extends the independence argument by using the lattice structure of the PRDS condition.</p>
                    </div>
                </div>

                <h3>Arbitrary Dependence: The BY Procedure</h3>

                <p>When even PRDS fails (e.g., under strong negative dependence), we need a different approach.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 11.19 (Benjamini &amp; Yekutieli, 2001 — BY Procedure)</div>
                    <div class="env-body">
                        <p>Under <strong>arbitrary dependence</strong> among the p-values, the following modified procedure controls FDR at level \\(q\\):</p>
                        <p>Replace the BH threshold \\(\\frac{k}{m} \\cdot q\\) with</p>
                        \\[\\frac{k}{m \\cdot c(m)} \\cdot q, \\quad \\text{where } c(m) = \\sum_{i=1}^{m} \\frac{1}{i} = H_m \\approx \\ln(m) + \\gamma.\\]
                        <p>Here \\(H_m\\) is the \\(m\\)-th harmonic number and \\(\\gamma \\approx 0.5772\\) is the Euler-Mascheroni constant.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof sketch</div>
                    <div class="env-body">
                        <p>The proof uses a refined version of the BH argument. The key step replaces the conditional expectation bound \\(\\mathbb{E}[\\mathbf{1}\\{p_i \\leq \\hat{t}\\}/R] \\leq q/m\\) with a bound that accounts for the worst-case dependence. For each null index \\(i\\):</p>
                        \\[\\mathbb{E}\\left[\\frac{\\mathbf{1}\\{p_i \\leq \\hat{t}\\}}{R}\\right] \\leq \\frac{q}{m} \\cdot \\sum_{k=1}^{m} \\frac{1}{k} = \\frac{q \\cdot c(m)}{m}.\\]
                        <p>Dividing by \\(c(m)\\) restores the FDR guarantee at level \\(q\\). The harmonic sum arises from summing over all possible ranks at which a null p-value could be rejected.</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Cost of Arbitrary Dependence</div>
                    <div class="env-body">
                        <p>The BY correction replaces \\(q\\) with \\(q / c(m)\\). For \\(m = 10{,}000\\), \\(c(m) \\approx 9.79\\), so the effective FDR level is roughly \\(q/10\\). For \\(m = 1{,}000{,}000\\), \\(c(m) \\approx 14.4\\). This is a substantial but logarithmic penalty, much milder than the linear penalty of Bonferroni (\\(q/m\\)).</p>
                    </div>
                </div>

                <h3>Summary of Procedures</h3>

                <table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:0.92em;">
                    <tr style="border-bottom:2px solid #30363d;">
                        <td style="padding:8px 12px;font-weight:600;color:#f0f6fc;">Procedure</td>
                        <td style="padding:8px 12px;font-weight:600;color:#f0f6fc;">Threshold</td>
                        <td style="padding:8px 12px;font-weight:600;color:#f0f6fc;">Controls</td>
                        <td style="padding:8px 12px;font-weight:600;color:#f0f6fc;">Dependence</td>
                    </tr>
                    <tr style="border-bottom:1px solid #21262d;">
                        <td style="padding:8px 12px;">Bonferroni</td>
                        <td style="padding:8px 12px;">\\(\\alpha/m\\)</td>
                        <td style="padding:8px 12px;">FWER</td>
                        <td style="padding:8px 12px;">Arbitrary</td>
                    </tr>
                    <tr style="border-bottom:1px solid #21262d;">
                        <td style="padding:8px 12px;">Holm</td>
                        <td style="padding:8px 12px;">\\(\\alpha/(m-k+1)\\) step-down</td>
                        <td style="padding:8px 12px;">FWER</td>
                        <td style="padding:8px 12px;">Arbitrary</td>
                    </tr>
                    <tr style="border-bottom:1px solid #21262d;">
                        <td style="padding:8px 12px;color:#58a6ff;">BH</td>
                        <td style="padding:8px 12px;">\\((k/m) \\cdot q\\) step-up</td>
                        <td style="padding:8px 12px;color:#58a6ff;">FDR</td>
                        <td style="padding:8px 12px;">Independent / PRDS</td>
                    </tr>
                    <tr style="border-bottom:1px solid #21262d;">
                        <td style="padding:8px 12px;color:#3fb9a0;">Storey-BH</td>
                        <td style="padding:8px 12px;">\\((k/(m\\hat{\\pi}_0)) \\cdot q\\)</td>
                        <td style="padding:8px 12px;color:#3fb9a0;">FDR</td>
                        <td style="padding:8px 12px;">Independent</td>
                    </tr>
                    <tr>
                        <td style="padding:8px 12px;color:#f0883e;">BY</td>
                        <td style="padding:8px 12px;">\\((k/(m \\cdot c(m))) \\cdot q\\)</td>
                        <td style="padding:8px 12px;color:#f0883e;">FDR</td>
                        <td style="padding:8px 12px;">Arbitrary</td>
                    </tr>
                </table>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 11.20 (Hierarchy of Power)</div>
                    <div class="env-body">
                        <p>In terms of the number of rejections (power), the procedures are ordered as:</p>
                        \\[\\text{Bonferroni} \\leq \\text{Holm} \\leq \\text{BY} \\leq \\text{BH} \\leq \\text{Storey-BH}\\]
                        <p>where the inequalities hold for the number of rejections on any given dataset. The gain at each step comes from either weakening the error criterion (FWER to FDR), exploiting dependence structure (arbitrary to PRDS), or estimating \\(\\pi_0\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Looking ahead</div>
                    <div class="env-body">
                        <p>FDR control is the starting point for high-dimensional inference. In subsequent chapters, we will see how the <strong>debiased Lasso</strong> (Ch. 12) provides valid p-values for regression coefficients in high dimensions, and how <strong>knockoff filters</strong> (Ch. 13) provide model-free FDR control in variable selection — both building on the FDR framework developed here.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Compute the BY threshold for the first hypothesis when \\(m = 100\\) and \\(q = 0.05\\). Compare with the BH threshold and the Bonferroni threshold. Use \\(H_{100} \\approx 5.187\\).',
                    hint: 'The BY threshold at rank \\(k\\) is \\(kq/(m \\cdot H_m)\\). Compute this for \\(k = 1\\).',
                    solution: 'For \\(k = 1\\): BY threshold = \\(1 \\cdot 0.05 / (100 \\cdot 5.187) \\approx 9.64 \\times 10^{-5}\\). BH threshold = \\(1 \\cdot 0.05 / 100 = 5 \\times 10^{-4}\\). Bonferroni threshold = \\(0.05/100 = 5 \\times 10^{-4}\\). Note that BY at rank 1 is about 5x more stringent than BH/Bonferroni. However, at higher ranks BY can surpass Bonferroni: e.g., at \\(k = 10\\), BY gives \\(10 \\times 0.05 / (100 \\times 5.187) \\approx 9.64 \\times 10^{-4}\\), which exceeds the Bonferroni threshold.'
                },
                {
                    question: 'Give an example of p-values that are not PRDS. Specifically, construct two dependent p-values \\((p_1, p_2)\\) where \\(H_{0,1}\\) is true, \\(H_{0,2}\\) is true, and conditioning on \\(p_1\\) being small makes \\(p_2\\) stochastically <em>larger</em>.',
                    hint: 'Consider \\(X_1, X_2\\) drawn from a bivariate normal with negative correlation.',
                    solution: 'Let \\((X_1, X_2) \\sim N(0, \\Sigma)\\) with \\(\\Sigma = \\begin{pmatrix} 1 & -0.9 \\\\ -0.9 & 1 \\end{pmatrix}\\) and \\(p_i = 2(1 - \\Phi(|X_i|))\\). Both nulls are true (\\(\\mu = 0\\)). Conditioning on \\(p_1\\) being small means \\(|X_1|\\) is large, say \\(X_1\\) is large positive. Then the negative correlation makes \\(X_2\\) tend to be large negative, so \\(|X_2|\\) is large and \\(p_2\\) is small. Wait — that makes \\(p_2\\) small too, which is PRDS-like for two-sided tests. For a true violation, consider one-sided tests: \\(p_1 = 1 - \\Phi(X_1)\\), \\(p_2 = 1 - \\Phi(X_2)\\). If \\(X_1\\) is large (\\(p_1\\) small), then \\(X_2\\) tends to be small (\\(p_2\\) large). This violates PRDS: conditioning on \\(p_1\\) being small makes \\(p_2\\) stochastically larger.'
                }
            ]
        }
    ]
});
