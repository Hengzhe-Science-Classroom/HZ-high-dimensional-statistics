window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch10',
    number: 10,
    title: 'Computational Methods for Sparsity',
    subtitle: 'Algorithms for solving Lasso and related problems',
    sections: [
        // ============================================================
        // SECTION 1: Coordinate Descent
        // ============================================================
        {
            id: 'ch10-sec01',
            title: 'Coordinate Descent',
            content: `
                <h2>Coordinate Descent for the Lasso</h2>

                <p>Having established the statistical properties of the Lasso estimator in previous chapters, we now turn to the fundamental computational question: <strong>how do we actually solve the Lasso?</strong></p>

                <p>The Lasso optimization problem is:</p>
                \\[\\hat{\\beta}^{\\text{Lasso}} = \\arg\\min_{\\beta \\in \\mathbb{R}^p} \\left\\{ \\frac{1}{2n} \\|y - X\\beta\\|_2^2 + \\lambda \\|\\beta\\|_1 \\right\\}\\]

                <p>This is a convex optimization problem, but the \\(\\ell_1\\) penalty is non-differentiable at zero, which rules out standard smooth optimization methods like gradient descent. The key insight behind coordinate descent is to <strong>optimize one coordinate at a time</strong>, holding all others fixed.</p>

                <h3>The Soft-Thresholding Operator</h3>

                <p>The central building block is the soft-thresholding (or shrinkage) operator, which arises as the solution to a one-dimensional Lasso subproblem.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 10.1 (Soft-Thresholding Operator)</div>
                    <div class="env-body">
                        <p>The <strong>soft-thresholding operator</strong> at level \\(\\lambda \\geq 0\\) is defined as:</p>
                        \\[S_\\lambda(z) = \\text{sign}(z)(|z| - \\lambda)_+ = \\begin{cases} z - \\lambda & \\text{if } z &gt; \\lambda, \\\\ 0 & \\text{if } |z| \\leq \\lambda, \\\\ z + \\lambda & \\text{if } z &lt; -\\lambda. \\end{cases}\\]
                        <p>Here \\((t)_+ = \\max(t, 0)\\) denotes the positive part.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Soft-thresholding does two things simultaneously: it <strong>shrinks</strong> all coefficients toward zero by the amount \\(\\lambda\\), and it <strong>sets to exactly zero</strong> any coefficient whose magnitude is below the threshold \\(\\lambda\\). This is the mechanism by which the Lasso achieves variable selection.</p>
                        <p>Compare with <strong>hard-thresholding</strong>, \\(H_\\lambda(z) = z \\cdot \\mathbf{1}(|z| &gt; \\lambda)\\), which keeps large coefficients unchanged but zeroes out small ones abruptly. Soft-thresholding is continuous while hard-thresholding is not.</p>
                    </div>
                </div>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 10.2 (Soft-Thresholding as Proximal Operator)</div>
                    <div class="env-body">
                        <p>The soft-thresholding operator is the proximal operator of the \\(\\ell_1\\) norm. That is:</p>
                        \\[S_\\lambda(z) = \\arg\\min_{\\beta \\in \\mathbb{R}} \\left\\{ \\frac{1}{2}(\\beta - z)^2 + \\lambda|\\beta| \\right\\}\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Let \\(f(\\beta) = \\frac{1}{2}(\\beta - z)^2 + \\lambda|\\beta|\\). Since \\(f\\) is strictly convex and coercive, a unique minimizer exists. We analyze three cases via the subdifferential.</p>
                        <p>The optimality condition is \\(0 \\in \\partial f(\\beta) = (\\beta - z) + \\lambda \\, \\partial|\\beta|\\), where:</p>
                        \\[\\partial|\\beta| = \\begin{cases} \\{\\text{sign}(\\beta)\\} & \\text{if } \\beta \\neq 0, \\\\ [-1, 1] & \\text{if } \\beta = 0. \\end{cases}\\]
                        <p><strong>Case 1:</strong> If \\(\\hat{\\beta} &gt; 0\\), then \\(\\hat{\\beta} - z + \\lambda = 0\\), giving \\(\\hat{\\beta} = z - \\lambda\\). This is positive iff \\(z &gt; \\lambda\\).</p>
                        <p><strong>Case 2:</strong> If \\(\\hat{\\beta} &lt; 0\\), then \\(\\hat{\\beta} - z - \\lambda = 0\\), giving \\(\\hat{\\beta} = z + \\lambda\\). This is negative iff \\(z &lt; -\\lambda\\).</p>
                        <p><strong>Case 3:</strong> If \\(\\hat{\\beta} = 0\\), then \\(0 \\in -z + \\lambda[-1, 1]\\), i.e., \\(|z| \\leq \\lambda\\).</p>
                        <p>Combining these cases yields \\(\\hat{\\beta} = S_\\lambda(z)\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <h3>Coordinate Descent Algorithm</h3>

                <p>With the soft-thresholding operator in hand, we derive the full coordinate descent algorithm. At each step, we minimize the Lasso objective over a single coordinate \\(\\beta_j\\), holding all \\(\\beta_k\\) for \\(k \\neq j\\) fixed.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.3 (Coordinate Descent Update for the Lasso)</div>
                    <div class="env-body">
                        <p>Assume the columns of \\(X\\) are standardized so that \\(\\frac{1}{n}\\|X_j\\|_2^2 = 1\\) for all \\(j\\). The Lasso coordinate descent update for coordinate \\(j\\) is:</p>
                        \\[\\beta_j^{\\text{new}} = S_\\lambda\\!\\left( \\frac{1}{n} X_j^\\top r^{(j)} \\right)\\]
                        <p>where \\(r^{(j)} = y - X_{-j}\\beta_{-j}\\) is the <strong>partial residual</strong> obtained by removing the contribution of all predictors except the \\(j\\)-th.</p>
                        <p>Without column normalization, the update becomes:</p>
                        \\[\\beta_j^{\\text{new}} = \\frac{S_{n\\lambda}\\!\\left( X_j^\\top r^{(j)} \\right)}{\\|X_j\\|_2^2}\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Fixing all coordinates except \\(j\\), the objective becomes:</p>
                        \\[f(\\beta_j) = \\frac{1}{2n} \\|r^{(j)} - X_j \\beta_j\\|_2^2 + \\lambda |\\beta_j| + \\text{const}\\]
                        <p>Expanding the quadratic:</p>
                        \\[f(\\beta_j) = \\frac{1}{2n}\\|X_j\\|_2^2 \\beta_j^2 - \\frac{1}{n} X_j^\\top r^{(j)} \\beta_j + \\lambda |\\beta_j| + \\text{const}\\]
                        <p>With the normalization \\(\\frac{1}{n}\\|X_j\\|_2^2 = 1\\), this simplifies to:</p>
                        \\[f(\\beta_j) = \\frac{1}{2}\\beta_j^2 - \\tilde{z}_j \\beta_j + \\lambda|\\beta_j| + \\text{const}\\]
                        <p>where \\(\\tilde{z}_j = \\frac{1}{n} X_j^\\top r^{(j)}\\) is the univariate OLS coefficient of \\(r^{(j)}\\) on \\(X_j\\). By Lemma 10.2, the minimizer is \\(S_\\lambda(\\tilde{z}_j)\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 10.4 (Coordinate Descent in \\(\\mathbb{R}^2\\))</div>
                    <div class="env-body">
                        <p>Consider the Lasso with \\(p = 2\\), \\(n = 100\\), and orthonormal design \\(X^\\top X/n = I_2\\). The contours of \\(\\frac{1}{2n}\\|y - X\\beta\\|^2\\) are concentric ellipses centered at the OLS solution \\(\\hat{\\beta}^{\\text{OLS}}\\), and the constraint set \\(\\|\\beta\\|_1 \\leq t\\) is a diamond.</p>
                        <p>Coordinate descent alternates between updating \\(\\beta_1\\) (a horizontal move) and \\(\\beta_2\\) (a vertical move), producing a characteristic <strong>zig-zag path</strong> that converges to the Lasso solution on the diamond boundary.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-coord-descent"></div>

                <h3>Convergence of Coordinate Descent</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.5 (Convergence of Coordinate Descent)</div>
                    <div class="env-body">
                        <p>For the Lasso objective \\(F(\\beta) = \\frac{1}{2n}\\|y - X\\beta\\|^2 + \\lambda\\|\\beta\\|_1\\), coordinate descent with cyclic updates converges:</p>
                        <ol>
                            <li>The objective values \\(F(\\beta^{(t)})\\) are non-increasing and converge to \\(F(\\hat{\\beta})\\).</li>
                            <li>Every accumulation point of \\(\\{\\beta^{(t)}\\}\\) is a minimizer. If \\(X^\\top X / n\\) is positive definite, the iterates themselves converge to the unique minimizer.</li>
                            <li>The convergence rate is <strong>linear</strong> (geometric): there exists \\(\\rho \\in (0, 1)\\) such that</li>
                        </ol>
                        \\[F(\\beta^{(t)}) - F(\\hat{\\beta}) \\leq C \\rho^t\\]
                        <p>where \\(\\rho\\) depends on the condition number \\(\\kappa = \\lambda_{\\max}(X^\\top X/n) / \\lambda_{\\min}(X^\\top X/n)\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The convergence guarantee for coordinate descent on the Lasso relies crucially on the <strong>separable</strong> structure of the \\(\\ell_1\\) penalty: \\(\\|\\beta\\|_1 = \\sum_j |\\beta_j|\\). For non-separable penalties (e.g., group Lasso with overlapping groups), coordinate descent may not converge to the global minimum without modifications.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Practical Efficiency)</div>
                    <div class="env-body">
                        <p>In practice, coordinate descent is extremely efficient for the Lasso due to three factors:</p>
                        <ul>
                            <li><strong>Warm starts:</strong> When computing the solution path over a grid of \\(\\lambda\\) values, the solution at \\(\\lambda_k\\) provides an excellent initialization for \\(\\lambda_{k+1}\\).</li>
                            <li><strong>Active set strategy:</strong> Once a coefficient \\(\\beta_j\\) is set to zero, it tends to stay at zero. We can skip these coordinates and only cycle over the "active" set.</li>
                            <li><strong>Efficient residual updates:</strong> Maintaining the residual \\(r = y - X\\beta\\) and updating it incrementally costs only \\(O(n)\\) per coordinate update.</li>
                        </ul>
                        <p>These techniques are implemented in the highly optimized <code>glmnet</code> package.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-coord-descent',
                    title: 'Coordinate Descent vs Proximal Gradient on the Lasso',
                    description: 'Watch coordinate descent zig-zag to the Lasso solution. The \\(\\ell_1\\) ball (diamond) and RSS contours (ellipses) are shown. Toggle proximal gradient for comparison.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 520, scale: 70, originX: 350, originY: 280 });
                        var ctx = viz.ctx;

                        // Problem parameters
                        var betaOLS = [2.5, 1.8]; // OLS solution
                        // Hessian eigenvalues for ellipse shape
                        var a11 = 1.0, a22 = 0.6, a12 = 0.3; // X^T X / n entries
                        var lambdaParam = 1.2;
                        var speed = 1.0;

                        var cdPath = [];
                        var pgPath = [];
                        var cdRunning = false;
                        var pgRunning = false;
                        var cdStep = 0;
                        var pgStep = 0;
                        var maxSteps = 60;

                        // Soft-thresholding
                        function softThresh(z, lam) {
                            if (z > lam) return z - lam;
                            if (z < -lam) return z + lam;
                            return 0;
                        }

                        // Lasso objective (quadratic + L1)
                        function objective(b) {
                            var dx = b[0] - betaOLS[0], dy = b[1] - betaOLS[1];
                            var quad = 0.5 * (a11 * dx * dx + 2 * a12 * dx * dy + a22 * dy * dy);
                            return quad + lambdaParam * (Math.abs(b[0]) + Math.abs(b[1]));
                        }

                        // Gradient of the smooth part
                        function gradSmooth(b) {
                            var dx = b[0] - betaOLS[0], dy = b[1] - betaOLS[1];
                            return [a11 * dx + a12 * dy, a12 * dx + a22 * dy];
                        }

                        // Compute coordinate descent path
                        function computeCD() {
                            cdPath = [[0, 0]];
                            var b = [0, 0];
                            for (var t = 0; t < maxSteps; t++) {
                                // Update beta_1
                                var g = gradSmooth(b);
                                var z1 = b[0] - g[0] / a11;
                                b = [softThresh(z1, lambdaParam / a11), b[1]];
                                cdPath.push([b[0], b[1]]);
                                // Update beta_2
                                g = gradSmooth(b);
                                var z2 = b[1] - g[1] / a22;
                                b = [b[0], softThresh(z2, lambdaParam / a22)];
                                cdPath.push([b[0], b[1]]);
                            }
                        }

                        // Compute proximal gradient (ISTA) path
                        function computePG() {
                            pgPath = [[0, 0]];
                            var b = [0, 0];
                            // Step size: 1 / L where L = max eigenvalue of Hessian
                            var tr = a11 + a22;
                            var det = a11 * a22 - a12 * a12;
                            var disc = Math.sqrt(tr * tr - 4 * det);
                            var L = (tr + disc) / 2;
                            var eta = 1.0 / L;
                            for (var t = 0; t < maxSteps * 2; t++) {
                                var g = gradSmooth(b);
                                var z0 = b[0] - eta * g[0];
                                var z1 = b[1] - eta * g[1];
                                b = [softThresh(z0, lambdaParam * eta), softThresh(z1, lambdaParam * eta)];
                                pgPath.push([b[0], b[1]]);
                            }
                        }

                        computeCD();
                        computePG();

                        var showCD = true;
                        var showPG = false;

                        var sLambda = VizEngine.createSlider(controls, '\\(\\lambda\\)', 0.1, 3.0, lambdaParam, 0.1, function(v) {
                            lambdaParam = v;
                            computeCD();
                            computePG();
                            cdStep = 0; pgStep = 0;
                        });

                        VizEngine.createButton(controls, 'Coord Descent', function() {
                            showCD = true; showPG = false;
                            cdStep = 0;
                            cdRunning = true; pgRunning = false;
                        });

                        VizEngine.createButton(controls, 'Prox Gradient', function() {
                            showCD = false; showPG = true;
                            pgStep = 0;
                            pgRunning = true; cdRunning = false;
                        });

                        VizEngine.createButton(controls, 'Both', function() {
                            showCD = true; showPG = true;
                            cdStep = 0; pgStep = 0;
                            cdRunning = true; pgRunning = true;
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            cdStep = 0; pgStep = 0;
                            cdRunning = false; pgRunning = false;
                        });

                        function drawEllipse(cx, cy, level) {
                            // Draw contour of 0.5*(b-bOLS)^T H (b-bOLS) = level
                            // H = [[a11, a12],[a12, a22]]
                            var pts = [];
                            var N = 120;
                            for (var i = 0; i <= N; i++) {
                                var theta = 2 * Math.PI * i / N;
                                var u = Math.cos(theta), v = Math.sin(theta);
                                // Eigendecomposition for drawing
                                var tr = a11 + a22;
                                var det = a11 * a22 - a12 * a12;
                                var disc = Math.sqrt(Math.max(tr * tr - 4 * det, 0));
                                var lam1 = (tr + disc) / 2;
                                var lam2 = (tr - disc) / 2;
                                // Eigenvectors
                                var ang = 0.5 * Math.atan2(2 * a12, a11 - a22);
                                var c = Math.cos(ang), s = Math.sin(ang);
                                var r1 = Math.sqrt(2 * level / lam1);
                                var r2 = Math.sqrt(2 * level / lam2);
                                var px = r1 * u * c - r2 * v * s + cx;
                                var py = r1 * u * s + r2 * v * c + cy;
                                pts.push([px, py]);
                            }
                            return pts;
                        }

                        function drawDiamond(radius) {
                            return [[radius, 0], [0, radius], [-radius, 0], [0, -radius]];
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw RSS contours
                            var levels = [0.2, 0.5, 1.0, 1.8, 3.0, 5.0];
                            for (var li = 0; li < levels.length; li++) {
                                var epts = drawEllipse(betaOLS[0], betaOLS[1], levels[li]);
                                for (var i = 0; i < epts.length - 1; i++) {
                                    viz.drawSegment(epts[i][0], epts[i][1], epts[i + 1][0], epts[i + 1][1], 'rgba(88,166,255,0.2)', 1);
                                }
                            }

                            // Draw L1 ball (diamond)
                            var diamondR = lambdaParam * 1.5;
                            var dp = drawDiamond(diamondR);
                            viz.drawPolygon(dp, 'rgba(63,185,160,0.08)', viz.colors.teal, 1.5);

                            // OLS point
                            viz.drawPoint(betaOLS[0], betaOLS[1], viz.colors.blue, 'OLS', 5);

                            // Coordinate descent path
                            if (showCD && cdPath.length > 1) {
                                var end = Math.min(Math.floor(cdStep), cdPath.length - 1);
                                for (var i = 0; i < end; i++) {
                                    viz.drawSegment(cdPath[i][0], cdPath[i][1], cdPath[i + 1][0], cdPath[i + 1][1], viz.colors.orange, 2);
                                }
                                if (end > 0) {
                                    viz.drawPoint(cdPath[end][0], cdPath[end][1], viz.colors.orange, 'CD', 5);
                                }
                                viz.drawPoint(cdPath[0][0], cdPath[0][1], viz.colors.white, '', 4);
                            }

                            // Proximal gradient path
                            if (showPG && pgPath.length > 1) {
                                var endPG = Math.min(Math.floor(pgStep), pgPath.length - 1);
                                for (var i = 0; i < endPG; i++) {
                                    viz.drawSegment(pgPath[i][0], pgPath[i][1], pgPath[i + 1][0], pgPath[i + 1][1], viz.colors.purple, 2);
                                }
                                if (endPG > 0) {
                                    viz.drawPoint(pgPath[endPG][0], pgPath[endPG][1], viz.colors.purple, 'PG', 5);
                                }
                            }

                            // Labels
                            viz.screenText('Coordinate Descent for the Lasso', viz.width / 2, 18, viz.colors.white, 15, 'center');

                            // Legend
                            var lx = 14, ly = viz.height - 58;
                            ctx.fillStyle = viz.colors.orange; ctx.fillRect(lx, ly, 16, 3);
                            viz.screenText('Coordinate Descent', lx + 22, ly + 2, viz.colors.orange, 11, 'left');
                            ctx.fillStyle = viz.colors.purple; ctx.fillRect(lx, ly + 18, 16, 3);
                            viz.screenText('Proximal Gradient', lx + 22, ly + 20, viz.colors.purple, 11, 'left');
                            ctx.fillStyle = viz.colors.teal; ctx.fillRect(lx, ly + 36, 16, 3);
                            viz.screenText('L1 Ball', lx + 22, ly + 38, viz.colors.teal, 11, 'left');

                            // Objective values
                            if (showCD && cdPath.length > 1) {
                                var ei = Math.min(Math.floor(cdStep), cdPath.length - 1);
                                var cdObj = objective(cdPath[ei]);
                                viz.screenText('CD obj: ' + cdObj.toFixed(4), viz.width - 14, viz.height - 40, viz.colors.orange, 12, 'right');
                            }
                            if (showPG && pgPath.length > 1) {
                                var ei2 = Math.min(Math.floor(pgStep), pgPath.length - 1);
                                var pgObj = objective(pgPath[ei2]);
                                viz.screenText('PG obj: ' + pgObj.toFixed(4), viz.width - 14, viz.height - 22, viz.colors.purple, 12, 'right');
                            }

                            // Animate
                            if (cdRunning && cdStep < cdPath.length - 1) {
                                cdStep += 0.3 * speed;
                            }
                            if (pgRunning && pgStep < pgPath.length - 1) {
                                pgStep += 0.3 * speed;
                            }
                        }

                        viz.animate(draw);
                        cdRunning = true;
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: '<p>Derive the coordinate descent update for the <strong>Elastic Net</strong> objective:</p>\\[\\min_\\beta \\frac{1}{2n}\\|y - X\\beta\\|_2^2 + \\lambda_1\\|\\beta\\|_1 + \\frac{\\lambda_2}{2}\\|\\beta\\|_2^2\\]<p>Show that the update for coordinate \\(j\\) (assuming standardized columns) takes the form \\(\\beta_j^{\\text{new}} = S_{\\lambda_1}(\\tilde{z}_j) / (1 + \\lambda_2)\\).</p>',
                    hint: 'Follow the same approach as Theorem 10.3. Fix all coordinates except \\(j\\) and minimize. The \\(\\ell_2\\) penalty adds \\(\\frac{\\lambda_2}{2}\\beta_j^2\\) to the single-coordinate objective, effectively changing the curvature from 1 to \\(1 + \\lambda_2\\).',
                    solution: '<p>Fixing all coordinates except \\(j\\), the objective becomes:</p>\\[f(\\beta_j) = \\frac{1}{2}\\beta_j^2 - \\tilde{z}_j \\beta_j + \\frac{\\lambda_2}{2}\\beta_j^2 + \\lambda_1|\\beta_j| + C = \\frac{1 + \\lambda_2}{2}\\beta_j^2 - \\tilde{z}_j\\beta_j + \\lambda_1|\\beta_j| + C\\]<p>Completing the square in \\(\\beta_j\\):</p>\\[f(\\beta_j) = \\frac{1 + \\lambda_2}{2}\\left(\\beta_j - \\frac{\\tilde{z}_j}{1 + \\lambda_2}\\right)^2 + \\lambda_1|\\beta_j| + C\'\\]<p>This is a scaled proximal problem. Substituting \\(u = (1+\\lambda_2)\\beta_j\\) and applying the soft-thresholding result, or directly using the optimality condition \\(0 \\in (1+\\lambda_2)\\beta_j - \\tilde{z}_j + \\lambda_1\\partial|\\beta_j|\\), yields:</p>\\[\\beta_j^{\\text{new}} = \\frac{S_{\\lambda_1}(\\tilde{z}_j)}{1 + \\lambda_2}\\]<p>The \\(\\ell_2\\) penalty causes additional shrinkage by the factor \\(1/(1+\\lambda_2)\\).</p>'
                }
            ]
        },
        // ============================================================
        // SECTION 2: Proximal Gradient Methods
        // ============================================================
        {
            id: 'ch10-sec02',
            title: 'Proximal Gradient Methods',
            content: `
                <h2>Proximal Gradient Methods: ISTA and FISTA</h2>

                <p>Coordinate descent updates one variable at a time. An alternative family of methods updates <strong>all coordinates simultaneously</strong> using the proximal gradient framework. These methods are especially well-suited when the objective decomposes as:</p>
                \\[F(\\beta) = g(\\beta) + h(\\beta)\\]
                <p>where \\(g\\) is smooth (differentiable with Lipschitz gradient) and \\(h\\) is convex but possibly non-smooth.</p>

                <h3>The Proximal Operator</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 10.6 (Proximal Operator)</div>
                    <div class="env-body">
                        <p>For a convex function \\(h: \\mathbb{R}^p \\to \\mathbb{R} \\cup \\{+\\infty\\}\\), the <strong>proximal operator</strong> is:</p>
                        \\[\\text{prox}_{\\eta h}(z) = \\arg\\min_{\\beta \\in \\mathbb{R}^p} \\left\\{ \\frac{1}{2\\eta}\\|\\beta - z\\|_2^2 + h(\\beta) \\right\\}\\]
                        <p>where \\(\\eta &gt; 0\\) is a step-size parameter.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 10.7 (Proximal Operators for Common Penalties)</div>
                    <div class="env-body">
                        <ul>
                            <li><strong>\\(\\ell_1\\) norm:</strong> \\(\\text{prox}_{\\eta\\lambda\\|\\cdot\\|_1}(z) = S_{\\eta\\lambda}(z)\\) (componentwise soft-thresholding)</li>
                            <li><strong>\\(\\ell_2\\) norm (group Lasso):</strong> \\(\\text{prox}_{\\eta\\lambda\\|\\cdot\\|_2}(z) = \\left(1 - \\frac{\\eta\\lambda}{\\|z\\|_2}\\right)_+ z\\) (block soft-thresholding)</li>
                            <li><strong>Indicator \\(I_C\\):</strong> \\(\\text{prox}_{I_C}(z) = \\Pi_C(z)\\) (Euclidean projection onto convex set \\(C\\))</li>
                        </ul>
                    </div>
                </div>

                <h3>ISTA: Iterative Shrinkage-Thresholding Algorithm</h3>

                <div class="env-block definition">
                    <div class="env-title">Algorithm 10.8 (ISTA)</div>
                    <div class="env-body">
                        <p>Given \\(F(\\beta) = g(\\beta) + h(\\beta)\\) with \\(\\nabla g\\) Lipschitz continuous with constant \\(L\\):</p>
                        <ol>
                            <li>Initialize \\(\\beta^{(0)}\\).</li>
                            <li>For \\(k = 0, 1, 2, \\ldots\\):</li>
                        </ol>
                        \\[\\beta^{(k+1)} = \\text{prox}_{\\eta h}\\!\\left( \\beta^{(k)} - \\eta \\nabla g(\\beta^{(k)}) \\right)\\]
                        <p>with step size \\(\\eta \\leq 1/L\\).</p>
                        <p>For the Lasso, \\(g(\\beta) = \\frac{1}{2n}\\|y - X\\beta\\|^2\\) and \\(h(\\beta) = \\lambda\\|\\beta\\|_1\\), so:</p>
                        \\[\\beta^{(k+1)} = S_{\\eta\\lambda}\\!\\left( \\beta^{(k)} + \\frac{\\eta}{n} X^\\top(y - X\\beta^{(k)}) \\right)\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>ISTA performs two operations at each step:</p>
                        <ol>
                            <li><strong>Gradient step</strong> on the smooth part: \\(z^{(k)} = \\beta^{(k)} - \\eta \\nabla g(\\beta^{(k)})\\)</li>
                            <li><strong>Proximal step</strong> for the non-smooth part: \\(\\beta^{(k+1)} = \\text{prox}_{\\eta h}(z^{(k)})\\)</li>
                        </ol>
                        <p>Think of it as "gradient descent, then project/shrink." When \\(h = 0\\), ISTA reduces to standard gradient descent. When \\(g = 0\\), it reduces to the proximal point algorithm.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.9 (ISTA Convergence Rate)</div>
                    <div class="env-body">
                        <p>Let \\(F^\\star = F(\\hat{\\beta})\\) be the optimal value. Then ISTA with step size \\(\\eta = 1/L\\) satisfies:</p>
                        \\[F(\\beta^{(k)}) - F^\\star \\leq \\frac{L\\|\\beta^{(0)} - \\hat{\\beta}\\|_2^2}{2k}\\]
                        <p>This is an \\(O(1/k)\\) convergence rate. To achieve \\(F(\\beta^{(k)}) - F^\\star \\leq \\varepsilon\\), ISTA requires \\(O(1/\\varepsilon)\\) iterations.</p>
                    </div>
                </div>

                <h3>FISTA: Fast ISTA with Nesterov Acceleration</h3>

                <p>The \\(O(1/k)\\) rate of ISTA can be improved to \\(O(1/k^2)\\) using Nesterov's momentum trick — an acceleration scheme that is optimal for first-order methods on this problem class.</p>

                <div class="env-block definition">
                    <div class="env-title">Algorithm 10.10 (FISTA)</div>
                    <div class="env-body">
                        <p>Initialize \\(\\beta^{(0)} = \\omega^{(1)} = \\beta^{(0)}\\), \\(t_1 = 1\\).</p>
                        <p>For \\(k = 1, 2, 3, \\ldots\\):</p>
                        <ol>
                            <li>\\(\\beta^{(k)} = \\text{prox}_{\\eta h}\\!\\left( \\omega^{(k)} - \\eta \\nabla g(\\omega^{(k)}) \\right)\\)</li>
                            <li>\\(t_{k+1} = \\frac{1 + \\sqrt{1 + 4t_k^2}}{2}\\)</li>
                            <li>\\(\\omega^{(k+1)} = \\beta^{(k)} + \\frac{t_k - 1}{t_{k+1}} (\\beta^{(k)} - \\beta^{(k-1)})\\)</li>
                        </ol>
                        <p>The key difference from ISTA is step 3: instead of applying the proximal-gradient step at \\(\\beta^{(k)}\\), we apply it at the <strong>extrapolated point</strong> \\(\\omega^{(k+1)}\\), which "overshoots" in the direction of the previous step.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.11 (FISTA Convergence Rate)</div>
                    <div class="env-body">
                        <p>FISTA with step size \\(\\eta = 1/L\\) satisfies:</p>
                        \\[F(\\beta^{(k)}) - F^\\star \\leq \\frac{2L\\|\\beta^{(0)} - \\hat{\\beta}\\|_2^2}{(k+1)^2}\\]
                        <p>This is an \\(O(1/k^2)\\) rate. To achieve \\(\\varepsilon\\)-accuracy, FISTA requires \\(O(1/\\sqrt{\\varepsilon})\\) iterations, which is optimal among first-order methods (by Nesterov's lower bound).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>The proof introduces a Lyapunov function. Define \\(v^{(k)} = \\hat{\\beta} + t_k(\\beta^{(k)} - \\beta^{(k-1)})\\) and the energy:</p>
                        \\[E_k = t_k^2 (F(\\beta^{(k)}) - F^\\star) + \\frac{L}{2}\\|v^{(k)} - \\hat{\\beta}\\|_2^2\\]
                        <p>One shows \\(E_k \\leq E_{k-1}\\) using the descent lemma and the specific choice of \\(t_k\\). Since \\(t_k \\geq (k+1)/2\\) for \\(k \\geq 1\\), the bound follows from \\(E_k \\leq E_0 = \\frac{L}{2}\\|\\beta^{(0)} - \\hat{\\beta}\\|_2^2\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-ista-fista"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark (ISTA vs FISTA vs Coordinate Descent)</div>
                    <div class="env-body">
                        <p>In practice, the comparison depends on problem structure:</p>
                        <ul>
                            <li><strong>Coordinate descent</strong> dominates for moderate \\(p\\) (up to \\(\\sim 10^5\\)) with warm starts along the regularization path. Its cost per full cycle is \\(O(np)\\).</li>
                            <li><strong>ISTA/FISTA</strong> are preferred for very large \\(p\\) or when the proximal operator has special structure (e.g., group Lasso, nuclear norm). Each iteration costs \\(O(np)\\) for a matrix-vector product.</li>
                            <li>FISTA's momentum can cause <strong>oscillations</strong> in the objective; monotone variants exist but lose the clean \\(O(1/k^2)\\) bound.</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-ista-fista',
                    title: 'ISTA vs FISTA Convergence',
                    description: 'Compare the convergence of ISTA (O(1/k)) and FISTA (O(1/k\\u00b2)). Adjust the condition number to see how it affects both methods.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 450, scale: 1, originX: 70, originY: 400 });
                        var ctx = viz.ctx;

                        var condNumber = 5.0;
                        var maxIter = 200;

                        VizEngine.createSlider(controls, '\\(\\kappa\\)', 1.5, 50, condNumber, 0.5, function(v) {
                            condNumber = v;
                            recompute();
                        });

                        var istaGaps = [];
                        var fistaGaps = [];

                        function recompute() {
                            // Simulate convergence on a quadratic + L1 problem
                            // g(beta) = 0.5 * beta^T H beta - c^T beta, h(beta) = lambda*|beta|_1
                            // H has eigenvalues 1 and condNumber
                            var L = condNumber;
                            var mu = 1.0;
                            var eta = 1.0 / L;
                            var lam = 0.3;

                            // 2D problem for simplicity
                            var H = [[L, 0], [0, mu]];
                            var c = [2.0, 1.5];
                            var bOpt = [softT(c[0] / L, lam / L), softT(c[1] / mu, lam / mu)];
                            var Fstar = objVal(bOpt, H, c, lam);

                            function softT(z, t) { return z > t ? z - t : (z < -t ? z + t : 0); }
                            function objVal(b, HH, cc, ll) {
                                return 0.5 * (HH[0][0] * b[0] * b[0] + HH[1][1] * b[1] * b[1]) - cc[0] * b[0] - cc[1] * b[1] + ll * (Math.abs(b[0]) + Math.abs(b[1]));
                            }

                            // ISTA
                            istaGaps = [];
                            var b = [0, 0];
                            for (var k = 0; k < maxIter; k++) {
                                var gap = objVal(b, H, c, lam) - Fstar;
                                istaGaps.push(Math.max(gap, 1e-16));
                                var g0 = H[0][0] * b[0] - c[0];
                                var g1 = H[1][1] * b[1] - c[1];
                                b = [softT(b[0] - eta * g0, lam * eta), softT(b[1] - eta * g1, lam * eta)];
                            }

                            // FISTA
                            fistaGaps = [];
                            b = [0, 0];
                            var bPrev = [0, 0];
                            var tk = 1;
                            for (var k = 0; k < maxIter; k++) {
                                var gap2 = objVal(b, H, c, lam) - Fstar;
                                fistaGaps.push(Math.max(gap2, 1e-16));
                                var tkNext = (1 + Math.sqrt(1 + 4 * tk * tk)) / 2;
                                var mom = (tk - 1) / tkNext;
                                var w0 = b[0] + mom * (b[0] - bPrev[0]);
                                var w1 = b[1] + mom * (b[1] - bPrev[1]);
                                var gw0 = H[0][0] * w0 - c[0];
                                var gw1 = H[1][1] * w1 - c[1];
                                bPrev = [b[0], b[1]];
                                b = [softT(w0 - eta * gw0, lam * eta), softT(w1 - eta * gw1, lam * eta)];
                                tk = tkNext;
                            }
                        }

                        recompute();

                        function draw() {
                            viz.clear();

                            var plotLeft = 70;
                            var plotRight = viz.width - 30;
                            var plotTop = 40;
                            var plotBottom = viz.height - 50;
                            var plotW = plotRight - plotLeft;
                            var plotH = plotBottom - plotTop;

                            // Find scale
                            var maxGap = Math.max(istaGaps[0] || 1, fistaGaps[0] || 1);
                            var minGap = 1e-10;
                            var logMax = Math.log10(maxGap);
                            var logMin = -10;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(plotLeft, plotTop);
                            ctx.lineTo(plotLeft, plotBottom);
                            ctx.lineTo(plotRight, plotBottom);
                            ctx.stroke();

                            // Grid lines (horizontal, log scale)
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var p = Math.ceil(logMin); p <= Math.floor(logMax) + 1; p += 2) {
                                var yy = plotBottom - (p - logMin) / (logMax - logMin) * plotH;
                                if (yy < plotTop || yy > plotBottom) continue;
                                ctx.strokeStyle = 'rgba(74,74,122,0.3)';
                                ctx.beginPath(); ctx.moveTo(plotLeft, yy); ctx.lineTo(plotRight, yy); ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText('1e' + p, plotLeft - 6, yy);
                            }

                            // X-axis ticks
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var xi = 0; xi <= maxIter; xi += 50) {
                                var xx = plotLeft + (xi / maxIter) * plotW;
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(xi, xx, plotBottom + 6);
                                ctx.strokeStyle = 'rgba(74,74,122,0.2)';
                                ctx.beginPath(); ctx.moveTo(xx, plotTop); ctx.lineTo(xx, plotBottom); ctx.stroke();
                            }

                            // Axis labels
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Iteration k', (plotLeft + plotRight) / 2, plotBottom + 28);
                            ctx.save();
                            ctx.translate(16, (plotTop + plotBottom) / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('F(beta^k) - F*', 0, 0);
                            ctx.restore();

                            // Plot ISTA
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = 0; i < istaGaps.length; i++) {
                                var x = plotLeft + (i / maxIter) * plotW;
                                var logV = Math.log10(Math.max(istaGaps[i], 1e-16));
                                var y = plotBottom - (logV - logMin) / (logMax - logMin) * plotH;
                                y = Math.max(plotTop, Math.min(plotBottom, y));
                                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                            }
                            ctx.stroke();

                            // Plot FISTA
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = 0; i < fistaGaps.length; i++) {
                                var x = plotLeft + (i / maxIter) * plotW;
                                var logV = Math.log10(Math.max(fistaGaps[i], 1e-16));
                                var y = plotBottom - (logV - logMin) / (logMax - logMin) * plotH;
                                y = Math.max(plotTop, Math.min(plotBottom, y));
                                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                            }
                            ctx.stroke();

                            // Reference rates
                            ctx.setLineDash([6, 4]);
                            // O(1/k)
                            ctx.strokeStyle = 'rgba(240,136,62,0.4)';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            for (var i = 1; i < maxIter; i++) {
                                var rate = maxGap / i;
                                var x = plotLeft + (i / maxIter) * plotW;
                                var logV = Math.log10(Math.max(rate, 1e-16));
                                var y = plotBottom - (logV - logMin) / (logMax - logMin) * plotH;
                                y = Math.max(plotTop, Math.min(plotBottom, y));
                                if (i === 1) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                            }
                            ctx.stroke();

                            // O(1/k^2)
                            ctx.strokeStyle = 'rgba(63,185,160,0.4)';
                            ctx.beginPath();
                            for (var i = 1; i < maxIter; i++) {
                                var rate = maxGap / (i * i);
                                var x = plotLeft + (i / maxIter) * plotW;
                                var logV = Math.log10(Math.max(rate, 1e-16));
                                var y = plotBottom - (logV - logMin) / (logMax - logMin) * plotH;
                                y = Math.max(plotTop, Math.min(plotBottom, y));
                                if (i === 1) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Title and legend
                            viz.screenText('ISTA vs FISTA Convergence (log scale)', viz.width / 2, 18, viz.colors.white, 15, 'center');
                            var lx = plotRight - 180;
                            var ly = plotTop + 12;
                            ctx.fillStyle = viz.colors.orange; ctx.fillRect(lx, ly, 20, 3);
                            viz.screenText('ISTA  O(1/k)', lx + 26, ly + 2, viz.colors.orange, 12, 'left');
                            ctx.fillStyle = viz.colors.teal; ctx.fillRect(lx, ly + 18, 20, 3);
                            viz.screenText('FISTA O(1/k\u00b2)', lx + 26, ly + 20, viz.colors.teal, 12, 'left');

                            viz.screenText('\u03ba = ' + condNumber.toFixed(1), plotRight - 30, plotBottom - 10, viz.colors.purple, 12, 'right');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: '<p>Show that the proximal operator of the group Lasso penalty \\(h(\\beta_G) = \\lambda\\|\\beta_G\\|_2\\) for a group \\(G\\) is the <strong>block soft-thresholding</strong> operator:</p>\\[\\text{prox}_{\\eta h}(z) = \\left(1 - \\frac{\\eta\\lambda}{\\|z\\|_2}\\right)_+ z\\]<p>What happens when \\(\\|z\\|_2 \\leq \\eta\\lambda\\)?</p>',
                    hint: 'Write the optimality condition using subdifferentials. Consider two cases: \\(\\hat{\\beta} = 0\\) and \\(\\hat{\\beta} \\neq 0\\). When \\(\\hat{\\beta} \\neq 0\\), the subdifferential of \\(\\|\\cdot\\|_2\\) at \\(\\hat{\\beta}\\) is \\(\\{\\hat{\\beta}/\\|\\hat{\\beta}\\|_2\\}\\).',
                    solution: '<p>We minimize \\(f(\\beta) = \\frac{1}{2\\eta}\\|\\beta - z\\|_2^2 + \\lambda\\|\\beta\\|_2\\). The optimality condition is:</p>\\[0 \\in \\frac{1}{\\eta}(\\hat{\\beta} - z) + \\lambda \\,\\partial\\|\\hat{\\beta}\\|_2\\]<p><strong>Case 1:</strong> \\(\\hat{\\beta} \\neq 0\\). Then \\(\\partial\\|\\hat{\\beta}\\|_2 = \\{\\hat{\\beta}/\\|\\hat{\\beta}\\|_2\\}\\), so \\(\\hat{\\beta} - z + \\eta\\lambda \\hat{\\beta}/\\|\\hat{\\beta}\\|_2 = 0\\). This gives \\(\\hat{\\beta}(1 + \\eta\\lambda/\\|\\hat{\\beta}\\|_2) = z\\), hence \\(\\hat{\\beta} = \\alpha z\\) for some \\(\\alpha &gt; 0\\). Solving: \\(\\alpha = 1 - \\eta\\lambda/\\|z\\|_2\\), valid when \\(\\|z\\|_2 &gt; \\eta\\lambda\\).</p><p><strong>Case 2:</strong> \\(\\hat{\\beta} = 0\\). Then \\(\\partial\\|0\\|_2 = \\{v : \\|v\\|_2 \\leq 1\\}\\), and \\(-z/\\eta + \\lambda v = 0\\) requires \\(\\|z\\|_2 \\leq \\eta\\lambda\\).</p><p>When \\(\\|z\\|_2 \\leq \\eta\\lambda\\), the entire group is set to zero. This is the group sparsity mechanism.</p>'
                }
            ]
        },
        // ============================================================
        // SECTION 3: ADMM
        // ============================================================
        {
            id: 'ch10-sec03',
            title: 'ADMM',
            content: `
                <h2>Alternating Direction Method of Multipliers (ADMM)</h2>

                <p>While proximal gradient methods exploit the composite structure \\(g + h\\), the <strong>Alternating Direction Method of Multipliers (ADMM)</strong> is a powerful framework for problems that can be written with linear constraints. It is particularly useful for <strong>constrained formulations</strong> of the Lasso and for distributed optimization.</p>

                <h3>ADMM Framework</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 10.12 (ADMM)</div>
                    <div class="env-body">
                        <p>Consider the problem:</p>
                        \\[\\min_{\\beta, z} \\; g(\\beta) + h(z) \\quad \\text{subject to} \\quad A\\beta + Bz = c\\]
                        <p>The <strong>augmented Lagrangian</strong> is:</p>
                        \\[L_\\rho(\\beta, z, u) = g(\\beta) + h(z) + u^\\top(A\\beta + Bz - c) + \\frac{\\rho}{2}\\|A\\beta + Bz - c\\|_2^2\\]
                        <p>ADMM alternates three updates:</p>
                        <ol>
                            <li>\\(\\beta^{(k+1)} = \\arg\\min_\\beta L_\\rho(\\beta, z^{(k)}, u^{(k)})\\)</li>
                            <li>\\(z^{(k+1)} = \\arg\\min_z L_\\rho(\\beta^{(k+1)}, z, u^{(k)})\\)</li>
                            <li>\\(u^{(k+1)} = u^{(k)} + \\rho(A\\beta^{(k+1)} + Bz^{(k+1)} - c)\\)</li>
                        </ol>
                    </div>
                </div>

                <h3>ADMM for the Lasso</h3>

                <p>The Lasso can be reformulated with variable splitting: introduce an auxiliary variable \\(z = \\beta\\) and write:</p>
                \\[\\min_{\\beta, z} \\; \\frac{1}{2n}\\|y - X\\beta\\|_2^2 + \\lambda\\|z\\|_1 \\quad \\text{s.t.} \\quad \\beta = z\\]

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.13 (ADMM Updates for the Lasso)</div>
                    <div class="env-body">
                        <p>Using the scaled form of ADMM (with \\(u = \\tilde{u}/\\rho\\) as the scaled dual variable), the updates simplify to:</p>
                        <ol>
                            <li><strong>\\(\\beta\\)-update</strong> (ridge regression):</li>
                        </ol>
                        \\[\\beta^{(k+1)} = \\left(\\frac{1}{n}X^\\top X + \\rho I\\right)^{-1} \\left(\\frac{1}{n}X^\\top y + \\rho(z^{(k)} - u^{(k)})\\right)\\]
                        <ol start="2">
                            <li><strong>\\(z\\)-update</strong> (soft-thresholding):</li>
                        </ol>
                        \\[z^{(k+1)} = S_{\\lambda/\\rho}\\!\\left(\\beta^{(k+1)} + u^{(k)}\\right)\\]
                        <ol start="3">
                            <li><strong>Dual update</strong>:</li>
                        </ol>
                        \\[u^{(k+1)} = u^{(k)} + \\beta^{(k+1)} - z^{(k+1)}\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>For the \\(\\beta\\)-update, we minimize over \\(\\beta\\):</p>
                        \\[\\frac{1}{2n}\\|y - X\\beta\\|^2 + \\frac{\\rho}{2}\\|\\beta - z^{(k)} + u^{(k)}\\|^2\\]
                        <p>Taking the gradient and setting it to zero:</p>
                        \\[-\\frac{1}{n}X^\\top(y - X\\beta) + \\rho(\\beta - z^{(k)} + u^{(k)}) = 0\\]
                        \\[\\left(\\frac{1}{n}X^\\top X + \\rho I\\right)\\beta = \\frac{1}{n}X^\\top y + \\rho(z^{(k)} - u^{(k)})\\]
                        <p>For the \\(z\\)-update, we minimize \\(\\lambda\\|z\\|_1 + \\frac{\\rho}{2}\\|\\beta^{(k+1)} - z + u^{(k)}\\|^2\\) over \\(z\\), which by Lemma 10.2 gives componentwise soft-thresholding at level \\(\\lambda/\\rho\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Precomputation)</div>
                    <div class="env-body">
                        <p>The matrix \\(\\left(\\frac{1}{n}X^\\top X + \\rho I\\right)\\) does not change across iterations. If \\(p &lt; n\\), we can precompute its Cholesky decomposition in \\(O(p^3)\\) and solve each \\(\\beta\\)-update in \\(O(p^2)\\). If \\(n &lt; p\\), use the Woodbury identity:</p>
                        \\[\\left(\\frac{1}{n}X^\\top X + \\rho I\\right)^{-1} = \\frac{1}{\\rho}\\left(I - \\frac{1}{n}X^\\top\\left(\\frac{1}{n}XX^\\top + \\rho I_n\\right)^{-1} X\\right)\\]
                        <p>reducing the cost to \\(O(n^2 p)\\) for precomputation and \\(O(n^2)\\) per iteration.</p>
                    </div>
                </div>

                <h3>Convergence of ADMM</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.14 (ADMM Convergence)</div>
                    <div class="env-body">
                        <p>Under mild conditions (\\(g\\) and \\(h\\) closed, proper, convex; the unaugmented Lagrangian has a saddle point), ADMM converges:</p>
                        <ol>
                            <li><strong>Residual convergence:</strong> \\(A\\beta^{(k)} + Bz^{(k)} - c \\to 0\\) (primal feasibility).</li>
                            <li><strong>Objective convergence:</strong> \\(g(\\beta^{(k)}) + h(z^{(k)}) \\to p^\\star\\).</li>
                            <li><strong>Dual convergence:</strong> \\(u^{(k)} \\to u^\\star\\).</li>
                        </ol>
                        <p>The convergence rate for the primal and dual residuals is \\(O(1/k)\\), though ADMM often converges much faster in practice.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition (When to use ADMM)</div>
                    <div class="env-body">
                        <p>ADMM is most useful when:</p>
                        <ul>
                            <li>The problem involves <strong>hard constraints</strong> (e.g., constrained Lasso \\(\\|\\beta\\|_1 \\leq t\\)).</li>
                            <li>You need to <strong>distribute</strong> computation across machines (each machine handles a subset of the data).</li>
                            <li>The subproblems (\\(\\beta\\)-update and \\(z\\)-update) have <strong>closed-form solutions</strong> or can be solved efficiently.</li>
                            <li>Moderate accuracy suffices — ADMM reaches moderate accuracy quickly but high accuracy slowly.</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 10.15 (Consensus ADMM for Distributed Lasso)</div>
                    <div class="env-body">
                        <p>Suppose data is split across \\(K\\) machines. The Lasso can be written as a consensus problem:</p>
                        \\[\\min \\sum_{k=1}^K \\frac{1}{2n_k}\\|y_k - X_k \\beta_k\\|^2 + \\lambda\\|z\\|_1 \\quad \\text{s.t.} \\quad \\beta_k = z \\; \\forall k\\]
                        <p>Each machine solves a local ridge regression (\\(\\beta_k\\)-update) in parallel, then a central node performs soft-thresholding on the average (\\(z\\)-update). Communication is limited to exchanging \\(p\\)-dimensional vectors.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: '<p>Consider the <strong>constrained</strong> Lasso formulation: \\(\\min_\\beta \\frac{1}{2n}\\|y - X\\beta\\|^2\\) subject to \\(\\|\\beta\\|_1 \\leq t\\). Show how to solve this via ADMM by introducing \\(z = \\beta\\) and using the indicator function \\(I_{\\{\\|z\\|_1 \\leq t\\}}\\). What is the \\(z\\)-update?</p>',
                    hint: 'The \\(z\\)-update requires computing the proximal operator of the indicator function of the \\(\\ell_1\\)-ball, which is the Euclidean projection onto the \\(\\ell_1\\)-ball. This can be done efficiently in \\(O(p \\log p)\\) time.',
                    solution: '<p>Reformulate as: \\(\\min_{\\beta, z} \\frac{1}{2n}\\|y - X\\beta\\|^2 + I_{\\{\\|z\\|_1 \\leq t\\}}(z)\\) subject to \\(\\beta = z\\).</p><p>The \\(\\beta\\)-update is the same ridge regression as before. The \\(z\\)-update is:</p>\\[z^{(k+1)} = \\arg\\min_z I_{\\{\\|z\\|_1 \\leq t\\}}(z) + \\frac{\\rho}{2}\\|\\beta^{(k+1)} - z + u^{(k)}\\|^2 = \\Pi_{\\{\\|z\\|_1 \\leq t\\}}\\left(\\beta^{(k+1)} + u^{(k)}\\right)\\]<p>This is the <strong>projection onto the \\(\\ell_1\\)-ball</strong> of radius \\(t\\). The algorithm: sort \\(|w_j|\\) in decreasing order, find the right threshold \\(\\theta\\) such that \\(\\sum_j (|w_j| - \\theta)_+ = t\\), then set \\(z_j = \\text{sign}(w_j)(|w_j| - \\theta)_+\\). This costs \\(O(p\\log p)\\) for the sort.</p>'
                }
            ]
        },
        // ============================================================
        // SECTION 4: Regularization Path & Cross-Validation
        // ============================================================
        {
            id: 'ch10-sec04',
            title: 'Regularization Path & Cross-Validation',
            content: `
                <h2>Regularization Path and Cross-Validation</h2>

                <p>In practice, the Lasso is not solved at a single value of \\(\\lambda\\); rather, we compute solutions over a <strong>grid of \\(\\lambda\\) values</strong> and use cross-validation to select the best one. The efficiency of this process is crucial for practical deployment.</p>

                <h3>The Lasso Regularization Path</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.16 (Maximum \\(\\lambda\\))</div>
                    <div class="env-body">
                        <p>The Lasso solution satisfies \\(\\hat{\\beta}(\\lambda) = 0\\) if and only if:</p>
                        \\[\\lambda \\geq \\lambda_{\\max} := \\frac{1}{n}\\|X^\\top y\\|_\\infty = \\max_{j=1,\\ldots,p} \\left|\\frac{1}{n} X_j^\\top y\\right|\\]
                        <p>This is the smallest \\(\\lambda\\) for which all coefficients are zero.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>The KKT conditions for the Lasso at \\(\\hat{\\beta} = 0\\) require that \\(0 \\in -\\frac{1}{n}X^\\top y + \\lambda \\partial\\|0\\|_1\\). Since \\(\\partial\\|0\\|_1 = [-1, 1]^p\\), this holds iff \\(\\frac{1}{n}|X_j^\\top y| \\leq \\lambda\\) for all \\(j\\), i.e., \\(\\lambda \\geq \\frac{1}{n}\\|X^\\top y\\|_\\infty\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <h3>Pathwise Coordinate Descent</h3>

                <div class="env-block definition">
                    <div class="env-title">Algorithm 10.17 (Pathwise Coordinate Descent)</div>
                    <div class="env-body">
                        <p>The standard approach implemented in <code>glmnet</code>:</p>
                        <ol>
                            <li>Compute \\(\\lambda_{\\max} = \\frac{1}{n}\\|X^\\top y\\|_\\infty\\).</li>
                            <li>Create a geometric grid: \\(\\lambda_1 = \\lambda_{\\max}, \\lambda_2 = \\lambda_{\\max} \\cdot r, \\ldots, \\lambda_K = \\lambda_{\\min}\\), where \\(r = (\\lambda_{\\min}/\\lambda_{\\max})^{1/(K-1)}\\) and typically \\(\\lambda_{\\min} = \\varepsilon \\cdot \\lambda_{\\max}\\) with \\(\\varepsilon = 0.001\\).</li>
                            <li>For \\(k = 1, 2, \\ldots, K\\):</li>
                        </ol>
                        <ul>
                            <li><strong>Warm start:</strong> Initialize coordinate descent at \\(\\lambda_k\\) with the solution \\(\\hat{\\beta}(\\lambda_{k-1})\\).</li>
                            <li>Run coordinate descent to convergence.</li>
                        </ul>
                        <p>Warm starts dramatically reduce the number of iterations needed, since \\(\\hat{\\beta}(\\lambda_k)\\) and \\(\\hat{\\beta}(\\lambda_{k-1})\\) differ only slightly when the grid is fine.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Active Set Strategy)</div>
                    <div class="env-body">
                        <p>A further speedup: at each \\(\\lambda_k\\), first run coordinate descent only over the <strong>active set</strong> \\(\\mathcal{A} = \\{j : \\hat{\\beta}_j(\\lambda_{k-1}) \\neq 0\\}\\). Then check the KKT conditions for all variables. If any violated variable is found, add it to \\(\\mathcal{A}\\) and repeat. This avoids cycling over the \\(p - |\\mathcal{A}|\\) zero coefficients.</p>
                    </div>
                </div>

                <h3>Cross-Validation for \\(\\lambda\\) Selection</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 10.18 (K-Fold Cross-Validation for the Lasso)</div>
                    <div class="env-body">
                        <p>Partition the data into \\(K\\) folds (typically \\(K = 5\\) or \\(10\\)). For each \\(\\lambda\\) in the grid and each fold \\(k\\):</p>
                        <ol>
                            <li>Fit the Lasso on all data except fold \\(k\\): \\(\\hat{\\beta}^{(-k)}(\\lambda)\\).</li>
                            <li>Compute the prediction error on fold \\(k\\):</li>
                        </ol>
                        \\[\\text{CV}_k(\\lambda) = \\frac{1}{|\\mathcal{I}_k|} \\sum_{i \\in \\mathcal{I}_k} (y_i - x_i^\\top \\hat{\\beta}^{(-k)}(\\lambda))^2\\]
                        <p>The cross-validated error is the average: \\(\\text{CV}(\\lambda) = \\frac{1}{K}\\sum_{k=1}^K \\text{CV}_k(\\lambda)\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 10.19 (\\(\\lambda_{\\min}\\) and \\(\\lambda_{\\text{1se}}\\))</div>
                    <div class="env-body">
                        <p>Two common choices for the selected \\(\\lambda\\):</p>
                        <ul>
                            <li>\\(\\lambda_{\\min}\\): the \\(\\lambda\\) that minimizes the CV error: \\(\\lambda_{\\min} = \\arg\\min_\\lambda \\text{CV}(\\lambda)\\).</li>
                            <li>\\(\\lambda_{\\text{1se}}\\) (<strong>one-standard-error rule</strong>): the largest \\(\\lambda\\) whose CV error is within one standard error of the minimum:</li>
                        </ul>
                        \\[\\lambda_{\\text{1se}} = \\max\\left\\{\\lambda : \\text{CV}(\\lambda) \\leq \\text{CV}(\\lambda_{\\min}) + \\text{SE}(\\lambda_{\\min})\\right\\}\\]
                        <p>where \\(\\text{SE}(\\lambda) = \\sqrt{\\frac{1}{K(K-1)} \\sum_{k=1}^K (\\text{CV}_k(\\lambda) - \\text{CV}(\\lambda))^2}\\) is the standard error of the K-fold estimates.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition (One-Standard-Error Rule)</div>
                    <div class="env-body">
                        <p>The one-standard-error rule reflects the principle that, among models whose performance is statistically indistinguishable, we should prefer the <strong>simplest</strong> (most regularized). Since larger \\(\\lambda\\) means more sparsity, \\(\\lambda_{\\text{1se}} \\geq \\lambda_{\\min}\\), yielding a sparser model.</p>
                        <p>This is a form of Occam's razor: do not pay for model complexity unless the data clearly rewards it beyond the noise level of the CV estimate itself.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-cv-curve"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.20 (Oracle Inequality for CV-Selected Lasso)</div>
                    <div class="env-body">
                        <p>Under suitable conditions on the design matrix (e.g., restricted eigenvalue condition), the Lasso estimator with \\(\\lambda\\) selected by cross-validation satisfies:</p>
                        \\[\\frac{1}{n}\\|X\\hat{\\beta}(\\hat{\\lambda}_{\\text{CV}}) - X\\beta^\\star\\|_2^2 \\leq C \\min_\\lambda \\left\\{ \\frac{1}{n}\\|X\\hat{\\beta}(\\lambda) - X\\beta^\\star\\|_2^2 \\right\\} + \\text{lower-order terms}\\]
                        <p>That is, cross-validation is <strong>oracle-adaptive</strong>: it achieves (up to a constant) the prediction risk of the best \\(\\lambda\\) in hindsight.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Practical Guidelines)</div>
                    <div class="env-body">
                        <ul>
                            <li>Use \\(K = 10\\) folds as a default (or \\(K = 5\\) for large \\(n\\)).</li>
                            <li>Use \\(K = n\\) (leave-one-out) only for small \\(n\\); it has high variance.</li>
                            <li>Use <strong>stratified</strong> CV for classification to preserve class balance in each fold.</li>
                            <li>For time series, use <strong>rolling</strong> or <strong>expanding-window</strong> CV to respect temporal ordering.</li>
                            <li>The CV curve is typically U-shaped on the \\(\\log(\\lambda)\\) scale, with underfitting on the right (high \\(\\lambda\\)) and overfitting on the left (low \\(\\lambda\\)).</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-cv-curve',
                    title: 'Cross-Validation Curve for Lasso',
                    description: 'The CV error vs log(\\(\\lambda\\)) with error bars. The vertical lines mark \\(\\lambda_{\\min}\\) (blue) and \\(\\lambda_{\\text{1se}}\\) (orange).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 450, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var nLambda = 60;
                        var nFolds = 10;
                        var noiseLvl = 0.5;
                        var sparsity = 5;

                        VizEngine.createSlider(controls, 'Noise', 0.1, 2.0, noiseLvl, 0.1, function(v) {
                            noiseLvl = v;
                            regenerate();
                        });

                        VizEngine.createSlider(controls, 'Sparsity s', 1, 15, sparsity, 1, function(v) {
                            sparsity = Math.round(v);
                            regenerate();
                        });

                        VizEngine.createButton(controls, 'Resample', function() { regenerate(); });

                        var logLambdas = [];
                        var cvMeans = [];
                        var cvSEs = [];
                        var idxMin = 0;
                        var idx1SE = 0;

                        // Simple seeded pseudo-random
                        var seed = 42;
                        function rand() {
                            seed = (seed * 1103515245 + 12345) & 0x7fffffff;
                            return seed / 0x7fffffff;
                        }
                        function randn() {
                            var u = rand(), v = rand();
                            return Math.sqrt(-2 * Math.log(Math.max(u, 1e-10))) * Math.cos(2 * Math.PI * v);
                        }

                        function regenerate() {
                            seed = Math.floor(Math.random() * 100000);
                            logLambdas = [];
                            cvMeans = [];
                            cvSEs = [];

                            // Simulate a realistic CV curve
                            // True model: s sparse coefficients
                            // CV error = bias^2 + variance, bias increases with lambda, variance decreases
                            var logLamMax = 1;
                            var logLamMin = -4;

                            for (var i = 0; i < nLambda; i++) {
                                var ll = logLamMax - (logLamMax - logLamMin) * i / (nLambda - 1);
                                logLambdas.push(ll);

                                var lam = Math.pow(10, ll);
                                // Bias^2 term: increases with lambda
                                var bias2 = sparsity * Math.min(lam * lam * 4, 3);
                                // Variance term: increases as lambda decreases (more variables)
                                var numActive = Math.min(sparsity + Math.max(0, Math.round((-ll - 0.5) * 3)), 30);
                                var variance = noiseLvl * noiseLvl * (1 + numActive * 0.08);
                                // Irreducible noise
                                var irreducible = noiseLvl * noiseLvl;

                                var meanErr = irreducible + bias2 + variance + 0.05 * randn();
                                meanErr = Math.max(meanErr, 0.01);
                                var se = Math.sqrt(variance / nFolds) * (0.8 + 0.4 * rand());
                                se = Math.max(se, 0.02);

                                cvMeans.push(meanErr);
                                cvSEs.push(se);
                            }

                            // Find lambda_min
                            var minVal = Infinity;
                            idxMin = 0;
                            for (var i = 0; i < nLambda; i++) {
                                if (cvMeans[i] < minVal) {
                                    minVal = cvMeans[i];
                                    idxMin = i;
                                }
                            }

                            // Find lambda_1se: largest lambda with CV <= CV_min + SE_min
                            var threshold = cvMeans[idxMin] + cvSEs[idxMin];
                            idx1SE = 0;
                            for (var i = 0; i < nLambda; i++) {
                                if (cvMeans[i] <= threshold) {
                                    idx1SE = i;
                                    break;
                                }
                            }
                        }

                        regenerate();

                        function draw() {
                            viz.clear();

                            var plotLeft = 75;
                            var plotRight = viz.width - 30;
                            var plotTop = 45;
                            var plotBottom = viz.height - 55;
                            var plotW = plotRight - plotLeft;
                            var plotH = plotBottom - plotTop;

                            // Compute scales
                            var xMin = logLambdas[logLambdas.length - 1] - 0.2;
                            var xMax = logLambdas[0] + 0.2;
                            var yMin = 0;
                            var yMax = 0;
                            for (var i = 0; i < nLambda; i++) {
                                yMax = Math.max(yMax, cvMeans[i] + cvSEs[i]);
                            }
                            yMax *= 1.15;

                            function toX(ll) { return plotLeft + (ll - xMin) / (xMax - xMin) * plotW; }
                            function toY(v) { return plotBottom - (v - yMin) / (yMax - yMin) * plotH; }

                            // Draw axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(plotLeft, plotTop);
                            ctx.lineTo(plotLeft, plotBottom);
                            ctx.lineTo(plotRight, plotBottom);
                            ctx.stroke();

                            // X-axis labels
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = viz.colors.text;
                            for (var ll = Math.ceil(xMin); ll <= Math.floor(xMax); ll++) {
                                var xx = toX(ll);
                                ctx.strokeStyle = 'rgba(74,74,122,0.2)';
                                ctx.beginPath(); ctx.moveTo(xx, plotTop); ctx.lineTo(xx, plotBottom); ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(ll, xx, plotBottom + 6);
                            }

                            // Y-axis labels
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            var yStep = Math.pow(10, Math.floor(Math.log10(yMax / 4)));
                            if (yMax / yStep > 8) yStep *= 2;
                            for (var yv = 0; yv <= yMax; yv += yStep) {
                                var yy = toY(yv);
                                if (yy < plotTop || yy > plotBottom) continue;
                                ctx.strokeStyle = 'rgba(74,74,122,0.2)';
                                ctx.beginPath(); ctx.moveTo(plotLeft, yy); ctx.lineTo(plotRight, yy); ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(yv.toFixed(2), plotLeft - 6, yy);
                            }

                            // Error bars
                            for (var i = 0; i < nLambda; i++) {
                                var xx = toX(logLambdas[i]);
                                var yUp = toY(cvMeans[i] + cvSEs[i]);
                                var yDown = toY(Math.max(cvMeans[i] - cvSEs[i], 0));
                                ctx.strokeStyle = 'rgba(200,200,220,0.25)';
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(xx, yUp); ctx.lineTo(xx, yDown); ctx.stroke();
                                // Caps
                                ctx.beginPath(); ctx.moveTo(xx - 2, yUp); ctx.lineTo(xx + 2, yUp); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(xx - 2, yDown); ctx.lineTo(xx + 2, yDown); ctx.stroke();
                            }

                            // CV curve
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = 0; i < nLambda; i++) {
                                var xx = toX(logLambdas[i]);
                                var yy = toY(cvMeans[i]);
                                if (i === 0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
                            }
                            ctx.stroke();

                            // Points on CV curve
                            for (var i = 0; i < nLambda; i++) {
                                var xx = toX(logLambdas[i]);
                                var yy = toY(cvMeans[i]);
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath(); ctx.arc(xx, yy, 2.5, 0, Math.PI * 2); ctx.fill();
                            }

                            // lambda_min vertical line
                            var xMin_ = toX(logLambdas[idxMin]);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([6, 3]);
                            ctx.beginPath(); ctx.moveTo(xMin_, plotTop); ctx.lineTo(xMin_, plotBottom); ctx.stroke();
                            ctx.setLineDash([]);

                            // lambda_1se vertical line
                            var x1SE = toX(logLambdas[idx1SE]);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([6, 3]);
                            ctx.beginPath(); ctx.moveTo(x1SE, plotTop); ctx.lineTo(x1SE, plotBottom); ctx.stroke();
                            ctx.setLineDash([]);

                            // 1-SE threshold line
                            var threshY = toY(cvMeans[idxMin] + cvSEs[idxMin]);
                            ctx.strokeStyle = 'rgba(240,136,62,0.35)';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(plotLeft, threshY); ctx.lineTo(plotRight, threshY); ctx.stroke();
                            ctx.setLineDash([]);

                            // Highlight the min and 1se points
                            var xxMin = toX(logLambdas[idxMin]);
                            var yyMin = toY(cvMeans[idxMin]);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(xxMin, yyMin, 6, 0, Math.PI * 2); ctx.fill();

                            var xx1SE = toX(logLambdas[idx1SE]);
                            var yy1SE = toY(cvMeans[idx1SE]);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(xx1SE, yy1SE, 6, 0, Math.PI * 2); ctx.fill();

                            // Labels
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('Cross-Validation Curve', viz.width / 2, 18);

                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.white;
                            ctx.textAlign = 'center';
                            ctx.fillText('log\u2081\u2080(\u03bb)', (plotLeft + plotRight) / 2, plotBottom + 32);
                            ctx.save();
                            ctx.translate(16, (plotTop + plotBottom) / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('CV Error', 0, 0);
                            ctx.restore();

                            // Legend
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('\u03bb_min = 10^{' + logLambdas[idxMin].toFixed(1) + '}', xxMin + 10, plotTop + 14);
                            ctx.fillStyle = viz.colors.orange;
                            var lbl1se = '\u03bb_1se = 10^{' + logLambdas[idx1SE].toFixed(1) + '}';
                            ctx.fillText(lbl1se, xx1SE + 10, plotTop + 32);

                            // Region annotations
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = 'rgba(248,81,73,0.5)';
                            ctx.fillText('Overfitting \u2190', plotLeft + 50, plotTop + 14);
                            ctx.fillStyle = 'rgba(63,185,160,0.5)';
                            ctx.fillText('\u2192 Underfitting', plotRight - 55, plotTop + 14);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: []
        },
        // ============================================================
        // SECTION 5: Bayesian Sparse Estimation
        // ============================================================
        {
            id: 'ch10-sec05',
            title: 'Bayesian Sparse Estimation',
            content: `
                <h2>Bayesian Sparse Estimation</h2>

                <p>The frequentist Lasso has deep connections to Bayesian estimation. In the Bayesian framework, the regularization parameter and the sparsity structure emerge naturally from the choice of <strong>prior distribution</strong> on the coefficient vector \\(\\beta\\).</p>

                <h3>Bayesian Lasso</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 10.21 (Bayesian Lasso)</div>
                    <div class="env-body">
                        <p>The <strong>Bayesian Lasso</strong> places independent Laplace (double-exponential) priors on each coefficient:</p>
                        \\[\\beta_j \\mid \\lambda \\overset{\\text{iid}}{\\sim} \\text{Laplace}(\\lambda) = \\frac{\\lambda}{2} e^{-\\lambda|\\beta_j|}, \\quad j = 1, \\ldots, p\\]
                        <p>Combined with the Gaussian likelihood \\(y \\mid \\beta, \\sigma^2 \\sim N(X\\beta, \\sigma^2 I_n)\\), the <strong>posterior mode</strong> (MAP estimator) is:</p>
                        \\[\\hat{\\beta}^{\\text{MAP}} = \\arg\\max_\\beta \\left\\{ -\\frac{1}{2\\sigma^2}\\|y - X\\beta\\|^2 - \\lambda\\|\\beta\\|_1 \\right\\} = \\hat{\\beta}^{\\text{Lasso}}\\left(\\frac{\\lambda\\sigma^2}{n}\\right)\\]
                        <p>The Lasso is therefore the MAP estimator under a Laplace prior.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>While the Lasso solution equals the posterior mode, it does <strong>not</strong> equal the posterior mean \\(\\mathbb{E}[\\beta \\mid y]\\) under the Laplace prior. The posterior mean does not set any coefficients to exactly zero — it only shrinks them. This highlights a key difference: the Lasso's sparsity is a property of the mode, not of the full posterior.</p>
                    </div>
                </div>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 10.22 (Laplace as Scale Mixture of Normals)</div>
                    <div class="env-body">
                        <p>The Laplace distribution can be represented as a scale mixture of Gaussians:</p>
                        \\[\\beta_j \\mid \\tau_j^2 \\sim N(0, \\tau_j^2), \\qquad \\tau_j^2 \\sim \\text{Exponential}\\left(\\frac{\\lambda^2}{2}\\right)\\]
                        <p>Marginalizing over \\(\\tau_j^2\\) recovers the Laplace distribution. This representation enables efficient Gibbs sampling for the Bayesian Lasso.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>We verify by computing the marginal density of \\(\\beta_j\\):</p>
                        \\[p(\\beta_j) = \\int_0^\\infty \\frac{1}{\\sqrt{2\\pi \\tau^2}} e^{-\\beta_j^2/(2\\tau^2)} \\cdot \\frac{\\lambda^2}{2} e^{-\\lambda^2\\tau^2/2} \\, d\\tau^2\\]
                        <p>Substituting \\(u = 1/\\tau^2\\) and recognizing an inverse Gaussian integral, or completing the square in \\(\\tau^2\\), one obtains:</p>
                        \\[p(\\beta_j) = \\frac{\\lambda}{2} e^{-\\lambda|\\beta_j|}\\]
                        <p>which is the Laplace density.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <h3>Spike-and-Slab Prior</h3>

                <p>A more direct Bayesian approach to sparsity uses a <strong>two-component mixture</strong> that explicitly models the event "\\(\\beta_j = 0\\)" versus "\\(\\beta_j \\neq 0\\)."</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 10.23 (Spike-and-Slab Prior)</div>
                    <div class="env-body">
                        <p>The <strong>spike-and-slab</strong> prior on \\(\\beta_j\\) is:</p>
                        \\[\\beta_j \\mid \\gamma_j \\sim (1 - \\gamma_j) \\cdot \\delta_0 + \\gamma_j \\cdot N(0, \\sigma_\\beta^2)\\]
                        \\[\\gamma_j \\sim \\text{Bernoulli}(\\pi)\\]
                        <p>where:</p>
                        <ul>
                            <li>\\(\\gamma_j \\in \\{0, 1\\}\\) is the <strong>inclusion indicator</strong> for variable \\(j\\).</li>
                            <li>\\(\\delta_0\\) is a point mass at zero (the "spike").</li>
                            <li>\\(N(0, \\sigma_\\beta^2)\\) is a diffuse Gaussian (the "slab").</li>
                            <li>\\(\\pi \\in (0, 1)\\) is the prior inclusion probability.</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The spike-and-slab prior directly encodes the belief that most coefficients are exactly zero (with probability \\(1 - \\pi\\)), and those that are nonzero are drawn from a wide distribution. Setting \\(\\pi = s/p\\) encodes the belief that about \\(s\\) out of \\(p\\) variables are relevant.</p>
                        <p>The posterior inclusion probability \\(\\mathbb{P}(\\gamma_j = 1 \\mid y)\\) provides a natural measure of variable importance, and can be used for variable selection by thresholding at 0.5 (the <strong>median probability model</strong>).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.24 (Posterior Inclusion Probabilities)</div>
                    <div class="env-body">
                        <p>For the spike-and-slab prior with orthogonal design \\(X^\\top X = nI\\), the posterior inclusion probability of variable \\(j\\) is:</p>
                        \\[\\mathbb{P}(\\gamma_j = 1 \\mid y) = \\frac{1}{1 + \\text{BF}_j^{-1} \\cdot \\frac{1-\\pi}{\\pi}}\\]
                        <p>where \\(\\text{BF}_j\\) is the Bayes factor comparing the "slab" model to the "spike" model for variable \\(j\\):</p>
                        \\[\\text{BF}_j = \\frac{p(y \\mid \\gamma_j = 1)}{p(y \\mid \\gamma_j = 0)} = \\left(1 + \\frac{n\\sigma_\\beta^2}{\\sigma^2}\\right)^{-1/2} \\exp\\left(\\frac{n^2\\sigma_\\beta^2 \\hat{\\beta}_j^{\\text{OLS}\\,2}}{2\\sigma^2(\\sigma^2 + n\\sigma_\\beta^2)}\\right)\\]
                    </div>
                </div>

                <h3>Comparison: Bayesian vs Frequentist Sparsity</h3>

                <div class="env-block remark">
                    <div class="env-title">Remark (Bayesian vs Frequentist)</div>
                    <div class="env-body">
                        <p>The three approaches to sparse estimation differ in fundamental ways:</p>
                        <ul>
                            <li><strong>Lasso (Frequentist):</strong> \\(\\ell_1\\) penalization yields a point estimate that is exactly sparse. No uncertainty quantification without additional procedures (e.g., debiasing).</li>
                            <li><strong>Bayesian Lasso:</strong> The Laplace prior yields a full posterior distribution but does <em>not</em> produce exact zeros in the posterior mean. Computational tools: Gibbs sampler via the scale-mixture representation.</li>
                            <li><strong>Spike-and-Slab:</strong> The "gold standard" for Bayesian variable selection. Produces posterior inclusion probabilities. Computationally expensive: requires MCMC over the model space \\(\\{0,1\\}^p\\), which is exponential in \\(p\\).</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 10.25 (Continuous Spike-and-Slab)</div>
                    <div class="env-body">
                        <p>To avoid the computational burden of discrete model indicators, the <strong>continuous spike-and-slab</strong> replaces the point mass with a narrow Gaussian:</p>
                        \\[\\beta_j \\mid \\gamma_j \\sim (1 - \\gamma_j) \\cdot N(0, v_0^2) + \\gamma_j \\cdot N(0, v_1^2)\\]
                        <p>where \\(v_0 \\ll v_1\\). The "spike" \\(N(0, v_0^2)\\) concentrates mass near zero (but does not place a point mass there), while the "slab" \\(N(0, v_1^2)\\) allows large values.</p>
                        <p>This formulation enables fully continuous posterior sampling and is implemented in methods like the <strong>Expectation-Maximization Variable Selection (EMVS)</strong> algorithm.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.26 (Posterior Contraction for Spike-and-Slab)</div>
                    <div class="env-body">
                        <p>Under the spike-and-slab prior with \\(\\pi = s/p\\), the posterior contracts at the minimax-optimal rate for \\(s\\)-sparse estimation:</p>
                        \\[\\mathbb{E}\\left[\\|\\beta - \\beta^\\star\\|_2^2 \\mid y\\right] = O_P\\left(s \\log(p/s) \\cdot \\frac{\\sigma^2}{n}\\right)\\]
                        <p>This matches the minimax rate \\(s \\log(p/s)/n\\) without requiring any conditions on the design matrix beyond bounded eigenvalues. In this sense, the spike-and-slab prior achieves <strong>automatic adaptation</strong> to the unknown sparsity level.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Computational Frontiers)</div>
                    <div class="env-body">
                        <p>The computational challenge for spike-and-slab priors in high dimensions has motivated several algorithmic advances:</p>
                        <ul>
                            <li><strong>Shotgun stochastic search:</strong> randomized search over promising models.</li>
                            <li><strong>Variational Bayes:</strong> approximate the posterior \\(p(\\beta, \\gamma \\mid y)\\) with a factorized distribution \\(q(\\beta)q(\\gamma)\\), enabling fast optimization-based inference.</li>
                            <li><strong>Scalable MCMC:</strong> skinny Gibbs, Hamiltonian Monte Carlo for the continuous components.</li>
                        </ul>
                        <p>For \\(p\\) in the thousands, full spike-and-slab MCMC is feasible; for \\(p \\gg 10^4\\), variational or penalization-based methods remain dominant.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: '<p>Show that the <strong>ridge regression</strong> estimator \\(\\hat{\\beta}^{\\text{ridge}} = (X^\\top X + n\\lambda I)^{-1}X^\\top y\\) is the posterior mean (equivalently, the MAP estimate) under the prior \\(\\beta \\sim N(0, \\frac{\\sigma^2}{n\\lambda}I)\\) with Gaussian likelihood. What prior yields the Elastic Net as the MAP?</p>',
                    hint: 'For ridge: write out the log-posterior and verify it matches the ridge objective. For Elastic Net: the MAP of a Laplace-Gaussian product prior corresponds to \\(\\ell_1 + \\ell_2\\) penalization.',
                    solution: '<p><strong>Ridge:</strong> The log-posterior is:</p>\\[\\log p(\\beta \\mid y) \\propto -\\frac{1}{2\\sigma^2}\\|y - X\\beta\\|^2 - \\frac{n\\lambda}{2\\sigma^2}\\|\\beta\\|_2^2\\]<p>Maximizing is equivalent to minimizing \\(\\frac{1}{2n}\\|y - X\\beta\\|^2 + \\frac{\\lambda}{2}\\|\\beta\\|^2\\), which is the ridge objective. Since the log-posterior is quadratic, the MAP equals the posterior mean: \\(\\hat{\\beta}^{\\text{ridge}} = (X^\\top X + n\\lambda I)^{-1} X^\\top y\\).</p><p><strong>Elastic Net:</strong> The prior is a product of independent Laplace and Gaussian factors:</p>\\[p(\\beta_j) \\propto \\exp(-\\lambda_1|\\beta_j|) \\cdot \\exp(-\\lambda_2 \\beta_j^2/2)\\]<p>The log-posterior gives \\(-\\frac{1}{2\\sigma^2}\\|y - X\\beta\\|^2 - \\lambda_1\\|\\beta\\|_1 - \\frac{\\lambda_2}{2}\\|\\beta\\|_2^2\\), whose negative is the Elastic Net objective (up to scaling).</p>'
                }
            ]
        }
    ]
});
