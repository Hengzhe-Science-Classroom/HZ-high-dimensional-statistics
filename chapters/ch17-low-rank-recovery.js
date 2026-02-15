window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch17',
    number: 17,
    title: 'Low-Rank Recovery',
    subtitle: 'Robust PCA and matrix decomposition',
    sections: [
        // ============================================================
        // SECTION 1: Robust PCA Problem
        // ============================================================
        {
            id: 'ch17-sec01',
            title: 'Robust PCA Problem',
            content: `
                <h2>Robust PCA Problem</h2>

                <p>Classical PCA assumes that the data matrix is corrupted by small, dense noise. But in many real-world applications --- surveillance video, face recognition, network monitoring --- the corruption is <em>sparse</em> but can be arbitrarily large in magnitude. This motivates the <strong>Robust PCA</strong> problem: decomposing an observed matrix into a low-rank component and a sparse component.</p>

                <h3>The Decomposition Model</h3>

                <p>Suppose we observe a matrix \\(M \\in \\mathbb{R}^{n_1 \\times n_2}\\) that is the sum of two unknown components:</p>
                \\[M = L_0 + S_0\\]
                <p>where \\(L_0\\) is a <strong>low-rank matrix</strong> (capturing the "clean" signal or background) and \\(S_0\\) is a <strong>sparse matrix</strong> (capturing the corruption or foreground).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 17.1 (Robust PCA Problem)</div>
                    <div class="env-body">
                        <p>Given an observed matrix \\(M = L_0 + S_0 \\in \\mathbb{R}^{n_1 \\times n_2}\\), where \\(L_0\\) has rank \\(r \\ll \\min(n_1, n_2)\\) and \\(S_0\\) has at most \\(s\\) nonzero entries, the <strong>Robust PCA problem</strong> asks to recover \\(L_0\\) and \\(S_0\\) exactly from \\(M\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Think of a surveillance video where each frame is a column of \\(M\\). The background (sky, walls, floor) is essentially the same across frames and forms a low-rank matrix \\(L_0\\). Moving objects (people, cars) appear in only a few pixels per frame, forming a sparse matrix \\(S_0\\). Robust PCA separates the background from the foreground.</p>
                    </div>
                </div>

                <h3>Why Is This Hard?</h3>

                <p>At first glance, decomposing \\(M = L + S\\) seems hopelessly underdetermined: there are many ways to write any matrix as a sum of two matrices. The key insight is that <strong>low-rank</strong> and <strong>sparse</strong> are fundamentally different structural constraints that impose enough structure to make the decomposition unique.</p>

                <p>Formally, the set of rank-\\(r\\) matrices and the set of \\(s\\)-sparse matrices are algebraic varieties of very different character:</p>
                <ul>
                    <li>A rank-\\(r\\) matrix in \\(\\mathbb{R}^{n \\times n}\\) has \\(r(2n - r)\\) degrees of freedom.</li>
                    <li>An \\(s\\)-sparse matrix has \\(s\\) degrees of freedom (locations) plus \\(s\\) free values.</li>
                </ul>
                <p>When \\(r\\) is small and \\(s \\ll n^2\\), these two sets are nearly "orthogonal" in an appropriate sense, which makes separation possible.</p>

                <h3>Identifiability Challenges</h3>

                <p>Not every low-rank + sparse decomposition is identifiable. Consider two pathological cases:</p>

                <div class="env-block example">
                    <div class="env-title">Example 17.1 (Non-identifiable Decompositions)</div>
                    <div class="env-body">
                        <p><strong>(a)</strong> If \\(L_0 = e_i e_j^\\top\\) (rank-1 and sparse), then \\(M = L_0 + 0 = 0 + L_0\\). Both are valid decompositions.</p>
                        <p><strong>(b)</strong> If \\(S_0\\) has an entire row or column of nonzeros, then \\(S_0\\) itself could be low-rank (rank 1 if the nonzero row is constant), making the decomposition ambiguous.</p>
                    </div>
                </div>

                <p>These examples show that we need structural assumptions on <em>both</em> \\(L_0\\) and \\(S_0\\) to guarantee unique recovery. The low-rank component cannot be too "spiky" (concentrated on a few entries), and the sparse component cannot be too "structured" (concentrated on a few rows or columns).</p>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>Robust PCA should not be confused with "robust statistics" in the classical Huber sense. Here, the corruption is deterministic and can be adversarial --- there is no assumption on the magnitude or distribution of the nonzero entries of \\(S_0\\). This makes the problem fundamentally combinatorial, and the remarkable fact is that convex relaxation can solve it exactly.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-rpca"></div>

                <h3>Applications</h3>

                <p>Robust PCA has found applications across many domains:</p>
                <ul>
                    <li><strong>Video surveillance:</strong> Background/foreground separation as described above.</li>
                    <li><strong>Face recognition:</strong> Separating face subspace from shadows, specularities, and occlusions.</li>
                    <li><strong>Latent semantic analysis:</strong> Recovering topic structure from document-term matrices corrupted by outliers.</li>
                    <li><strong>Network anomaly detection:</strong> Identifying anomalous traffic patterns against normal (low-rank) baseline.</li>
                    <li><strong>Recommendation systems:</strong> Separating genuine user preferences from fraudulent ratings.</li>
                </ul>
            `,
            visualizations: [
                {
                    id: 'viz-rpca',
                    title: 'Robust PCA: Low-Rank + Sparse Decomposition',
                    description: 'Generate a random low-rank matrix L plus sparse corruption S. The heatmaps show M = L + S and the individual components. Adjust rank and sparsity to see how the decomposition changes.',
                    setup: function(container, controls) {
                        var n = 30;
                        var canvasW = 560, canvasH = 360;
                        var viz = new VizEngine(container, {width: canvasW, height: canvasH});
                        var ctx = viz.ctx;

                        var rank = 3;
                        var sparsity = 0.05;

                        var sliderRank = VizEngine.createSlider(controls, 'Rank r', 1, 10, rank, 1, function(v) { rank = Math.round(v); generate(); draw(); });
                        var sliderSparsity = VizEngine.createSlider(controls, 'Sparsity', 0.01, 0.30, sparsity, 0.01, function(v) { sparsity = v; generate(); draw(); });
                        VizEngine.createButton(controls, 'Regenerate', function() { generate(); draw(); });

                        var L, S, M;

                        function generate() {
                            // Generate low-rank matrix L = U * V^T
                            var U = [], V = [];
                            for (var i = 0; i < n; i++) {
                                U[i] = [];
                                V[i] = [];
                                for (var k = 0; k < rank; k++) {
                                    U[i][k] = (Math.random() - 0.5) * 2;
                                    V[i][k] = (Math.random() - 0.5) * 2;
                                }
                            }
                            L = [];
                            for (var i = 0; i < n; i++) {
                                L[i] = [];
                                for (var j = 0; j < n; j++) {
                                    var val = 0;
                                    for (var k = 0; k < rank; k++) val += U[i][k] * V[j][k];
                                    L[i][j] = val;
                                }
                            }

                            // Generate sparse matrix S
                            S = [];
                            for (var i = 0; i < n; i++) {
                                S[i] = [];
                                for (var j = 0; j < n; j++) {
                                    S[i][j] = Math.random() < sparsity ? (Math.random() - 0.5) * 10 : 0;
                                }
                            }

                            // Observed matrix
                            M = [];
                            for (var i = 0; i < n; i++) {
                                M[i] = [];
                                for (var j = 0; j < n; j++) {
                                    M[i][j] = L[i][j] + S[i][j];
                                }
                            }
                        }

                        function drawHeatmap(mat, x0, y0, cellW, cellH, title) {
                            // Find min/max for color scaling
                            var mn = Infinity, mx = -Infinity;
                            for (var i = 0; i < n; i++) {
                                for (var j = 0; j < n; j++) {
                                    if (mat[i][j] < mn) mn = mat[i][j];
                                    if (mat[i][j] > mx) mx = mat[i][j];
                                }
                            }
                            var range = Math.max(Math.abs(mn), Math.abs(mx), 0.01);

                            for (var i = 0; i < n; i++) {
                                for (var j = 0; j < n; j++) {
                                    var v = mat[i][j] / range;
                                    var r, g, b;
                                    if (v >= 0) {
                                        r = Math.round(88 + v * (248 - 88));
                                        g = Math.round(166 + v * (81 - 166));
                                        b = 255;
                                    } else {
                                        v = -v;
                                        r = Math.round(248 * v + 88 * (1 - v));
                                        g = Math.round(81 * v + 166 * (1 - v));
                                        b = Math.round(73 * v + 255 * (1 - v));
                                    }
                                    ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
                                    ctx.fillRect(x0 + j * cellW, y0 + i * cellH, cellW, cellH);
                                }
                            }
                            // Border
                            ctx.strokeStyle = '#4a4a7a';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(x0, y0, n * cellW, n * cellH);
                            // Title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText(title, x0 + n * cellW / 2, y0 - 6);
                        }

                        function draw() {
                            viz.clear();
                            var cellW = 5, cellH = 5;
                            var gap = 28;
                            var totalW = 3 * n * cellW + 2 * gap;
                            var startX = (canvasW - totalW) / 2;
                            var startY = 50;

                            drawHeatmap(M, startX, startY, cellW, cellH, 'M = L + S (observed)');
                            drawHeatmap(L, startX + n * cellW + gap, startY, cellW, cellH, 'L (low-rank, r=' + rank + ')');
                            drawHeatmap(S, startX + 2 * (n * cellW + gap), startY, cellW, cellH, 'S (sparse, ' + Math.round(sparsity * 100) + '%)');

                            // Equal signs
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            var midY = startY + n * cellH / 2;
                            ctx.fillText('=', startX + n * cellW + gap / 2, midY);
                            ctx.fillText('+', startX + n * cellW + gap + n * cellW + gap / 2, midY);

                            // Stats
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var nnz = 0;
                            for (var i = 0; i < n; i++) for (var j = 0; j < n; j++) if (S[i][j] !== 0) nnz++;
                            ctx.fillText('rank(L) = ' + rank + ', nnz(S) = ' + nnz + ' / ' + (n * n), canvasW / 2, startY + n * cellH + 24);
                        }

                        generate();
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: []
        },
        // ============================================================
        // SECTION 2: Principal Component Pursuit
        // ============================================================
        {
            id: 'ch17-sec02',
            title: 'Principal Component Pursuit',
            content: `
                <h2>Principal Component Pursuit</h2>

                <p>Given the Robust PCA decomposition problem \\(M = L_0 + S_0\\), the natural approach would be to solve the combinatorial problem:</p>
                \\[\\min_{L, S} \\; \\operatorname{rank}(L) + \\lambda \\|S\\|_0 \\quad \\text{subject to} \\quad L + S = M\\]
                <p>where \\(\\|S\\|_0\\) counts the number of nonzero entries of \\(S\\). However, both the rank function and the \\(\\ell_0\\) "norm" are non-convex and NP-hard to optimize in general.</p>

                <h3>Convex Relaxation</h3>

                <p>The key idea --- by now a recurring theme in high-dimensional statistics --- is to replace these combinatorial objectives with their tightest convex surrogates:</p>
                <ul>
                    <li>The rank function is replaced by the <strong>nuclear norm</strong> \\(\\|L\\|_* = \\sum_i \\sigma_i(L)\\), the sum of singular values.</li>
                    <li>The \\(\\ell_0\\) count is replaced by the <strong>\\(\\ell_1\\) norm</strong> \\(\\|S\\|_1 = \\sum_{ij} |S_{ij}|\\), the sum of absolute values of all entries.</li>
                </ul>

                <div class="env-block definition">
                    <div class="env-title">Definition 17.2 (Principal Component Pursuit)</div>
                    <div class="env-body">
                        <p>The <strong>Principal Component Pursuit (PCP)</strong> estimator is defined as the solution to the convex program:</p>
                        \\[\\min_{L, S \\in \\mathbb{R}^{n_1 \\times n_2}} \\; \\|L\\|_* + \\lambda \\|S\\|_1 \\quad \\text{subject to} \\quad L + S = M\\]
                        <p>where \\(\\|L\\|_* = \\sum_{i=1}^{\\min(n_1,n_2)} \\sigma_i(L)\\) is the nuclear norm and \\(\\|S\\|_1 = \\sum_{i,j} |S_{ij}|\\) is the entry-wise \\(\\ell_1\\) norm.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The nuclear norm \\(\\|L\\|_*\\) is the \\(\\ell_1\\) norm of the singular value vector \\(\\sigma(L)\\). Just as the \\(\\ell_1\\) norm promotes sparsity in vectors, the nuclear norm promotes sparsity of singular values --- i.e., low rank. This is the exact matrix analog of LASSO-type regularization.</p>
                        <p>The constraint \\(L + S = M\\) forces the decomposition to be exact. The parameter \\(\\lambda\\) controls the relative weight given to low-rankness of \\(L\\) vs. sparsity of \\(S\\).</p>
                    </div>
                </div>

                <h3>The Choice of \\(\\lambda\\)</h3>

                <p>The remarkable discovery of Cand&egrave;s, Li, Ma, and Wright (2011) is that a single, <em>universal</em> choice of \\(\\lambda\\) works:</p>
                \\[\\lambda = \\frac{1}{\\sqrt{\\max(n_1, n_2)}}\\]
                <p>This choice does not depend on the rank \\(r\\) or the sparsity \\(s\\) of the unknown components, yet it guarantees exact recovery under appropriate conditions.</p>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The choice \\(\\lambda = 1/\\sqrt{n}\\) (where \\(n = \\max(n_1, n_2)\\)) can be motivated by dimensional analysis. The nuclear norm \\(\\|L_0\\|_*\\) scales as \\(O(n \\sqrt{r})\\) for a "typical" rank-\\(r\\) matrix, while \\(\\|S_0\\|_1\\) scales as \\(O(s)\\) where \\(s\\) is the number of nonzero entries. For the two terms to be balanced, we need \\(\\lambda \\approx n/s\\), and the "hardest" regime is \\(s \\approx n^{3/2}\\), giving \\(\\lambda \\approx 1/\\sqrt{n}\\).</p>
                    </div>
                </div>

                <h3>Algorithmic Solution: ADMM / Augmented Lagrangian</h3>

                <p>PCP is a convex optimization problem and can be solved by several methods. The most common is the <strong>Alternating Direction Method of Multipliers (ADMM)</strong>, also known as the <strong>Inexact Augmented Lagrange Multiplier (IALM)</strong> method.</p>

                <p>The augmented Lagrangian for PCP is:</p>
                \\[\\mathcal{L}(L, S, Y, \\mu) = \\|L\\|_* + \\lambda \\|S\\|_1 + \\langle Y, M - L - S \\rangle + \\frac{\\mu}{2} \\|M - L - S\\|_F^2\\]

                <p>The ADMM iterations alternate between:</p>
                <ol>
                    <li><strong>L-step:</strong> \\(L^{k+1} = \\mathcal{D}_{1/\\mu}(M - S^k + \\mu^{-1} Y^k)\\), where \\(\\mathcal{D}_\\tau\\) is the <strong>singular value thresholding</strong> operator that soft-thresholds the singular values.</li>
                    <li><strong>S-step:</strong> \\(S^{k+1} = \\mathcal{S}_{\\lambda/\\mu}(M - L^{k+1} + \\mu^{-1} Y^k)\\), where \\(\\mathcal{S}_\\tau\\) is the entry-wise <strong>soft-thresholding</strong> operator: \\(\\mathcal{S}_\\tau(x) = \\operatorname{sign}(x) \\max(|x| - \\tau, 0)\\).</li>
                    <li><strong>Dual update:</strong> \\(Y^{k+1} = Y^k + \\mu(M - L^{k+1} - S^{k+1})\\).</li>
                </ol>

                <div class="env-block definition">
                    <div class="env-title">Definition 17.3 (Singular Value Thresholding)</div>
                    <div class="env-body">
                        <p>For a matrix \\(X\\) with SVD \\(X = U \\Sigma V^\\top\\), the <strong>singular value thresholding</strong> operator at level \\(\\tau &gt; 0\\) is:</p>
                        \\[\\mathcal{D}_\\tau(X) = U \\, \\mathcal{S}_\\tau(\\Sigma) \\, V^\\top\\]
                        <p>where \\(\\mathcal{S}_\\tau(\\Sigma) = \\text{diag}(\\max(\\sigma_i - \\tau, 0))\\). This is the proximal operator of the nuclear norm.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-low-rank-sparse"></div>

                <h3>Noisy Extension</h3>

                <p>When the observations are noisy, \\(M = L_0 + S_0 + Z\\) where \\(Z\\) is a dense noise matrix, the PCP formulation is modified to a <strong>stable PCP</strong>:</p>
                \\[\\min_{L, S} \\; \\|L\\|_* + \\lambda \\|S\\|_1 \\quad \\text{subject to} \\quad \\|M - L - S\\|_F \\leq \\delta\\]
                <p>where \\(\\delta\\) bounds the noise level \\(\\|Z\\|_F\\). Under similar incoherence conditions, the recovery error satisfies:</p>
                \\[\\|L_0 - \\hat{L}\\|_F^2 + \\|S_0 - \\hat{S}\\|_F^2 \\leq C \\, n \\, \\delta^2\\]
            `,
            visualizations: [
                {
                    id: 'viz-low-rank-sparse',
                    title: 'ADMM Iterations for PCP: Separating L and S',
                    description: 'Watch the ADMM algorithm iteratively separate a low-rank matrix L from sparse corruption S. The Frobenius norm error decreases as iterations proceed.',
                    setup: function(container, controls) {
                        var n = 20;
                        var canvasW = 560, canvasH = 440;
                        var viz = new VizEngine(container, {width: canvasW, height: canvasH});
                        var ctx = viz.ctx;

                        var trueRank = 2;
                        var trueSpar = 0.08;

                        // Generate true L0 and S0
                        var L0, S0, M0;
                        var Lk, Sk, Yk;
                        var mu = 1.0;
                        var lam;
                        var iteration = 0;
                        var maxIter = 60;
                        var errors = [];
                        var animRunning = false;

                        function generateProblem() {
                            // True low-rank L0
                            var U0 = [], V0 = [];
                            for (var i = 0; i < n; i++) {
                                U0[i] = [];
                                V0[i] = [];
                                for (var k = 0; k < trueRank; k++) {
                                    U0[i][k] = (Math.random() - 0.5) * 2;
                                    V0[i][k] = (Math.random() - 0.5) * 2;
                                }
                            }
                            L0 = [];
                            for (var i = 0; i < n; i++) {
                                L0[i] = [];
                                for (var j = 0; j < n; j++) {
                                    var val = 0;
                                    for (var k = 0; k < trueRank; k++) val += U0[i][k] * V0[j][k];
                                    L0[i][j] = val;
                                }
                            }

                            // True sparse S0
                            S0 = [];
                            for (var i = 0; i < n; i++) {
                                S0[i] = [];
                                for (var j = 0; j < n; j++) {
                                    S0[i][j] = Math.random() < trueSpar ? (Math.random() - 0.5) * 8 : 0;
                                }
                            }

                            // Observed M = L0 + S0
                            M0 = [];
                            for (var i = 0; i < n; i++) {
                                M0[i] = [];
                                for (var j = 0; j < n; j++) {
                                    M0[i][j] = L0[i][j] + S0[i][j];
                                }
                            }

                            lam = 1.0 / Math.sqrt(n);
                            mu = n * n / (4 * matNorm1(M0));

                            // Initialize
                            Lk = zeros(n, n);
                            Sk = zeros(n, n);
                            Yk = zeros(n, n);
                            iteration = 0;
                            errors = [];
                            errors.push(frobError());
                        }

                        function zeros(r, c) {
                            var A = [];
                            for (var i = 0; i < r; i++) { A[i] = []; for (var j = 0; j < c; j++) A[i][j] = 0; }
                            return A;
                        }

                        function matNorm1(A) {
                            var s = 0;
                            for (var i = 0; i < n; i++) for (var j = 0; j < n; j++) s += Math.abs(A[i][j]);
                            return s;
                        }

                        function frobError() {
                            var eL = 0, eS = 0;
                            for (var i = 0; i < n; i++) for (var j = 0; j < n; j++) {
                                eL += (L0[i][j] - Lk[i][j]) * (L0[i][j] - Lk[i][j]);
                                eS += (S0[i][j] - Sk[i][j]) * (S0[i][j] - Sk[i][j]);
                            }
                            return Math.sqrt(eL + eS);
                        }

                        // Simple power-method SVD for small matrices
                        function svdSimple(A) {
                            var m = A.length, nn = A[0].length;
                            // Compute A^T A
                            var AtA = [];
                            for (var i = 0; i < nn; i++) {
                                AtA[i] = [];
                                for (var j = 0; j < nn; j++) {
                                    var s = 0;
                                    for (var k = 0; k < m; k++) s += A[k][i] * A[k][j];
                                    AtA[i][j] = s;
                                }
                            }
                            // Eigendecomposition via Jacobi rotations (simple for small n)
                            var eigvals = [];
                            var eigvecs = [];
                            // Use power iteration to get top singular values/vectors
                            var sigmas = [];
                            var Us = [];
                            var Vs = [];
                            var residual = [];
                            for (var i = 0; i < m; i++) { residual[i] = []; for (var j = 0; j < nn; j++) residual[i][j] = A[i][j]; }

                            var maxRank = Math.min(m, nn);
                            for (var r = 0; r < maxRank; r++) {
                                // Power iteration on residual
                                var v = [];
                                for (var j = 0; j < nn; j++) v[j] = Math.random() - 0.5;
                                var vnorm = Math.sqrt(v.reduce(function(a, b) { return a + b * b; }, 0));
                                for (var j = 0; j < nn; j++) v[j] /= vnorm;

                                for (var iter = 0; iter < 50; iter++) {
                                    // u = Av
                                    var u = [];
                                    for (var i = 0; i < m; i++) {
                                        u[i] = 0;
                                        for (var j = 0; j < nn; j++) u[i] += residual[i][j] * v[j];
                                    }
                                    var unorm = Math.sqrt(u.reduce(function(a, b) { return a + b * b; }, 0));
                                    if (unorm < 1e-12) break;
                                    for (var i = 0; i < m; i++) u[i] /= unorm;

                                    // v = A^T u
                                    v = [];
                                    for (var j = 0; j < nn; j++) {
                                        v[j] = 0;
                                        for (var i = 0; i < m; i++) v[j] += residual[i][j] * u[i];
                                    }
                                    vnorm = Math.sqrt(v.reduce(function(a, b) { return a + b * b; }, 0));
                                    if (vnorm < 1e-12) break;
                                    for (var j = 0; j < nn; j++) v[j] /= vnorm;
                                }

                                // sigma = u^T A v
                                var sigma = 0;
                                for (var i = 0; i < m; i++) {
                                    var t = 0;
                                    for (var j = 0; j < nn; j++) t += residual[i][j] * v[j];
                                    sigma += u[i] * t;
                                }

                                if (Math.abs(sigma) < 1e-10) break;

                                sigmas.push(sigma);
                                Us.push(u);
                                Vs.push(v);

                                // Deflate: residual -= sigma * u * v^T
                                for (var i = 0; i < m; i++) {
                                    for (var j = 0; j < nn; j++) {
                                        residual[i][j] -= sigma * u[i] * v[j];
                                    }
                                }
                            }
                            return { sigmas: sigmas, U: Us, V: Vs };
                        }

                        function svtStep() {
                            // Compute M - S + Y/mu
                            var W = [];
                            for (var i = 0; i < n; i++) {
                                W[i] = [];
                                for (var j = 0; j < n; j++) {
                                    W[i][j] = M0[i][j] - Sk[i][j] + Yk[i][j] / mu;
                                }
                            }
                            // SVD of W
                            var svd = svdSimple(W);
                            var thresh = 1.0 / mu;
                            // Singular value thresholding
                            Lk = zeros(n, n);
                            for (var r = 0; r < svd.sigmas.length; r++) {
                                var sv = Math.max(svd.sigmas[r] - thresh, 0);
                                if (sv < 1e-14) continue;
                                for (var i = 0; i < n; i++) {
                                    for (var j = 0; j < n; j++) {
                                        Lk[i][j] += sv * svd.U[r][i] * svd.V[r][j];
                                    }
                                }
                            }

                            // Soft-thresholding for S
                            var D = [];
                            for (var i = 0; i < n; i++) {
                                D[i] = [];
                                for (var j = 0; j < n; j++) {
                                    D[i][j] = M0[i][j] - Lk[i][j] + Yk[i][j] / mu;
                                }
                            }
                            var sThresh = lam / mu;
                            Sk = zeros(n, n);
                            for (var i = 0; i < n; i++) {
                                for (var j = 0; j < n; j++) {
                                    var val = D[i][j];
                                    Sk[i][j] = Math.sign(val) * Math.max(Math.abs(val) - sThresh, 0);
                                }
                            }

                            // Dual update
                            for (var i = 0; i < n; i++) {
                                for (var j = 0; j < n; j++) {
                                    Yk[i][j] += mu * (M0[i][j] - Lk[i][j] - Sk[i][j]);
                                }
                            }

                            iteration++;
                            errors.push(frobError());
                        }

                        function drawMiniHeatmap(mat, x0, y0, cellW, cellH, title) {
                            var mn = Infinity, mx = -Infinity;
                            for (var i = 0; i < n; i++) for (var j = 0; j < n; j++) {
                                if (mat[i][j] < mn) mn = mat[i][j];
                                if (mat[i][j] > mx) mx = mat[i][j];
                            }
                            var range = Math.max(Math.abs(mn), Math.abs(mx), 0.01);

                            for (var i = 0; i < n; i++) {
                                for (var j = 0; j < n; j++) {
                                    var v = mat[i][j] / range;
                                    var r, g, b;
                                    if (v >= 0) {
                                        r = Math.round(12 + v * 76);
                                        g = Math.round(12 + v * 153);
                                        b = Math.round(32 + v * 223);
                                    } else {
                                        v = -v;
                                        r = Math.round(12 + v * 236);
                                        g = Math.round(12 + v * 69);
                                        b = Math.round(32 + v * 41);
                                    }
                                    ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
                                    ctx.fillRect(x0 + j * cellW, y0 + i * cellH, cellW + 0.5, cellH + 0.5);
                                }
                            }
                            ctx.strokeStyle = '#4a4a7a';
                            ctx.lineWidth = 0.5;
                            ctx.strokeRect(x0, y0, n * cellW, n * cellH);
                            ctx.fillStyle = '#c9d1d9';
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText(title, x0 + n * cellW / 2, y0 - 3);
                        }

                        function drawErrorPlot() {
                            if (errors.length < 2) return;
                            var plotX = 360, plotY = 280, plotW = 180, plotH = 120;

                            ctx.strokeStyle = '#30363d';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(plotX, plotY, plotW, plotH);

                            ctx.fillStyle = '#8b949e';
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Frobenius Error vs Iteration', plotX + plotW / 2, plotY + plotH + 4);

                            var maxE = errors[0];
                            var minE = Math.max(errors[errors.length - 1], 1e-6);

                            ctx.beginPath();
                            ctx.strokeStyle = '#3fb9a0';
                            ctx.lineWidth = 2;
                            for (var i = 0; i < errors.length; i++) {
                                var x = plotX + (i / Math.max(maxIter, errors.length - 1)) * plotW;
                                var logE = Math.log10(Math.max(errors[i], 1e-8));
                                var logMax = Math.log10(maxE);
                                var logMin = Math.log10(minE) - 1;
                                var y = plotY + plotH - ((logE - logMin) / (logMax - logMin)) * plotH;
                                y = Math.max(plotY, Math.min(plotY + plotH, y));
                                if (i === 0) ctx.moveTo(x, y);
                                else ctx.lineTo(x, y);
                            }
                            ctx.stroke();

                            // Current error label
                            ctx.fillStyle = '#3fb9a0';
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('err=' + errors[errors.length - 1].toFixed(3), plotX + 4, plotY + 12);
                        }

                        function draw() {
                            viz.clear();
                            var cellW = 5, cellH = 5;

                            // Row 1: True components
                            drawMiniHeatmap(L0, 20, 28, cellW, cellH, 'True L\u2080');
                            drawMiniHeatmap(S0, 140, 28, cellW, cellH, 'True S\u2080');
                            drawMiniHeatmap(M0, 260, 28, cellW, cellH, 'M = L\u2080 + S\u2080');

                            // Row 2: Estimated components
                            drawMiniHeatmap(Lk, 20, 175, cellW, cellH, 'Est. L (iter ' + iteration + ')');
                            drawMiniHeatmap(Sk, 140, 175, cellW, cellH, 'Est. S (iter ' + iteration + ')');

                            // Error plot
                            drawErrorPlot();

                            // Iteration label
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Iteration: ' + iteration, 20, canvasH - 30);

                            ctx.fillStyle = '#8b949e';
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('\u03bb = 1/\u221An = ' + lam.toFixed(3), 20, canvasH - 14);
                        }

                        VizEngine.createButton(controls, 'Step', function() {
                            if (iteration < maxIter) { svtStep(); draw(); }
                        });
                        VizEngine.createButton(controls, 'Run 20', function() {
                            for (var i = 0; i < 20 && iteration < maxIter; i++) svtStep();
                            draw();
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            generateProblem();
                            draw();
                        });

                        generateProblem();
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the nuclear norm \\(\\|L\\|_*\\) is the convex envelope of the rank function on the set \\(\\{L : \\|L\\|_{\\text{op}} \\leq 1\\}\\). That is, it is the largest convex function that agrees with \\(\\operatorname{rank}(L)\\) on all matrices with operator norm at most 1.',
                    hint: 'Consider the singular value decomposition \\(L = U \\Sigma V^\\top\\). On the set \\(\\|L\\|_{\\text{op}} \\leq 1\\), all singular values satisfy \\(\\sigma_i \\leq 1\\), so \\(\\operatorname{rank}(L) = \\|\\sigma\\|_0\\) and \\(\\|L\\|_* = \\|\\sigma\\|_1\\). Now use the fact that \\(\\|\\cdot\\|_1\\) is the convex envelope of \\(\\|\\cdot\\|_0\\) on the unit \\(\\ell_\\infty\\)-ball.',
                    solution: 'Let \\(\\sigma = (\\sigma_1, \\ldots, \\sigma_p)\\) be the singular value vector of \\(L\\). On the constraint set \\(\\|L\\|_{\\text{op}} \\leq 1\\), we have \\(\\sigma_i \\leq 1\\) for all \\(i\\), so \\(\\operatorname{rank}(L) = \\|\\sigma\\|_0\\). It is well known that the convex envelope of \\(\\|\\sigma\\|_0\\) on \\(\\{\\sigma : \\|\\sigma\\|_\\infty \\leq 1\\}\\) is \\(\\|\\sigma\\|_1\\). Since the nuclear norm \\(\\|L\\|_* = \\|\\sigma\\|_1\\) depends on \\(L\\) only through its singular values, and the SVD provides a bijection between the singular value vectors and the orbits of \\(L\\) under orthogonal transformations, the result follows.'
                },
                {
                    question: 'Verify that the singular value thresholding operator \\(\\mathcal{D}_\\tau(X) = U \\mathcal{S}_\\tau(\\Sigma) V^\\top\\) is the proximal operator of the nuclear norm. That is, show \\(\\mathcal{D}_\\tau(X) = \\arg\\min_Z \\frac{1}{2} \\|Z - X\\|_F^2 + \\tau \\|Z\\|_*\\).',
                    hint: 'Use the fact that \\(\\|Z\\|_F^2 = \\sum_i \\sigma_i(Z)^2\\) and \\(\\|Z\\|_* = \\sum_i \\sigma_i(Z)\\). By Von Neumann\'s trace inequality, the problem decouples into independent scalar soft-thresholding problems for each singular value.',
                    solution: 'Write \\(X = U \\Sigma V^\\top\\) (SVD). By Von Neumann\'s trace inequality, for any \\(Z\\), \\(\\langle Z, X \\rangle \\leq \\sum_i \\sigma_i(Z) \\sigma_i(X)\\), with equality iff \\(Z\\) shares the same singular vectors as \\(X\\). Therefore the minimizer \\(Z^*\\) has the form \\(Z^* = U \\operatorname{diag}(d_1, \\ldots, d_p) V^\\top\\), and the problem reduces to: \\(\\min_{d_i \\geq 0} \\sum_i [\\frac{1}{2}(d_i - \\sigma_i)^2 + \\tau d_i]\\). Each scalar problem has solution \\(d_i^* = \\max(\\sigma_i - \\tau, 0)\\), which is exactly the soft-thresholding operator applied to \\(\\sigma_i\\).'
                }
            ]
        },
        // ============================================================
        // SECTION 3: Recovery Guarantees
        // ============================================================
        {
            id: 'ch17-sec03',
            title: 'Recovery Guarantees',
            content: `
                <h2>Recovery Guarantees</h2>

                <p>Under what conditions does Principal Component Pursuit exactly recover the true low-rank and sparse components? The answer involves two key structural assumptions: <strong>incoherence</strong> of the low-rank component and a <strong>sparsity pattern</strong> condition on the sparse component.</p>

                <h3>Incoherence Condition</h3>

                <p>The incoherence condition prevents the low-rank matrix \\(L_0\\) from being too "aligned" with the standard basis, which would make it indistinguishable from a sparse matrix.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 17.4 (Incoherence)</div>
                    <div class="env-body">
                        <p>Let \\(L_0 \\in \\mathbb{R}^{n_1 \\times n_2}\\) have rank \\(r\\) with SVD \\(L_0 = U \\Sigma V^\\top\\), where \\(U \\in \\mathbb{R}^{n_1 \\times r}\\) and \\(V \\in \\mathbb{R}^{n_2 \\times r}\\). The matrix \\(L_0\\) satisfies the <strong>incoherence condition</strong> with parameter \\(\\mu_0\\) if:</p>
                        \\[\\max_i \\|U^\\top e_i\\|_2^2 \\leq \\frac{\\mu_0 r}{n_1}, \\qquad \\max_j \\|V^\\top e_j\\|_2^2 \\leq \\frac{\\mu_0 r}{n_2}\\]
                        <p>and the additional "joint" incoherence condition:</p>
                        \\[\\|UV^\\top\\|_\\infty \\leq \\sqrt{\\frac{\\mu_0 r}{n_1 n_2}}\\]
                        <p>where \\(\\|\\cdot\\|_\\infty\\) denotes the maximum absolute entry.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The incoherence condition says that the singular vectors of \\(L_0\\) are "spread out" across all coordinates --- they do not concentrate on a few entries. The parameter \\(\\mu_0\\) measures how far the singular vectors are from the standard basis directions. At one extreme, \\(\\mu_0 = 1\\) corresponds to maximally incoherent singular vectors (like rows of a DFT matrix). At the other extreme, \\(\\mu_0 = n/r\\) corresponds to singular vectors aligned with standard basis vectors (maximally coherent).</p>
                    </div>
                </div>

                <h3>Sparsity Pattern Condition</h3>

                <p>The sparse component \\(S_0\\) must not have too many nonzeros concentrated in any single row or column.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 17.5 (Random Sparsity Model)</div>
                    <div class="env-body">
                        <p>The support \\(\\Omega = \\operatorname{supp}(S_0) = \\{(i,j) : (S_0)_{ij} \\neq 0\\}\\) follows a <strong>Bernoulli model</strong> if each entry is independently included in \\(\\Omega\\) with probability \\(\\rho\\). The signs and magnitudes of the nonzero entries can be arbitrary.</p>
                    </div>
                </div>

                <h3>The Main Recovery Theorem</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 17.1 (Cand&egrave;s, Li, Ma, Wright 2011)</div>
                    <div class="env-body">
                        <p>Suppose \\(M = L_0 + S_0 \\in \\mathbb{R}^{n \\times n}\\), where \\(L_0\\) has rank \\(r\\) and satisfies the incoherence condition with parameter \\(\\mu_0\\), and the support of \\(S_0\\) is uniformly distributed with density \\(\\rho\\). Then there exist universal constants \\(c, C &gt; 0\\) such that if</p>
                        \\[\\operatorname{rank}(L_0) \\leq \\frac{c \\, n}{\\mu_0^2 (\\log n)^2}, \\qquad \\rho \\leq c\\]
                        <p>then with probability at least \\(1 - C n^{-10}\\), the solution \\((\\hat{L}, \\hat{S})\\) to PCP with \\(\\lambda = 1/\\sqrt{n}\\) satisfies:</p>
                        \\[\\hat{L} = L_0, \\qquad \\hat{S} = S_0\\]
                        <p>That is, the recovery is <strong>exact</strong>.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Optimality)</div>
                    <div class="env-body">
                        <p>The rank bound \\(r \\leq O(n / \\log^2 n)\\) is nearly optimal: for \\(r\\) much larger, a random rank-\\(r\\) matrix starts to look dense and becomes indistinguishable from sparse matrices. The sparsity fraction \\(\\rho\\) can be a constant (independent of \\(n\\)), meaning that a constant fraction of all entries can be corrupted. This is a remarkably strong guarantee.</p>
                    </div>
                </div>

                <h3>Proof Strategy: Dual Certificate</h3>

                <p>The proof constructs a <strong>dual certificate</strong> \\(W \\in \\mathbb{R}^{n \\times n}\\) that certifies optimality of the pair \\((L_0, S_0)\\) via the KKT conditions of the convex program. The dual certificate must satisfy:</p>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 17.1 (Dual Certificate Conditions)</div>
                    <div class="env-body">
                        <p>The pair \\((L_0, S_0)\\) is the unique optimal solution to PCP if there exists a dual variable \\(W\\) such that:</p>
                        <ol>
                            <li>\\(W \\in \\partial \\|L_0\\|_*\\), i.e., \\(\\mathcal{P}_T(W) = UV^\\top\\) and \\(\\|\\mathcal{P}_{T^\\perp}(W)\\|_{\\text{op}} \\leq 1\\), where \\(T\\) is the tangent space to the rank-\\(r\\) manifold at \\(L_0\\).</li>
                            <li>\\(\\lambda^{-1} W \\in \\partial \\|S_0\\|_1\\), i.e., \\(\\mathcal{P}_\\Omega(W) = \\lambda \\, \\operatorname{sign}(S_0)\\) and \\(\\|\\mathcal{P}_{\\Omega^\\perp}(W)\\|_\\infty &lt; \\lambda\\).</li>
                        </ol>
                        <p>Here \\(\\mathcal{P}_T\\) denotes projection onto \\(T = \\{UX^\\top + YV^\\top : X \\in \\mathbb{R}^{n \\times r}, Y \\in \\mathbb{R}^{n \\times r}\\}\\) and \\(\\mathcal{P}_\\Omega\\) projects onto the support of \\(S_0\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof sketch of Theorem 17.1</div>
                    <div class="env-body">
                        <p>The proof proceeds in two main steps:</p>
                        <p><strong>Step 1 (Golfing scheme):</strong> Construct the dual certificate \\(W\\) via a recursive procedure. Partition the complement \\(\\Omega^c\\) randomly into \\(J \\approx 2 \\log n\\) subsets \\(\\Omega_1, \\ldots, \\Omega_J\\). Initialize \\(W_0 = 0\\) and iteratively set:</p>
                        \\[W_j = W_{j-1} + \\mathcal{P}_{\\Omega_j} \\mathcal{P}_T (UV^\\top - W_{j-1})\\]
                        <p>After \\(J\\) steps, \\(W_J\\) is close to the desired dual certificate on the tangent space \\(T\\).</p>
                        <p><strong>Step 2 (Verification):</strong> Using concentration inequalities for random matrices, verify that:</p>
                        <ul>
                            <li>\\(\\|\\mathcal{P}_T(W_J) - UV^\\top\\|_F \\leq \\epsilon\\) (approximate equality on \\(T\\))</li>
                            <li>\\(\\|\\mathcal{P}_{T^\\perp}(W_J)\\|_{\\text{op}} &lt; 1\\) (strict inequality for uniqueness)</li>
                            <li>\\(\\|\\mathcal{P}_{\\Omega^c}(W_J)\\|_\\infty &lt; \\lambda\\) (strict complementary slackness)</li>
                        </ul>
                        <p>These conditions hold with high probability under the incoherence and sparsity assumptions.</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <h3>Deterministic Conditions</h3>

                <p>There are also deterministic (non-probabilistic) conditions under which PCP succeeds. The following result, due to Chandrasekaran et al. (2011), characterizes when convex demixing works.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 17.2 (Deterministic Recovery)</div>
                    <div class="env-body">
                        <p>The pair \\((L_0, S_0)\\) is the unique optimum of PCP if the tangent space \\(T\\) of the low-rank manifold at \\(L_0\\) and the support \\(\\Omega\\) of \\(S_0\\) satisfy:</p>
                        \\[\\|\\mathcal{P}_T \\mathcal{P}_\\Omega\\|_{\\text{op}} &lt; 1\\]
                        <p>That is, the projections onto \\(T\\) and \\(\\Omega\\) must not be too aligned. This is a <strong>transversality</strong> condition on the two structures.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The condition \\(\\|\\mathcal{P}_T \\mathcal{P}_\\Omega\\| &lt; 1\\) says that the "low-rank direction" and the "sparse direction" are sufficiently transversal --- neither can be well-approximated by the other. When this fails, there exist matrices that are simultaneously low-rank and sparse, making the decomposition impossible.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Consider the matrix \\(L_0 = \\mathbf{1} \\mathbf{1}^\\top / \\sqrt{n} \\in \\mathbb{R}^{n \\times n}\\) (the rank-1 matrix with all entries \\(1/\\sqrt{n}\\)). Compute its incoherence parameter \\(\\mu_0\\). Is this matrix "incoherent"?',
                    hint: 'The SVD is \\(L_0 = u v^\\top\\) with \\(u = v = \\mathbf{1}/\\sqrt{n}\\). Compute \\(\\|U^\\top e_i\\|_2^2 = |u_i|^2\\) and compare with the incoherence bound \\(\\mu_0 r / n\\).',
                    solution: 'The SVD is \\(L_0 = \\sigma_1 u v^\\top\\) with \\(\\sigma_1 = \\sqrt{n}\\), \\(u = v = \\mathbf{1}/\\sqrt{n}\\). So \\(r = 1\\) and \\(\\max_i \\|U^\\top e_i\\|_2^2 = \\max_i |u_i|^2 = 1/n\\). The incoherence condition requires \\(1/n \\leq \\mu_0 \\cdot 1 / n\\), giving \\(\\mu_0 = 1\\). This is the smallest possible value --- the all-ones matrix is maximally incoherent. Intuitively, its "mass" is spread uniformly across all entries.'
                }
            ]
        },
        // ============================================================
        // SECTION 4: Matrix Sensing & RIP
        // ============================================================
        {
            id: 'ch17-sec04',
            title: 'Matrix Sensing & RIP',
            content: `
                <h2>Matrix Sensing &amp; RIP</h2>

                <p>While Robust PCA recovers a low-rank matrix from its full observation corrupted by sparse errors, <strong>matrix sensing</strong> addresses the more general problem of recovering a low-rank matrix from <em>linear measurements</em>.</p>

                <h3>The Matrix Sensing Problem</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 17.6 (Matrix Sensing)</div>
                    <div class="env-body">
                        <p>Given a linear operator \\(\\mathcal{A}: \\mathbb{R}^{n_1 \\times n_2} \\to \\mathbb{R}^m\\) defined by</p>
                        \\[y_i = \\langle A_i, X_0 \\rangle = \\operatorname{tr}(A_i^\\top X_0), \\qquad i = 1, \\ldots, m\\]
                        <p>where \\(A_1, \\ldots, A_m \\in \\mathbb{R}^{n_1 \\times n_2}\\) are known <strong>measurement matrices</strong> and \\(X_0\\) is an unknown matrix of rank \\(r\\), the <strong>matrix sensing problem</strong> asks to recover \\(X_0\\) from the measurement vector \\(y = \\mathcal{A}(X_0) \\in \\mathbb{R}^m\\).</p>
                    </div>
                </div>

                <p>This is the matrix analog of the compressed sensing problem: we seek to recover a "simple" (low-rank) object from few linear measurements (\\(m \\ll n_1 n_2\\)). The degrees of freedom of a rank-\\(r\\) matrix in \\(\\mathbb{R}^{n_1 \\times n_2}\\) are \\(r(n_1 + n_2 - r)\\), so we might hope that \\(m = O(r(n_1 + n_2))\\) measurements suffice.</p>

                <div class="env-block example">
                    <div class="env-title">Example 17.2 (Matrix Completion as Matrix Sensing)</div>
                    <div class="env-body">
                        <p>Matrix completion is a special case of matrix sensing where each measurement matrix is \\(A_{ij} = e_i e_j^\\top\\), so that \\(y_{ij} = \\langle e_i e_j^\\top, X_0 \\rangle = (X_0)_{ij}\\). The measurements are simply observed entries of \\(X_0\\).</p>
                    </div>
                </div>

                <h3>Restricted Isometry Property for Matrices</h3>

                <p>The key condition ensuring recovery is the <strong>matrix RIP</strong>, a direct generalization of the vector RIP from compressed sensing.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 17.7 (Matrix RIP)</div>
                    <div class="env-body">
                        <p>The linear operator \\(\\mathcal{A}: \\mathbb{R}^{n_1 \\times n_2} \\to \\mathbb{R}^m\\) satisfies the <strong>restricted isometry property of order \\(r\\)</strong> with constant \\(\\delta_r\\) if for all matrices \\(X \\in \\mathbb{R}^{n_1 \\times n_2}\\) with \\(\\operatorname{rank}(X) \\leq r\\):</p>
                        \\[(1 - \\delta_r) \\|X\\|_F^2 \\leq \\|\\mathcal{A}(X)\\|_2^2 \\leq (1 + \\delta_r) \\|X\\|_F^2\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The matrix RIP says that the measurement operator \\(\\mathcal{A}\\) acts approximately as an isometry on the set of low-rank matrices. This is the exact analog of the vector RIP: in compressed sensing, the measurement matrix approximately preserves distances between sparse vectors; here, it approximately preserves the Frobenius norm of low-rank matrices.</p>
                        <p>Just as for vectors, if \\(\\mathcal{A}\\) preserves norms of individual low-rank matrices, it also preserves distances between them, making recovery well-posed.</p>
                    </div>
                </div>

                <h3>Gaussian Measurements Satisfy Matrix RIP</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 17.3 (Matrix RIP for Gaussian Measurements)</div>
                    <div class="env-body">
                        <p>Suppose the entries of each measurement matrix \\(A_i \\in \\mathbb{R}^{n_1 \\times n_2}\\) are i.i.d. \\(\\mathcal{N}(0, 1/m)\\). Then for any \\(\\delta \\in (0, 1)\\), the operator \\(\\mathcal{A}\\) satisfies the matrix RIP of order \\(r\\) with constant \\(\\delta_r \\leq \\delta\\) provided:</p>
                        \\[m \\geq \\frac{C}{\\delta^2} \\, r(n_1 + n_2)\\]
                        <p>for a universal constant \\(C &gt; 0\\), with probability at least \\(1 - 2 \\exp(-c \\, m \\delta^2)\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof sketch</div>
                    <div class="env-body">
                        <p>The proof follows the same covering/epsilon-net strategy as for the vector RIP:</p>
                        <p><strong>Step 1:</strong> Fix a rank-\\(r\\) matrix \\(X\\) with \\(\\|X\\|_F = 1\\). Then \\(\\|\\mathcal{A}(X)\\|_2^2 = \\sum_{i=1}^m \\langle A_i, X \\rangle^2\\). Each \\(\\langle A_i, X \\rangle\\) is Gaussian with variance \\(\\|X\\|_F^2 / m = 1/m\\) (since entries of \\(A_i\\) are i.i.d. \\(\\mathcal{N}(0,1/m)\\)). By Bernstein's inequality, \\(\\|\\mathcal{A}(X)\\|_2^2\\) concentrates around 1.</p>
                        <p><strong>Step 2:</strong> The set of unit-Frobenius-norm rank-\\(r\\) matrices has metric entropy (covering number) bounded by \\(O(r(n_1 + n_2) \\log(1/\\varepsilon))\\) in the Frobenius norm. Apply a union bound over an \\(\\varepsilon\\)-net to extend the concentration from a single \\(X\\) to all rank-\\(r\\) matrices simultaneously.</p>
                        <p><strong>Step 3:</strong> Extend from the net to all rank-\\(r\\) matrices via a Lipschitz argument.</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <h3>Nuclear Norm Minimization for Matrix Sensing</h3>

                <p>Given the measurement vector \\(y = \\mathcal{A}(X_0)\\), the convex recovery program is:</p>
                \\[\\hat{X} = \\arg\\min_{X} \\|X\\|_* \\quad \\text{subject to} \\quad \\mathcal{A}(X) = y\\]

                <div class="env-block theorem">
                    <div class="env-title">Theorem 17.4 (Exact Recovery via Nuclear Norm Minimization)</div>
                    <div class="env-body">
                        <p>Suppose \\(\\mathcal{A}\\) satisfies the matrix RIP of order \\(2r\\) with constant \\(\\delta_{2r} &lt; 1\\). Then for any rank-\\(r\\) matrix \\(X_0\\), nuclear norm minimization exactly recovers \\(X_0\\):</p>
                        \\[\\hat{X} = X_0\\]
                        <p>More generally, if \\(y = \\mathcal{A}(X_0) + z\\) with \\(\\|z\\|_2 \\leq \\varepsilon\\), then the Dantzig-selector variant</p>
                        \\[\\hat{X} = \\arg\\min_X \\|X\\|_* \\quad \\text{s.t.} \\quad \\|\\mathcal{A}(X) - y\\|_2 \\leq \\varepsilon\\]
                        <p>satisfies</p>
                        \\[\\|\\hat{X} - X_0\\|_F \\leq \\frac{C \\, \\varepsilon}{\\sqrt{1 - \\delta_{2r}}}\\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-matrix-rip"></div>

                <h3>Information-Theoretic Lower Bound</h3>

                <p>How many measurements are truly needed? A counting argument shows that the measurement bound is essentially tight:</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 17.5 (Lower Bound)</div>
                    <div class="env-body">
                        <p>Any algorithm that recovers all rank-\\(r\\) matrices in \\(\\mathbb{R}^{n_1 \\times n_2}\\) from \\(m\\) linear measurements requires:</p>
                        \\[m \\geq r(n_1 + n_2 - r)\\]
                        <p>This is the dimension of the rank-\\(r\\) manifold in \\(\\mathbb{R}^{n_1 \\times n_2}\\), and the nuclear norm minimization achieves this (up to constants) with \\(m = O(r(n_1 + n_2))\\) Gaussian measurements.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-matrix-rip',
                    title: 'Matrix RIP: Near-Isometry for Low-Rank Matrices',
                    description: 'Generate random rank-r matrices, apply a Gaussian measurement operator, and compare the squared measurement norm with the squared Frobenius norm. The RIP guarantees these are close.',
                    setup: function(container, controls) {
                        var canvasW = 560, canvasH = 380;
                        var viz = new VizEngine(container, {width: canvasW, height: canvasH});
                        var ctx = viz.ctx;

                        var matDim = 8;
                        var rank = 2;
                        var numMeas = 40;
                        var numTrials = 80;

                        var sliderRank = VizEngine.createSlider(controls, 'Rank r', 1, 5, rank, 1, function(v) { rank = Math.round(v); run(); });
                        var sliderM = VizEngine.createSlider(controls, 'Measurements m', 10, 120, numMeas, 5, function(v) { numMeas = Math.round(v); run(); });
                        VizEngine.createButton(controls, 'Resample', run);

                        var data = [];

                        function run() {
                            data = [];
                            // Generate random Gaussian measurement matrices
                            var As = [];
                            for (var t = 0; t < numMeas; t++) {
                                var A = [];
                                for (var i = 0; i < matDim; i++) {
                                    A[i] = [];
                                    for (var j = 0; j < matDim; j++) {
                                        A[i][j] = randn() / Math.sqrt(numMeas);
                                    }
                                }
                                As.push(A);
                            }

                            for (var trial = 0; trial < numTrials; trial++) {
                                // Random rank-r matrix X
                                var U = [], V = [];
                                for (var i = 0; i < matDim; i++) {
                                    U[i] = [];
                                    V[i] = [];
                                    for (var k = 0; k < rank; k++) {
                                        U[i][k] = randn();
                                        V[i][k] = randn();
                                    }
                                }
                                var X = [];
                                var frobSq = 0;
                                for (var i = 0; i < matDim; i++) {
                                    X[i] = [];
                                    for (var j = 0; j < matDim; j++) {
                                        var val = 0;
                                        for (var k = 0; k < rank; k++) val += U[i][k] * V[j][k];
                                        X[i][j] = val;
                                        frobSq += val * val;
                                    }
                                }

                                // Compute ||A(X)||^2
                                var measSq = 0;
                                for (var t = 0; t < numMeas; t++) {
                                    var ip = 0;
                                    for (var i = 0; i < matDim; i++)
                                        for (var j = 0; j < matDim; j++)
                                            ip += As[t][i][j] * X[i][j];
                                    measSq += ip * ip;
                                }

                                data.push({frobSq: frobSq, measSq: measSq, ratio: measSq / frobSq});
                            }
                            draw();
                        }

                        function randn() {
                            var u = 0, v = 0;
                            while (u === 0) u = Math.random();
                            while (v === 0) v = Math.random();
                            return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
                        }

                        function draw() {
                            viz.clear();

                            // Scatter plot: Frobenius^2 vs Measurement^2
                            var plotX = 60, plotY = 30, plotW = 230, plotH = 280;
                            var histX = 340, histY = 30, histW = 190, histH = 280;

                            // Find ranges
                            var maxF = 0, maxM = 0;
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].frobSq > maxF) maxF = data[i].frobSq;
                                if (data[i].measSq > maxM) maxM = data[i].measSq;
                            }
                            var maxVal = Math.max(maxF, maxM) * 1.1;
                            if (maxVal < 1) maxVal = 1;

                            // Axes for scatter plot
                            ctx.strokeStyle = '#4a4a7a';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(plotX, plotY + plotH);
                            ctx.lineTo(plotX + plotW, plotY + plotH);
                            ctx.moveTo(plotX, plotY + plotH);
                            ctx.lineTo(plotX, plotY);
                            ctx.stroke();

                            // Labels
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('||X||_F^2', plotX + plotW / 2, plotY + plotH + 14);
                            ctx.save();
                            ctx.translate(plotX - 28, plotY + plotH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('||A(X)||_2^2', 0, 0);
                            ctx.restore();

                            // y = x line (perfect isometry)
                            ctx.strokeStyle = '#f0883e44';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(plotX, plotY + plotH);
                            ctx.lineTo(plotX + plotW, plotY + plotH - plotW * (maxVal / maxVal));
                            var endPx = Math.min(plotW, plotH);
                            ctx.moveTo(plotX, plotY + plotH);
                            ctx.lineTo(plotX + endPx, plotY + plotH - endPx);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Plot data points
                            for (var i = 0; i < data.length; i++) {
                                var px = plotX + (data[i].frobSq / maxVal) * plotW;
                                var py = plotY + plotH - (data[i].measSq / maxVal) * plotH;
                                ctx.fillStyle = '#58a6ff88';
                                ctx.beginPath();
                                ctx.arc(px, py, 3, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // y=x label
                            ctx.fillStyle = '#f0883e';
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('y = x (isometry)', plotX + endPx / 2 + 8, plotY + plotH - endPx / 2 - 8);

                            // Title
                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Scatter: ||X||_F^2 vs ||A(X)||_2^2', plotX + plotW / 2, plotY - 8);

                            // Histogram of ratios
                            ctx.strokeStyle = '#4a4a7a';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(histX, histY + histH);
                            ctx.lineTo(histX + histW, histY + histH);
                            ctx.moveTo(histX, histY + histH);
                            ctx.lineTo(histX, histY);
                            ctx.stroke();

                            ctx.fillStyle = '#f0f6fc';
                            ctx.font = 'bold 11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Histogram of ||A(X)||^2 / ||X||_F^2', histX + histW / 2, histY - 8);

                            // Build histogram bins
                            var nbins = 20;
                            var minR = Infinity, maxR = -Infinity;
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].ratio < minR) minR = data[i].ratio;
                                if (data[i].ratio > maxR) maxR = data[i].ratio;
                            }
                            if (maxR - minR < 0.01) { minR -= 0.1; maxR += 0.1; }
                            var margin = (maxR - minR) * 0.1;
                            minR -= margin;
                            maxR += margin;
                            var binW = (maxR - minR) / nbins;
                            var bins = [];
                            for (var b = 0; b < nbins; b++) bins[b] = 0;
                            for (var i = 0; i < data.length; i++) {
                                var bi = Math.floor((data[i].ratio - minR) / binW);
                                if (bi >= nbins) bi = nbins - 1;
                                if (bi < 0) bi = 0;
                                bins[bi]++;
                            }
                            var maxBin = Math.max.apply(null, bins);
                            if (maxBin < 1) maxBin = 1;

                            for (var b = 0; b < nbins; b++) {
                                var bx = histX + (b / nbins) * histW;
                                var bw = histW / nbins - 1;
                                var bh = (bins[b] / maxBin) * (histH - 20);
                                ctx.fillStyle = '#3fb9a088';
                                ctx.fillRect(bx, histY + histH - bh, bw, bh);
                            }

                            // Mark ratio = 1
                            var oneX = histX + ((1 - minR) / (maxR - minR)) * histW;
                            if (oneX > histX && oneX < histX + histW) {
                                ctx.strokeStyle = '#f85149';
                                ctx.lineWidth = 2;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                ctx.moveTo(oneX, histY);
                                ctx.lineTo(oneX, histY + histH);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = '#f85149';
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('ratio = 1', oneX, histY + histH + 14);
                            }

                            // Compute empirical delta_r
                            var maxDev = 0;
                            for (var i = 0; i < data.length; i++) {
                                var dev = Math.abs(data[i].ratio - 1);
                                if (dev > maxDev) maxDev = dev;
                            }

                            // Stats
                            ctx.fillStyle = '#c9d1d9';
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('n = ' + matDim + ', r = ' + rank + ', m = ' + numMeas, 20, canvasH - 42);
                            ctx.fillText('df = r(2n-r) = ' + (rank * (2 * matDim - rank)), 20, canvasH - 28);
                            ctx.fillStyle = '#f0883e';
                            ctx.fillText('Empirical \u03B4_r \u2248 ' + maxDev.toFixed(3), 20, canvasH - 14);

                            var meanRatio = data.reduce(function(a, b) { return a + b.ratio; }, 0) / data.length;
                            ctx.fillStyle = '#3fb9a0';
                            ctx.fillText('Mean ratio = ' + meanRatio.toFixed(3), 250, canvasH - 14);
                        }

                        run();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the metric entropy of the set of unit-Frobenius-norm rank-\\(r\\) matrices in \\(\\mathbb{R}^{n \\times n}\\) is bounded by \\(\\log \\mathcal{N}(\\varepsilon) \\leq C \\, r \\, n \\log(1/\\varepsilon)\\). (Hint: parameterize rank-\\(r\\) matrices via their SVD.)',
                    hint: 'Write \\(X = U \\Sigma V^\\top\\) where \\(U \\in \\mathbb{R}^{n \\times r}\\), \\(V \\in \\mathbb{R}^{n \\times r}\\) have orthonormal columns and \\(\\Sigma \\in \\mathbb{R}^{r \\times r}\\) is diagonal with \\(\\|\\Sigma\\|_F = 1\\). Cover each of these components separately and use the product covering bound.',
                    solution: 'A rank-\\(r\\) matrix \\(X = U \\Sigma V^\\top\\) is parameterized by: (1) \\(U\\) on the Stiefel manifold \\(V_{r}(\\mathbb{R}^n)\\), which has dimension \\(nr - r(r+1)/2\\); (2) \\(V\\) on \\(V_{r}(\\mathbb{R}^n)\\), same dimension; (3) \\(\\Sigma\\), a diagonal matrix with \\(r\\) entries on the unit sphere in \\(\\mathbb{R}^r\\). The covering number of each Stiefel manifold at resolution \\(\\varepsilon\\) satisfies \\(\\log \\mathcal{N} \\leq C nr \\log(1/\\varepsilon)\\), and the sphere in \\(\\mathbb{R}^r\\) contributes \\(C r \\log(1/\\varepsilon)\\). By the product bound, the total metric entropy is \\(\\leq C(2nr + r) \\log(1/\\varepsilon) \\leq C\' r n \\log(1/\\varepsilon)\\).'
                }
            ]
        },
        // ============================================================
        // SECTION 5: Connections to Compressed Sensing
        // ============================================================
        {
            id: 'ch17-sec05',
            title: 'Connections to Compressed Sensing',
            content: `
                <h2>Connections to Compressed Sensing</h2>

                <p>The theory of low-rank matrix recovery is deeply connected to compressed sensing for sparse vectors. This section makes the parallels precise and develops a <strong>unified view</strong> of structured recovery problems.</p>

                <h3>The Vector-Matrix Dictionary</h3>

                <p>The following table summarizes the systematic correspondences between sparse vector recovery and low-rank matrix recovery:</p>

                <table style="width:100%; border-collapse:collapse; margin:20px 0; font-size:0.9rem;">
                    <thead>
                        <tr style="border-bottom:2px solid #30363d;">
                            <th style="padding:8px 12px; text-align:left; color:#8b949e;">Concept</th>
                            <th style="padding:8px 12px; text-align:left; color:#58a6ff;">Vectors (Compressed Sensing)</th>
                            <th style="padding:8px 12px; text-align:left; color:#3fb9a0;">Matrices (Low-Rank Recovery)</th>
                        </tr>
                    </thead>
                    <tbody style="color:#c9d1d9;">
                        <tr style="border-bottom:1px solid #21262d;">
                            <td style="padding:8px 12px; color:#8b949e;">Object</td>
                            <td style="padding:8px 12px;">\\(x \\in \\mathbb{R}^n\\)</td>
                            <td style="padding:8px 12px;">\\(X \\in \\mathbb{R}^{n_1 \\times n_2}\\)</td>
                        </tr>
                        <tr style="border-bottom:1px solid #21262d;">
                            <td style="padding:8px 12px; color:#8b949e;">Structure</td>
                            <td style="padding:8px 12px;">\\(s\\)-sparse</td>
                            <td style="padding:8px 12px;">rank-\\(r\\)</td>
                        </tr>
                        <tr style="border-bottom:1px solid #21262d;">
                            <td style="padding:8px 12px; color:#8b949e;">Degrees of freedom</td>
                            <td style="padding:8px 12px;">\\(s\\)</td>
                            <td style="padding:8px 12px;">\\(r(n_1 + n_2 - r)\\)</td>
                        </tr>
                        <tr style="border-bottom:1px solid #21262d;">
                            <td style="padding:8px 12px; color:#8b949e;">Complexity measure</td>
                            <td style="padding:8px 12px;">\\(\\|x\\|_0\\)</td>
                            <td style="padding:8px 12px;">\\(\\operatorname{rank}(X)\\)</td>
                        </tr>
                        <tr style="border-bottom:1px solid #21262d;">
                            <td style="padding:8px 12px; color:#8b949e;">Convex surrogate</td>
                            <td style="padding:8px 12px;">\\(\\|x\\|_1\\)</td>
                            <td style="padding:8px 12px;">\\(\\|X\\|_*\\)</td>
                        </tr>
                        <tr style="border-bottom:1px solid #21262d;">
                            <td style="padding:8px 12px; color:#8b949e;">RIP condition</td>
                            <td style="padding:8px 12px;">\\(\\delta_{2s} &lt; \\sqrt{2} - 1\\)</td>
                            <td style="padding:8px 12px;">\\(\\delta_{5r} &lt; 0.307\\)</td>
                        </tr>
                        <tr style="border-bottom:1px solid #21262d;">
                            <td style="padding:8px 12px; color:#8b949e;">Measurements needed</td>
                            <td style="padding:8px 12px;">\\(m = O(s \\log(n/s))\\)</td>
                            <td style="padding:8px 12px;">\\(m = O(r(n_1 + n_2))\\)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px 12px; color:#8b949e;">Decomposition</td>
                            <td style="padding:8px 12px;">sparse + sparse (not useful)</td>
                            <td style="padding:8px 12px;">low-rank + sparse (Robust PCA)</td>
                        </tr>
                    </tbody>
                </table>

                <h3>A Unified Framework: Atomic Norms</h3>

                <p>Both sparse vectors and low-rank matrices are instances of a more general framework: recovery of structured objects that are "simple" in the sense of being a combination of a few <strong>atoms</strong>.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 17.8 (Atomic Norm)</div>
                    <div class="env-body">
                        <p>Let \\(\\mathcal{A}\\) be a set of <strong>atoms</strong> in a vector space \\(V\\). The <strong>atomic norm</strong> induced by \\(\\mathcal{A}\\) is:</p>
                        \\[\\|x\\|_{\\mathcal{A}} = \\inf\\left\\{ \\sum_i c_i : x = \\sum_i c_i a_i, \\; c_i \\geq 0, \\; a_i \\in \\mathcal{A} \\right\\}\\]
                        <p>This is the gauge function of the convex hull \\(\\operatorname{conv}(\\mathcal{A})\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 17.3 (Recovering Known Norms)</div>
                    <div class="env-body">
                        <p><strong>(a) \\(\\ell_1\\) norm:</strong> If \\(\\mathcal{A} = \\{\\pm e_1, \\ldots, \\pm e_n\\}\\) (signed standard basis vectors), then \\(\\|x\\|_{\\mathcal{A}} = \\|x\\|_1\\).</p>
                        <p><strong>(b) Nuclear norm:</strong> If \\(\\mathcal{A} = \\{uv^\\top : u \\in \\mathbb{R}^{n_1}, v \\in \\mathbb{R}^{n_2}, \\|u\\|_2 = \\|v\\|_2 = 1\\}\\) (unit-rank matrices), then \\(\\|X\\|_{\\mathcal{A}} = \\|X\\|_*\\).</p>
                        <p><strong>(c) \\(\\ell_{1,2}\\) norm:</strong> For group sparsity with atoms being unit-norm vectors supported on each group, the atomic norm recovers the group LASSO penalty.</p>
                    </div>
                </div>

                <h3>General Recovery Guarantee</h3>

                <p>Chandrasekaran et al. (2012) provide a unified recovery theorem for atomic norm minimization:</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 17.6 (Atomic Norm Recovery)</div>
                    <div class="env-body">
                        <p>Let \\(x_0 \\in \\mathbb{R}^n\\) and suppose we observe \\(y = \\Phi x_0\\) where \\(\\Phi \\in \\mathbb{R}^{m \\times n}\\) has i.i.d. Gaussian entries. Consider the atomic norm minimization:</p>
                        \\[\\hat{x} = \\arg\\min_x \\|x\\|_{\\mathcal{A}} \\quad \\text{s.t.} \\quad \\Phi x = y\\]
                        <p>Then \\(\\hat{x} = x_0\\) with high probability provided:</p>
                        \\[m \\geq C \\cdot w(\\mathcal{A} \\cap \\mathbb{S}^{n-1})^2\\]
                        <p>where \\(w(\\cdot)\\) denotes the <strong>Gaussian width</strong> of the set:</p>
                        \\[w(K) = \\mathbb{E}\\left[\\sup_{x \\in K} \\langle g, x \\rangle\\right], \\quad g \\sim \\mathcal{N}(0, I_n)\\]
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Gaussian Width as Complexity Measure)</div>
                    <div class="env-body">
                        <p>The Gaussian width \\(w(K)\\) is a geometric measure of the "size" of a set \\(K\\). For the key examples:</p>
                        <ul>
                            <li><strong>Sparse vectors:</strong> \\(w(\\text{descent cone of } \\|\\cdot\\|_1 \\text{ at } s\\text{-sparse } x_0)^2 \\approx 2s \\log(n/s)\\)</li>
                            <li><strong>Low-rank matrices:</strong> \\(w(\\text{descent cone of } \\|\\cdot\\|_* \\text{ at rank-}r\\, X_0)^2 \\approx 3r(n_1 + n_2)\\)</li>
                        </ul>
                        <p>This recovers the well-known measurement thresholds for both compressed sensing and matrix recovery as special cases of a single theorem.</p>
                    </div>
                </div>

                <h3>Demixing: Separating Superimposed Structures</h3>

                <p>The Robust PCA problem is an instance of a more general <strong>demixing</strong> problem: given \\(M = x_0 + y_0\\), where \\(x_0\\) and \\(y_0\\) belong to different "simple" sets (low-rank and sparse), can we separate them?</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 17.7 (Demixing via Atomic Norms)</div>
                    <div class="env-body">
                        <p>Let \\(\\|\\cdot\\|_{\\mathcal{A}}\\) and \\(\\|\\cdot\\|_{\\mathcal{B}}\\) be two atomic norms. The convex program</p>
                        \\[\\min_{x, y} \\|x\\|_{\\mathcal{A}} + \\lambda \\|y\\|_{\\mathcal{B}} \\quad \\text{s.t.} \\quad x + y = M\\]
                        <p>exactly recovers \\((x_0, y_0)\\) if the <strong>descent cones</strong> \\(\\mathcal{C}_{\\mathcal{A}}(x_0)\\) and \\(\\mathcal{C}_{\\mathcal{B}}(y_0)\\) satisfy:</p>
                        \\[\\mathcal{C}_{\\mathcal{A}}(x_0) \\cap (-\\mathcal{C}_{\\mathcal{B}}(y_0)) = \\{0\\}\\]
                        <p>This is a <strong>geometric transversality</strong> condition: the two descent cones must intersect only at the origin.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The descent cone \\(\\mathcal{C}_{\\mathcal{A}}(x_0)\\) is the set of directions along which \\(\\|\\cdot\\|_{\\mathcal{A}}\\) does not increase. For sparse \\(x_0\\), this cone is narrow (few directions maintain sparsity). For low-rank \\(X_0\\), the descent cone of the nuclear norm is also narrow. If these cones point in "different directions," no perturbation can simultaneously decrease both norms, ensuring unique recovery.</p>
                        <p>Quantitatively, demixing succeeds when the sum of the Gaussian widths of the two descent cones is less than the ambient dimension, a statement that can be made precise via Gordon's inequality.</p>
                    </div>
                </div>

                <h3>Summary: The Big Picture</h3>

                <p>The following hierarchy organizes the structured recovery problems we have encountered:</p>
                <ol>
                    <li><strong>Compressed Sensing (Ch. 8-10):</strong> Recovery of sparse \\(x \\in \\mathbb{R}^n\\) via \\(\\ell_1\\) minimization. Structure = sparsity, norm = \\(\\|\\cdot\\|_1\\).</li>
                    <li><strong>Matrix Completion (Ch. 14):</strong> Recovery of low-rank \\(X\\) from observed entries. Structure = low-rank + incoherence, norm = \\(\\|\\cdot\\|_*\\).</li>
                    <li><strong>Matrix Sensing (this chapter):</strong> Recovery of low-rank \\(X\\) from general linear measurements via \\(\\|\\cdot\\|_*\\) minimization.</li>
                    <li><strong>Robust PCA (this chapter):</strong> Demixing \\(M = L + S\\) via \\(\\|\\cdot\\|_* + \\lambda \\|\\cdot\\|_1\\).</li>
                    <li><strong>Atomic norms (general):</strong> All of the above are special cases of recovery with respect to an atomic set, with measurement complexity governed by the Gaussian width of the tangent cone.</li>
                </ol>

                <p>This unified perspective, due to Chandrasekaran, Recht, Parrilo, and Willsky (2012), reveals that the success of convex relaxation in high-dimensional problems is ultimately a <em>geometric</em> phenomenon: it succeeds whenever the structure of the signal is sufficiently "different" from the structure of the measurements (or the other component in demixing).</p>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that the nuclear norm \\(\\|X\\|_*\\) equals the atomic norm with atom set \\(\\mathcal{A} = \\{uv^\\top : \\|u\\|_2 = \\|v\\|_2 = 1\\}\\).',
                    hint: 'Write any matrix \\(X\\) using its SVD as \\(X = \\sum_{i} \\sigma_i u_i v_i^\\top\\). Then \\(X\\) is a non-negative combination of atoms \\(u_i v_i^\\top\\) with coefficients \\(\\sigma_i\\). Show this is the minimum such decomposition.',
                    solution: 'Let \\(X = U \\Sigma V^\\top = \\sum_{i=1}^r \\sigma_i u_i v_i^\\top\\) be the SVD. Each \\(u_i v_i^\\top\\) is an atom (unit vectors), so \\(\\|X\\|_{\\mathcal{A}} \\leq \\sum_i \\sigma_i = \\|X\\|_*\\). Conversely, for any decomposition \\(X = \\sum_j c_j a_j b_j^\\top\\) with \\(c_j \\geq 0\\), \\(\\|a_j\\| = \\|b_j\\| = 1\\), we have \\(\\|X\\|_* \\leq \\sum_j c_j \\|a_j b_j^\\top\\|_* = \\sum_j c_j\\), since \\(\\|a_j b_j^\\top\\|_* = 1\\) for unit vectors. Taking the infimum gives \\(\\|X\\|_* \\leq \\|X\\|_{\\mathcal{A}}\\). Combined: \\(\\|X\\|_{\\mathcal{A}} = \\|X\\|_*\\).'
                }
            ]
        }
    ]
});
