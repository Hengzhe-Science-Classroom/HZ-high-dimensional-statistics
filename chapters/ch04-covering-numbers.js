window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch04',
    number: 4,
    title: 'Covering Numbers & Metric Entropy',
    subtitle: 'Geometric complexity of sets in high dimensions',
    sections: [

        // ============================================================
        // SECTION 1 — Epsilon-Nets and Covers
        // ============================================================
        {
            id: 'ch04-sec01',
            title: '\u03B5-Nets and Covers',
            content: `
                <h2>\\(\\varepsilon\\)-Nets and Covers</h2>

                <p>One of the deepest themes in high-dimensional probability is that
                the <em>complexity</em> of a set governs the behavior of random processes
                indexed by that set. The most natural way to measure geometric complexity
                is to ask: <strong>how many balls of radius \\(\\varepsilon\\) does it take
                to cover the set?</strong></p>

                <p>This question leads to the theory of <em>covering numbers</em> and
                <em>metric entropy</em>, which permeates high-dimensional statistics,
                empirical process theory, and learning theory.</p>

                <h3>Setting: Metric Spaces</h3>

                <p>Recall that a <strong>metric space</strong> \\((T, d)\\) is a set \\(T\\) equipped
                with a distance function \\(d: T \\times T \\to [0, \\infty)\\) satisfying the
                usual axioms (identity, symmetry, triangle inequality). All of our definitions
                work in this generality, but the key examples to keep in mind are:</p>

                <ul>
                    <li>The Euclidean unit ball \\(B_2^d = \\{x \\in \\mathbb{R}^d : \\|x\\|_2 \\leq 1\\}\\) with the \\(\\ell_2\\) metric.</li>
                    <li>The unit sphere \\(S^{d-1} = \\{x \\in \\mathbb{R}^d : \\|x\\|_2 = 1\\}\\).</li>
                    <li>A class of functions \\(\\mathcal{F}\\) with the \\(L^2(P)\\) metric \\(d(f,g) = \\bigl(\\int |f-g|^2\\, dP\\bigr)^{1/2}\\).</li>
                </ul>

                <h3>\\(\\varepsilon\\)-Nets</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 4.1 (\\(\\varepsilon\\)-Net)</div>
                    <div class="env-body">
                        <p>Let \\((T, d)\\) be a metric space and \\(\\varepsilon &gt; 0\\). A subset
                        \\(\\mathcal{N} \\subseteq T\\) is called an <strong>\\(\\varepsilon\\)-net</strong>
                        of \\(T\\) if every point of \\(T\\) is within distance \\(\\varepsilon\\) of some
                        point in \\(\\mathcal{N}\\):</p>
                        \\[\\forall\\, t \\in T,\\quad \\exists\\, s \\in \\mathcal{N} \\text{ such that } d(t, s) \\leq \\varepsilon.\\]
                        <p>Equivalently, \\(T \\subseteq \\bigcup_{s \\in \\mathcal{N}} B(s, \\varepsilon)\\), where
                        \\(B(s, \\varepsilon) = \\{t \\in T : d(t, s) \\leq \\varepsilon\\}\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>An \\(\\varepsilon\\)-net is a <em>finite approximation</em> of a
                        potentially infinite (even uncountable) set \\(T\\). Every point in \\(T\\)
                        has a "representative" in the net that is at most \\(\\varepsilon\\) away.
                        You can think of it as placing lighthouses so that every point on a coastline
                        is illuminated by at least one.</p>
                    </div>
                </div>

                <h3>\\(\\varepsilon\\)-Covers</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 4.2 (\\(\\varepsilon\\)-Cover, External)</div>
                    <div class="env-body">
                        <p>More generally, an <strong>\\(\\varepsilon\\)-cover</strong> of \\(T\\) is any
                        collection of points \\(\\{x_1, \\ldots, x_N\\}\\) (not necessarily in \\(T\\))
                        such that</p>
                        \\[T \\subseteq \\bigcup_{i=1}^{N} B(x_i, \\varepsilon).\\]
                        <p>When the cover points are required to lie in \\(T\\), we call it an
                        <strong>internal</strong> or <strong>proper</strong> cover (i.e., an \\(\\varepsilon\\)-net).
                        The distinction between internal and external covers is often
                        immaterial up to a factor of \\(2\\) in \\(\\varepsilon\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 4.1 (\\(\\varepsilon\\)-Net for \\([0,1]\\))</div>
                    <div class="env-body">
                        <p>Consider the interval \\([0,1]\\) with the usual metric. The set
                        \\(\\mathcal{N} = \\{0, \\varepsilon, 2\\varepsilon, \\ldots, \\lfloor 1/\\varepsilon \\rfloor \\cdot \\varepsilon\\}\\)
                        is an \\(\\varepsilon\\)-net. Its cardinality is
                        \\(\\lfloor 1/\\varepsilon \\rfloor + 1 \\approx 1/\\varepsilon\\).
                        So the interval \\([0,1]\\) can be covered by roughly \\(1/\\varepsilon\\) balls of
                        radius \\(\\varepsilon\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 4.2 (\\(\\varepsilon\\)-Net for the Unit Square \\([0,1]^2\\))</div>
                    <div class="env-body">
                        <p>For the unit square in \\(\\mathbb{R}^2\\) with the \\(\\ell_2\\) metric,
                        a grid of spacing \\(\\varepsilon/\\sqrt{2}\\) yields an \\(\\varepsilon\\)-net
                        of size roughly \\((\\sqrt{2}/\\varepsilon)^2 = 2/\\varepsilon^2\\).
                        More generally, the \\(d\\)-dimensional unit cube \\([0,1]^d\\)
                        requires on the order of \\((C/\\varepsilon)^d\\) points. The exponential
                        dependence on \\(d\\) is the <strong>curse of dimensionality</strong> in
                        its most basic form.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-covering"></div>

                <h3>Basic Properties of \\(\\varepsilon\\)-Nets</h3>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 4.1 (Existence of Finite Nets)</div>
                    <div class="env-body">
                        <p>Every <strong>totally bounded</strong> metric space \\((T, d)\\) admits a
                        finite \\(\\varepsilon\\)-net for every \\(\\varepsilon &gt; 0\\). In particular,
                        every compact metric space is totally bounded.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>Total boundedness is the correct finiteness condition here: it means
                        that \\(T\\) can be covered by finitely many \\(\\varepsilon\\)-balls for
                        every \\(\\varepsilon &gt; 0\\). Bounded subsets of \\(\\mathbb{R}^d\\)
                        (and more generally of finite-dimensional normed spaces) are always
                        totally bounded, but this fails in infinite dimensions. For instance,
                        the unit ball of \\(\\ell_2\\) is bounded but not totally bounded.</p>
                    </div>
                </div>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 4.2 (Monotonicity)</div>
                    <div class="env-body">
                        <p>If \\(\\varepsilon_1 &lt; \\varepsilon_2\\), then every \\(\\varepsilon_1\\)-net
                        is also an \\(\\varepsilon_2\\)-net. Equivalently, making \\(\\varepsilon\\) smaller
                        requires more points to cover \\(T\\) and thus gives a finer approximation.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning: Nets are Not Unique</div>
                    <div class="env-body">
                        <p>A given set \\(T\\) has many different \\(\\varepsilon\\)-nets. The
                        <em>covering number</em> \\(\\mathcal{N}(T, d, \\varepsilon)\\) measures the
                        size of the <em>smallest</em> such net, giving a canonical notion of
                        complexity. We formalize this in the next section.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-covering',
                    title: 'Interactive Covering Number Builder',
                    description: 'Select a shape, then adjust \\(\\varepsilon\\) to see how many balls are needed to cover it. The log-log plot on the right tracks \\(\\log N\\) vs \\(1/\\varepsilon\\).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 820, height: 420, scale: 50, originX: 200, originY: 220});
                        var ctx = viz.ctx;

                        var eps = 0.8;
                        var shape = 'circle';
                        var logData = [];

                        // Controls
                        var epsSlider = VizEngine.createSlider(controls, '\u03B5:', 0.15, 2.0, eps, 0.05, function(val) {
                            eps = val;
                            computeAndDraw();
                        });

                        var shapeSelect = document.createElement('select');
                        shapeSelect.style.cssText = 'padding:3px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;margin-left:6px;';
                        shapeSelect.innerHTML = '<option value="circle">Circle (B\u00B2\u2082)</option><option value="square">Square (B\u00B2\u221E)</option><option value="diamond">Diamond (B\u00B2\u2081)</option>';
                        shapeSelect.addEventListener('change', function(e) {
                            shape = e.target.value;
                            logData = [];
                            computeAndDraw();
                        });
                        controls.appendChild(shapeSelect);

                        VizEngine.createButton(controls, 'Sweep \u03B5', function() {
                            logData = [];
                            var sweepEps = 2.0;
                            var interval = setInterval(function() {
                                sweepEps -= 0.05;
                                if (sweepEps < 0.15) { clearInterval(interval); return; }
                                eps = sweepEps;
                                epsSlider.value = eps;
                                epsSlider.dispatchEvent(new Event('input'));
                            }, 80);
                        });

                        function isInsideShape(x, y) {
                            if (shape === 'circle') return x * x + y * y <= 4.01;
                            if (shape === 'square') return Math.abs(x) <= 2.01 && Math.abs(y) <= 2.01;
                            if (shape === 'diamond') return Math.abs(x) + Math.abs(y) <= 2.01;
                            return false;
                        }

                        function computeCover() {
                            // Greedy covering: place centers on a grid, then greedily cover uncovered points
                            var step = eps * 0.85;
                            var centers = [];
                            var R = 2.5;

                            // Generate candidate grid points inside the shape
                            var candidates = [];
                            for (var gx = -R; gx <= R; gx += step) {
                                for (var gy = -R; gy <= R; gy += step) {
                                    if (isInsideShape(gx, gy)) {
                                        candidates.push([gx, gy]);
                                    }
                                }
                            }

                            // Greedy set cover: mark all candidates as uncovered
                            var covered = new Array(candidates.length).fill(false);
                            var remaining = candidates.length;

                            while (remaining > 0) {
                                // Find the grid point that covers the most uncovered candidates
                                var bestIdx = -1;
                                var bestCount = -1;
                                for (var i = 0; i < candidates.length; i++) {
                                    if (covered[i]) continue;
                                    var count = 0;
                                    for (var j = 0; j < candidates.length; j++) {
                                        if (!covered[j]) {
                                            var dx = candidates[i][0] - candidates[j][0];
                                            var dy = candidates[i][1] - candidates[j][1];
                                            if (Math.sqrt(dx * dx + dy * dy) <= eps) count++;
                                        }
                                    }
                                    if (count > bestCount) {
                                        bestCount = count;
                                        bestIdx = i;
                                    }
                                }
                                if (bestIdx === -1) break;
                                centers.push(candidates[bestIdx]);
                                // Mark covered
                                for (var j = 0; j < candidates.length; j++) {
                                    if (!covered[j]) {
                                        var dx = candidates[bestIdx][0] - candidates[j][0];
                                        var dy = candidates[bestIdx][1] - candidates[j][1];
                                        if (Math.sqrt(dx * dx + dy * dy) <= eps) {
                                            covered[j] = true;
                                            remaining--;
                                        }
                                    }
                                }
                            }
                            return centers;
                        }

                        function computeAndDraw() {
                            var centers = computeCover();
                            var N = centers.length;

                            // Record for log-log plot
                            var found = false;
                            for (var k = 0; k < logData.length; k++) {
                                if (Math.abs(logData[k][0] - eps) < 0.001) { logData[k][1] = N; found = true; break; }
                            }
                            if (!found) logData.push([eps, N]);
                            logData.sort(function(a, b) { return b[0] - a[0]; });

                            draw(centers, N);
                        }

                        function draw(centers, N) {
                            viz.clear();

                            // --- Left panel: the covering ---
                            // Draw shape boundary
                            ctx.save();
                            if (shape === 'circle') {
                                viz.drawCircle(0, 0, 2, 'rgba(88,166,255,0.08)', viz.colors.blue + '66', 1.5);
                            } else if (shape === 'square') {
                                viz.drawPolygon([[-2,-2],[2,-2],[2,2],[-2,2]], 'rgba(88,166,255,0.08)', viz.colors.blue + '66', 1.5);
                            } else if (shape === 'diamond') {
                                viz.drawPolygon([[0,-2],[2,0],[0,2],[-2,0]], 'rgba(88,166,255,0.08)', viz.colors.blue + '66', 1.5);
                            }
                            ctx.restore();

                            // Draw covering balls
                            if (centers) {
                                for (var i = 0; i < centers.length; i++) {
                                    var cx = centers[i][0], cy = centers[i][1];
                                    viz.drawCircle(cx, cy, eps, 'rgba(63,185,160,0.10)', viz.colors.teal + '44', 0.8);
                                    viz.drawPoint(cx, cy, viz.colors.teal, null, 2.5);
                                }
                            }

                            // Labels
                            viz.screenText('N(\u03B5) = ' + (N || 0), 200, 20, viz.colors.white, 16, 'center');
                            viz.screenText('\u03B5 = ' + eps.toFixed(2), 200, 40, viz.colors.teal, 13, 'center');

                            // Shape label
                            var shapeName = shape === 'circle' ? 'B\u00B2\u2082 (Euclidean ball)' : (shape === 'square' ? 'B\u00B2\u221E (sup-norm ball)' : 'B\u00B2\u2081 (\u2113\u00B9 ball)');
                            viz.screenText(shapeName, 200, viz.height - 12, viz.colors.muted, 11, 'center');

                            // --- Right panel: log-log plot ---
                            var plotL = 440, plotR = 800, plotT = 50, plotB = 380;
                            var plotW = plotR - plotL, plotH = plotB - plotT;

                            // Background
                            ctx.fillStyle = '#0a0a1a';
                            ctx.fillRect(plotL, plotT, plotW, plotH);
                            ctx.strokeStyle = '#222255';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(plotL, plotT, plotW, plotH);

                            // Axis labels
                            ctx.fillStyle = viz.colors.muted;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('log(1/\u03B5)', (plotL + plotR) / 2, plotB + 18);
                            ctx.save();
                            ctx.translate(plotL - 20, (plotT + plotB) / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('log N(\u03B5)', 0, 0);
                            ctx.restore();

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Metric Entropy: log N vs log(1/\u03B5)', (plotL + plotR) / 2, plotT - 10);

                            if (logData.length > 0) {
                                // Compute log values
                                var logPts = [];
                                for (var i = 0; i < logData.length; i++) {
                                    var lx = Math.log(1 / logData[i][0]);
                                    var ly = Math.log(Math.max(1, logData[i][1]));
                                    logPts.push([lx, ly]);
                                }

                                // Find range
                                var xMin = 0, xMax = 0, yMin = 0, yMax = 0;
                                for (var i = 0; i < logPts.length; i++) {
                                    xMax = Math.max(xMax, logPts[i][0]);
                                    yMax = Math.max(yMax, logPts[i][1]);
                                }
                                xMax = Math.max(xMax, 2);
                                yMax = Math.max(yMax, 2);
                                var xPad = 0.2, yPad = 0.3;

                                function toPlotX(v) { return plotL + (v - xMin + xPad) / (xMax - xMin + 2 * xPad) * plotW; }
                                function toPlotY(v) { return plotB - (v - yMin + yPad) / (yMax - yMin + 2 * yPad) * plotH; }

                                // Grid lines
                                ctx.strokeStyle = '#1a1a40';
                                ctx.lineWidth = 0.5;
                                for (var g = 0; g <= Math.ceil(xMax); g++) {
                                    var gx = toPlotX(g);
                                    if (gx >= plotL && gx <= plotR) {
                                        ctx.beginPath(); ctx.moveTo(gx, plotT); ctx.lineTo(gx, plotB); ctx.stroke();
                                        ctx.fillStyle = viz.colors.muted; ctx.font = '10px monospace'; ctx.textAlign = 'center';
                                        ctx.fillText(g.toFixed(0), gx, plotB + 10);
                                    }
                                }
                                for (var g = 0; g <= Math.ceil(yMax); g++) {
                                    var gy = toPlotY(g);
                                    if (gy >= plotT && gy <= plotB) {
                                        ctx.beginPath(); ctx.moveTo(plotL, gy); ctx.lineTo(plotR, gy); ctx.stroke();
                                        ctx.fillStyle = viz.colors.muted; ctx.font = '10px monospace'; ctx.textAlign = 'right';
                                        ctx.fillText(g.toFixed(0), plotL - 4, gy + 3);
                                    }
                                }

                                // Reference line: slope = dimension d=2
                                ctx.strokeStyle = viz.colors.orange + '55';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 3]);
                                var refX0 = toPlotX(0), refY0 = toPlotY(0);
                                var refX1 = toPlotX(xMax), refY1 = toPlotY(2 * xMax);
                                ctx.beginPath(); ctx.moveTo(refX0, refY0); ctx.lineTo(refX1, refY1); ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = viz.colors.orange + '88';
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('slope = d = 2', refX1 - 80, refY1 - 6);

                                // Plot points and line
                                if (logPts.length > 1) {
                                    ctx.strokeStyle = viz.colors.teal;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    for (var i = 0; i < logPts.length; i++) {
                                        var px = toPlotX(logPts[i][0]), py = toPlotY(logPts[i][1]);
                                        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                                    }
                                    ctx.stroke();
                                }

                                for (var i = 0; i < logPts.length; i++) {
                                    var px = toPlotX(logPts[i][0]), py = toPlotY(logPts[i][1]);
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
                                }
                            }
                        }

                        computeAndDraw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Construct an explicit \\(\\varepsilon\\)-net for the unit circle \\(S^1 = \\{x \\in \\mathbb{R}^2 : \\|x\\|_2 = 1\\}\\) (with the Euclidean metric) of cardinality at most \\(\\lceil 2\\pi / \\varepsilon \\rceil\\).',
                    hint: 'Place points equally spaced around the circle. If two adjacent points are separated by arc length \\(\\varepsilon\\), the chord length is at most \\(\\varepsilon\\).',
                    solution: 'Place \\(N = \\lceil 2\\pi / \\varepsilon \\rceil\\) points at angles \\(\\theta_k = 2\\pi k / N\\), \\(k = 0, \\ldots, N-1\\). Any point on \\(S^1\\) is within arc length \\(\\pi/N \\leq \\varepsilon/2\\) of some \\(\\theta_k\\), and the chord length is at most the arc length, so it is within Euclidean distance \\(\\varepsilon\\) of some net point.'
                },
                {
                    question: 'Show that for any \\(\\varepsilon\\)-net \\(\\mathcal{N}\\) of a set \\(T \\subseteq \\mathbb{R}^d\\) (with the Euclidean metric), we have \\(T \\subseteq \\mathcal{N} + \\varepsilon B_2^d\\), where \\(A + B = \\{a + b : a \\in A, b \\in B\\}\\) denotes the Minkowski sum.',
                    hint: 'Unpack the definition of \\(\\varepsilon\\)-net: every \\(t \\in T\\) has \\(s \\in \\mathcal{N}\\) with \\(\\|t - s\\|_2 \\leq \\varepsilon\\).',
                    solution: 'For any \\(t \\in T\\), there exists \\(s \\in \\mathcal{N}\\) with \\(\\|t - s\\|_2 \\leq \\varepsilon\\). Then \\(t - s \\in \\varepsilon B_2^d\\), so \\(t = s + (t - s) \\in \\mathcal{N} + \\varepsilon B_2^d\\). Since \\(t\\) was arbitrary, \\(T \\subseteq \\mathcal{N} + \\varepsilon B_2^d\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 2 — Covering and Packing Numbers
        // ============================================================
        {
            id: 'ch04-sec02',
            title: 'Covering and Packing Numbers',
            content: `
                <h2>Covering and Packing Numbers</h2>

                <p>Having introduced \\(\\varepsilon\\)-nets, we now define the two fundamental
                combinatorial quantities that measure the "size" of a metric space at
                resolution \\(\\varepsilon\\).</p>

                <h3>Covering Numbers</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 4.3 (Covering Number)</div>
                    <div class="env-body">
                        <p>The <strong>covering number</strong> \\(\\mathcal{N}(T, d, \\varepsilon)\\) is
                        the minimal cardinality of an \\(\\varepsilon\\)-net of \\(T\\):</p>
                        \\[\\mathcal{N}(T, d, \\varepsilon) = \\min\\bigl\\{|\\mathcal{N}| : \\mathcal{N} \\text{ is an } \\varepsilon\\text{-net of } T\\bigr\\}.\\]
                        <p>When the metric \\(d\\) is clear from context, we write \\(\\mathcal{N}(T, \\varepsilon)\\).</p>
                    </div>
                </div>

                <h3>Packing Numbers</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 4.4 (Packing Number)</div>
                    <div class="env-body">
                        <p>A subset \\(\\mathcal{P} \\subseteq T\\) is called <strong>\\(\\varepsilon\\)-separated</strong>
                        (or an \\(\\varepsilon\\)-packing) if \\(d(x, y) &gt; \\varepsilon\\) for all distinct
                        \\(x, y \\in \\mathcal{P}\\).</p>
                        <p>The <strong>packing number</strong> \\(\\mathcal{M}(T, d, \\varepsilon)\\) is the
                        maximal cardinality of an \\(\\varepsilon\\)-separated subset:</p>
                        \\[\\mathcal{M}(T, d, \\varepsilon) = \\max\\bigl\\{|\\mathcal{P}| : \\mathcal{P} \\subseteq T,\\; d(x,y) > \\varepsilon \\text{ for all } x \\neq y\\bigr\\}.\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Covering vs. Packing</div>
                    <div class="env-body">
                        <p><strong>Covering</strong> asks: how few balls do we need to blanket the set?
                        <strong>Packing</strong> asks: how many non-overlapping balls can we fit inside?
                        These are dual perspectives on the same geometric complexity, and they
                        are comparable up to a factor of \\(2\\) in \\(\\varepsilon\\).</p>
                    </div>
                </div>

                <h3>The Covering-Packing Duality</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 4.1 (Covering-Packing Comparison)</div>
                    <div class="env-body">
                        <p>For any metric space \\((T, d)\\) and \\(\\varepsilon &gt; 0\\),</p>
                        \\[\\mathcal{M}(T, d, 2\\varepsilon) \\leq \\mathcal{N}(T, d, \\varepsilon) \\leq \\mathcal{M}(T, d, \\varepsilon).\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>Right inequality:</strong> \\(\\mathcal{N}(T, d, \\varepsilon) \\leq \\mathcal{M}(T, d, \\varepsilon)\\).
                        Let \\(\\mathcal{P}\\) be a <em>maximal</em> \\(\\varepsilon\\)-packing (one that cannot be enlarged).
                        Then \\(\\mathcal{P}\\) is automatically an \\(\\varepsilon\\)-net: if some \\(t \\in T\\) were at
                        distance \\(&gt; \\varepsilon\\) from every point of \\(\\mathcal{P}\\), we could add \\(t\\) to
                        \\(\\mathcal{P}\\), contradicting maximality. Hence
                        \\(\\mathcal{N}(T, d, \\varepsilon) \\leq |\\mathcal{P}| = \\mathcal{M}(T, d, \\varepsilon)\\).</p>

                        <p><strong>Left inequality:</strong> \\(\\mathcal{M}(T, d, 2\\varepsilon) \\leq \\mathcal{N}(T, d, \\varepsilon)\\).
                        Let \\(\\mathcal{N}\\) be a minimal \\(\\varepsilon\\)-net and \\(\\mathcal{P}\\) any
                        \\(2\\varepsilon\\)-separated set. Each point \\(p \\in \\mathcal{P}\\) has a neighbor
                        \\(\\pi(p) \\in \\mathcal{N}\\) with \\(d(p, \\pi(p)) \\leq \\varepsilon\\). The map
                        \\(\\pi: \\mathcal{P} \\to \\mathcal{N}\\) is injective: if \\(\\pi(p) = \\pi(q)\\), then
                        \\(d(p, q) \\leq d(p, \\pi(p)) + d(\\pi(p), q) \\leq 2\\varepsilon\\), contradicting
                        \\(2\\varepsilon\\)-separation. So
                        \\(|\\mathcal{P}| \\leq |\\mathcal{N}| = \\mathcal{N}(T, d, \\varepsilon)\\).</p>
                        <div class="qed">&square;</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>This theorem is enormously useful in practice. To <em>upper-bound</em> the covering
                        number, it suffices to construct any \\(\\varepsilon\\)-net (often by a greedy argument).
                        To <em>lower-bound</em> it, construct a large separated set. Both are typically easier
                        than directly optimizing over all possible covers.</p>
                    </div>
                </div>

                <h3>Volumetric Bounds</h3>

                <p>The simplest technique for bounding covering numbers is a <strong>volume comparison</strong>
                argument. The idea is beautifully geometric: the covering balls must have enough
                total volume to cover \\(T\\), and their individual volumes cannot exceed that of the
                ambient space.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 4.2 (Volumetric Bound for the Euclidean Ball)</div>
                    <div class="env-body">
                        <p>For the Euclidean unit ball \\(B_2^d \\subseteq \\mathbb{R}^d\\),</p>
                        \\[\\left(\\frac{1}{\\varepsilon}\\right)^d \\leq \\mathcal{N}(B_2^d, \\|\\cdot\\|_2, \\varepsilon) \\leq \\left(\\frac{2}{\\varepsilon} + 1\\right)^d \\leq \\left(\\frac{3}{\\varepsilon}\\right)^d.\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>Upper bound:</strong> Let \\(\\mathcal{P}\\) be a maximal \\(\\varepsilon\\)-packing
                        of \\(B_2^d\\). By maximality, it is an \\(\\varepsilon\\)-net, so
                        \\(\\mathcal{N}(B_2^d, \\varepsilon) \\leq |\\mathcal{P}|\\). The balls
                        \\(B(x, \\varepsilon/2)\\) for \\(x \\in \\mathcal{P}\\) are disjoint (by the
                        \\(\\varepsilon\\)-separation) and all lie in \\((1 + \\varepsilon/2) B_2^d\\).
                        Comparing volumes:</p>
                        \\[|\\mathcal{P}| \\cdot \\mathrm{vol}\\bigl(\\tfrac{\\varepsilon}{2} B_2^d\\bigr) \\leq \\mathrm{vol}\\bigl((1 + \\tfrac{\\varepsilon}{2}) B_2^d\\bigr),\\]
                        <p>which gives \\(|\\mathcal{P}| \\leq (1 + \\varepsilon/2)^d / (\\varepsilon/2)^d = (2/\\varepsilon + 1)^d\\).</p>

                        <p><strong>Lower bound:</strong> Let \\(\\mathcal{N}\\) be a minimal \\(\\varepsilon\\)-net.
                        Then \\(B_2^d \\subseteq \\bigcup_{s \\in \\mathcal{N}} B(s, \\varepsilon)\\), so</p>
                        \\[\\mathrm{vol}(B_2^d) \\leq |\\mathcal{N}| \\cdot \\mathrm{vol}(\\varepsilon B_2^d),\\]
                        <p>giving \\(|\\mathcal{N}| \\geq 1/\\varepsilon^d\\).</p>
                        <div class="qed">&square;</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 4.3 (Exponential Growth)</div>
                    <div class="env-body">
                        <p>For the unit ball in \\(\\mathbb{R}^{100}\\) at resolution \\(\\varepsilon = 0.1\\),
                        the covering number is between \\(10^{100}\\) and \\(30^{100} \\approx 10^{148}\\).
                        This astronomical number illustrates why discretization-based approaches
                        that work in low dimensions become infeasible in high dimensions.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning: The Curse of Dimensionality</div>
                    <div class="env-body">
                        <p>The volumetric bound shows that \\(\\log \\mathcal{N}(B_2^d, \\varepsilon) \\asymp d \\log(1/\\varepsilon)\\).
                        The linear dependence on dimension \\(d\\) is the hallmark of the curse of dimensionality:
                        covering a high-dimensional ball requires exponentially many points. This is why
                        structured assumptions (sparsity, low rank, etc.) are essential in high-dimensional statistics.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Prove that a maximal \\(\\varepsilon\\)-packing of a totally bounded set \\(T\\) is always finite.',
                    hint: 'If the packing were infinite, the packing points would form an infinite \\(\\varepsilon\\)-separated sequence. Use total boundedness to derive a contradiction.',
                    solution: 'Suppose \\(\\{x_n\\}_{n=1}^\\infty\\) is an infinite \\(\\varepsilon\\)-separated set in \\(T\\). Cover \\(T\\) by finitely many balls of radius \\(\\varepsilon/2\\). By the pigeonhole principle, two points \\(x_i, x_j\\) lie in the same ball, so \\(d(x_i, x_j) \\leq \\varepsilon\\), contradicting separation. Thus every \\(\\varepsilon\\)-packing is finite.'
                },
                {
                    question: 'Compute the covering number \\(\\mathcal{N}(\\{0,1\\}^d, d_H, r)\\) where \\(d_H\\) is the Hamming distance, for \\(r = 1\\). That is, find the minimum number of Hamming balls of radius \\(1\\) needed to cover the Boolean hypercube.',
                    hint: 'A Hamming ball of radius \\(1\\) around a vertex \\(v \\in \\{0,1\\}^d\\) contains \\(v\\) and its \\(d\\) neighbors. Use a volume argument: \\(|\\mathcal{N}| \\cdot (1 + d) \\geq 2^d\\).',
                    solution: 'Each Hamming ball of radius \\(1\\) contains \\(1 + d\\) vertices (the center and its \\(d\\) neighbors obtained by flipping one bit). Since the balls must cover all \\(2^d\\) vertices, we need \\(|\\mathcal{N}| \\geq 2^d/(1+d)\\). This is the classical Hamming bound. For the exact covering number (the smallest perfect or near-perfect code), the answer depends on \\(d\\): when \\(d = 2^k - 1\\) for some \\(k\\), perfect Hamming codes achieve \\(|\\mathcal{N}| = 2^d/(1+d)\\) exactly.'
                }
            ]
        },

        // ============================================================
        // SECTION 3 — Metric Entropy
        // ============================================================
        {
            id: 'ch04-sec03',
            title: 'Metric Entropy',
            content: `
                <h2>Metric Entropy</h2>

                <p>The <strong>metric entropy</strong> (or <strong>entropy number</strong>) of a set
                is the logarithm of its covering number. This quantity plays the role of an
                effective dimension and appears throughout high-dimensional probability and
                statistics.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 4.5 (Metric Entropy)</div>
                    <div class="env-body">
                        <p>The <strong>metric entropy</strong> of \\((T, d)\\) at scale \\(\\varepsilon\\) is</p>
                        \\[H(T, d, \\varepsilon) = \\log \\mathcal{N}(T, d, \\varepsilon),\\]
                        <p>where the logarithm is typically taken as the natural logarithm. When
                        we want to emphasize the base-2 logarithm, we write \\(H_2\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Entropy as Effective Dimension</div>
                    <div class="env-body">
                        <p>For the Euclidean ball \\(B_2^d\\), we have \\(H(B_2^d, \\varepsilon) \\asymp d \\log(1/\\varepsilon)\\).
                        The coefficient of \\(\\log(1/\\varepsilon)\\) is the dimension \\(d\\), which captures
                        the "number of degrees of freedom" in the set. For more complex sets (ellipsoids, Sobolev balls),
                        the metric entropy can grow at different rates, revealing the effective dimension.</p>
                    </div>
                </div>

                <h3>Metric Entropy of Standard Sets</h3>

                <p>Let us compute (or bound) the metric entropy for several fundamental examples
                that arise throughout high-dimensional statistics.</p>

                <div class="env-block example">
                    <div class="env-title">Example 4.4 (Euclidean Ball \\(B_2^d\\))</div>
                    <div class="env-body">
                        <p>From the volumetric argument (Theorem 4.2):</p>
                        \\[d \\log\\frac{1}{\\varepsilon} \\leq H(B_2^d, \\|\\cdot\\|_2, \\varepsilon) \\leq d \\log\\frac{3}{\\varepsilon}.\\]
                        <p>So \\(H(B_2^d, \\varepsilon) = \\Theta(d \\log(1/\\varepsilon))\\) as \\(\\varepsilon \\to 0\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 4.5 (Ellipsoid)</div>
                    <div class="env-body">
                        <p>Let \\(\\mathcal{E} = \\{x \\in \\mathbb{R}^d : \\sum_{i=1}^d x_i^2/a_i^2 \\leq 1\\}\\) be an
                        ellipsoid with semi-axes \\(a_1 \\geq a_2 \\geq \\cdots \\geq a_d &gt; 0\\). Then</p>
                        \\[H(\\mathcal{E}, \\|\\cdot\\|_2, \\varepsilon) \\asymp \\sum_{i=1}^d \\log^+\\!\\left(\\frac{a_i}{\\varepsilon}\\right),\\]
                        <p>where \\(\\log^+(x) = \\max(\\log x, 0)\\). Only the axes with \\(a_i &gt; \\varepsilon\\)
                        contribute: the set is effectively \\(d_{\\mathrm{eff}}(\\varepsilon) = |\\{i : a_i &gt; \\varepsilon\\}|\\)-dimensional
                        at scale \\(\\varepsilon\\). This is the prototype for understanding how
                        <strong>effective dimensionality</strong> depends on scale.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 4.6 (Sobolev Ball)</div>
                    <div class="env-body">
                        <p>Let \\(W_2^s(1)\\) be the unit ball of the Sobolev space of smoothness \\(s\\) on \\([0,1]\\),
                        embedded in \\(L^2[0,1]\\). Then</p>
                        \\[H(W_2^s(1), L^2, \\varepsilon) \\asymp \\varepsilon^{-1/s}.\\]
                        <p>Smoother function classes (larger \\(s\\)) have smaller entropy, reflecting
                        the fact that smooth functions have fewer "degrees of freedom." This
                        is why smooth nonparametric estimation achieves faster rates.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 4.7 (Finite Sets)</div>
                    <div class="env-body">
                        <p>If \\(|T| = N\\), then \\(\\mathcal{N}(T, d, \\varepsilon) \\leq N\\) trivially (the set
                        itself is an \\(\\varepsilon\\)-net for any \\(\\varepsilon \\geq 0\\)). In particular,
                        \\(H(T, d, \\varepsilon) \\leq \\log N\\) for all \\(\\varepsilon\\). This bound is sharp
                        for the discrete metric (where all distances are \\(1\\)) when \\(\\varepsilon &lt; 1\\).</p>
                    </div>
                </div>

                <h3>Properties of Metric Entropy</h3>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 4.3 (Monotonicity and Sub-additivity)</div>
                    <div class="env-body">
                        <p>For any metric space \\((T, d)\\):</p>
                        <ol>
                            <li><strong>Monotonicity in \\(\\varepsilon\\):</strong> \\(H(T, d, \\varepsilon)\\) is non-increasing in \\(\\varepsilon\\).</li>
                            <li><strong>Monotonicity in \\(T\\):</strong> If \\(S \\subseteq T\\), then \\(H(S, d, \\varepsilon) \\leq H(T, d, \\varepsilon)\\).</li>
                            <li><strong>Sub-additivity:</strong> \\(H(T_1 \\times T_2, d_1 \\times d_2, 2\\varepsilon) \\leq H(T_1, d_1, \\varepsilon) + H(T_2, d_2, \\varepsilon)\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Sub-additivity)</div>
                    <div class="env-body">
                        <p>Let \\(\\mathcal{N}_1, \\mathcal{N}_2\\) be \\(\\varepsilon\\)-nets for \\(T_1, T_2\\)
                        respectively. Then \\(\\mathcal{N}_1 \\times \\mathcal{N}_2\\) is a \\(2\\varepsilon\\)-net
                        for \\(T_1 \\times T_2\\) under the product metric
                        \\(d_{\\max}((s_1,s_2),(t_1,t_2)) = \\max(d_1(s_1,t_1), d_2(s_2,t_2))\\):
                        for any \\((t_1, t_2)\\), choose \\(s_1 \\in \\mathcal{N}_1, s_2 \\in \\mathcal{N}_2\\)
                        with \\(d_i(s_i, t_i) \\leq \\varepsilon\\), so
                        \\(d_{\\max}((s_1,s_2),(t_1,t_2)) \\leq \\varepsilon\\). Hence
                        \\(\\mathcal{N}(T_1 \\times T_2, 2\\varepsilon) \\leq |\\mathcal{N}_1| \\cdot |\\mathcal{N}_2|\\),
                        and taking logs gives the result.</p>
                        <div class="qed">&square;</div>
                    </div>
                </div>

                <h3>Entropy and Statistical Complexity</h3>

                <div class="env-block remark">
                    <div class="env-title">Remark: Why Metric Entropy Matters in Statistics</div>
                    <div class="env-body">
                        <p>Metric entropy governs the difficulty of statistical estimation problems:</p>
                        <ul>
                            <li><strong>Minimax rates:</strong> For a function class \\(\\mathcal{F}\\), the minimax rate of estimation in \\(L^2\\) is often determined by the critical radius \\(\\varepsilon_n\\) solving \\(H(\\mathcal{F}, \\varepsilon_n) \\asymp n \\varepsilon_n^2\\).</li>
                            <li><strong>Uniform convergence:</strong> Empirical processes indexed by \\(\\mathcal{F}\\) converge uniformly when the entropy integral \\(\\int_0^\\infty \\sqrt{H(\\mathcal{F}, \\varepsilon)}\\, d\\varepsilon &lt; \\infty\\).</li>
                            <li><strong>Model selection:</strong> Penalized procedures (e.g., minimum description length) use metric entropy as a complexity penalty.</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Let \\(B_1^d = \\{x \\in \\mathbb{R}^d : \\|x\\|_1 \\leq 1\\}\\) be the \\(\\ell_1\\) unit ball. Use the volumetric argument to show that \\(\\mathcal{N}(B_1^d, \\|\\cdot\\|_2, \\varepsilon) \\leq (C/\\varepsilon)^d\\) for a universal constant \\(C\\). Then show that \\(B_1^d \\subseteq \\sqrt{d}\\, B_2^d\\) and use this to give a more refined bound.',
                    hint: 'For the first part, use \\(B_1^d \\subseteq B_2^d\\) and the volumetric bound for \\(B_2^d\\). For the refinement, note that the \\(\\ell_1\\) ball is "spiky" and its volume is much smaller than that of \\(B_2^d\\).',
                    solution: 'Since \\(\\|x\\|_2 \\leq \\|x\\|_1\\), we have \\(B_1^d \\subseteq B_2^d\\), so \\(\\mathcal{N}(B_1^d, \\|\\cdot\\|_2, \\varepsilon) \\leq \\mathcal{N}(B_2^d, \\|\\cdot\\|_2, \\varepsilon) \\leq (3/\\varepsilon)^d\\). For the refinement: \\(\\mathrm{vol}(B_1^d) = 2^d/d!\\) while \\(\\mathrm{vol}(\\varepsilon B_2^d) = \\varepsilon^d \\cdot \\pi^{d/2}/\\Gamma(d/2+1)\\). By the volumetric lower bound, \\(\\mathcal{N} \\geq \\mathrm{vol}(B_1^d)/\\mathrm{vol}(\\varepsilon B_2^d)\\). Using Stirling, the ratio is approximately \\((C\\sqrt{d}/\\varepsilon)^d \\cdot (e/d)^{d/2}\\). The \\(\\ell_1\\) ball is much smaller than \\(B_2^d\\) in high dimensions, so the actual covering number can be substantially smaller.'
                },
                {
                    question: 'Show that the metric entropy of the unit sphere \\(S^{d-1}\\) satisfies \\(H(S^{d-1}, \\|\\cdot\\|_2, \\varepsilon) \\leq d \\log(3/\\varepsilon)\\) for \\(0 &lt; \\varepsilon &lt; 2\\).',
                    hint: 'Use \\(S^{d-1} \\subseteq B_2^d\\) and the volumetric bound. Alternatively, construct an \\(\\varepsilon\\)-net for \\(S^{d-1}\\) from one for \\(B_2^d\\) by projecting.',
                    solution: 'Since \\(S^{d-1} \\subseteq B_2^d\\), any \\(\\varepsilon\\)-net for \\(B_2^d\\) restricts to an \\(\\varepsilon\\)-net for \\(S^{d-1}\\), giving \\(\\mathcal{N}(S^{d-1}, \\varepsilon) \\leq \\mathcal{N}(B_2^d, \\varepsilon) \\leq (3/\\varepsilon)^d\\). Taking logs: \\(H(S^{d-1}, \\varepsilon) \\leq d \\log(3/\\varepsilon)\\). A matching lower bound \\(H(S^{d-1}, \\varepsilon) \\geq (d-1) \\log(1/\\varepsilon)\\) follows from the cap-packing argument (packing spherical caps of angular radius \\(\\varepsilon\\)).'
                }
            ]
        },

        // ============================================================
        // SECTION 4 — Dudley's Entropy Integral
        // ============================================================
        {
            id: 'ch04-sec04',
            title: "Dudley's Entropy Integral",
            content: `
                <h2>Dudley's Entropy Integral</h2>

                <p>One of the most important applications of metric entropy is bounding
                the <strong>supremum of a stochastic process</strong>. Given a random process
                \\(\\{X_t\\}_{t \\in T}\\), when can we control \\(\\mathbb{E}\\sup_{t \\in T} X_t\\)?
                Dudley's entropy integral provides a powerful answer for Gaussian processes.</p>

                <h3>Gaussian Processes</h3>

                <p>Recall that a <strong>Gaussian process</strong> \\(\\{X_t\\}_{t \\in T}\\)
                is a collection of random variables, indexed by a set \\(T\\), such that
                every finite subcollection \\((X_{t_1}, \\ldots, X_{t_k})\\) has a joint
                Gaussian distribution. The process is determined by its mean function
                \\(\\mu(t) = \\mathbb{E}X_t\\) and covariance function
                \\(K(s,t) = \\mathbb{E}[(X_s - \\mu(s))(X_t - \\mu(t))]\\).</p>

                <p>The canonical (semi-)metric on \\(T\\) induced by the process is</p>
                \\[d(s,t) = \\bigl(\\mathbb{E}|X_s - X_t|^2\\bigr)^{1/2}.\\]

                <p>The question of bounding \\(\\mathbb{E}\\sup_{t \\in T} X_t\\) is central to
                many problems: bounding the operator norm of random matrices, controlling
                empirical processes, establishing minimax rates, and more.</p>

                <h3>The Chaining Idea</h3>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Multi-Scale Approximation</div>
                    <div class="env-body">
                        <p>The key idea of <strong>chaining</strong> (due to Kolmogorov and refined by Dudley) is
                        to approximate \\(X_t\\) through a <em>telescoping sequence</em> of increasingly fine nets:</p>
                        \\[X_t = X_{\\pi_0(t)} + (X_{\\pi_1(t)} - X_{\\pi_0(t)}) + (X_{\\pi_2(t)} - X_{\\pi_1(t)}) + \\cdots\\]
                        <p>where \\(\\pi_k(t)\\) is the nearest point to \\(t\\) in a \\(2^{-k}\\)-net. Each
                        increment \\(X_{\\pi_{k+1}(t)} - X_{\\pi_k(t)}\\) is Gaussian with standard deviation at most
                        \\(d(\\pi_{k+1}(t), \\pi_k(t)) \\leq 2^{-k} + 2^{-(k+1)} \\leq 2^{-(k-1)}\\), and the
                        number of possible values of \\(\\pi_k(t)\\) is bounded by the covering number at
                        scale \\(2^{-k}\\). A union bound at each level yields the entropy integral.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 4.3 (Dudley's Entropy Integral)</div>
                    <div class="env-body">
                        <p>Let \\(\\{X_t\\}_{t \\in T}\\) be a centered Gaussian process with the
                        canonical metric \\(d(s,t) = (\\mathbb{E}|X_s - X_t|^2)^{1/2}\\). Then</p>
                        \\[\\mathbb{E}\\sup_{t \\in T} X_t \\leq C \\int_0^{\\mathrm{diam}(T)} \\sqrt{\\log \\mathcal{N}(T, d, \\varepsilon)}\\, d\\varepsilon,\\]
                        <p>where \\(C\\) is a universal constant (one can take \\(C = 12\\)) and
                        \\(\\mathrm{diam}(T) = \\sup_{s,t \\in T} d(s,t)\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>Fix \\(t_0 \\in T\\). For each integer \\(k \\geq 0\\), let \\(\\mathcal{N}_k\\)
                        be a \\(2^{-k}\\)-net of \\(T\\) with \\(|\\mathcal{N}_k| = \\mathcal{N}(T, d, 2^{-k})\\),
                        and let \\(\\pi_k(t)\\) be the nearest element of \\(\\mathcal{N}_k\\) to \\(t\\).
                        Then for any \\(t \\in T\\) and large enough \\(K\\):</p>
                        \\[X_t - X_{t_0} = \\sum_{k=0}^{K} \\bigl(X_{\\pi_{k+1}(t)} - X_{\\pi_k(t)}\\bigr) + \\bigl(X_t - X_{\\pi_{K+1}(t)}\\bigr).\\]
                        <p>For the \\(k\\)-th increment: \\(d(\\pi_{k+1}(t), \\pi_k(t)) \\leq 2^{-k} + 2^{-(k+1)} \\leq 3 \\cdot 2^{-(k+1)}\\),
                        and the pair \\((\\pi_{k+1}(t), \\pi_k(t))\\) takes at most
                        \\(|\\mathcal{N}_{k+1}| \\cdot |\\mathcal{N}_k|\\) values. By a Gaussian
                        maximal inequality (maximum of \\(N\\) centered Gaussians with variance
                        \\(\\sigma^2\\) has expectation \\(\\leq \\sigma\\sqrt{2\\log N}\\)), the \\(k\\)-th
                        level contributes at most</p>
                        \\[C \\cdot 2^{-k} \\sqrt{\\log \\mathcal{N}(T, d, 2^{-k})}.\\]
                        <p>Summing over \\(k\\) and comparing with a Riemann integral gives the bound.</p>
                        <div class="qed">&square;</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-dudley"></div>

                <h3>Sudakov Minoration: A Converse</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 4.4 (Sudakov Minoration)</div>
                    <div class="env-body">
                        <p>Let \\(\\{X_t\\}_{t \\in T}\\) be a centered Gaussian process. Then for every \\(\\varepsilon &gt; 0\\),</p>
                        \\[\\mathbb{E}\\sup_{t \\in T} X_t \\geq c\\, \\varepsilon \\sqrt{\\log \\mathcal{M}(T, d, \\varepsilon)},\\]
                        <p>where \\(c &gt; 0\\) is a universal constant and \\(\\mathcal{M}\\) is the packing number.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: Dudley vs. Sudakov</div>
                    <div class="env-body">
                        <p><strong>Dudley</strong> gives an <em>upper</em> bound via an integral over all scales.
                        <strong>Sudakov</strong> gives a <em>lower</em> bound using a single scale.
                        Together, they say that the supremum of a Gaussian process is
                        governed by the geometry of the index set (through metric entropy), but the two bounds
                        are not always tight. The gap between them is precisely what <em>generic chaining</em>
                        (Section 5) is designed to close.</p>
                    </div>
                </div>

                <h3>Application: Random Matrices</h3>

                <div class="env-block example">
                    <div class="env-title">Example 4.8 (Operator Norm of a Gaussian Random Matrix)</div>
                    <div class="env-body">
                        <p>Let \\(A\\) be an \\(n \\times d\\) matrix with i.i.d. \\(N(0,1)\\) entries. Then</p>
                        \\[\\|A\\|_{\\mathrm{op}} = \\sup_{x \\in S^{d-1}} \\|Ax\\|_2 = \\sup_{x \\in S^{d-1}} \\sup_{y \\in S^{n-1}} \\langle Ax, y \\rangle.\\]
                        <p>For fixed \\(x, y\\), the quantity \\(\\langle Ax, y \\rangle = \\sum_{i,j} A_{ij} x_j y_i\\) is
                        Gaussian with variance \\(\\|x\\|_2^2 \\|y\\|_2^2 = 1\\). The canonical metric satisfies
                        \\(d((x_1,y_1),(x_2,y_2))^2 = \\|x_1 \\otimes y_1 - x_2 \\otimes y_2\\|_F^2\\).
                        By Dudley's inequality and the entropy bound for \\(S^{d-1} \\times S^{n-1}\\):</p>
                        \\[\\mathbb{E}\\|A\\|_{\\mathrm{op}} \\leq C(\\sqrt{n} + \\sqrt{d}).\\]
                        <p>This recovers (up to constants) the sharp bound \\(\\mathbb{E}\\|A\\|_{\\mathrm{op}} \\sim \\sqrt{n} + \\sqrt{d}\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-dudley',
                    title: "Dudley's Chaining: Multi-Scale Approximation",
                    description: 'Visualize the chaining argument: at each resolution level, the index set is approximated by a net. Use the slider to step through resolution levels and see the telescoping decomposition.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 820, height: 440, scale: 60, originX: 220, originY: 220});
                        var ctx = viz.ctx;

                        var level = 0;
                        var maxLevel = 5;
                        var targetX = 1.8, targetY = 1.3;

                        // Precompute nets at each level for the unit disk
                        // Level k uses eps = 2^(-k) * diam, where diam ~ 2
                        function makeNet(eps) {
                            var pts = [];
                            var step = eps * 0.9;
                            for (var x = -2; x <= 2; x += step) {
                                for (var y = -2; y <= 2; y += step) {
                                    if (x * x + y * y <= 4.01) pts.push([x, y]);
                                }
                            }
                            return pts;
                        }

                        function nearestInNet(px, py, net) {
                            var best = 0, bestDist = 1e9;
                            for (var i = 0; i < net.length; i++) {
                                var dx = net[i][0] - px, dy = net[i][1] - py;
                                var dist = Math.sqrt(dx * dx + dy * dy);
                                if (dist < bestDist) { bestDist = dist; best = i; }
                            }
                            return net[best];
                        }

                        var nets = [];
                        var epsValues = [];
                        for (var k = 0; k <= maxLevel; k++) {
                            var eps = 2 / Math.pow(2, k);
                            epsValues.push(eps);
                            nets.push(makeNet(eps));
                        }

                        var levelSlider = VizEngine.createSlider(controls, 'Level:', 0, maxLevel, level, 1, function(val) {
                            level = Math.round(val);
                            draw();
                        });

                        VizEngine.createButton(controls, 'Animate', function() {
                            level = 0;
                            levelSlider.value = 0;
                            levelSlider.dispatchEvent(new Event('input'));
                            var interval = setInterval(function() {
                                level++;
                                if (level > maxLevel) { clearInterval(interval); return; }
                                levelSlider.value = level;
                                levelSlider.dispatchEvent(new Event('input'));
                            }, 800);
                        });

                        function draw() {
                            viz.clear();

                            // Draw unit disk
                            viz.drawCircle(0, 0, 2, 'rgba(88,166,255,0.06)', viz.colors.blue + '33', 1);

                            // Draw nets for all levels up to current
                            var colors = [viz.colors.red, viz.colors.orange, viz.colors.yellow, viz.colors.green, viz.colors.teal, viz.colors.blue];

                            // Draw the chain path
                            var chainPts = [];
                            var px = targetX, py = targetY;
                            for (var k = 0; k <= level; k++) {
                                var nearest = nearestInNet(px, py, nets[k]);
                                chainPts.push({x: nearest[0], y: nearest[1], level: k});
                            }

                            // Draw current level net
                            if (level <= maxLevel) {
                                var net = nets[level];
                                var netColor = colors[level % colors.length];
                                for (var i = 0; i < net.length; i++) {
                                    viz.drawPoint(net[i][0], net[i][1], netColor + '44', null, 2);
                                }

                                // Draw epsilon circles around net points near the target
                                var eps = epsValues[level];
                                for (var i = 0; i < net.length; i++) {
                                    var dx = net[i][0] - targetX, dy = net[i][1] - targetY;
                                    if (Math.sqrt(dx * dx + dy * dy) < eps * 2) {
                                        viz.drawCircle(net[i][0], net[i][1], eps, netColor + '11', netColor + '33', 0.5);
                                    }
                                }
                            }

                            // Draw chain path
                            for (var k = 0; k < chainPts.length; k++) {
                                var c = colors[chainPts[k].level % colors.length];
                                viz.drawPoint(chainPts[k].x, chainPts[k].y, c, '\u03C0' + chainPts[k].level + '(t)', 5);
                                if (k > 0) {
                                    viz.drawSegment(chainPts[k-1].x, chainPts[k-1].y, chainPts[k].x, chainPts[k].y, c, 2);
                                }
                            }

                            // Draw target point
                            viz.drawPoint(targetX, targetY, viz.colors.white, 't', 6);
                            if (chainPts.length > 0) {
                                var last = chainPts[chainPts.length - 1];
                                viz.drawSegment(last.x, last.y, targetX, targetY, viz.colors.white + '66', 1, true);
                            }

                            // --- Right panel: entropy integral visualization ---
                            var plotL = 470, plotR = 800, plotT = 40, plotB = 400;
                            var plotW = plotR - plotL, plotH = plotB - plotT;

                            ctx.fillStyle = '#0a0a1a';
                            ctx.fillRect(plotL, plotT, plotW, plotH);
                            ctx.strokeStyle = '#222255';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(plotL, plotT, plotW, plotH);

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText("Dudley's Entropy Integral", (plotL + plotR) / 2, plotT - 8);

                            // Plot sqrt(log N(eps)) vs eps, shade area under curve
                            var nPts = 60;
                            var epsMin = 0.05, epsMax = 2.2;

                            function sqrtLogN(e) {
                                // Approximate for unit disk in R^2: N(eps) ~ (3/eps)^2
                                var logN = 2 * Math.log(Math.max(1, 3 / e));
                                return Math.sqrt(logN);
                            }

                            function toPlotPx(e) { return plotL + (e - epsMin) / (epsMax - epsMin) * plotW; }
                            function toPlotPy(v) { return plotB - v / 4.5 * plotH; }

                            // Shade area under curve up to current level epsilon
                            var currentEps = level <= maxLevel ? epsValues[level] : epsMin;
                            ctx.fillStyle = viz.colors.teal + '22';
                            ctx.beginPath();
                            ctx.moveTo(toPlotPx(currentEps), toPlotPy(0));
                            for (var i = 0; i <= nPts; i++) {
                                var e = currentEps + (epsMax - currentEps) * i / nPts;
                                ctx.lineTo(toPlotPx(e), toPlotPy(sqrtLogN(e)));
                            }
                            ctx.lineTo(toPlotPx(epsMax), toPlotPy(0));
                            ctx.closePath();
                            ctx.fill();

                            // Shade "resolved" area
                            if (level > 0) {
                                ctx.fillStyle = viz.colors.green + '22';
                                ctx.beginPath();
                                ctx.moveTo(toPlotPx(currentEps), toPlotPy(0));
                                for (var i = 0; i <= nPts; i++) {
                                    var e = currentEps + (epsMax - currentEps) * i / nPts;
                                    ctx.lineTo(toPlotPx(e), toPlotPy(sqrtLogN(e)));
                                }
                                ctx.lineTo(toPlotPx(epsMax), toPlotPy(0));
                                ctx.closePath();
                                ctx.fill();
                            }

                            // Draw curve
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = 0; i <= nPts; i++) {
                                var e = epsMin + (epsMax - epsMin) * i / nPts;
                                var v = sqrtLogN(e);
                                var px = toPlotPx(e), py = toPlotPy(v);
                                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Mark current epsilon level
                            if (level <= maxLevel) {
                                var markX = toPlotPx(currentEps);
                                ctx.strokeStyle = colors[level % colors.length];
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath(); ctx.moveTo(markX, plotT); ctx.lineTo(markX, plotB); ctx.stroke();
                                ctx.setLineDash([]);

                                ctx.fillStyle = colors[level % colors.length];
                                ctx.font = '11px monospace';
                                ctx.textAlign = 'center';
                                ctx.fillText('\u03B5=' + currentEps.toFixed(2), markX, plotB + 14);
                            }

                            // Axis labels
                            ctx.fillStyle = viz.colors.muted;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('\u03B5', (plotL + plotR) / 2, plotB + 26);
                            ctx.save();
                            ctx.translate(plotL - 14, (plotT + plotB) / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('\u221A(log N(\u03B5))', 0, 0);
                            ctx.restore();

                            // Info text
                            var infoY = 20;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Level k = ' + level, 10, infoY);
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.muted;
                            if (level <= maxLevel) {
                                ctx.fillText('\u03B5_k = ' + currentEps.toFixed(3) + '   |N_k| = ' + nets[Math.min(level, maxLevel)].length, 10, infoY + 18);
                            }
                            ctx.fillText('Chain: X_t \u2248 \u03A3_k (X_\u03C0(k+1) \u2212 X_\u03C0(k))', 10, infoY + 36);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: "Use Dudley's entropy integral to show that if \\(X_t = \\langle g, t \\rangle\\) where \\(g \\sim N(0, I_d)\\) and \\(T = B_2^d\\), then \\(\\mathbb{E}\\sup_{t \\in B_2^d} \\langle g, t\\rangle \\leq C\\sqrt{d}\\). Compare with the exact value \\(\\mathbb{E}\\|g\\|_2 \\sim \\sqrt{d}\\).",
                    hint: 'The canonical metric is \\(d(s,t) = \\|s - t\\|_2\\), so \\(\\mathrm{diam}(T) = 2\\). Use the volumetric bound \\(\\log\\mathcal{N}(B_2^d, \\varepsilon) \\leq d \\log(3/\\varepsilon)\\) and evaluate the integral.',
                    solution: "By Dudley's inequality: \\(\\mathbb{E}\\sup_{t \\in B_2^d}\\langle g,t\\rangle \\leq C\\int_0^2 \\sqrt{d\\log(3/\\varepsilon)}\\,d\\varepsilon\\). Substituting \\(u = \\log(3/\\varepsilon)\\): \\(\\int_0^2 \\sqrt{d\\log(3/\\varepsilon)}\\,d\\varepsilon = 3\\sqrt{d}\\int_{\\log(3/2)}^\\infty e^{-u}\\sqrt{u}\\,du \\leq C'\\sqrt{d}\\). So \\(\\mathbb{E}\\|g\\|_2 = \\mathbb{E}\\sup_{t\\in B_2^d}\\langle g,t\\rangle \\leq C\\sqrt{d}\\), matching the known value \\(\\mathbb{E}\\|g\\|_2 = \\sqrt{2}\\,\\Gamma((d+1)/2)/\\Gamma(d/2) \\sim \\sqrt{d}\\)."
                }
            ]
        },

        // ============================================================
        // SECTION 5 — Generic Chaining and Applications
        // ============================================================
        {
            id: 'ch04-sec05',
            title: 'Chaining and Applications',
            content: `
                <h2>Generic Chaining and Applications</h2>

                <p>Dudley's entropy integral, while powerful, is not always sharp. Talagrand's
                <strong>generic chaining</strong> theory provides the definitive answer to
                the question of when \\(\\mathbb{E}\\sup_{t \\in T} X_t &lt; \\infty\\) for
                Gaussian processes, and gives bounds that are tight up to universal
                constants.</p>

                <h3>The \\(\\gamma_2\\) Functional</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 4.6 (Admissible Sequence and \\(\\gamma_2\\))</div>
                    <div class="env-body">
                        <p>An <strong>admissible sequence</strong> of \\(T\\) is an increasing sequence of
                        partitions \\((\\mathcal{A}_n)_{n \\geq 0}\\) of \\(T\\) such that
                        \\(|\\mathcal{A}_0| = 1\\) and \\(|\\mathcal{A}_n| \\leq 2^{2^n}\\) for all \\(n \\geq 1\\).</p>
                        <p>For \\(t \\in T\\), let \\(A_n(t)\\) denote the unique element of \\(\\mathcal{A}_n\\)
                        containing \\(t\\). The <strong>\\(\\gamma_2\\) functional</strong> is</p>
                        \\[\\gamma_2(T, d) = \\inf_{(\\mathcal{A}_n)} \\sup_{t \\in T} \\sum_{n=0}^{\\infty} 2^{n/2}\\, \\mathrm{diam}(A_n(t)),\\]
                        <p>where the infimum is over all admissible sequences.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Talagrand's Improvement</div>
                    <div class="env-body">
                        <p>Dudley's chaining uses the <em>same</em> net for all points \\(t\\) at each
                        scale. Generic chaining allows different "chains" for different points,
                        choosing the partitions \\(\\mathcal{A}_n\\) to optimally balance the
                        approximation error across the index set. This is like using an adaptive
                        grid that refines more where the process is most variable.</p>

                        <p>The key insight is that in Dudley's bound, the term
                        \\(\\sqrt{\\log \\mathcal{N}(T, 2^{-k})}\\) treats all points equally.
                        But some points may be easier to approximate than others, and generic
                        chaining exploits this.</p>
                    </div>
                </div>

                <h3>The Majorizing Measures Theorem</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 4.5 (Talagrand's Majorizing Measures / Generic Chaining)</div>
                    <div class="env-body">
                        <p>For a centered Gaussian process \\(\\{X_t\\}_{t \\in T}\\) with canonical metric \\(d\\),</p>
                        \\[\\frac{1}{C}\\, \\gamma_2(T, d) \\leq \\mathbb{E}\\sup_{t \\in T} X_t \\leq C\\, \\gamma_2(T, d),\\]
                        <p>where \\(C &gt; 0\\) is a universal constant.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: Historical Significance</div>
                    <div class="env-body">
                        <p>This theorem, proved by Talagrand in 1987 (building on Fernique's work),
                        is one of the deepest results in probability theory. It completely
                        characterizes the boundedness of Gaussian processes in terms of the
                        geometry of the index set. The proof is notoriously difficult. For
                        many applications in statistics, Dudley's integral suffices, but the
                        \\(\\gamma_2\\) functional is needed for sharp results in some settings
                        (e.g., certain problems in compressed sensing and random matrix theory).</p>
                    </div>
                </div>

                <h3>Application: Uniform Laws of Large Numbers</h3>

                <p>Covering numbers play a fundamental role in controlling the
                <strong>uniform deviation</strong> of empirical processes. This is the basis
                for uniform convergence results in statistics and learning theory.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 4.6 (Symmetrization and Covering)</div>
                    <div class="env-body">
                        <p>Let \\(\\mathcal{F}\\) be a class of functions \\(f: \\mathcal{X} \\to [-1, 1]\\) and
                        let \\(X_1, \\ldots, X_n\\) be i.i.d. from distribution \\(P\\). Then</p>
                        \\[\\mathbb{E}\\sup_{f \\in \\mathcal{F}} \\left|\\frac{1}{n}\\sum_{i=1}^n f(X_i) - \\mathbb{E}f(X)\\right| \\leq \\frac{C}{\\sqrt{n}} \\int_0^1 \\sqrt{\\log \\mathcal{N}(\\mathcal{F}, L^2(P_n), \\varepsilon)}\\, d\\varepsilon,\\]
                        <p>where \\(P_n\\) is the empirical measure and \\(L^2(P_n)\\) is the
                        empirical \\(L^2\\) norm.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Connection to Learning Theory</div>
                    <div class="env-body">
                        <p>In statistical learning theory, the function class \\(\\mathcal{F}\\) is
                        the hypothesis class, and the uniform law controls the gap between
                        training error and test error. The metric entropy of \\(\\mathcal{F}\\)
                        (or related quantities like the VC dimension or Rademacher complexity)
                        determines the <em>sample complexity</em> of learning.</p>
                    </div>
                </div>

                <h3>Application: Empirical Process Bounds for Estimation</h3>

                <div class="env-block example">
                    <div class="env-title">Example 4.9 (Nonparametric Regression Rate)</div>
                    <div class="env-body">
                        <p>Consider estimating a function \\(f \\in W_2^s(1)\\) (Sobolev ball of smoothness \\(s\\))
                        from \\(n\\) noisy observations. The metric entropy satisfies
                        \\(H(W_2^s(1), L^2, \\varepsilon) \\asymp \\varepsilon^{-1/s}\\). The critical radius
                        \\(\\varepsilon_n\\) satisfying \\(\\varepsilon_n^{-1/s} \\asymp n \\varepsilon_n^2\\) yields</p>
                        \\[\\varepsilon_n \\asymp n^{-\\frac{2s}{2s+1}},\\]
                        <p>recovering the classical minimax rate for nonparametric regression.
                        The metric entropy directly encodes the statistical difficulty of the problem.</p>
                    </div>
                </div>

                <h3>Summary and Looking Ahead</h3>

                <div class="env-block remark">
                    <div class="env-title">Chapter Summary</div>
                    <div class="env-body">
                        <p>We have developed the theory of covering numbers and metric entropy as
                        measures of geometric complexity:</p>
                        <ol>
                            <li><strong>\\(\\varepsilon\\)-nets and covers</strong> provide finite approximations to infinite sets.</li>
                            <li><strong>Covering and packing numbers</strong> are dual measures, related by a factor of \\(2\\) in \\(\\varepsilon\\).</li>
                            <li><strong>Metric entropy</strong> \\(H(T, \\varepsilon) = \\log \\mathcal{N}(T, \\varepsilon)\\) captures effective dimension.</li>
                            <li><strong>Dudley's entropy integral</strong> bounds the supremum of Gaussian processes in terms of metric entropy.</li>
                            <li><strong>Generic chaining</strong> (\\(\\gamma_2\\)) gives the exact characterization of Gaussian process suprema.</li>
                        </ol>
                        <p>These tools are fundamental to the rest of the course: they underlie
                        the analysis of random matrices (Part B), sparse estimation (Part C),
                        and minimax theory (Part F).</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: "Show that Dudley's entropy integral bound is tight (up to constants) for the canonical example \\(T = B_2^d\\) with the Gaussian process \\(X_t = \\langle g, t \\rangle\\). That is, show that both Dudley and Sudakov give bounds of order \\(\\sqrt{d}\\).",
                    hint: 'For Sudakov, choose \\(\\varepsilon\\) optimally. An \\(\\varepsilon\\)-packing of \\(B_2^d\\) has size at least \\((1/\\varepsilon)^d\\), so \\(\\varepsilon\\sqrt{\\log(1/\\varepsilon)^d} = \\varepsilon\\sqrt{d\\log(1/\\varepsilon)}\\). Optimize over \\(\\varepsilon\\).',
                    solution: 'Dudley gives \\(\\mathbb{E}\\|g\\|_2 \\leq C\\sqrt{d}\\) (computed in Exercise 1 of Section 4). For Sudakov: \\(\\mathbb{E}\\|g\\|_2 \\geq c\\,\\varepsilon\\sqrt{\\log\\mathcal{M}(B_2^d,\\varepsilon)}\\). Using \\(\\mathcal{M}(B_2^d,\\varepsilon) \\geq (1/\\varepsilon)^d\\), we get \\(\\mathbb{E}\\|g\\|_2 \\geq c\\,\\varepsilon\\sqrt{d\\log(1/\\varepsilon)}\\). Choosing \\(\\varepsilon = 1\\) gives \\(\\mathbb{E}\\|g\\|_2 \\geq 0\\) (useless). Choosing \\(\\varepsilon = 1/e\\) gives \\(\\mathbb{E}\\|g\\|_2 \\geq c\\sqrt{d}/e\\). More carefully, choosing \\(\\varepsilon = 1/\\sqrt{e}\\) gives \\(\\mathbb{E}\\|g\\|_2 \\geq c\'\\sqrt{d}\\). So both bounds are of order \\(\\sqrt{d}\\).'
                },
                {
                    question: 'Let \\(\\mathcal{F}\\) be the class of all linear functions \\(f(x) = \\langle \\theta, x \\rangle\\) with \\(\\|\\theta\\|_2 \\leq 1\\), where \\(x \\in \\mathbb{R}^d\\). If \\(X_1, \\ldots, X_n \\sim N(0, I_d)\\), bound the expected supremum of the empirical process \\(\\mathbb{E}\\sup_{\\|\\theta\\|_2 \\leq 1} |n^{-1}\\sum_{i=1}^n \\langle \\theta, X_i \\rangle - 0|\\) using covering number arguments.',
                    hint: 'The supremum equals \\(\\|\\bar{X}\\|_2\\) where \\(\\bar{X} = n^{-1}\\sum X_i\\). Since \\(\\bar{X} \\sim N(0, n^{-1}I_d)\\), this is \\(n^{-1/2}\\mathbb{E}\\|g\\|_2 \\sim \\sqrt{d/n}\\). Verify this matches the covering number bound.',
                    solution: 'The supremum is \\(\\|\\bar{X}\\|_2\\) where \\(\\bar{X} = n^{-1}\\sum_{i=1}^n X_i \\sim N(0, n^{-1} I_d)\\). By the \\(\\varepsilon\\)-net argument on \\(S^{d-1}\\): cover \\(S^{d-1}\\) by a \\((1/2)\\)-net of size \\(\\leq 5^d\\). For each net point \\(\\theta_j\\), \\(\\langle \\theta_j, \\bar{X}\\rangle \\sim N(0, 1/n)\\). The maximum over \\(5^d\\) such Gaussians has expectation \\(\\leq \\sqrt{2d\\log 5/n}\\). By the standard net + approximation argument, \\(\\|\\bar{X}\\|_2 \\leq 2 \\max_j |\\langle \\theta_j, \\bar{X}\\rangle| \\leq C\\sqrt{d/n}\\). This matches the exact calculation \\(\\mathbb{E}\\|\\bar{X}\\|_2 = n^{-1/2}\\mathbb{E}\\|g\\|_2 \\sim \\sqrt{d/n}\\).'
                }
            ]
        }
    ]
});
