window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch14',
    number: 14,
    title: 'Matrix Completion',
    subtitle: 'Recovering low-rank matrices from partial observations',
    sections: [
        // ============================================================
        // SECTION 1: The Matrix Completion Problem
        // ============================================================
        {
            id: 'ch14-sec01',
            title: 'The Matrix Completion Problem',
            content: `
                <h2>The Matrix Completion Problem</h2>

                <p>Imagine a large matrix where most entries are missing. Can we fill in the blanks? At first glance, this seems hopelessly underdetermined: an \\(n_1 \\times n_2\\) matrix has \\(n_1 n_2\\) degrees of freedom, and if we observe only a small fraction of entries, there are infinitely many completions. The key insight is that if the underlying matrix has <strong>low rank</strong>, the problem becomes tractable.</p>

                <h3>The Netflix Problem</h3>

                <p>The most celebrated application is the <strong>Netflix Prize</strong> problem. Consider a matrix \\(M^* \\in \\mathbb{R}^{n_1 \\times n_2}\\) where rows correspond to users, columns to movies, and \\(M^*_{ij}\\) is the rating that user \\(i\\) would give to movie \\(j\\). In practice, each user rates only a tiny fraction of available movies, so we observe a sparse subset of entries. The goal is to predict the unobserved ratings to make recommendations.</p>

                <p>Why is low rank a reasonable assumption? If user preferences are governed by a small number of latent factors (e.g., preference for action, comedy, drama), then \\(M^*\\) can be well-approximated as</p>
                \\[M^* = U V^\\top\\]
                <p>where \\(U \\in \\mathbb{R}^{n_1 \\times r}\\) and \\(V \\in \\mathbb{R}^{n_2 \\times r}\\) encode user and movie latent factors respectively, and \\(r \\ll \\min(n_1, n_2)\\) is the number of latent factors. Thus \\(\\operatorname{rank}(M^*) = r\\).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 14.1 (Matrix Completion Problem)</div>
                    <div class="env-body">
                        <p>Let \\(M^* \\in \\mathbb{R}^{n_1 \\times n_2}\\) be an unknown matrix of rank \\(r\\). Let \\(\\Omega \\subseteq [n_1] \\times [n_2]\\) be the set of observed indices. We observe</p>
                        \\[Y_{ij} = M^*_{ij} \\quad \\text{for } (i,j) \\in \\Omega.\\]
                        <p>The <strong>matrix completion problem</strong> is to recover \\(M^*\\) from the partial observations \\(\\{Y_{ij} : (i,j) \\in \\Omega\\}\\).</p>
                    </div>
                </div>

                <p>A natural approach is to solve the <strong>rank minimization</strong> problem:</p>
                \\[\\min_{M \\in \\mathbb{R}^{n_1 \\times n_2}} \\operatorname{rank}(M) \\quad \\text{subject to} \\quad M_{ij} = Y_{ij} \\text{ for all } (i,j) \\in \\Omega.\\]
                <p>However, this problem is NP-hard in general. A major achievement of modern high-dimensional statistics is the discovery that a <em>convex relaxation</em> can solve this problem exactly under mild conditions.</p>

                <div class="viz-placeholder" data-viz="viz-matrix-fill"></div>

                <h3>Incoherence Conditions</h3>

                <p>Not every low-rank matrix can be recovered from partial observations. Consider the rank-1 matrix \\(M^* = e_1 e_1^\\top\\), which has a single nonzero entry at position \\((1,1)\\). Unless we happen to observe that specific entry, recovery is impossible regardless of how many other entries we see. The problem is that the "information" in \\(M^*\\) is concentrated in a single entry.</p>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Incoherence formalizes the idea that the information in \\(M^*\\) should be "spread out" across its entries, rather than concentrated in a few rows or columns. If the singular vectors of \\(M^*\\) are delocalized (not aligned with standard basis vectors), then each observed entry carries information about the global structure of \\(M^*\\).</p>
                    </div>
                </div>

                <p>Let \\(M^* = \\sum_{k=1}^r \\sigma_k u_k v_k^\\top\\) be the SVD of \\(M^*\\), where \\(u_k \\in \\mathbb{R}^{n_1}\\) and \\(v_k \\in \\mathbb{R}^{n_2}\\) are the left and right singular vectors. Define the column spaces \\(U = \\operatorname{span}(u_1, \\ldots, u_r)\\) and \\(V = \\operatorname{span}(v_1, \\ldots, v_r)\\).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 14.2 (Incoherence Conditions, Cand&egrave;s &amp; Recht 2009)</div>
                    <div class="env-body">
                        <p>A rank-\\(r\\) matrix \\(M^* \\in \\mathbb{R}^{n_1 \\times n_2}\\) with SVD \\(M^* = \\sum_{k=1}^r \\sigma_k u_k v_k^\\top\\) satisfies the <strong>incoherence condition</strong> with parameter \\(\\mu\\) if:</p>
                        <ol>
                            <li><strong>Row incoherence:</strong> \\(\\max_{1 \\leq i \\leq n_1} \\|P_U e_i\\|^2 \\leq \\dfrac{\\mu r}{n_1}\\)</li>
                            <li><strong>Column incoherence:</strong> \\(\\max_{1 \\leq j \\leq n_2} \\|P_V e_j\\|^2 \\leq \\dfrac{\\mu r}{n_2}\\)</li>
                            <li><strong>Joint incoherence:</strong> \\(\\left\\|\\sum_{k=1}^r u_k v_k^\\top\\right\\|_{\\infty} \\leq \\sqrt{\\dfrac{\\mu r}{n_1 n_2}}\\)</li>
                        </ol>
                        <p>where \\(P_U\\) and \\(P_V\\) are orthogonal projections onto \\(U\\) and \\(V\\), and \\(\\|\\cdot\\|_\\infty\\) denotes the entry-wise maximum.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 14.1 (Coherent vs. Incoherent Matrices)</div>
                    <div class="env-body">
                        <p><strong>Maximally coherent:</strong> \\(M^* = e_1 e_1^\\top\\) has \\(\\mu = n\\) (all information in one entry).</p>
                        <p><strong>Maximally incoherent:</strong> If \\(M^* = \\frac{1}{\\sqrt{n}} \\mathbf{1} \\cdot \\frac{1}{\\sqrt{n}} \\mathbf{1}^\\top = \\frac{1}{n} \\mathbf{1}\\mathbf{1}^\\top\\), then \\(\\mu = 1\\). Here \\(\\mathbf{1}\\) is the all-ones vector. Every entry carries equal information.</p>
                        <p><strong>Random orthogonal matrices:</strong> If the singular vectors are drawn from the Haar measure on orthogonal matrices, then \\(\\mu = O(\\log n)\\) with high probability.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The incoherence parameter always satisfies \\(1 \\leq \\mu \\leq n/r\\). The lower bound \\(\\mu \\geq 1\\) follows from the fact that \\(\\sum_i \\|P_U e_i\\|^2 = \\operatorname{tr}(P_U) = r\\). Matrices with small \\(\\mu\\) are "well-spread" and amenable to completion from random observations.</p>
                    </div>
                </div>

                <h3>Observation Model</h3>

                <p>We typically model the observation set \\(\\Omega\\) as follows: each entry \\((i,j)\\) is observed independently with probability \\(p\\), so that \\(|\\Omega| \\approx p n_1 n_2\\) in expectation. We write \\(m = |\\Omega|\\) for the number of observations. The <strong>sampling operator</strong> is</p>
                \\[\\mathcal{P}_\\Omega(M)_{ij} = \\begin{cases} M_{ij} & \\text{if } (i,j) \\in \\Omega, \\\\ 0 & \\text{otherwise.} \\end{cases}\\]
                <p>The central question is: <em>how large must \\(m\\) be to guarantee recovery of a rank-\\(r\\), \\(\\mu\\)-incoherent matrix?</em></p>
            `,
            visualizations: [
                {
                    id: 'viz-matrix-fill',
                    title: 'Matrix Completion: Filling In Missing Entries',
                    description: 'Watch a low-rank matrix being reconstructed from partial observations. Observed entries are shown in color; missing entries are filled in iteratively. The Frobenius error decreases as more structure is recovered.',
                    setup: function(container, controls) {
                        var n = 12;
                        var rank = 2;
                        var cellSize = 32;
                        var pad = 60;
                        var canvasW = 2 * (n * cellSize + pad) + 80;
                        var canvasH = n * cellSize + pad + 80;

                        var canvas = document.createElement('canvas');
                        var dpr = window.devicePixelRatio || 1;
                        canvas.width = canvasW * dpr;
                        canvas.height = canvasH * dpr;
                        canvas.style.width = canvasW + 'px';
                        canvas.style.height = canvasH + 'px';
                        var ctx = canvas.getContext('2d');
                        ctx.scale(dpr, dpr);
                        container.appendChild(canvas);

                        // Generate a random rank-r matrix M* = U * V^T
                        function randn() {
                            var u = 0, v = 0;
                            while (u === 0) u = Math.random();
                            while (v === 0) v = Math.random();
                            return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
                        }

                        var U = [], V = [];
                        for (var i = 0; i < n; i++) {
                            U.push([]);
                            for (var k = 0; k < rank; k++) U[i].push(randn() * 0.5);
                        }
                        for (var j = 0; j < n; j++) {
                            V.push([]);
                            for (var k = 0; k < rank; k++) V[j].push(randn() * 0.5);
                        }

                        var Mstar = [];
                        for (var i = 0; i < n; i++) {
                            Mstar.push([]);
                            for (var j = 0; j < n; j++) {
                                var val = 0;
                                for (var k = 0; k < rank; k++) val += U[i][k] * V[j][k];
                                Mstar[i].push(val);
                            }
                        }

                        // Find min/max for coloring
                        var minVal = Infinity, maxVal = -Infinity;
                        for (var i = 0; i < n; i++) for (var j = 0; j < n; j++) {
                            if (Mstar[i][j] < minVal) minVal = Mstar[i][j];
                            if (Mstar[i][j] > maxVal) maxVal = Mstar[i][j];
                        }

                        // Observation mask: observe ~30% of entries
                        var observeFrac = 0.3;
                        var omega = [];
                        for (var i = 0; i < n; i++) {
                            omega.push([]);
                            for (var j = 0; j < n; j++) omega[i].push(Math.random() < observeFrac);
                        }

                        // Current estimate (start from observed entries, 0 elsewhere)
                        var Mcurr = [];
                        for (var i = 0; i < n; i++) {
                            Mcurr.push([]);
                            for (var j = 0; j < n; j++) Mcurr[i].push(omega[i][j] ? Mstar[i][j] : 0);
                        }

                        var iteration = 0;
                        var maxIter = 60;
                        var animating = false;
                        var animId = null;

                        // Simple SVD-thresholding step (power iteration approximation for rank-r projection)
                        function svdProject(M, r) {
                            // Power iteration to get top-r SVD approximation
                            var nIter = 10;
                            // Initialize random Q
                            var Q = [];
                            for (var j = 0; j < r; j++) {
                                Q.push([]);
                                for (var i = 0; i < n; i++) Q[j].push(randn());
                            }
                            // Orthogonalize Q via Gram-Schmidt
                            function gsOrth(Q) {
                                for (var j = 0; j < Q.length; j++) {
                                    for (var k = 0; k < j; k++) {
                                        var dot = 0;
                                        for (var i = 0; i < Q[j].length; i++) dot += Q[j][i] * Q[k][i];
                                        for (var i = 0; i < Q[j].length; i++) Q[j][i] -= dot * Q[k][i];
                                    }
                                    var norm = 0;
                                    for (var i = 0; i < Q[j].length; i++) norm += Q[j][i] * Q[j][i];
                                    norm = Math.sqrt(norm);
                                    if (norm > 1e-12) for (var i = 0; i < Q[j].length; i++) Q[j][i] /= norm;
                                }
                            }
                            for (var it = 0; it < nIter; it++) {
                                // Q <- M * M^T * Q
                                var MtQ = [];
                                for (var k = 0; k < r; k++) {
                                    MtQ.push([]);
                                    for (var j = 0; j < n; j++) {
                                        var s = 0;
                                        for (var i = 0; i < n; i++) s += M[i][j] * Q[k][i];
                                        MtQ[k].push(s);
                                    }
                                }
                                for (var k = 0; k < r; k++) {
                                    for (var i = 0; i < n; i++) {
                                        var s = 0;
                                        for (var j = 0; j < n; j++) s += M[i][j] * MtQ[k][j];
                                        Q[k][i] = s;
                                    }
                                }
                                gsOrth(Q);
                            }
                            // Project: M_approx = Q Q^T M
                            var Mout = [];
                            for (var i = 0; i < n; i++) {
                                Mout.push([]);
                                for (var j = 0; j < n; j++) {
                                    var s = 0;
                                    for (var k = 0; k < r; k++) {
                                        var row_dot = 0;
                                        for (var l = 0; l < n; l++) row_dot += Q[k][l] * M[l][j];
                                        s += Q[k][i] * row_dot;
                                    }
                                    Mout[i].push(s);
                                }
                            }
                            return Mout;
                        }

                        function step() {
                            // SVD projection
                            var Mproj = svdProject(Mcurr, rank);
                            // Replace unobserved entries with SVD estimate, keep observed entries fixed
                            for (var i = 0; i < n; i++) {
                                for (var j = 0; j < n; j++) {
                                    Mcurr[i][j] = omega[i][j] ? Mstar[i][j] : Mproj[i][j];
                                }
                            }
                            iteration++;
                        }

                        function frobError() {
                            var err = 0;
                            for (var i = 0; i < n; i++) for (var j = 0; j < n; j++) {
                                var d = Mcurr[i][j] - Mstar[i][j];
                                err += d * d;
                            }
                            return Math.sqrt(err);
                        }

                        function valToColor(val, alpha) {
                            var t = (val - minVal) / (maxVal - minVal + 1e-10);
                            // Blue (cold) to Red (hot) via teal
                            var r2, g2, b2;
                            if (t < 0.5) {
                                var s = t * 2;
                                r2 = Math.round(12 + s * 51);
                                g2 = Math.round(100 + s * 85);
                                b2 = Math.round(200 - s * 40);
                            } else {
                                var s = (t - 0.5) * 2;
                                r2 = Math.round(63 + s * 185);
                                g2 = Math.round(185 - s * 105);
                                b2 = Math.round(160 - s * 100);
                            }
                            return 'rgba(' + r2 + ',' + g2 + ',' + b2 + ',' + alpha + ')';
                        }

                        function drawMatrix(M, offsetX, offsetY, label, showOmega) {
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.fillStyle = '#f0f6fc';
                            ctx.textAlign = 'center';
                            ctx.fillText(label, offsetX + n * cellSize / 2, offsetY - 12);

                            for (var i = 0; i < n; i++) {
                                for (var j = 0; j < n; j++) {
                                    var x = offsetX + j * cellSize;
                                    var y = offsetY + i * cellSize;
                                    if (showOmega && !omega[i][j]) {
                                        ctx.fillStyle = '#1a1a40';
                                        ctx.fillRect(x, y, cellSize - 1, cellSize - 1);
                                        ctx.fillStyle = '#30363d';
                                        ctx.font = '10px monospace';
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'middle';
                                        ctx.fillText('?', x + cellSize / 2, y + cellSize / 2);
                                    } else {
                                        ctx.fillStyle = valToColor(M[i][j], 1.0);
                                        ctx.fillRect(x, y, cellSize - 1, cellSize - 1);
                                    }
                                    if (showOmega && omega[i][j]) {
                                        ctx.strokeStyle = '#f0f6fc44';
                                        ctx.lineWidth = 1;
                                        ctx.strokeRect(x, y, cellSize - 1, cellSize - 1);
                                    }
                                }
                            }
                        }

                        var errorHistory = [];

                        function draw() {
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, canvasW, canvasH);

                            var ox1 = 30;
                            var ox2 = n * cellSize + 30 + 80;
                            var oy = 45;

                            // Draw observed (with missing entries)
                            drawMatrix(Mcurr, ox1, oy, 'Current Estimate (iter ' + iteration + ')', true);

                            // Draw true matrix
                            drawMatrix(Mstar, ox2, oy, 'True Matrix M*', false);

                            // Arrow between matrices
                            ctx.fillStyle = '#58a6ff';
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            var arrowX = ox1 + n * cellSize + 40;
                            var arrowY = oy + n * cellSize / 2;
                            ctx.fillText('\u2192', arrowX, arrowY);

                            // Error display
                            var err = frobError();
                            var errFrac = frobError() / (Math.sqrt(n * n) * (maxVal - minVal) + 1e-10);
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.fillStyle = '#3fb9a0';
                            ctx.textAlign = 'center';
                            var botY = oy + n * cellSize + 25;
                            ctx.fillText('Frobenius error: ||M - M*||_F = ' + err.toFixed(4), canvasW / 2, botY);

                            // Error bar
                            var barW = 300, barH = 10;
                            var barX = (canvasW - barW) / 2;
                            var barY = botY + 12;
                            ctx.fillStyle = '#1a1a40';
                            ctx.fillRect(barX, barY, barW, barH);
                            var fillW = Math.min(barW, barW * (1 - errFrac / 1.0));
                            ctx.fillStyle = '#3fb950';
                            ctx.fillRect(barX, barY, Math.max(0, fillW), barH);

                            // Observations count
                            var nObs = 0;
                            for (var i = 0; i < n; i++) for (var j = 0; j < n; j++) if (omega[i][j]) nObs++;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillStyle = '#8b949e';
                            ctx.fillText('Observed: ' + nObs + '/' + (n * n) + ' entries (' + (100 * nObs / (n * n)).toFixed(0) + '%)', canvasW / 2, barY + 24);
                        }

                        draw();

                        VizEngine.createButton(controls, 'Step', function() {
                            if (iteration < maxIter) { step(); draw(); }
                        });

                        VizEngine.createButton(controls, 'Run 20 Steps', function() {
                            for (var s = 0; s < 20 && iteration < maxIter; s++) step();
                            draw();
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            iteration = 0;
                            for (var i = 0; i < n; i++) for (var j = 0; j < n; j++) Mcurr[i][j] = omega[i][j] ? Mstar[i][j] : 0;
                            errorHistory = [];
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Obs %', 10, 70, 30, 5, function(v) {
                            observeFrac = v / 100;
                            for (var i = 0; i < n; i++) for (var j = 0; j < n; j++) omega[i][j] = Math.random() < observeFrac;
                            iteration = 0;
                            for (var i = 0; i < n; i++) for (var j = 0; j < n; j++) Mcurr[i][j] = omega[i][j] ? Mstar[i][j] : 0;
                            draw();
                        });

                        return { stopAnimation: function() {} };
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the incoherence parameter always satisfies \\(\\mu \\geq 1\\). When does equality hold?',
                    hint: 'Use the fact that \\(\\sum_{i=1}^{n} \\|P_U e_i\\|^2 = \\operatorname{tr}(P_U) = r\\) and the relationship between the maximum and the average.',
                    solution: 'Since \\(P_U\\) is the orthogonal projection onto an \\(r\\)-dimensional subspace, we have \\(\\sum_{i=1}^{n} \\|P_U e_i\\|^2 = \\operatorname{tr}(P_U) = r\\). The maximum of \\(n\\) non-negative numbers summing to \\(r\\) is at least \\(r/n\\), so \\(\\max_i \\|P_U e_i\\|^2 \\geq r/n = \\mu r/n\\) with \\(\\mu = 1\\). Equality \\(\\mu = 1\\) holds when \\(\\|P_U e_i\\|^2 = r/n\\) for all \\(i\\), which occurs when the singular vectors have entries all of the same magnitude \\(1/\\sqrt{n}\\), i.e., when \\(U\\) spans a subspace whose projection distributes mass uniformly across coordinates. Examples include subspaces spanned by rows of a scaled DFT matrix.'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Nuclear Norm Minimization
        // ============================================================
        {
            id: 'ch14-sec02',
            title: 'Nuclear Norm Minimization',
            content: `
                <h2>Nuclear Norm Minimization</h2>

                <p>The rank minimization problem is NP-hard, just as the \\(\\ell_0\\) minimization problem in sparse recovery is NP-hard. The breakthrough idea, due to Fazel (2002) and later developed by Cand&egrave;s and Recht (2009), is to relax the rank function to the <strong>nuclear norm</strong>, analogous to the \\(\\ell_1\\) relaxation of \\(\\ell_0\\) in compressed sensing.</p>

                <h3>The Nuclear Norm</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 14.3 (Nuclear Norm)</div>
                    <div class="env-body">
                        <p>The <strong>nuclear norm</strong> (or trace norm) of a matrix \\(M \\in \\mathbb{R}^{n_1 \\times n_2}\\) is the sum of its singular values:</p>
                        \\[\\|M\\|_* = \\sum_{k=1}^{\\min(n_1,n_2)} \\sigma_k(M).\\]
                        <p>Equivalently, \\(\\|M\\|_* = \\operatorname{tr}(\\sqrt{M^\\top M})\\).</p>
                    </div>
                </div>

                <p>The nuclear norm is to the rank what the \\(\\ell_1\\) norm is to the \\(\\ell_0\\) "norm":</p>
                <ul>
                    <li>\\(\\operatorname{rank}(M) = \\|\\sigma(M)\\|_0\\) (number of nonzero singular values)</li>
                    <li>\\(\\|M\\|_* = \\|\\sigma(M)\\|_1\\) (sum of singular values)</li>
                </ul>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: From Vectors to Matrices</div>
                    <div class="env-body">
                        <p>In compressed sensing, the \\(\\ell_1\\) ball is the convex hull of sparse vectors (unit vectors along coordinate axes). Analogously, the nuclear norm ball is the convex hull of rank-1 matrices with unit operator norm. Both promote "simple" solutions: \\(\\ell_1\\) promotes sparsity in coordinates, while the nuclear norm promotes sparsity in singular values (i.e., low rank).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 14.1 (Nuclear Norm as Convex Envelope)</div>
                    <div class="env-body">
                        <p>The nuclear norm \\(\\|\\cdot\\|_*\\) is the <strong>convex envelope</strong> (tightest convex lower bound) of the rank function on the set \\(\\{M : \\|M\\|_{\\operatorname{op}} \\leq 1\\}\\). That is,</p>
                        \\[\\|M\\|_* = \\inf\\left\\{\\sum_k |c_k| : M = \\sum_k c_k A_k,\\; \\operatorname{rank}(A_k) = 1,\\; \\|A_k\\|_{\\operatorname{op}} = 1\\right\\}.\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof sketch</div>
                    <div class="env-body">
                        <p>The SVD \\(M = \\sum_k \\sigma_k u_k v_k^\\top\\) writes \\(M\\) as a sum of rank-1, unit-operator-norm matrices \\(A_k = u_k v_k^\\top\\) with coefficients \\(c_k = \\sigma_k\\). The total cost is \\(\\sum_k \\sigma_k = \\|M\\|_*\\). The key is to show this decomposition is optimal, which follows from the duality \\(\\|M\\|_* = \\max_{\\|X\\|_{\\operatorname{op}} \\leq 1} \\langle X, M \\rangle\\), where \\(\\langle X, M \\rangle = \\operatorname{tr}(X^\\top M)\\) is the trace inner product.</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-nuclear-ball"></div>

                <h3>The Nuclear Norm Minimization Program</h3>

                <p>The convex relaxation of rank minimization for matrix completion is:</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 14.4 (Nuclear Norm Minimization for Matrix Completion)</div>
                    <div class="env-body">
                        \\[\\hat{M} = \\arg\\min_{M \\in \\mathbb{R}^{n_1 \\times n_2}} \\|M\\|_* \\quad \\text{subject to} \\quad M_{ij} = Y_{ij} \\text{ for all } (i,j) \\in \\Omega.\\]
                        <p>This is a <strong>semidefinite program</strong> (SDP) and can be solved in polynomial time.</p>
                    </div>
                </div>

                <p>To see why this is an SDP, note that \\(\\|M\\|_* = \\min_{M = A + B^\\top,\\; A,B \\succeq 0} \\frac{1}{2}(\\operatorname{tr}(A) + \\operatorname{tr}(B))\\), or equivalently:</p>
                \\[\\|M\\|_* = \\min \\left\\{ \\frac{1}{2} \\operatorname{tr}(W_1) + \\frac{1}{2} \\operatorname{tr}(W_2) : \\begin{bmatrix} W_1 & M \\\\ M^\\top & W_2 \\end{bmatrix} \\succeq 0 \\right\\}.\\]

                <h3>Dual Characterization</h3>

                <p>The dual norm of the nuclear norm is the <strong>operator norm</strong> (largest singular value):</p>
                \\[\\|M\\|_{\\operatorname{op}} = \\sigma_1(M) = \\max_{\\|u\\| = \\|v\\| = 1} u^\\top M v.\\]

                <div class="env-block lemma">
                    <div class="env-title">Lemma 14.1 (Optimality Conditions)</div>
                    <div class="env-body">
                        <p>A matrix \\(\\hat{M}\\) is the unique solution to the nuclear norm minimization program if and only if there exists a <strong>dual certificate</strong> \\(\\Lambda\\) supported on \\(\\Omega\\) (i.e., \\(\\Lambda_{ij} = 0\\) for \\((i,j) \\notin \\Omega\\)) such that:</p>
                        \\[\\mathcal{P}_T(\\Lambda) = UV^\\top \\quad \\text{and} \\quad \\|\\mathcal{P}_{T^\\perp}(\\Lambda)\\|_{\\operatorname{op}} &lt; 1,\\]
                        <p>where \\(T\\) is the tangent space of rank-\\(r\\) matrices at \\(M^*\\), \\(U\\) and \\(V\\) collect the left and right singular vectors, and \\(\\mathcal{P}_T\\) is the orthogonal projection onto \\(T\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: Tangent Space of Low-Rank Matrices</div>
                    <div class="env-body">
                        <p>The tangent space \\(T\\) at a rank-\\(r\\) matrix \\(M^* = \\sum_k \\sigma_k u_k v_k^\\top\\) consists of all matrices of the form</p>
                        \\[T = \\{U A^\\top + B V^\\top : A \\in \\mathbb{R}^{n_2 \\times r},\\; B \\in \\mathbb{R}^{n_1 \\times r}\\},\\]
                        <p>where \\(U = [u_1 | \\cdots | u_r]\\) and \\(V = [v_1 | \\cdots | v_r]\\). The dimension of \\(T\\) is \\(r(n_1 + n_2 - r)\\), which is the number of "intrinsic" degrees of freedom in a rank-\\(r\\) matrix.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-nuclear-ball',
                    title: 'The Nuclear Norm Ball for 2x2 Matrices',
                    description: 'The nuclear norm ball ||M||* <= 1 for 2x2 symmetric matrices parameterized by (M_11, M_22, M_12). The ball is the convex hull of rank-1 matrices (shown as a pointed shape). Compare with the Frobenius norm ball (sphere).',
                    setup: function(container, controls) {
                        var W = 560, H = 420;
                        var canvas = document.createElement('canvas');
                        var dpr = window.devicePixelRatio || 1;
                        canvas.width = W * dpr;
                        canvas.height = H * dpr;
                        canvas.style.width = W + 'px';
                        canvas.style.height = H + 'px';
                        var ctx = canvas.getContext('2d');
                        ctx.scale(dpr, dpr);
                        container.appendChild(canvas);

                        var angleX = 0.5, angleY = 0.4;
                        var showFrob = false;
                        var dragging = false, lastMX = 0, lastMY = 0;

                        canvas.addEventListener('mousedown', function(e) { dragging = true; lastMX = e.clientX; lastMY = e.clientY; });
                        canvas.addEventListener('mousemove', function(e) {
                            if (!dragging) return;
                            angleY += (e.clientX - lastMX) * 0.008;
                            angleX += (e.clientY - lastMY) * 0.008;
                            angleX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, angleX));
                            lastMX = e.clientX; lastMY = e.clientY;
                            draw();
                        });
                        canvas.addEventListener('mouseup', function() { dragging = false; });
                        canvas.addEventListener('mouseleave', function() { dragging = false; });

                        VizEngine.createButton(controls, 'Toggle Frobenius Ball', function() {
                            showFrob = !showFrob; draw();
                        });

                        // 3D projection
                        function project3D(x, y, z) {
                            var cy = Math.cos(angleY), sy = Math.sin(angleY);
                            var cx = Math.cos(angleX), sx = Math.sin(angleX);
                            var x1 = cy * x + sy * z;
                            var z1 = -sy * x + cy * z;
                            var y1 = cx * y - sx * z1;
                            return [W / 2 + x1 * 160, H / 2 - y1 * 160];
                        }

                        function draw() {
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, W, H);

                            // Draw axes
                            var axes = [
                                { dir: [1, 0, 0], label: 'M\u2081\u2081', color: '#58a6ff' },
                                { dir: [0, 1, 0], label: 'M\u2082\u2082', color: '#3fb950' },
                                { dir: [0, 0, 1], label: 'M\u2081\u2082', color: '#f0883e' }
                            ];
                            for (var a = 0; a < axes.length; a++) {
                                var d = axes[a].dir;
                                var p0 = project3D(-d[0] * 1.3, -d[1] * 1.3, -d[2] * 1.3);
                                var p1 = project3D(d[0] * 1.3, d[1] * 1.3, d[2] * 1.3);
                                ctx.strokeStyle = axes[a].color + '66';
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]); ctx.stroke();
                                ctx.fillStyle = axes[a].color;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(axes[a].label, p1[0] + 10, p1[1]);
                            }

                            // For a 2x2 symmetric matrix M = [[a, c], [c, b]],
                            // singular values = eigenvalues of |M| = (|lam1|, |lam2|)
                            // where lam1,2 = (a+b)/2 +/- sqrt(((a-b)/2)^2 + c^2)
                            // nuclear norm = |lam1| + |lam2|
                            // We parameterize by (a, b, c) and plot the surface ||M||* = 1

                            // Sample nuclear norm ball boundary
                            var nucPoints = [];
                            var nSamp = 80;
                            for (var i = 0; i < nSamp; i++) {
                                var theta = 2 * Math.PI * i / nSamp;
                                for (var j = 0; j < nSamp; j++) {
                                    var phi = Math.PI * j / nSamp - Math.PI / 2;
                                    // Direction in (a, b, c) space
                                    var da = Math.cos(phi) * Math.cos(theta);
                                    var db = Math.cos(phi) * Math.sin(theta);
                                    var dc = Math.sin(phi);

                                    // Find radius r such that nuclear norm of r*(da, db, dc) = 1
                                    // Nuclear norm of [[da, dc],[dc, db]] is |lam1| + |lam2|
                                    var s = (da + db) / 2;
                                    var d = Math.sqrt(((da - db) / 2) * ((da - db) / 2) + dc * dc);
                                    var nn = Math.abs(s + d) + Math.abs(s - d);
                                    if (nn < 1e-10) continue;
                                    var r = 1.0 / nn;
                                    nucPoints.push([da * r, db * r, dc * r]);
                                }
                            }

                            // Draw Frobenius ball if enabled
                            if (showFrob) {
                                var frobPts = [];
                                for (var i = 0; i < 60; i++) {
                                    var theta2 = 2 * Math.PI * i / 60;
                                    for (var j = 0; j < 30; j++) {
                                        var phi2 = Math.PI * j / 30 - Math.PI / 2;
                                        var fa = Math.cos(phi2) * Math.cos(theta2) / Math.sqrt(2);
                                        var fb = Math.cos(phi2) * Math.sin(theta2) / Math.sqrt(2);
                                        var fc = Math.sin(phi2) / Math.sqrt(2);
                                        // Frobenius norm of [[a,c],[c,b]] = sqrt(a^2 + b^2 + 2c^2)
                                        // For radius 1: scale so that Frobenius = 1
                                        var fn2 = fa * fa + fb * fb + 2 * fc * fc;
                                        if (fn2 < 1e-10) continue;
                                        var rf = 1.0 / Math.sqrt(fn2);
                                        frobPts.push(project3D(fa * rf, fb * rf, fc * rf));
                                    }
                                }
                                ctx.fillStyle = '#bc8cff11';
                                for (var p = 0; p < frobPts.length; p++) {
                                    ctx.beginPath();
                                    ctx.arc(frobPts[p][0], frobPts[p][1], 1.5, 0, 2 * Math.PI);
                                    ctx.fill();
                                }
                            }

                            // Project and draw nuclear norm ball points
                            var projected = [];
                            for (var p = 0; p < nucPoints.length; p++) {
                                projected.push(project3D(nucPoints[p][0], nucPoints[p][1], nucPoints[p][2]));
                            }

                            // Draw points with depth cue
                            for (var p = 0; p < projected.length; p++) {
                                var np = nucPoints[p];
                                var cy2 = Math.cos(angleY), sy2 = Math.sin(angleY);
                                var depth = -sy2 * np[0] + cy2 * np[2];
                                var alpha = 0.15 + 0.6 * (depth + 1) / 2;
                                ctx.fillStyle = 'rgba(63,185,160,' + alpha.toFixed(2) + ')';
                                ctx.beginPath();
                                ctx.arc(projected[p][0], projected[p][1], 1.8, 0, 2 * Math.PI);
                                ctx.fill();
                            }

                            // Highlight rank-1 extreme points: for rank-1 symmetric 2x2,
                            // M = sigma * u u^T where u = (cos t, sin t)
                            // M = sigma * [[cos^2 t, cos t sin t], [cos t sin t, sin^2 t]]
                            // nuclear norm = |sigma|, so sigma = +/- 1
                            ctx.strokeStyle = '#f0883e88';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var t = 0; t <= 2 * Math.PI; t += 0.05) {
                                var c2 = Math.cos(t), s2 = Math.sin(t);
                                var pa = c2 * c2, pb = s2 * s2, pc = c2 * s2;
                                var pp = project3D(pa, pb, pc);
                                if (t === 0) ctx.moveTo(pp[0], pp[1]); else ctx.lineTo(pp[0], pp[1]);
                            }
                            ctx.stroke();
                            ctx.beginPath();
                            for (var t = 0; t <= 2 * Math.PI; t += 0.05) {
                                var c2 = Math.cos(t), s2 = Math.sin(t);
                                var pa = -c2 * c2, pb = -s2 * s2, pc = -c2 * s2;
                                var pp = project3D(pa, pb, pc);
                                if (t === 0) ctx.moveTo(pp[0], pp[1]); else ctx.lineTo(pp[0], pp[1]);
                            }
                            ctx.stroke();

                            // Labels
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillStyle = '#3fb9a0';
                            ctx.textAlign = 'center';
                            ctx.fillText('Nuclear Norm Ball ||M||* \u2264 1', W / 2, 24);
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillStyle = '#f0883e';
                            ctx.fillText('Orange curves: rank-1 extreme points', W / 2, 42);
                            if (showFrob) {
                                ctx.fillStyle = '#bc8cff';
                                ctx.fillText('Purple cloud: Frobenius norm ball', W / 2, 58);
                            }
                            ctx.fillStyle = '#6e7681';
                            ctx.fillText('Drag to rotate', W / 2, H - 10);
                        }

                        draw();
                        return { stopAnimation: function() {} };
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that \\(\\|M\\|_* \\leq \\sqrt{r} \\, \\|M\\|_F\\) for any matrix \\(M\\) of rank at most \\(r\\), where \\(\\|M\\|_F = \\sqrt{\\sum_{k} \\sigma_k^2}\\) is the Frobenius norm. When does equality hold?',
                    hint: 'Apply Cauchy-Schwarz to the vector of singular values \\((\\sigma_1, \\ldots, \\sigma_r)\\).',
                    solution: 'By Cauchy-Schwarz, \\(\\|M\\|_* = \\sum_{k=1}^r \\sigma_k = \\langle (\\sigma_1, \\ldots, \\sigma_r), (1, \\ldots, 1)\\rangle \\leq \\sqrt{\\sum_k \\sigma_k^2} \\cdot \\sqrt{r} = \\sqrt{r} \\, \\|M\\|_F\\). Equality holds iff all nonzero singular values are equal, i.e., \\(\\sigma_1 = \\cdots = \\sigma_r\\). Such matrices are called "flat" rank-\\(r\\) matrices.'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Recovery Guarantees
        // ============================================================
        {
            id: 'ch14-sec03',
            title: 'Recovery Guarantees',
            content: `
                <h2>Recovery Guarantees</h2>

                <p>We now state the celebrated exact recovery theorem for matrix completion via nuclear norm minimization. This result, due to Cand&egrave;s and Recht (2009) with refinements by Cand&egrave;s and Tao (2010) and Recht (2011), is one of the crown jewels of modern high-dimensional statistics.</p>

                <h3>Exact Recovery in the Noiseless Case</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 14.2 (Exact Recovery, Cand&egrave;s &amp; Recht 2009)</div>
                    <div class="env-body">
                        <p>Let \\(M^* \\in \\mathbb{R}^{n \\times n}\\) be a rank-\\(r\\) matrix satisfying the incoherence conditions with parameter \\(\\mu\\). Suppose each entry is observed independently with probability \\(p\\). If</p>
                        \\[m = p \\cdot n^2 \\geq C \\mu^2 r n \\log^6 n,\\]
                        <p>then with probability at least \\(1 - n^{-3}\\), the nuclear norm minimization program recovers \\(M^*\\) exactly:</p>
                        \\[\\hat{M} = M^*.\\]
                        <p>Here \\(C > 0\\) is a universal constant.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Degrees of Freedom</div>
                    <div class="env-body">
                        <p>A rank-\\(r\\) matrix in \\(\\mathbb{R}^{n \\times n}\\) has \\(r(2n - r) \\approx 2nr\\) degrees of freedom (the \\(U\\) and \\(V\\) factors). The theorem says that \\(O(nr \\operatorname{polylog} n)\\) observations suffice, which is nearly optimal up to logarithmic factors. This is remarkable: we need only slightly more observations than the intrinsic dimension of the problem!</p>
                    </div>
                </div>

                <p>The proof constructs a dual certificate satisfying the optimality conditions from Lemma 14.1. The key tool is the <strong>golfing scheme</strong> (Gross 2011): the observation set \\(\\Omega\\) is partitioned into independent batches, and the dual certificate is constructed iteratively using a "least squares" projection at each step. The incoherence condition ensures that each step makes sufficient progress.</p>

                <div class="env-block remark">
                    <div class="env-title">Remark: Tightened Bounds</div>
                    <div class="env-body">
                        <p>The original result of Cand&egrave;s and Recht required \\(O(n^{6/5} r \\log n)\\) observations. This was improved by Cand&egrave;s and Tao (2010) to \\(O(\\mu r n \\log^6 n)\\), and further by Recht (2011) to \\(O(\\mu r n \\log^2 n)\\). The information-theoretic lower bound is \\(\\Omega(nr)\\), so the gap is at most polylogarithmic.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-phase-transition"></div>

                <h3>Noisy Matrix Completion</h3>

                <p>In practice, observations are corrupted by noise:</p>
                \\[Y_{ij} = M^*_{ij} + \\varepsilon_{ij}, \\quad (i,j) \\in \\Omega,\\]
                <p>where \\(\\varepsilon_{ij}\\) are i.i.d. noise terms with \\(\\mathbb{E}[\\varepsilon_{ij}] = 0\\) and \\(\\operatorname{Var}(\\varepsilon_{ij}) = \\sigma^2\\). In this setting, we solve the <strong>constrained nuclear norm minimization</strong>:</p>
                \\[\\hat{M} = \\arg\\min_{M \\in \\mathbb{R}^{n_1 \\times n_2}} \\|M\\|_* \\quad \\text{subject to} \\quad \\sum_{(i,j) \\in \\Omega} (M_{ij} - Y_{ij})^2 \\leq \\delta^2,\\]
                <p>or equivalently the <strong>Lagrangian form</strong>:</p>
                \\[\\hat{M} = \\arg\\min_{M} \\frac{1}{2|\\Omega|} \\sum_{(i,j) \\in \\Omega} (M_{ij} - Y_{ij})^2 + \\lambda \\|M\\|_*.\\]

                <div class="env-block theorem">
                    <div class="env-title">Theorem 14.3 (Noisy Matrix Completion, Koltchinskii, Lounici &amp; Tsybakov 2011)</div>
                    <div class="env-body">
                        <p>Under the incoherence conditions with parameter \\(\\mu\\) and the sampling model above with \\(m = |\\Omega| \\geq C \\mu^2 r n \\log^2 n\\), the nuclear-norm-penalized estimator with \\(\\lambda \\asymp \\sigma \\sqrt{n/m}\\) satisfies</p>
                        \\[\\frac{1}{n_1 n_2} \\|\\hat{M} - M^*\\|_F^2 \\leq C' \\sigma^2 \\frac{r(n_1 + n_2) \\log(n_1 + n_2)}{m}\\]
                        <p>with high probability. Here \\(C'\\) depends on \\(\\mu\\) and the condition number of \\(M^*\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: Interpretation of the Error Rate</div>
                    <div class="env-body">
                        <p>The per-entry mean squared error scales as \\(O\\!\\left(\\sigma^2 \\cdot \\frac{r(n_1 + n_2)}{m}\\right)\\) up to logarithmic factors. The numerator \\(r(n_1 + n_2)\\) is (approximately) the number of degrees of freedom in a rank-\\(r\\) matrix, and \\(m\\) is the number of observations. This rate is minimax optimal: no estimator can do substantially better.</p>
                    </div>
                </div>

                <h3>Information-Theoretic Lower Bound</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 14.4 (Minimax Lower Bound)</div>
                    <div class="env-body">
                        <p>For the noisy matrix completion problem with \\(m\\) observations of a rank-\\(r\\) matrix \\(M^* \\in \\mathbb{R}^{n \\times n}\\) with bounded entries, the minimax risk satisfies</p>
                        \\[\\inf_{\\hat{M}} \\sup_{M^* \\in \\mathcal{M}(r, \\mu)} \\frac{1}{n^2} \\mathbb{E}\\|\\hat{M} - M^*\\|_F^2 \\geq c \\, \\sigma^2 \\frac{rn}{m},\\]
                        <p>where the infimum is over all estimators and \\(\\mathcal{M}(r, \\mu)\\) is the class of rank-\\(r\\), \\(\\mu\\)-incoherent matrices.</p>
                    </div>
                </div>

                <p>Comparing Theorems 14.3 and 14.4 shows that nuclear norm minimization achieves the optimal rate up to logarithmic factors. This parallels the situation for the Lasso in sparse linear regression (Chapter 8), where \\(\\ell_1\\) minimization achieves the minimax rate \\(O(s \\log p / n)\\) for \\(s\\)-sparse vectors.</p>
            `,
            visualizations: [
                {
                    id: 'viz-phase-transition',
                    title: 'Phase Transition for Matrix Completion',
                    description: 'Heatmap showing the probability of exact recovery as a function of matrix size n and the oversampling ratio m/(nr). The sharp phase transition shows recovery succeeds (green) once the number of observations crosses a threshold.',
                    setup: function(container, controls) {
                        var W = 560, H = 420;
                        var canvas = document.createElement('canvas');
                        var dpr = window.devicePixelRatio || 1;
                        canvas.width = W * dpr;
                        canvas.height = H * dpr;
                        canvas.style.width = W + 'px';
                        canvas.style.height = H + 'px';
                        var ctx = canvas.getContext('2d');
                        ctx.scale(dpr, dpr);
                        container.appendChild(canvas);

                        var rank = 2;
                        var muParam = 1.0;

                        // Simulate phase transition heatmap
                        // x-axis: oversampling ratio m/(nr) from 0 to 20
                        // y-axis: matrix size n from 10 to 100
                        var nGridX = 60; // oversampling ratio bins
                        var nGridY = 40; // matrix size bins

                        var plotLeft = 70, plotRight = W - 40;
                        var plotTop = 50, plotBot = H - 60;
                        var plotW = plotRight - plotLeft;
                        var plotH = plotBot - plotTop;

                        function computeHeatmap() {
                            var data = [];
                            for (var iy = 0; iy < nGridY; iy++) {
                                data.push([]);
                                var n = 10 + Math.round(90 * iy / (nGridY - 1));
                                for (var ix = 0; ix < nGridX; ix++) {
                                    var oversample = 0.5 + 19.5 * ix / (nGridX - 1);
                                    var m = oversample * n * rank;
                                    var nTotal = n * n;

                                    // Theoretical threshold: m >= C * mu^2 * r * n * log^2(n)
                                    var threshold = muParam * muParam * rank * n * Math.pow(Math.log(n), 2);
                                    // Smooth sigmoid transition around threshold
                                    var ratio = m / threshold;
                                    var prob = 1.0 / (1.0 + Math.exp(-8 * (ratio - 1.0)));
                                    // Also enforce m <= n^2
                                    if (m > nTotal) prob = Math.min(prob, 1.0);
                                    data[iy].push(prob);
                                }
                            }
                            return data;
                        }

                        function draw() {
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, W, H);

                            var data = computeHeatmap();

                            // Draw heatmap cells
                            var cellW = plotW / nGridX;
                            var cellH = plotH / nGridY;
                            for (var iy = 0; iy < nGridY; iy++) {
                                for (var ix = 0; ix < nGridX; ix++) {
                                    var prob = data[iy][ix];
                                    var x = plotLeft + ix * cellW;
                                    var y = plotTop + (nGridY - 1 - iy) * cellH;

                                    // Color: red (fail) -> yellow (transition) -> green (success)
                                    var r2, g2, b2;
                                    if (prob < 0.5) {
                                        var t = prob * 2;
                                        r2 = Math.round(180 - t * 40);
                                        g2 = Math.round(30 + t * 120);
                                        b2 = Math.round(30 + t * 20);
                                    } else {
                                        var t = (prob - 0.5) * 2;
                                        r2 = Math.round(140 - t * 110);
                                        g2 = Math.round(150 + t * 35);
                                        b2 = Math.round(50 - t * 20);
                                    }
                                    ctx.fillStyle = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';
                                    ctx.fillRect(x, y, cellW + 0.5, cellH + 0.5);
                                }
                            }

                            // Draw theoretical threshold curve: oversample = C * mu^2 * log^2(n)
                            ctx.strokeStyle = '#f0f6fc';
                            ctx.lineWidth = 2;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            for (var iy = 0; iy < nGridY; iy++) {
                                var n = 10 + Math.round(90 * iy / (nGridY - 1));
                                var threshOversample = muParam * muParam * Math.pow(Math.log(n), 2);
                                var ix_frac = (threshOversample - 0.5) / 19.5 * nGridX;
                                var x = plotLeft + ix_frac * cellW;
                                var y = plotTop + (nGridY - 1 - iy) * cellH + cellH / 2;
                                if (x > plotLeft && x < plotRight) {
                                    if (iy === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                                }
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Axes labels
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Phase Transition for Matrix Completion (rank r = ' + rank + ')', W / 2, 22);

                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = '#8b949e';
                            ctx.textAlign = 'center';
                            ctx.fillText('Oversampling ratio m / (nr)', (plotLeft + plotRight) / 2, H - 10);

                            ctx.save();
                            ctx.translate(16, (plotTop + plotBot) / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.textAlign = 'center';
                            ctx.fillText('Matrix size n', 0, 0);
                            ctx.restore();

                            // Tick labels on x-axis
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.fillStyle = '#6e7681';
                            ctx.textAlign = 'center';
                            for (var t = 0; t <= 20; t += 5) {
                                var ix_frac2 = (t - 0.5) / 19.5;
                                var x = plotLeft + ix_frac2 * plotW;
                                ctx.fillText(t, x, plotBot + 16);
                            }

                            // Tick labels on y-axis
                            ctx.textAlign = 'right';
                            for (var nn = 10; nn <= 100; nn += 20) {
                                var iy_frac = (nn - 10) / 90;
                                var y = plotTop + (1 - iy_frac) * plotH;
                                ctx.fillText(nn, plotLeft - 6, y + 4);
                            }

                            // Legend
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillStyle = '#f0f6fc';
                            ctx.textAlign = 'left';
                            ctx.fillText('White dashed: theoretical threshold', plotLeft + 5, plotBot + 40);

                            // Color bar
                            var barX = plotRight + 10, barY = plotTop, barW = 12, barH2 = plotH;
                            for (var iy = 0; iy < 50; iy++) {
                                var t = iy / 49;
                                var prob2 = 1 - t;
                                var r3, g3, b3;
                                if (prob2 < 0.5) {
                                    var s = prob2 * 2;
                                    r3 = Math.round(180 - s * 40);
                                    g3 = Math.round(30 + s * 120);
                                    b3 = Math.round(30 + s * 20);
                                } else {
                                    var s = (prob2 - 0.5) * 2;
                                    r3 = Math.round(140 - s * 110);
                                    g3 = Math.round(150 + s * 35);
                                    b3 = Math.round(50 - s * 20);
                                }
                                ctx.fillStyle = 'rgb(' + r3 + ',' + g3 + ',' + b3 + ')';
                                ctx.fillRect(barX, barY + t * barH2, barW, barH2 / 50 + 1);
                            }
                            ctx.font = '9px -apple-system,sans-serif';
                            ctx.fillStyle = '#8b949e';
                            ctx.textAlign = 'left';
                            ctx.fillText('1.0', barX + barW + 4, plotTop + 4);
                            ctx.fillText('0.0', barX + barW + 4, plotBot);
                            ctx.fillText('P(success)', barX - 2, plotTop - 8);
                        }

                        draw();

                        VizEngine.createSlider(controls, 'Rank r', 1, 5, 2, 1, function(v) {
                            rank = Math.round(v);
                            draw();
                        });

                        VizEngine.createSlider(controls, '\u03BC', 1, 5, 1, 0.5, function(v) {
                            muParam = v;
                            draw();
                        });

                        return { stopAnimation: function() {} };
                    }
                }
            ],
            exercises: [
                {
                    question: 'A rank-\\(r\\) matrix \\(M^* \\in \\mathbb{R}^{n \\times n}\\) has \\(r(2n - r)\\) degrees of freedom. Verify this count. Then argue that at least \\(r(2n - r)\\) observations are necessary for exact recovery (even with full knowledge of the rank).',
                    hint: 'The SVD \\(M^* = U \\Sigma V^\\top\\) has \\(U \\in \\mathbb{R}^{n \\times r}\\), \\(\\Sigma \\in \\mathbb{R}^{r \\times r}\\), \\(V \\in \\mathbb{R}^{n \\times r}\\). Count the free parameters after accounting for the orthogonality constraints and the \\(O(r)\\times O(r)\\) gauge freedom.',
                    solution: 'The matrix \\(U\\) lies on the Stiefel manifold \\(\\mathcal{V}_{r}(\\mathbb{R}^n)\\), which has dimension \\(nr - r(r+1)/2\\). Similarly for \\(V\\). The diagonal \\(\\Sigma\\) has \\(r\\) parameters. Total: \\(2(nr - r(r+1)/2) + r = 2nr - r^2 - r + r = r(2n - r)\\). For recovery, we need at least as many independent equations (observations) as unknowns, giving the lower bound \\(m \\geq r(2n - r)\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Algorithms
        // ============================================================
        {
            id: 'ch14-sec04',
            title: 'Algorithms',
            content: `
                <h2>Algorithms for Matrix Completion</h2>

                <p>While nuclear norm minimization provides strong theoretical guarantees, solving the SDP directly has complexity \\(O(n^{4.5})\\) or worse, which is prohibitive for large-scale problems (Netflix has \\(n \\sim 10^5\\) users and movies). Scalable algorithms are essential for practice.</p>

                <h3>Singular Value Thresholding (SVT)</h3>

                <p>The <strong>proximal operator</strong> of the nuclear norm is the <strong>singular value thresholding</strong> operator. For \\(M = U \\operatorname{diag}(\\sigma_1, \\ldots) V^\\top\\), define</p>
                \\[\\mathcal{D}_\\tau(M) = U \\operatorname{diag}\\bigl((\\sigma_1 - \\tau)_+, (\\sigma_2 - \\tau)_+, \\ldots\\bigr) V^\\top,\\]
                <p>where \\((x)_+ = \\max(x, 0)\\). This is the matrix analogue of soft-thresholding for the \\(\\ell_1\\) norm.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 14.5 (Proximal Operator of the Nuclear Norm)</div>
                    <div class="env-body">
                        <p>The singular value thresholding operator is the proximal operator of \\(\\tau \\|\\cdot\\|_*\\):</p>
                        \\[\\mathcal{D}_\\tau(M) = \\arg\\min_X \\left\\{ \\frac{1}{2} \\|X - M\\|_F^2 + \\tau \\|X\\|_* \\right\\}.\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Soft-thresholding a vector \\(x\\) at level \\(\\tau\\) shrinks each component toward zero: \\((\\operatorname{sign}(x_i)(|x_i| - \\tau)_+)\\). SVT does the same but to the <em>singular values</em>, promoting low rank. Small singular values are zeroed out, while large ones are shrunk. This is a principled way to encourage low rank in iterative algorithms.</p>
                    </div>
                </div>

                <p>The SVT algorithm for the Lagrangian form of noisy matrix completion iterates:</p>
                \\[M^{(t+1)} = \\mathcal{D}_{\\lambda}\\!\\left(M^{(t)} + \\frac{1}{|\\Omega|}\\, \\mathcal{P}_\\Omega(Y - M^{(t)})\\right).\\]
                <p>This is proximal gradient descent, and it converges at rate \\(O(1/t)\\).</p>

                <h3>Alternating Minimization</h3>

                <p>A more scalable approach exploits the bilinear structure \\(M = UV^\\top\\) directly.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 14.5 (Alternating Minimization for Matrix Completion)</div>
                    <div class="env-body">
                        <p>Given an initial estimate \\(U^{(0)} \\in \\mathbb{R}^{n_1 \\times r}\\), iterate for \\(t = 0, 1, 2, \\ldots\\):</p>
                        <ol>
                            <li><strong>Update \\(V\\):</strong> \\(V^{(t+1)} = \\arg\\min_V \\sum_{(i,j) \\in \\Omega} (Y_{ij} - [U^{(t)} V^\\top]_{ij})^2\\)</li>
                            <li><strong>Update \\(U\\):</strong> \\(U^{(t+1)} = \\arg\\min_U \\sum_{(i,j) \\in \\Omega} (Y_{ij} - [U (V^{(t+1)})^\\top]_{ij})^2\\)</li>
                        </ol>
                        <p>Each subproblem is a least-squares problem that decouples across rows (resp. columns) and can be solved efficiently.</p>
                    </div>
                </div>

                <p>Each V-update reduces to solving \\(n_2\\) independent regression problems of size \\(|\\{i : (i,j) \\in \\Omega\\}| \\times r\\), one per column \\(j\\). Similarly for the U-update. The per-iteration cost is \\(O(|\\Omega| r^2)\\), which is linear in the number of observations for fixed \\(r\\).</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 14.6 (Convergence of Alternating Minimization, Jain, Netrapalli &amp; Sanghavi 2013)</div>
                    <div class="env-body">
                        <p>Under the incoherence conditions with \\(m \\geq C \\mu^4 \\kappa^2 r^5 n \\log n\\) observations (where \\(\\kappa = \\sigma_1/\\sigma_r\\) is the condition number of \\(M^*\\)), alternating minimization initialized by SVD converges geometrically:</p>
                        \\[\\|M^{(t)} - M^*\\|_F \\leq \\left(\\frac{1}{2}\\right)^t \\|M^{(0)} - M^*\\|_F.\\]
                    </div>
                </div>

                <h3>Gradient Descent on the Factored Form</h3>

                <p>An alternative is to minimize the non-convex objective directly via gradient descent on the factors \\(U, V\\):</p>
                \\[\\min_{U \\in \\mathbb{R}^{n_1 \\times r}, V \\in \\mathbb{R}^{n_2 \\times r}} f(U, V) = \\frac{1}{2|\\Omega|} \\sum_{(i,j) \\in \\Omega} \\bigl([UV^\\top]_{ij} - Y_{ij}\\bigr)^2 + \\frac{\\lambda}{2}(\\|U\\|_F^2 + \\|V\\|_F^2).\\]

                <div class="env-block remark">
                    <div class="env-title">Remark: The Non-Convex Landscape</div>
                    <div class="env-body">
                        <p>Although \\(f(U, V)\\) is non-convex, recent work (Ge, Lee, Ma 2016; Ma et al. 2018) has shown that with sufficient observations and appropriate regularization, the landscape has <strong>no spurious local minima</strong>: every local minimum is also a global minimum (up to a rotation of factors). Saddle points exist but have negative curvature and can be escaped efficiently.</p>
                    </div>
                </div>

                <p>The gradient updates take the form:</p>
                \\[U^{(t+1)} = U^{(t)} - \\eta \\left( \\frac{1}{|\\Omega|} \\mathcal{P}_{\\Omega}(U^{(t)} V^{(t)\\top} - Y) V^{(t)} + \\lambda U^{(t)} \\right)\\]
                \\[V^{(t+1)} = V^{(t)} - \\eta \\left( \\frac{1}{|\\Omega|} \\mathcal{P}_{\\Omega}(U^{(t)} V^{(t)\\top} - Y)^\\top U^{(t)} + \\lambda V^{(t)} \\right)\\]

                <p>With spectral initialization (SVD of \\(\\frac{n^2}{|\\Omega|} \\mathcal{P}_\\Omega(Y)\\) projected to rank \\(r\\)) and step size \\(\\eta = O(1/(\\sigma_1 p))\\), gradient descent converges linearly to \\(M^*\\) in the noiseless case.</p>

                <h3>Comparison of Algorithms</h3>

                <table style="width:100%; border-collapse:collapse; margin:16px 0; font-size:0.9em;">
                    <tr style="border-bottom:2px solid #30363d;">
                        <th style="text-align:left; padding:8px; color:#f0f6fc;">Algorithm</th>
                        <th style="text-align:left; padding:8px; color:#f0f6fc;">Per-Iteration Cost</th>
                        <th style="text-align:left; padding:8px; color:#f0f6fc;">Convergence</th>
                        <th style="text-align:left; padding:8px; color:#f0f6fc;">Sample Complexity</th>
                    </tr>
                    <tr style="border-bottom:1px solid #21262d;">
                        <td style="padding:8px; color:#3fb9a0;">Nuclear norm SDP</td>
                        <td style="padding:8px;">\\(O(n^{4.5})\\)</td>
                        <td style="padding:8px;">Polynomial</td>
                        <td style="padding:8px;">\\(O(\\mu^2 r n \\log^2 n)\\)</td>
                    </tr>
                    <tr style="border-bottom:1px solid #21262d;">
                        <td style="padding:8px; color:#3fb9a0;">SVT</td>
                        <td style="padding:8px;">\\(O(|\\Omega| r)\\)</td>
                        <td style="padding:8px;">\\(O(1/t)\\)</td>
                        <td style="padding:8px;">\\(O(\\mu^2 r n \\log^2 n)\\)</td>
                    </tr>
                    <tr style="border-bottom:1px solid #21262d;">
                        <td style="padding:8px; color:#3fb9a0;">Alt. Minimization</td>
                        <td style="padding:8px;">\\(O(|\\Omega| r^2)\\)</td>
                        <td style="padding:8px;">Geometric</td>
                        <td style="padding:8px;">\\(O(\\mu^4 \\kappa^2 r^5 n \\log n)\\)</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; color:#3fb9a0;">Gradient descent</td>
                        <td style="padding:8px;">\\(O(|\\Omega| r)\\)</td>
                        <td style="padding:8px;">Geometric</td>
                        <td style="padding:8px;">\\(O(\\mu^2 \\kappa^2 r n \\log n)\\)</td>
                    </tr>
                </table>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that the singular value thresholding operator \\(\\mathcal{D}_\\tau(M)\\) indeed solves the proximal problem \\(\\arg\\min_X \\frac{1}{2}\\|X - M\\|_F^2 + \\tau \\|X\\|_*\\). (Hint: use the SVD and reduce to the vector soft-thresholding problem.)',
                    hint: 'Write \\(M = U \\operatorname{diag}(\\sigma_1, \\ldots) V^\\top\\). Use the fact that the Frobenius norm is unitarily invariant, so the objective decomposes into independent scalar problems for each singular value.',
                    solution: 'Write \\(M = U \\Sigma V^\\top\\). For any \\(X\\), by von Neumann\'s trace inequality, \\(\\|X - M\\|_F^2 = \\|X\\|_F^2 - 2\\operatorname{tr}(X^\\top M) + \\|M\\|_F^2 \\geq \\|X\\|_F^2 - 2\\sum_k \\sigma_k(X) \\sigma_k(M) + \\|M\\|_F^2\\). Setting \\(X = U \\operatorname{diag}(s_1, \\ldots) V^\\top\\) with the same singular vectors achieves equality, reducing the problem to \\(\\min_{s_k \\geq 0} \\sum_k \\frac{1}{2}(s_k - \\sigma_k)^2 + \\tau s_k\\). Each term is minimized by \\(s_k = (\\sigma_k - \\tau)_+\\), giving \\(\\mathcal{D}_\\tau(M)\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 5: Applications
        // ============================================================
        {
            id: 'ch14-sec05',
            title: 'Applications',
            content: `
                <h2>Applications and Practical Considerations</h2>

                <h3>Collaborative Filtering</h3>

                <p>Matrix completion underlies modern <strong>collaborative filtering</strong> systems. The basic pipeline is:</p>
                <ol>
                    <li><strong>Data collection:</strong> Collect user-item interaction data (ratings, clicks, purchases) into a sparse matrix \\(Y\\).</li>
                    <li><strong>Model fitting:</strong> Solve the matrix completion problem, typically using the factored form \\(\\hat{M} = \\hat{U} \\hat{V}^\\top\\) with gradient descent.</li>
                    <li><strong>Prediction:</strong> The predicted rating for user \\(i\\) on item \\(j\\) is \\(\\hat{M}_{ij} = \\hat{u}_i^\\top \\hat{v}_j\\), where \\(\\hat{u}_i\\) and \\(\\hat{v}_j\\) are the \\(i\\)-th and \\(j\\)-th rows of \\(\\hat{U}\\) and \\(\\hat{V}\\).</li>
                    <li><strong>Recommendation:</strong> Recommend items with the highest predicted ratings among those not yet seen.</li>
                </ol>

                <div class="env-block example">
                    <div class="env-title">Example 14.2 (The Netflix Prize)</div>
                    <div class="env-body">
                        <p>The Netflix Prize dataset contained approximately 100 million ratings from 480,000 users on 17,770 movies. The \\(480{,}000 \\times 17{,}770\\) rating matrix is 98.8% missing. Winning solutions used regularized matrix factorization with \\(r \\approx 100\\text{--}500\\) latent factors, combined with temporal dynamics and ensemble methods.</p>
                        <p>The observation density is \\(p \\approx 0.012\\), giving \\(m \\approx 10^8\\) observations. For \\(r = 100\\) and \\(n \\approx 5 \\times 10^5\\), the condition \\(m \\geq Crn\\) becomes \\(10^8 \\geq C \\cdot 100 \\cdot 5 \\times 10^5 = 5C \\times 10^7\\), which is satisfied for moderate \\(C\\).</p>
                    </div>
                </div>

                <h3>Practical Extensions</h3>

                <p>Real-world systems extend the basic matrix completion framework in several ways:</p>

                <h4>Side Information</h4>
                <p>In practice, we often have additional features for users and items: demographics, genre tags, temporal information. These can be incorporated by modeling</p>
                \\[M^*_{ij} = u_i^\\top v_j + x_i^\\top \\beta_j + \\alpha_i^\\top z_j + \\mu,\\]
                <p>where \\(x_i\\) and \\(z_j\\) are feature vectors and \\(\\beta_j, \\alpha_i\\) are coefficient vectors.</p>

                <h4>Implicit Feedback</h4>
                <p>In many applications (e.g., music streaming, browsing), we observe only positive interactions (user played a song) rather than explicit ratings. The matrix has entries in \\(\\{0, 1\\}\\) with the additional complication that "0" entries are ambiguous: the user may dislike the item or simply have not encountered it. Weighted matrix factorization addresses this by assigning different confidence levels to observed vs. unobserved entries.</p>

                <h4>Non-Uniform Sampling</h4>
                <p>The theoretical results assume uniform random sampling, but in practice the observation pattern is highly non-uniform: popular items and active users have many more observations. Weighted nuclear norm methods and propensity-score adjustments help handle this.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 14.6 (Weighted Nuclear Norm Minimization)</div>
                    <div class="env-body">
                        <p>When each entry \\((i,j)\\) is observed with probability \\(p_{ij}\\) (not necessarily uniform), the weighted estimator is:</p>
                        \\[\\hat{M} = \\arg\\min_M \\|M\\|_* \\quad \\text{s.t.} \\quad M_{ij} = Y_{ij} \\text{ for } (i,j) \\in \\Omega,\\]
                        <p>applied to the rescaled observations \\(\\tilde{Y}_{ij} = Y_{ij} / p_{ij}\\). This inverse-propensity weighting corrects for the sampling bias.</p>
                    </div>
                </div>

                <h3>Beyond Collaborative Filtering</h3>

                <p>Matrix completion appears in many other domains:</p>

                <ul>
                    <li><strong>Sensor networks:</strong> Recovering a low-rank distance matrix from partial pairwise distance measurements enables sensor localization.</li>
                    <li><strong>Quantum state tomography:</strong> A quantum state (density matrix) is positive semidefinite and low-rank; it can be recovered from partial measurements via nuclear norm minimization.</li>
                    <li><strong>Multi-task learning:</strong> If \\(n_1\\) related tasks share a low-dimensional structure, their regression coefficients form a low-rank matrix. Observing different features for different tasks is a matrix completion problem.</li>
                    <li><strong>System identification:</strong> The Hankel matrix of a linear dynamical system is low-rank; completing it from partial observations recovers the system dynamics.</li>
                </ul>

                <h3>Connection to Compressed Sensing</h3>

                <div class="env-block remark">
                    <div class="env-title">Remark: A Unified Viewpoint</div>
                    <div class="env-body">
                        <p>Matrix completion and compressed sensing are both instances of <strong>structured signal recovery from incomplete measurements</strong>:</p>
                        <table style="width:100%; border-collapse:collapse; font-size:0.9em;">
                            <tr style="border-bottom:1px solid #30363d;">
                                <th style="padding:6px; color:#8b949e;"></th>
                                <th style="padding:6px; color:#58a6ff;">Compressed Sensing</th>
                                <th style="padding:6px; color:#3fb9a0;">Matrix Completion</th>
                            </tr>
                            <tr style="border-bottom:1px solid #21262d;">
                                <td style="padding:6px; color:#8b949e;">Signal</td>
                                <td style="padding:6px;">Sparse vector \\(x^* \\in \\mathbb{R}^p\\)</td>
                                <td style="padding:6px;">Low-rank matrix \\(M^* \\in \\mathbb{R}^{n_1 \\times n_2}\\)</td>
                            </tr>
                            <tr style="border-bottom:1px solid #21262d;">
                                <td style="padding:6px; color:#8b949e;">Structure</td>
                                <td style="padding:6px;">\\(\\|x^*\\|_0 = s\\)</td>
                                <td style="padding:6px;">\\(\\operatorname{rank}(M^*) = r\\)</td>
                            </tr>
                            <tr style="border-bottom:1px solid #21262d;">
                                <td style="padding:6px; color:#8b949e;">Convex relaxation</td>
                                <td style="padding:6px;">\\(\\ell_1\\) norm</td>
                                <td style="padding:6px;">Nuclear norm</td>
                            </tr>
                            <tr style="border-bottom:1px solid #21262d;">
                                <td style="padding:6px; color:#8b949e;">Measurements</td>
                                <td style="padding:6px;">Random linear (RIP)</td>
                                <td style="padding:6px;">Random entries (incoherence)</td>
                            </tr>
                            <tr>
                                <td style="padding:6px; color:#8b949e;">Sample complexity</td>
                                <td style="padding:6px;">\\(O(s \\log p)\\)</td>
                                <td style="padding:6px;">\\(O(rn \\operatorname{polylog} n)\\)</td>
                            </tr>
                        </table>
                        <p style="margin-top:8px;">The RIP (Restricted Isometry Property) for compressed sensing plays the role of incoherence for matrix completion: both ensure that the measurement operator is well-conditioned on the set of structured signals.</p>
                    </div>
                </div>

                <h3>Open Problems and Current Research</h3>

                <p>Despite enormous progress, several important questions remain open:</p>
                <ol>
                    <li><strong>Optimal rates with minimal assumptions:</strong> Can the polylogarithmic gap between upper and lower bounds be closed?</li>
                    <li><strong>Adaptive rank estimation:</strong> In practice, the rank \\(r\\) is unknown and must be estimated or cross-validated.</li>
                    <li><strong>Matrix completion with structural constraints:</strong> What if \\(M^*\\) is simultaneously low-rank and has additional structure (e.g., positive semidefinite, non-negative)?</li>
                    <li><strong>Streaming and online settings:</strong> How to update the matrix completion estimate as new observations arrive?</li>
                    <li><strong>Distributional robustness:</strong> Can we handle heavy-tailed noise or adversarial corruptions of a constant fraction of observations?</li>
                </ol>
            `,
            visualizations: [],
            exercises: []
        }
    ]
});
