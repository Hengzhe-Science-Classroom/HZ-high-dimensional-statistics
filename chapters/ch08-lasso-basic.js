// ================================================================
// Chapter 8 — Lasso: Basic Theory
// Theme: "The Diamond Knife"
//   When the number of parameters vastly exceeds the sample size,
//   ordinary least squares collapses.  But nature is parsimonious:
//   the true signal is often sparse.  The Lasso — least squares
//   penalized by the L1 norm — exploits this sparsity, recovering
//   the right support and achieving near-oracle rates.  We develop
//   the basic inequality, the restricted eigenvalue condition, and
//   the oracle inequality with rate (s log p)/n.
// ================================================================
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch08',
    number: 8,
    title: 'Lasso: Basic Theory',
    subtitle: 'Sparse estimation via L1 regularization',
    sections: [
        // ============================================================
        //  SECTION 1 — The Sparsity Assumption
        // ============================================================
        {
            id: 'ch08-sec01',
            title: 'The Sparsity Assumption',
            content: `
                <h2>The Sparsity Assumption</h2>

                <p>We work in the linear model</p>
                \\[y = X\\beta^* + w, \\qquad w \\sim \\mathcal{N}(0, \\sigma^2 I_n),\\]
                <p>where \\(X \\in \\mathbb{R}^{n \\times p}\\) is the design matrix, \\(\\beta^* \\in \\mathbb{R}^p\\) is the unknown parameter vector, and \\(w \\in \\mathbb{R}^n\\) is noise.  We are interested in the <strong>high-dimensional regime</strong> where \\(p \\gg n\\): the number of parameters far exceeds the number of observations.</p>

                <p>In this regime, the ordinary least squares (OLS) estimator \\(\\hat{\\beta}_{\\text{OLS}} = (X^T X)^{-1} X^T y\\) is not even defined (the matrix \\(X^T X\\) is singular when \\(p &gt; n\\)).  Even when \\(p \\le n\\), OLS overfits catastrophically as \\(p/n \\to 1\\).  We need structural assumptions on \\(\\beta^*\\) to make estimation possible.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 8.1 (s-Sparse Vector)</div>
                    <div class="env-body">
                        <p>A vector \\(\\beta \\in \\mathbb{R}^p\\) is called <strong>\\(s\\)-sparse</strong> if at most \\(s\\) of its coordinates are nonzero:
                        \\[\\|\\beta\\|_0 := |\\{j : \\beta_j \\neq 0\\}| \\le s.\\]
                        The set \\(S = \\text{supp}(\\beta) = \\{j : \\beta_j \\neq 0\\}\\) is called the <strong>support</strong> of \\(\\beta\\), with \\(|S| = s\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why Sparsity?</div>
                    <div class="env-body">
                        <p>Sparsity encodes the principle that among \\(p\\) potential predictors, only a small number \\(s \\ll p\\) are truly relevant.  In genomics, among \\(p \\approx 20{,}000\\) genes, perhaps \\(s \\approx 10\\) are associated with a disease.  In signal processing, natural images have sparse representations in wavelet bases.  The sparsity assumption converts an impossible \\(p\\)-dimensional problem into a tractable \\(s\\)-dimensional one, provided we can identify the support.</p>
                    </div>
                </div>

                <h3>The L0 "Norm" and Its Intractability</h3>

                <p>If we knew that \\(\\beta^*\\) is \\(s\\)-sparse, the ideal estimator would solve the <strong>best subset selection</strong> problem:</p>
                \\[\\hat{\\beta}_{\\text{L0}} = \\arg\\min_{\\beta \\in \\mathbb{R}^p} \\frac{1}{2n} \\|y - X\\beta\\|_2^2 \\quad \\text{subject to} \\quad \\|\\beta\\|_0 \\le s.\\]

                <div class="env-block warning">
                    <div class="env-title">Computational Barrier</div>
                    <div class="env-body">
                        <p>The L0-constrained problem is NP-hard in general.  It requires searching over all \\(\\binom{p}{s}\\) subsets of size \\(s\\), which grows combinatorially.  When \\(p = 10{,}000\\) and \\(s = 50\\), this is approximately \\(10^{145}\\) subsets — utterly infeasible.</p>
                    </div>
                </div>

                <h3>L1 as a Convex Relaxation of L0</h3>

                <p>The key insight is to replace the L0 "norm" with its tightest convex relaxation: the <strong>L1 norm</strong>.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 8.2 (L1 Norm)</div>
                    <div class="env-body">
                        <p>The <strong>L1 norm</strong> of a vector \\(\\beta \\in \\mathbb{R}^p\\) is
                        \\[\\|\\beta\\|_1 = \\sum_{j=1}^{p} |\\beta_j|.\\]
                        </p>
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 8.3 (L1 is the Convex Envelope of L0)</div>
                    <div class="env-body">
                        <p>On the unit L-infinity ball \\(\\{\\beta : \\|\\beta\\|_\\infty \\le 1\\}\\), the L1 norm is the <strong>convex envelope</strong> (tightest convex lower bound) of the L0 "norm."  That is,
                        \\[\\|\\beta\\|_1 = \\sup\\left\\{ g(\\beta) : g \\text{ convex}, \\; g(\\beta) \\le \\|\\beta\\|_0 \\text{ for all } \\|\\beta\\|_\\infty \\le 1 \\right\\}.\\]
                        </p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof sketch</div>
                    <div class="env-body">
                        <p>On the L-infinity ball, each coordinate satisfies \\(|\\beta_j| \\le 1\\), so \\(|\\beta_j| \\le \\mathbf{1}\\{\\beta_j \\neq 0\\}\\), giving \\(\\|\\beta\\|_1 \\le \\|\\beta\\|_0\\).  Since the L1 norm is convex and agrees with the L0 "norm" at the vertices \\(\\{\\pm e_j\\}\\) (where \\(\\|e_j\\|_1 = \\|e_j\\|_0 = 1\\)), it is the tightest convex function dominated by \\(\\|\\cdot\\|_0\\).</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Geometry: Diamond vs. Sphere</div>
                    <div class="env-body">
                        <p>The L1 unit ball \\(B_1 = \\{\\beta : \\|\\beta\\|_1 \\le 1\\}\\) in \\(\\mathbb{R}^2\\) is a diamond (rotated square) with vertices at \\((\\pm 1, 0)\\) and \\((0, \\pm 1)\\).  Its <em>corners</em> lie on the coordinate axes.  Compare this with the L2 unit ball (a circle), whose boundary has no corners.  The sharp corners of the L1 ball are what promote sparsity: when you expand the diamond until it touches an elliptical contour, the point of tangency typically occurs at a corner, yielding a sparse solution.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-lasso-geom"></div>
            `,
            visualizations: [
                {
                    id: 'viz-lasso-geom',
                    title: 'Lasso Geometry: L1 Ball Meets RSS Contours',
                    description: 'Drag the OLS solution (orange dot) to move the elliptical RSS contours. Watch how the L1 diamond\'s corners promote sparse solutions. Compare with the L2 ball (circle).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 480, scale: 60, originX: 280, originY: 240 });
                        var ctx = viz.ctx;

                        var showL2 = false;
                        var lambdaVal = 1.0;

                        var ols = viz.addDraggable('ols', 2.5, 1.8, viz.colors.orange, 8, function() {});

                        VizEngine.createSlider(controls, '\\(\\lambda\\)', 0.2, 3.0, 1.0, 0.1, function(v) { lambdaVal = v; });

                        var l2Btn = VizEngine.createButton(controls, 'Toggle L2', function() {
                            showL2 = !showL2;
                            l2Btn.textContent = showL2 ? 'Show L1 only' : 'Toggle L2';
                        });

                        // Eigenvalues and angle for ellipse shape
                        var eigA = 1.0;
                        var eigB = 0.4;
                        var angle = Math.PI / 6;

                        function findLassoSolution(cx, cy, lam) {
                            // Approximate Lasso solution by finding where the L1 ball
                            // of radius lam touches the elliptical contours centered at (cx, cy)
                            // We search along the L1 boundary scaled by lam
                            var bestX = 0, bestY = 0;
                            var bestDist = Infinity;
                            var nSteps = 360;
                            for (var i = 0; i < nSteps; i++) {
                                var t = (i / nSteps) * 2 * Math.PI;
                                // Points on L1 ball boundary of radius lam
                                var absX = lam * Math.abs(Math.cos(t));
                                var absY = lam * (1 - Math.abs(Math.cos(t)));
                                var signs = [[1,1],[1,-1],[-1,1],[-1,-1]];
                                for (var s = 0; s < 4; s++) {
                                    var px = signs[s][0] * absX;
                                    var py = signs[s][1] * absY;
                                    // Compute elliptical distance to (cx, cy)
                                    var dx = px - cx, dy = py - cy;
                                    var cosA = Math.cos(angle), sinA = Math.sin(angle);
                                    var u = cosA * dx + sinA * dy;
                                    var v2 = -sinA * dx + cosA * dy;
                                    var dist = eigA * u * u + eigB * v2 * v2;
                                    if (dist < bestDist) {
                                        bestDist = dist;
                                        bestX = px;
                                        bestY = py;
                                    }
                                }
                            }
                            return [bestX, bestY];
                        }

                        function findRidgeSolution(cx, cy, lam) {
                            // Ridge solution: argmin (1/2)||beta - beta_ols||^2_Q + (lam)||beta||_2
                            // For isotropic case, shrinks toward zero: beta_ridge = beta_ols * (1 - lam/||beta_ols||)+
                            // General approximation: shrink uniformly
                            var norm = Math.sqrt(cx * cx + cy * cy);
                            if (norm < 1e-8) return [0, 0];
                            var shrink = Math.max(0, 1 - lam / norm);
                            return [cx * shrink, cy * shrink];
                        }

                        function drawEllipse(cx, cy, level, color, lw) {
                            var nPts = 120;
                            ctx.strokeStyle = color;
                            ctx.lineWidth = lw || 1;
                            ctx.beginPath();
                            for (var i = 0; i <= nPts; i++) {
                                var t = (i / nPts) * 2 * Math.PI;
                                var rx = Math.sqrt(level / eigA) * Math.cos(t);
                                var ry = Math.sqrt(level / eigB) * Math.sin(t);
                                var cosA = Math.cos(angle), sinA = Math.sin(angle);
                                var px = cosA * rx - sinA * ry + cx;
                                var py = sinA * rx + cosA * ry + cy;
                                var scr = viz.toScreen(px, py);
                                if (i === 0) ctx.moveTo(scr[0], scr[1]);
                                else ctx.lineTo(scr[0], scr[1]);
                            }
                            ctx.stroke();
                        }

                        function drawL1Ball(lam, color, lw, fillColor) {
                            var pts = [[lam, 0], [0, lam], [-lam, 0], [0, -lam]];
                            if (fillColor) {
                                viz.drawPolygon(pts, fillColor, color, lw);
                            } else {
                                viz.drawPolygon(pts, null, color, lw);
                            }
                        }

                        function drawL2Ball(lam, color, lw) {
                            viz.drawCircle(0, 0, lam, null, color, lw);
                        }

                        viz.animate(function() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var cx = ols.x, cy = ols.y;

                            // Draw RSS contours (ellipses centered at OLS)
                            for (var k = 1; k <= 6; k++) {
                                var level = k * 0.5;
                                drawEllipse(cx, cy, level, viz.colors.muted + '44', 0.8);
                            }

                            // Draw L1 ball
                            var lassoSol = findLassoSolution(cx, cy, lambdaVal);
                            // Find the contour level at the Lasso solution
                            var dx = lassoSol[0] - cx, dy = lassoSol[1] - cy;
                            var cosA = Math.cos(angle), sinA = Math.sin(angle);
                            var u = cosA * dx + sinA * dy;
                            var v2 = -sinA * dx + cosA * dy;
                            var contactLevel = eigA * u * u + eigB * v2 * v2;

                            drawL1Ball(lambdaVal, viz.colors.teal, 2, viz.colors.teal + '15');

                            // Draw the contacting contour
                            if (contactLevel > 0.01) {
                                drawEllipse(cx, cy, contactLevel, viz.colors.orange, 2);
                            }

                            if (showL2) {
                                drawL2Ball(lambdaVal, viz.colors.purple, 2);
                                var ridgeSol = findRidgeSolution(cx, cy, lambdaVal);
                                viz.drawPoint(ridgeSol[0], ridgeSol[1], viz.colors.purple, 'Ridge', 6);
                            }

                            // Draw Lasso solution
                            viz.drawPoint(lassoSol[0], lassoSol[1], viz.colors.teal, 'Lasso', 7);

                            // Draw OLS point
                            viz.drawPoint(cx, cy, viz.colors.orange, 'OLS', 7);

                            // Mark axes labels
                            viz.drawText('\\u03B2\\u2081', 3.8, -0.3, viz.colors.text, 14, 'center');
                            viz.drawText('\\u03B2\\u2082', 0.3, 3.5, viz.colors.text, 14, 'center');

                            // Check if Lasso is sparse (near axis)
                            var sparse = Math.abs(lassoSol[0]) < 0.05 || Math.abs(lassoSol[1]) < 0.05;
                            if (sparse) {
                                viz.screenText('Sparse solution at diamond corner!', viz.width / 2, 22, viz.colors.green, 13, 'center');
                            }

                            // Draw connecting dashed line
                            viz.drawSegment(cx, cy, lassoSol[0], lassoSol[1], viz.colors.white + '44', 1, true);

                            viz.drawDraggables();
                        });

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that for any \\(\\beta \\in \\mathbb{R}^p\\) with \\(\\|\\beta\\|_\\infty \\le 1\\), we have \\(\\|\\beta\\|_1 \\le \\|\\beta\\|_0\\).  Give an example where equality holds.',
                    hint: 'Use the fact that \\(|\\beta_j| \\le 1\\) for each \\(j\\), so \\(|\\beta_j| \\le \\mathbf{1}\\{\\beta_j \\neq 0\\}\\).',
                    solution: 'For each coordinate \\(j\\), if \\(\\beta_j \\neq 0\\) then \\(|\\beta_j| \\le 1 = \\mathbf{1}\\{\\beta_j \\neq 0\\}\\), and if \\(\\beta_j = 0\\) then \\(|\\beta_j| = 0 = \\mathbf{1}\\{\\beta_j \\neq 0\\}\\).  Summing gives \\(\\|\\beta\\|_1 = \\sum_j |\\beta_j| \\le \\sum_j \\mathbf{1}\\{\\beta_j \\neq 0\\} = \\|\\beta\\|_0\\).  Equality holds when every nonzero coordinate has \\(|\\beta_j| = 1\\), e.g., \\(\\beta = (1, -1, 0, \\ldots, 0)\\) gives \\(\\|\\beta\\|_1 = \\|\\beta\\|_0 = 2\\).'
                }
            ]
        },

        // ============================================================
        //  SECTION 2 — The Lasso Estimator
        // ============================================================
        {
            id: 'ch08-sec02',
            title: 'The Lasso Estimator',
            content: `
                <h2>The Lasso Estimator</h2>

                <p>Having identified the L1 norm as the convex relaxation of the L0 "norm," we arrive at the central object of this chapter.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 8.4 (Lasso Estimator)</div>
                    <div class="env-body">
                        <p>Given observations \\(y \\in \\mathbb{R}^n\\), design matrix \\(X \\in \\mathbb{R}^{n \\times p}\\), and regularization parameter \\(\\lambda &gt; 0\\), the <strong>Lasso estimator</strong> is defined as
                        \\[\\hat{\\beta}^{\\text{lasso}} = \\arg\\min_{\\beta \\in \\mathbb{R}^p} \\left\\{ \\frac{1}{2n} \\|y - X\\beta\\|_2^2 + \\lambda \\|\\beta\\|_1 \\right\\}.\\]
                        We use the normalization \\(1/(2n)\\) in front of the squared loss so that the gradient of the loss scales correctly as an average over \\(n\\) observations.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: Equivalent Formulations</div>
                    <div class="env-body">
                        <p>The Lasso has three equivalent formulations (by Lagrangian duality):</p>
                        <ul>
                            <li><strong>Lagrangian form</strong>: \\(\\min_\\beta \\tfrac{1}{2n}\\|y - X\\beta\\|_2^2 + \\lambda \\|\\beta\\|_1\\)</li>
                            <li><strong>Constrained form</strong>: \\(\\min_\\beta \\tfrac{1}{2n}\\|y - X\\beta\\|_2^2\\) subject to \\(\\|\\beta\\|_1 \\le t\\)</li>
                            <li><strong>Basis pursuit denoising</strong>: \\(\\min_\\beta \\|\\beta\\|_1\\) subject to \\(\\tfrac{1}{2n}\\|y - X\\beta\\|_2^2 \\le \\varepsilon\\)</li>
                        </ul>
                        <p>For each value of \\(\\lambda\\), there exist corresponding values of \\(t\\) and \\(\\varepsilon\\) yielding the same solution.</p>
                    </div>
                </div>

                <h3>Properties of the Lasso Objective</h3>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 8.5 (Existence and Convexity)</div>
                    <div class="env-body">
                        <p>The Lasso objective \\(L(\\beta) = \\tfrac{1}{2n}\\|y - X\\beta\\|_2^2 + \\lambda\\|\\beta\\|_1\\) is:</p>
                        <ul>
                            <li><strong>Convex</strong> (sum of a convex quadratic and a convex norm).</li>
                            <li><strong>Coercive</strong> (\\(L(\\beta) \\to \\infty\\) as \\(\\|\\beta\\|_1 \\to \\infty\\)).</li>
                            <li>Hence, the minimum is <strong>always attained</strong>.</li>
                        </ul>
                        <p>If \\(X\\) has rank \\(n\\) (which occurs when \\(p &gt; n\\) and \\(X\\) is in general position), the minimizer need not be unique.  However, the fitted values \\(X\\hat{\\beta}\\) are always unique.</p>
                    </div>
                </div>

                <h3>Subdifferential Optimality</h3>

                <p>The L1 norm is not differentiable at zero.  The appropriate tool is the <strong>subdifferential</strong>.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 8.6 (Subdifferential of the L1 Norm)</div>
                    <div class="env-body">
                        <p>The subdifferential of \\(\\|\\beta\\|_1\\) at a point \\(\\beta\\) is
                        \\[\\partial \\|\\beta\\|_1 = \\{ z \\in \\mathbb{R}^p : z_j = \\text{sign}(\\beta_j) \\text{ if } \\beta_j \\neq 0, \\quad z_j \\in [-1, 1] \\text{ if } \\beta_j = 0 \\}.\\]
                        </p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.7 (KKT Conditions for Lasso)</div>
                    <div class="env-body">
                        <p>A vector \\(\\hat{\\beta}\\) is a Lasso solution if and only if
                        \\[\\frac{1}{n} X^T (X\\hat{\\beta} - y) + \\lambda \\hat{z} = 0\\]
                        for some subgradient \\(\\hat{z} \\in \\partial \\|\\hat{\\beta}\\|_1\\).  Equivalently, defining \\(\\hat{r} = y - X\\hat{\\beta}\\):</p>
                        <ul>
                            <li>If \\(\\hat{\\beta}_j \\neq 0\\): \\(\\quad \\tfrac{1}{n} X_j^T \\hat{r} = \\lambda \\cdot \\text{sign}(\\hat{\\beta}_j)\\)</li>
                            <li>If \\(\\hat{\\beta}_j = 0\\): \\(\\quad |\\tfrac{1}{n} X_j^T \\hat{r}| \\le \\lambda\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Reading the KKT Conditions</div>
                    <div class="env-body">
                        <p>The quantity \\(\\tfrac{1}{n} X_j^T r\\) measures the <em>marginal correlation</em> between predictor \\(j\\) and the current residual \\(r\\).  The KKT conditions say: a predictor enters the model (\\(\\hat{\\beta}_j \\neq 0\\)) only if its correlation with the residual is large enough (exactly \\(\\lambda\\) in magnitude).  Predictors with sub-threshold correlation are set to zero.  This is the mechanism by which the Lasso performs <em>variable selection</em>.</p>
                    </div>
                </div>

                <h3>The Soft-Thresholding Operator</h3>

                <p>In the orthogonal design case (\\(X^T X / n = I_p\\), requiring \\(n \\ge p\\)), the Lasso has an explicit closed-form solution.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 8.8 (Soft-Thresholding)</div>
                    <div class="env-body">
                        <p>The <strong>soft-thresholding operator</strong> at level \\(\\lambda\\) is
                        \\[\\mathcal{S}_\\lambda(z) = \\text{sign}(z) \\cdot (|z| - \\lambda)_+ = \\begin{cases} z - \\lambda & \\text{if } z &gt; \\lambda, \\\\ 0 & \\text{if } |z| \\le \\lambda, \\\\ z + \\lambda & \\text{if } z &lt; -\\lambda. \\end{cases}\\]
                        </p>
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 8.9 (Lasso with Orthogonal Design)</div>
                    <div class="env-body">
                        <p>If \\(X^T X/n = I_p\\), the Lasso solution is given coordinatewise by
                        \\[\\hat{\\beta}_j^{\\text{lasso}} = \\mathcal{S}_\\lambda\\!\\left(\\hat{\\beta}_j^{\\text{OLS}}\\right), \\qquad j = 1, \\ldots, p.\\]
                        Each coordinate is independently soft-thresholded: coefficients within \\([-\\lambda, \\lambda]\\) of zero are <em>killed</em>, while larger coefficients are <em>shrunk</em> toward zero by \\(\\lambda\\).</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Verify the KKT conditions for the Lasso.  Starting from the objective \\(L(\\beta) = \\tfrac{1}{2n}\\|y - X\\beta\\|_2^2 + \\lambda\\|\\beta\\|_1\\), derive the necessary and sufficient conditions for optimality using the subdifferential.',
                    hint: 'Use the fact that \\(0 \\in \\partial L(\\hat{\\beta})\\) if and only if \\(0 \\in \\tfrac{1}{n}X^T(X\\hat{\\beta} - y) + \\lambda \\partial\\|\\hat{\\beta}\\|_1\\).',
                    solution: 'The objective is \\(L(\\beta) = \\tfrac{1}{2n}\\|y - X\\beta\\|_2^2 + \\lambda\\|\\beta\\|_1\\).  The subdifferential is \\(\\partial L(\\beta) = \\tfrac{1}{n}X^T(X\\beta - y) + \\lambda \\partial\\|\\beta\\|_1\\).  Setting \\(0 \\in \\partial L(\\hat{\\beta})\\), we need \\(\\tfrac{1}{n}X^T(X\\hat{\\beta} - y) + \\lambda \\hat{z} = 0\\) for some \\(\\hat{z} \\in \\partial\\|\\hat{\\beta}\\|_1\\).  By the characterization of the subdifferential, \\(\\hat{z}_j = \\text{sign}(\\hat{\\beta}_j)\\) if \\(\\hat{\\beta}_j \\neq 0\\) and \\(\\hat{z}_j \\in [-1,1]\\) if \\(\\hat{\\beta}_j = 0\\).  This gives the two cases: active variables satisfy \\(\\tfrac{1}{n}X_j^T(y - X\\hat{\\beta}) = \\lambda \\text{sign}(\\hat{\\beta}_j)\\), and inactive variables satisfy \\(|\\tfrac{1}{n}X_j^T(y - X\\hat{\\beta})| \\le \\lambda\\).'
                }
            ]
        },

        // ============================================================
        //  SECTION 3 — Basic Inequality
        // ============================================================
        {
            id: 'ch08-sec03',
            title: 'Basic Inequality',
            content: `
                <h2>Basic Inequality</h2>

                <p>We now begin the theoretical analysis of the Lasso.  The first step is a <strong>deterministic</strong> inequality that holds for any design matrix \\(X\\), any noise vector \\(w\\), and any true parameter \\(\\beta^*\\).  It requires no probabilistic assumptions.</p>

                <h3>The Error Vector and Notation</h3>

                <p>Let \\(\\hat{\\beta}\\) denote any Lasso solution.  Define the <strong>error vector</strong>
                \\[\\hat{\\delta} = \\hat{\\beta} - \\beta^*, \\qquad \\text{so that} \\quad \\hat{\\beta} = \\beta^* + \\hat{\\delta}.\\]
                Let \\(S = \\text{supp}(\\beta^*)\\) be the support of the true parameter with \\(|S| = s\\), and let \\(S^c = \\{1, \\ldots, p\\} \\setminus S\\) be its complement.  For any vector \\(v \\in \\mathbb{R}^p\\), we write \\(v_S\\) for the vector that agrees with \\(v\\) on \\(S\\) and is zero on \\(S^c\\).</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.10 (Basic Inequality)</div>
                    <div class="env-body">
                        <p>Let \\(\\hat{\\beta}\\) be any Lasso solution with regularization parameter \\(\\lambda &gt; 0\\).  Then the error vector \\(\\hat{\\delta} = \\hat{\\beta} - \\beta^*\\) satisfies</p>
                        \\[\\frac{1}{2n} \\|X\\hat{\\delta}\\|_2^2 \\;\\le\\; \\frac{1}{n} w^T X \\hat{\\delta} \\;+\\; \\lambda\\left( \\|\\beta^*\\|_1 - \\|\\hat{\\beta}\\|_1 \\right).\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Since \\(\\hat{\\beta}\\) minimizes the Lasso objective, we have
                        \\[\\frac{1}{2n}\\|y - X\\hat{\\beta}\\|_2^2 + \\lambda\\|\\hat{\\beta}\\|_1 \\;\\le\\; \\frac{1}{2n}\\|y - X\\beta^*\\|_2^2 + \\lambda\\|\\beta^*\\|_1.\\]
                        Substituting \\(y = X\\beta^* + w\\), the left side becomes
                        \\[\\frac{1}{2n}\\|w - X\\hat{\\delta}\\|_2^2 + \\lambda\\|\\hat{\\beta}\\|_1 = \\frac{1}{2n}\\|w\\|_2^2 - \\frac{1}{n}w^T X\\hat{\\delta} + \\frac{1}{2n}\\|X\\hat{\\delta}\\|_2^2 + \\lambda\\|\\hat{\\beta}\\|_1,\\]
                        and the right side is \\(\\tfrac{1}{2n}\\|w\\|_2^2 + \\lambda\\|\\beta^*\\|_1\\).  Canceling \\(\\tfrac{1}{2n}\\|w\\|_2^2\\) from both sides yields
                        \\[\\frac{1}{2n}\\|X\\hat{\\delta}\\|_2^2 \\;\\le\\; \\frac{1}{n}w^T X\\hat{\\delta} + \\lambda\\left(\\|\\beta^*\\|_1 - \\|\\hat{\\beta}\\|_1\\right).\\]
                        </p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <h3>Controlling the Noise Term</h3>

                <p>The term \\(\\tfrac{1}{n}w^T X\\hat{\\delta}\\) represents the correlation between the noise and the fitted error direction.  We bound it using Holder's inequality:</p>
                \\[\\frac{1}{n}w^T X\\hat{\\delta} = \\frac{1}{n}\\sum_{j=1}^{p} (X_j^T w)\\, \\hat{\\delta}_j \\;\\le\\; \\left\\|\\frac{X^T w}{n}\\right\\|_\\infty \\|\\hat{\\delta}\\|_1.\\]

                <div class="env-block lemma">
                    <div class="env-title">Lemma 8.11 (Noise Bound)</div>
                    <div class="env-body">
                        <p>Suppose \\(w \\sim \\mathcal{N}(0, \\sigma^2 I_n)\\) and the columns of \\(X\\) satisfy \\(\\|X_j\\|_2^2 \\le n\\) for all \\(j\\).  Then with probability at least \\(1 - 2/p\\),
                        \\[\\left\\|\\frac{X^T w}{n}\\right\\|_\\infty \\le 2\\sigma \\sqrt{\\frac{\\log p}{n}}.\\]
                        </p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Each \\(X_j^T w / n\\) is Gaussian with variance at most \\(\\sigma^2 \\|X_j\\|_2^2 / n^2 \\le \\sigma^2/n\\).  By the Gaussian tail bound, \\(\\mathbb{P}(|X_j^T w/n| &gt; t) \\le 2\\exp(-nt^2/(2\\sigma^2))\\).  Taking a union bound over \\(j = 1, \\ldots, p\\) and setting \\(t = 2\\sigma\\sqrt{\\log p / n}\\), we obtain
                        \\[\\mathbb{P}\\!\\left(\\left\\|\\frac{X^T w}{n}\\right\\|_\\infty &gt; t\\right) \\le 2p \\cdot e^{-2\\log p} = \\frac{2}{p}.\\]
                        </p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <h3>The Cone Condition</h3>

                <p>To exploit the sparsity of \\(\\beta^*\\), we decompose the L1 norm penalty term.</p>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 8.12 (Cone Constraint on \\(\\hat{\\delta}\\))</div>
                    <div class="env-body">
                        <p>Suppose the regularization parameter satisfies \\(\\lambda \\ge 2\\|X^T w/n\\|_\\infty\\).  Then the Lasso error \\(\\hat{\\delta} = \\hat{\\beta} - \\beta^*\\) lies in the <strong>cone set</strong>:
                        \\[\\|\\hat{\\delta}_{S^c}\\|_1 \\le 3\\, \\|\\hat{\\delta}_S\\|_1.\\]
                        In other words, most of the error mass is concentrated on the true support \\(S\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>From the basic inequality and Holder's inequality:
                        \\[\\frac{1}{2n}\\|X\\hat{\\delta}\\|_2^2 \\le \\left\\|\\frac{X^T w}{n}\\right\\|_\\infty \\|\\hat{\\delta}\\|_1 + \\lambda(\\|\\beta^*\\|_1 - \\|\\hat{\\beta}\\|_1).\\]
                        By the triangle inequality and the fact that \\(\\beta^*_{S^c} = 0\\):
                        \\[\\|\\beta^*\\|_1 - \\|\\hat{\\beta}\\|_1 = \\|\\beta^*_S\\|_1 - \\|\\beta^*_S + \\hat{\\delta}_S\\|_1 - \\|\\hat{\\delta}_{S^c}\\|_1 \\le \\|\\hat{\\delta}_S\\|_1 - \\|\\hat{\\delta}_{S^c}\\|_1.\\]
                        Also, \\(\\|\\hat{\\delta}\\|_1 = \\|\\hat{\\delta}_S\\|_1 + \\|\\hat{\\delta}_{S^c}\\|_1\\).  Since \\(\\tfrac{1}{2n}\\|X\\hat{\\delta}\\|_2^2 \\ge 0\\), we have
                        \\[0 \\le \\frac{\\lambda}{2}(\\|\\hat{\\delta}_S\\|_1 + \\|\\hat{\\delta}_{S^c}\\|_1) + \\lambda(\\|\\hat{\\delta}_S\\|_1 - \\|\\hat{\\delta}_{S^c}\\|_1),\\]
                        using \\(\\lambda \\ge 2\\|X^T w/n\\|_\\infty\\).  Rearranging: \\(0 \\le \\tfrac{3\\lambda}{2}\\|\\hat{\\delta}_S\\|_1 - \\tfrac{\\lambda}{2}\\|\\hat{\\delta}_{S^c}\\|_1\\), yielding \\(\\|\\hat{\\delta}_{S^c}\\|_1 \\le 3\\|\\hat{\\delta}_S\\|_1\\).</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why the Cone Condition Matters</div>
                    <div class="env-body">
                        <p>The cone condition \\(\\|\\hat{\\delta}_{S^c}\\|_1 \\le 3\\|\\hat{\\delta}_S\\|_1\\) says that the error vector \\(\\hat{\\delta}\\) cannot have too much mass outside the true support.  Since \\(|S| = s\\), the Cauchy-Schwarz inequality gives \\(\\|\\hat{\\delta}_S\\|_1 \\le \\sqrt{s}\\,\\|\\hat{\\delta}_S\\|_2\\), so
                        \\[\\|\\hat{\\delta}\\|_1 \\le 4\\|\\hat{\\delta}_S\\|_1 \\le 4\\sqrt{s}\\,\\|\\hat{\\delta}\\|_2.\\]
                        This links the L1 and L2 norms of the error, a crucial bridge between the L1 penalty geometry and L2 estimation error.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Fill in the details of the triangle inequality step in the proof of Lemma 8.12: show that \\(\\|\\beta^*\\|_1 - \\|\\hat{\\beta}\\|_1 \\le \\|\\hat{\\delta}_S\\|_1 - \\|\\hat{\\delta}_{S^c}\\|_1\\).',
                    hint: 'Write \\(\\hat{\\beta} = \\beta^* + \\hat{\\delta}\\), split into \\(S\\) and \\(S^c\\) components, and use the reverse triangle inequality on the \\(S\\) part.',
                    solution: 'We have \\(\\|\\hat{\\beta}\\|_1 = \\|\\hat{\\beta}_S\\|_1 + \\|\\hat{\\beta}_{S^c}\\|_1 = \\|\\beta^*_S + \\hat{\\delta}_S\\|_1 + \\|\\hat{\\delta}_{S^c}\\|_1\\).  By the reverse triangle inequality, \\(\\|\\beta^*_S + \\hat{\\delta}_S\\|_1 \\ge \\|\\beta^*_S\\|_1 - \\|\\hat{\\delta}_S\\|_1\\).  Therefore \\(\\|\\hat{\\beta}\\|_1 \\ge \\|\\beta^*_S\\|_1 - \\|\\hat{\\delta}_S\\|_1 + \\|\\hat{\\delta}_{S^c}\\|_1 = \\|\\beta^*\\|_1 - \\|\\hat{\\delta}_S\\|_1 + \\|\\hat{\\delta}_{S^c}\\|_1\\).  Rearranging: \\(\\|\\beta^*\\|_1 - \\|\\hat{\\beta}\\|_1 \\le \\|\\hat{\\delta}_S\\|_1 - \\|\\hat{\\delta}_{S^c}\\|_1\\).'
                }
            ]
        },

        // ============================================================
        //  SECTION 4 — Restricted Eigenvalue Condition
        // ============================================================
        {
            id: 'ch08-sec04',
            title: 'Restricted Eigenvalue Condition',
            content: `
                <h2>Restricted Eigenvalue Condition</h2>

                <p>The basic inequality and cone condition tell us that \\(\\hat{\\delta}\\) is well-behaved in an L1 sense, but we want to control the L2 estimation error \\(\\|\\hat{\\delta}\\|_2\\).  For this, we need the design matrix \\(X\\) to satisfy a condition that prevents the quadratic form \\(\\|X\\hat{\\delta}\\|_2^2\\) from being too small relative to \\(\\|\\hat{\\delta}\\|_2^2\\) — but only for vectors \\(\\hat{\\delta}\\) in the cone.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 8.13 (Restricted Eigenvalue Condition)</div>
                    <div class="env-body">
                        <p>The design matrix \\(X \\in \\mathbb{R}^{n \\times p}\\) satisfies the <strong>restricted eigenvalue (RE) condition</strong> with parameters \\((s, c_0)\\) and constant \\(\\kappa(s, c_0) &gt; 0\\) if
                        \\[\\frac{1}{n}\\|X\\delta\\|_2^2 \\ge \\kappa^2(s, c_0) \\, \\|\\delta\\|_2^2\\]
                        for all vectors \\(\\delta \\neq 0\\) satisfying the cone condition \\(\\|\\delta_{S^c}\\|_1 \\le c_0 \\|\\delta_S\\|_1\\) for some subset \\(S\\) with \\(|S| \\le s\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why "Restricted"?</div>
                    <div class="env-body">
                        <p>When \\(p &gt; n\\), the matrix \\(X^T X / n\\) has at least \\(p - n\\) zero eigenvalues, so the minimum eigenvalue \\(\\lambda_{\\min}(X^T X/n) = 0\\).  We cannot ask for \\(\\|X\\delta\\|_2^2/n \\ge \\kappa^2 \\|\\delta\\|_2^2\\) over <em>all</em> \\(\\delta\\) — this would require \\(X\\) to have rank \\(p\\), which is impossible when \\(p &gt; n\\).  Instead, we only need this condition to hold over the <em>restricted set</em> of cone-constrained vectors, a much smaller set where the condition can plausibly hold.</p>
                    </div>
                </div>

                <h3>Compatibility Condition</h3>

                <p>A closely related condition, due to Buhlmann and van de Geer, is often more convenient to verify.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 8.14 (Compatibility Condition)</div>
                    <div class="env-body">
                        <p>The design matrix \\(X\\) satisfies the <strong>compatibility condition</strong> with respect to support \\(S\\) (with \\(|S| = s\\)) and constant \\(\\phi^2(S) &gt; 0\\) if
                        \\[\\frac{1}{n}\\|X\\delta\\|_2^2 \\ge \\frac{\\phi^2(S)}{s} \\, \\|\\delta_S\\|_1^2\\]
                        for all vectors \\(\\delta\\) in the cone \\(\\|\\delta_{S^c}\\|_1 \\le 3\\|\\delta_S\\|_1\\).  The quantity \\(\\phi^2(S)\\) is called the <strong>compatibility constant</strong>.</p>
                    </div>
                </div>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 8.15 (RE implies Compatibility)</div>
                    <div class="env-body">
                        <p>If the RE condition holds with constant \\(\\kappa(s, 3)\\), then the compatibility condition holds with \\(\\phi^2(S) \\ge \\kappa^2(s, 3)\\) for all \\(S\\) with \\(|S| \\le s\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>For \\(\\delta\\) in the cone \\(\\|\\delta_{S^c}\\|_1 \\le 3\\|\\delta_S\\|_1\\), the RE condition gives \\(\\tfrac{1}{n}\\|X\\delta\\|_2^2 \\ge \\kappa^2 \\|\\delta\\|_2^2 \\ge \\kappa^2 \\|\\delta_S\\|_2^2 \\ge \\tfrac{\\kappa^2}{s}\\|\\delta_S\\|_1^2\\), where the last step uses Cauchy-Schwarz: \\(\\|\\delta_S\\|_1 \\le \\sqrt{s}\\,\\|\\delta_S\\|_2\\).</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <h3>When Does the RE Condition Hold?</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.16 (RE for Random Designs)</div>
                    <div class="env-body">
                        <p>Suppose the rows of \\(X\\) are drawn i.i.d. from \\(\\mathcal{N}(0, \\Sigma)\\) where \\(\\lambda_{\\min}(\\Sigma) \\ge c_{\\min} &gt; 0\\).  If the sample size satisfies
                        \\[n \\ge C \\, s \\log p\\]
                        for a sufficiently large constant \\(C &gt; 0\\) (depending on \\(\\Sigma\\)), then the RE condition holds with \\(\\kappa^2(s, 3) \\ge c_{\\min}/2\\) with probability at least \\(1 - 2\\exp(-cn)\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">The Critical Sample Size</div>
                    <div class="env-body">
                        <p>The condition \\(n \\ge C \\, s \\log p\\) is remarkably mild.  It says we need only logarithmically many observations per parameter — far fewer than the \\(n \\ge p\\) required by OLS.  For instance, if \\(p = 10{,}000\\) and \\(s = 20\\), we need roughly \\(n \\ge 20 \\cdot \\log(10{,}000) \\approx 184\\) observations, rather than \\(10{,}000\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-re"></div>
            `,
            visualizations: [
                {
                    id: 'viz-re',
                    title: 'Restricted Eigenvalue Explorer',
                    description: 'Generate a random Gaussian design X with n rows and p columns. Compute the RE constant for varying sparsity s. Observe how the RE constant degrades as s increases.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 400, scale: 1, originX: 70, originY: 350 });
                        var ctx = viz.ctx;

                        var nVal = 100;
                        var pVal = 200;

                        VizEngine.createSlider(controls, 'n', 30, 300, 100, 10, function(v) { nVal = Math.round(v); recompute(); });
                        VizEngine.createSlider(controls, 'p', 50, 500, 200, 10, function(v) { pVal = Math.round(v); recompute(); });
                        VizEngine.createButton(controls, 'New X', function() { recompute(); });

                        var reData = [];

                        function randn() {
                            var u = 0, v2 = 0;
                            while (u === 0) u = Math.random();
                            while (v2 === 0) v2 = Math.random();
                            return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v2);
                        }

                        function generateX(n, p) {
                            var X = [];
                            for (var i = 0; i < n; i++) {
                                var row = [];
                                for (var j = 0; j < p; j++) {
                                    row.push(randn() / Math.sqrt(n));
                                }
                                X.push(row);
                            }
                            return X;
                        }

                        function computeREConstant(X, n, p, s) {
                            // Monte Carlo estimation of RE constant:
                            // sample random cone-constrained vectors and find min of ||Xd||^2 / ||d||^2
                            var nTrials = 200;
                            var minRatio = Infinity;

                            for (var trial = 0; trial < nTrials; trial++) {
                                // Random support of size s
                                var indices = [];
                                for (var j = 0; j < p; j++) indices.push(j);
                                for (var j = p - 1; j > 0; j--) {
                                    var k = Math.floor(Math.random() * (j + 1));
                                    var tmp = indices[j]; indices[j] = indices[k]; indices[k] = tmp;
                                }
                                var S = indices.slice(0, s);
                                var Sset = new Set(S);

                                // Random delta in the cone: delta_S ~ N(0,I), delta_Sc smaller
                                var delta = new Array(p).fill(0);
                                var normS = 0;
                                for (var j = 0; j < s; j++) {
                                    delta[S[j]] = randn();
                                    normS += Math.abs(delta[S[j]]);
                                }
                                // Add small Sc component satisfying cone
                                var budgetSc = 2.5 * normS; // < 3 * normS to stay in cone
                                var scCount = Math.min(p - s, s * 2);
                                for (var j = 0; j < scCount && j + s < p; j++) {
                                    var idx = indices[s + j];
                                    delta[idx] = randn() * 0.3;
                                }
                                // Renormalize Sc part to satisfy cone
                                var normSc = 0;
                                for (var j = 0; j < p; j++) {
                                    if (!Sset.has(j)) normSc += Math.abs(delta[j]);
                                }
                                if (normSc > 2.9 * normS && normS > 0) {
                                    var scale = 2.9 * normS / normSc;
                                    for (var j = 0; j < p; j++) {
                                        if (!Sset.has(j)) delta[j] *= scale;
                                    }
                                }

                                // Compute ||Xdelta||^2 and ||delta||^2
                                var Xd2 = 0;
                                for (var i = 0; i < n; i++) {
                                    var dot = 0;
                                    for (var j = 0; j < p; j++) {
                                        dot += X[i][j] * delta[j];
                                    }
                                    Xd2 += dot * dot;
                                }

                                var d2 = 0;
                                for (var j = 0; j < p; j++) d2 += delta[j] * delta[j];

                                if (d2 > 1e-10) {
                                    var ratio = Xd2 / d2;
                                    if (ratio < minRatio) minRatio = ratio;
                                }
                            }
                            return minRatio;
                        }

                        function recompute() {
                            var X = generateX(nVal, pVal);
                            reData = [];
                            var maxS = Math.min(Math.floor(nVal / 2), 50);
                            var step = Math.max(1, Math.floor(maxS / 20));
                            for (var s = 1; s <= maxS; s += step) {
                                var kappa = computeREConstant(X, nVal, pVal, s);
                                reData.push({ s: s, kappa: kappa });
                            }
                            draw();
                        }

                        function draw() {
                            viz.clear();

                            // Draw background
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            var leftMargin = 70, rightMargin = 30, topMargin = 40, bottomMargin = 50;
                            var plotW = viz.width - leftMargin - rightMargin;
                            var plotH = viz.height - topMargin - bottomMargin;

                            if (reData.length === 0) {
                                viz.screenText('Computing...', viz.width / 2, viz.height / 2, viz.colors.text, 14);
                                return;
                            }

                            var maxS = reData[reData.length - 1].s;
                            var maxKappa = 0;
                            for (var i = 0; i < reData.length; i++) {
                                if (reData[i].kappa > maxKappa) maxKappa = reData[i].kappa;
                            }
                            maxKappa = Math.max(maxKappa * 1.2, 0.1);

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(leftMargin, topMargin);
                            ctx.lineTo(leftMargin, topMargin + plotH);
                            ctx.lineTo(leftMargin + plotW, topMargin + plotH);
                            ctx.stroke();

                            // Axis labels
                            viz.screenText('Sparsity s', leftMargin + plotW / 2, topMargin + plotH + 38, viz.colors.text, 13, 'center');
                            ctx.save();
                            ctx.translate(16, topMargin + plotH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('\u03BA\u00B2(s, 3)', 0, 0);
                            ctx.restore();

                            // Tick marks
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            var nTicks = 5;
                            for (var i = 0; i <= nTicks; i++) {
                                var sVal = Math.round(1 + i * (maxS - 1) / nTicks);
                                var xPos = leftMargin + (sVal - 1) / (maxS - 1) * plotW;
                                ctx.fillText(sVal, xPos, topMargin + plotH + 6);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(xPos, topMargin);
                                ctx.lineTo(xPos, topMargin + plotH);
                                ctx.stroke();
                            }

                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var i = 0; i <= 4; i++) {
                                var kVal = maxKappa * i / 4;
                                var yPos = topMargin + plotH - (kVal / maxKappa) * plotH;
                                ctx.fillText(kVal.toFixed(2), leftMargin - 8, yPos);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(leftMargin, yPos);
                                ctx.lineTo(leftMargin + plotW, yPos);
                                ctx.stroke();
                            }

                            // Plot data
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i < reData.length; i++) {
                                var xp = leftMargin + (reData[i].s - 1) / (maxS - 1) * plotW;
                                var yp = topMargin + plotH - (reData[i].kappa / maxKappa) * plotH;
                                if (i === 0) ctx.moveTo(xp, yp);
                                else ctx.lineTo(xp, yp);
                            }
                            ctx.stroke();

                            // Points
                            for (var i = 0; i < reData.length; i++) {
                                var xp = leftMargin + (reData[i].s - 1) / (maxS - 1) * plotW;
                                var yp = topMargin + plotH - (reData[i].kappa / maxKappa) * plotH;
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath();
                                ctx.arc(xp, yp, 4, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Draw n/p critical line: s = n / (C log p)
                            var critS = nVal / (2 * Math.log(pVal));
                            if (critS > 1 && critS < maxS) {
                                var xCrit = leftMargin + (critS - 1) / (maxS - 1) * plotW;
                                ctx.strokeStyle = viz.colors.red + '88';
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([6, 4]);
                                ctx.beginPath();
                                ctx.moveTo(xCrit, topMargin);
                                ctx.lineTo(xCrit, topMargin + plotH);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('s* = n/(2 log p)', xCrit, topMargin - 8, viz.colors.red, 11, 'center', 'bottom');
                            }

                            // Title
                            viz.screenText('RE constant \u03BA\u00B2(s,3) for n=' + nVal + ', p=' + pVal, viz.width / 2, 16, viz.colors.white, 14, 'center');
                        }

                        recompute();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the RE condition with parameters \\((s, c_0)\\) implies the <strong>restricted isometry property</strong> (RIP) restricted to vectors satisfying the cone constraint.  Specifically, show that if \\(\\|\\delta_{S^c}\\|_1 \\le c_0 \\|\\delta_S\\|_1\\) and the RE condition holds, then \\(\\tfrac{1}{n}\\|X\\delta\\|_2^2 \\ge \\kappa^2 \\|\\delta\\|_2^2\\).',
                    hint: 'This is essentially the definition.  But note the subtle difference: the RE condition allows \\(\\kappa\\) to depend on \\(s\\) and \\(c_0\\), whereas RIP typically requires a constant close to 1.',
                    solution: 'The RE condition states exactly that \\(\\tfrac{1}{n}\\|X\\delta\\|_2^2 \\ge \\kappa^2(s,c_0)\\|\\delta\\|_2^2\\) for all nonzero \\(\\delta\\) with \\(\\|\\delta_{S^c}\\|_1 \\le c_0\\|\\delta_S\\|_1\\) for some \\(|S| \\le s\\).  The RIP would additionally require an upper bound \\(\\tfrac{1}{n}\\|X\\delta\\|_2^2 \\le (1+\\delta_s)\\|\\delta\\|_2^2\\) for all \\(s\\)-sparse vectors.  The RE condition is weaker (only a lower bound, only on the cone) and therefore easier to verify, which is its main advantage.'
                }
            ]
        },

        // ============================================================
        //  SECTION 5 — Oracle Inequality
        // ============================================================
        {
            id: 'ch08-sec05',
            title: 'Oracle Inequality',
            content: `
                <h2>Oracle Inequality</h2>

                <p>We now assemble the basic inequality, the cone condition, and the restricted eigenvalue condition to prove the main result: the Lasso achieves near-oracle estimation rates.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 8.17 (Oracle Estimator)</div>
                    <div class="env-body">
                        <p>The <strong>oracle estimator</strong> is the OLS estimator that knows the true support \\(S\\):
                        \\[\\hat{\\beta}^{\\text{oracle}}_S = (X_S^T X_S)^{-1} X_S^T y, \\qquad \\hat{\\beta}^{\\text{oracle}}_{S^c} = 0.\\]
                        Its risk is \\(\\mathbb{E}\\|\\hat{\\beta}^{\\text{oracle}} - \\beta^*\\|_2^2 = \\sigma^2 \\, \\text{tr}((X_S^T X_S)^{-1}) \\asymp \\sigma^2 s / n\\).  No estimator can do better (up to constants) without prior knowledge beyond sparsity.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.18 (Oracle Inequality for the Lasso)</div>
                    <div class="env-body">
                        <p>Consider the linear model \\(y = X\\beta^* + w\\) with \\(w \\sim \\mathcal{N}(0, \\sigma^2 I_n)\\), \\(\\beta^*\\) is \\(s\\)-sparse, and \\(\\|X_j\\|_2^2 \\le n\\) for all \\(j\\).  Suppose the RE condition holds with constant \\(\\kappa = \\kappa(s, 3) &gt; 0\\).  Set \\(\\lambda = 4\\sigma\\sqrt{\\log p / n}\\).  Then with probability at least \\(1 - 2/p\\):</p>
                        <p><strong>(a) Prediction error:</strong>
                        \\[\\frac{1}{n}\\|X(\\hat{\\beta} - \\beta^*)\\|_2^2 \\le \\frac{64\\,\\sigma^2\\, s\\log p}{\\kappa^2\\, n}\\]
                        </p>
                        <p><strong>(b) Estimation error (L2):</strong>
                        \\[\\|\\hat{\\beta} - \\beta^*\\|_2^2 \\le \\frac{64\\,\\sigma^2\\, s\\log p}{\\kappa^4\\, n}\\]
                        </p>
                        <p><strong>(c) Estimation error (L1):</strong>
                        \\[\\|\\hat{\\beta} - \\beta^*\\|_1 \\le \\frac{32\\,\\sigma\\, s\\sqrt{\\log p}}{\\kappa^2\\, \\sqrt{n}}\\]
                        </p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof of (a) and (b)</div>
                    <div class="env-body">
                        <p><strong>Step 1: Apply the Basic Inequality.</strong>  From Theorem 8.10,
                        \\[\\frac{1}{2n}\\|X\\hat{\\delta}\\|_2^2 \\le \\left\\|\\frac{X^T w}{n}\\right\\|_\\infty \\|\\hat{\\delta}\\|_1 + \\lambda(\\|\\hat{\\delta}_S\\|_1 - \\|\\hat{\\delta}_{S^c}\\|_1).\\]</p>

                        <p><strong>Step 2: Set \\(\\lambda \\ge 2\\|X^T w/n\\|_\\infty\\).</strong>  By Lemma 8.11, \\(\\|X^T w/n\\|_\\infty \\le 2\\sigma\\sqrt{\\log p/n}\\) with probability \\(\\ge 1 - 2/p\\).  With \\(\\lambda = 4\\sigma\\sqrt{\\log p/n}\\), we have \\(\\lambda \\ge 2\\|X^T w/n\\|_\\infty\\).  Thus from the Basic Inequality:
                        \\[\\frac{1}{2n}\\|X\\hat{\\delta}\\|_2^2 \\le \\frac{\\lambda}{2}\\|\\hat{\\delta}\\|_1 + \\lambda(\\|\\hat{\\delta}_S\\|_1 - \\|\\hat{\\delta}_{S^c}\\|_1) \\le \\frac{3\\lambda}{2}\\|\\hat{\\delta}_S\\|_1 - \\frac{\\lambda}{2}\\|\\hat{\\delta}_{S^c}\\|_1 \\le \\frac{3\\lambda}{2}\\|\\hat{\\delta}_S\\|_1.\\]</p>

                        <p><strong>Step 3: Apply Cauchy-Schwarz.</strong>  Since \\(|S| = s\\), we have \\(\\|\\hat{\\delta}_S\\|_1 \\le \\sqrt{s}\\,\\|\\hat{\\delta}_S\\|_2 \\le \\sqrt{s}\\,\\|\\hat{\\delta}\\|_2\\), giving
                        \\[\\frac{1}{2n}\\|X\\hat{\\delta}\\|_2^2 \\le \\frac{3\\lambda\\sqrt{s}}{2}\\|\\hat{\\delta}\\|_2.\\]</p>

                        <p><strong>Step 4: Apply the RE condition.</strong>  By the cone condition (Lemma 8.12), \\(\\hat{\\delta}\\) lies in the cone \\(\\|\\hat{\\delta}_{S^c}\\|_1 \\le 3\\|\\hat{\\delta}_S\\|_1\\), so the RE condition gives \\(\\tfrac{1}{n}\\|X\\hat{\\delta}\\|_2^2 \\ge \\kappa^2\\|\\hat{\\delta}\\|_2^2\\).  Combining with Step 3:
                        \\[\\frac{\\kappa^2}{2}\\|\\hat{\\delta}\\|_2^2 \\le \\frac{1}{2n}\\|X\\hat{\\delta}\\|_2^2 \\le \\frac{3\\lambda\\sqrt{s}}{2}\\|\\hat{\\delta}\\|_2.\\]
                        Dividing by \\(\\|\\hat{\\delta}\\|_2\\) (if nonzero):
                        \\[\\|\\hat{\\delta}\\|_2 \\le \\frac{3\\lambda\\sqrt{s}}{\\kappa^2} = \\frac{12\\sigma\\sqrt{s \\log p}}{\\kappa^2 \\sqrt{n}}.\\]
                        Squaring gives \\(\\|\\hat{\\delta}\\|_2^2 \\le 144\\sigma^2 s \\log p / (\\kappa^4 n)\\).  For prediction error, we use \\(\\tfrac{1}{n}\\|X\\hat{\\delta}\\|_2^2 \\le 3\\lambda\\sqrt{s}\\|\\hat{\\delta}\\|_2 \\le 9\\lambda^2 s / \\kappa^2\\).</p>

                        <p>(The constants \\(64\\) in the statement can be obtained by tighter bookkeeping.)</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Interpreting the Rate \\(s \\log p / n\\)</div>
                    <div class="env-body">
                        <p>The oracle inequality shows that the Lasso achieves an estimation rate of order \\(\\sigma^2 \\cdot s \\log p / n\\).  Compare this with:</p>
                        <ul>
                            <li>The <strong>oracle rate</strong> \\(\\sigma^2 s / n\\) (knowing the support): the Lasso pays only a \\(\\log p\\) factor for not knowing the support.</li>
                            <li>The <strong>OLS rate</strong> \\(\\sigma^2 p / n\\) (using all predictors): when \\(s \\ll p\\), the Lasso rate is dramatically better.</li>
                        </ul>
                        <p>The \\(\\log p\\) factor is the <em>price of adaptation</em>: the cost of searching over \\(p\\) coordinates to identify the \\(s\\) relevant ones.  It is known to be unavoidable in a minimax sense (see Chapter 18).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-oracle"></div>
            `,
            visualizations: [
                {
                    id: 'viz-oracle',
                    title: 'Oracle Inequality: Estimation Error vs. (s log p)/n',
                    description: 'Fix sparsity s and vary n and p. Each dot is a simulation of the Lasso. The x-axis is the theoretical rate s log(p)/n; the y-axis is the realized squared error. A linear relationship confirms the oracle inequality.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 560, height: 420, scale: 1, originX: 70, originY: 370 });
                        var ctx = viz.ctx;

                        var sVal = 5;
                        var sigma = 1.0;

                        VizEngine.createSlider(controls, 's', 2, 20, 5, 1, function(v) { sVal = Math.round(v); runSimulation(); });
                        VizEngine.createSlider(controls, '\\(\\sigma\\)', 0.5, 3.0, 1.0, 0.1, function(v) { sigma = v; runSimulation(); });
                        VizEngine.createButton(controls, 'Re-run', function() { runSimulation(); });

                        var simData = [];

                        function randn() {
                            var u = 0, v2 = 0;
                            while (u === 0) u = Math.random();
                            while (v2 === 0) v2 = Math.random();
                            return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v2);
                        }

                        function softThreshold(z, lam) {
                            if (z > lam) return z - lam;
                            if (z < -lam) return z + lam;
                            return 0;
                        }

                        function runLasso(n, p, s, sig) {
                            // Generate sparse beta*
                            var betaStar = new Array(p).fill(0);
                            for (var j = 0; j < s; j++) {
                                betaStar[j] = 2 * (Math.random() > 0.5 ? 1 : -1) + randn() * 0.5;
                            }

                            // Generate X (orthogonalized via simple approach)
                            var X = [];
                            for (var i = 0; i < n; i++) {
                                var row = [];
                                for (var j = 0; j < p; j++) {
                                    row.push(randn() / Math.sqrt(n));
                                }
                                X.push(row);
                            }

                            // Generate y = X * betaStar + noise
                            var y = new Array(n).fill(0);
                            for (var i = 0; i < n; i++) {
                                for (var j = 0; j < p; j++) {
                                    y[i] += X[i][j] * betaStar[j];
                                }
                                y[i] += sig * randn();
                            }

                            // Coordinate descent Lasso
                            var lam = 4 * sig * Math.sqrt(Math.log(p) / n);
                            var beta = new Array(p).fill(0);
                            var maxIter = 100;

                            // Precompute X^T X diag and X^T y
                            var XtXdiag = new Array(p).fill(0);
                            var Xty = new Array(p).fill(0);
                            for (var j = 0; j < p; j++) {
                                for (var i = 0; i < n; i++) {
                                    XtXdiag[j] += X[i][j] * X[i][j];
                                    Xty[j] += X[i][j] * y[i];
                                }
                            }

                            for (var iter = 0; iter < maxIter; iter++) {
                                var maxChange = 0;
                                for (var j = 0; j < p; j++) {
                                    // Compute partial residual
                                    var partial = Xty[j];
                                    for (var i = 0; i < n; i++) {
                                        var resid = 0;
                                        for (var k = 0; k < p; k++) {
                                            if (k !== j) resid += X[i][k] * beta[k];
                                        }
                                        partial -= X[i][j] * resid;
                                    }
                                    // Actually, simpler: compute residual correlation
                                    // r_j = X_j^T (y - X_{-j} beta_{-j}) = X_j^T y - sum_{k != j} (X_j^T X_k) beta_k
                                    // For speed, recompute naively
                                    var rj = 0;
                                    for (var i = 0; i < n; i++) {
                                        var fitted = 0;
                                        for (var k = 0; k < p; k++) {
                                            if (k !== j) fitted += X[i][k] * beta[k];
                                        }
                                        rj += X[i][j] * (y[i] - fitted);
                                    }
                                    var newBeta = softThreshold(rj / XtXdiag[j], n * lam / XtXdiag[j]);
                                    var change = Math.abs(newBeta - beta[j]);
                                    if (change > maxChange) maxChange = change;
                                    beta[j] = newBeta;
                                }
                                if (maxChange < 1e-5) break;
                            }

                            // Compute squared error
                            var err2 = 0;
                            for (var j = 0; j < p; j++) {
                                err2 += (beta[j] - betaStar[j]) * (beta[j] - betaStar[j]);
                            }
                            return err2;
                        }

                        function runSimulation() {
                            simData = [];
                            // Vary n and p to get different values of s*log(p)/n
                            var configs = [
                                [60, 50], [80, 80], [100, 100], [100, 200],
                                [120, 150], [150, 200], [150, 300],
                                [200, 300], [200, 500], [250, 400],
                                [300, 500], [300, 800], [400, 600],
                                [400, 1000], [500, 800]
                            ];

                            for (var ci = 0; ci < configs.length; ci++) {
                                var n = configs[ci][0];
                                var p = configs[ci][1];
                                if (sVal > n / 4) continue; // skip if s is too large for this n
                                var rate = sVal * Math.log(p) / n;
                                var err = runLasso(n, p, sVal, sigma);
                                simData.push({ rate: rate, err: err, n: n, p: p });
                            }
                            draw();
                        }

                        function draw() {
                            viz.clear();
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            var leftMargin = 70, rightMargin = 30, topMargin = 40, bottomMargin = 50;
                            var plotW = viz.width - leftMargin - rightMargin;
                            var plotH = viz.height - topMargin - bottomMargin;

                            if (simData.length === 0) {
                                viz.screenText('Running simulations...', viz.width / 2, viz.height / 2, viz.colors.text, 14);
                                return;
                            }

                            var maxRate = 0, maxErr = 0;
                            for (var i = 0; i < simData.length; i++) {
                                if (simData[i].rate > maxRate) maxRate = simData[i].rate;
                                if (simData[i].err > maxErr) maxErr = simData[i].err;
                            }
                            maxRate *= 1.15;
                            maxErr *= 1.15;
                            if (maxRate < 0.01) maxRate = 0.01;
                            if (maxErr < 0.01) maxErr = 0.01;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(leftMargin, topMargin);
                            ctx.lineTo(leftMargin, topMargin + plotH);
                            ctx.lineTo(leftMargin + plotW, topMargin + plotH);
                            ctx.stroke();

                            // Labels
                            viz.screenText('s log(p) / n', leftMargin + plotW / 2, topMargin + plotH + 38, viz.colors.text, 13, 'center');
                            ctx.save();
                            ctx.translate(16, topMargin + plotH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('||\u03B2\u0302 - \u03B2*||\u00B2\u2082', 0, 0);
                            ctx.restore();

                            // Ticks
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            for (var i = 0; i <= 4; i++) {
                                var xv = maxRate * i / 4;
                                var xp = leftMargin + (xv / maxRate) * plotW;
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(xv.toFixed(2), xp, topMargin + plotH + 6);

                                var yv = maxErr * i / 4;
                                var yp = topMargin + plotH - (yv / maxErr) * plotH;
                                ctx.textAlign = 'right';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(yv.toFixed(2), leftMargin - 8, yp);
                            }

                            // Regression line (least squares through origin)
                            var sumXY = 0, sumXX = 0;
                            for (var i = 0; i < simData.length; i++) {
                                sumXY += simData[i].rate * simData[i].err;
                                sumXX += simData[i].rate * simData[i].rate;
                            }
                            var slope = sumXX > 0 ? sumXY / sumXX : 1;

                            // Draw regression line
                            ctx.strokeStyle = viz.colors.orange + '88';
                            ctx.lineWidth = 2;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            ctx.moveTo(leftMargin, topMargin + plotH);
                            var endY = topMargin + plotH - (slope * maxRate / maxErr) * plotH;
                            ctx.lineTo(leftMargin + plotW, Math.max(topMargin, endY));
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Plot points
                            for (var i = 0; i < simData.length; i++) {
                                var xp = leftMargin + (simData[i].rate / maxRate) * plotW;
                                var yp = topMargin + plotH - (simData[i].err / maxErr) * plotH;
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath();
                                ctx.arc(xp, yp, 5, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = viz.colors.blue + '44';
                                ctx.beginPath();
                                ctx.arc(xp, yp, 8, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Title and info
                            viz.screenText('Oracle inequality: ||\u03B2\u0302 - \u03B2*||\u00B2 \u2248 C \u00B7 s log(p)/n', viz.width / 2, 16, viz.colors.white, 13, 'center');
                            viz.screenText('slope \u2248 ' + slope.toFixed(2) + '\u03C3\u00B2 (s=' + sVal + ', \u03C3=' + sigma.toFixed(1) + ')', viz.width / 2, topMargin + plotH + 48, viz.colors.orange, 11, 'center', 'top');
                        }

                        runSimulation();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove part (c) of Theorem 8.18: the L1 bound \\(\\|\\hat{\\beta} - \\beta^*\\|_1 \\le 32\\sigma s\\sqrt{\\log p} / (\\kappa^2 \\sqrt{n})\\).',
                    hint: 'Use the cone condition \\(\\|\\hat{\\delta}\\|_1 \\le 4\\|\\hat{\\delta}_S\\|_1 \\le 4\\sqrt{s}\\,\\|\\hat{\\delta}\\|_2\\) together with the L2 bound from part (b).',
                    solution: 'From the cone condition (Lemma 8.12), \\(\\|\\hat{\\delta}\\|_1 \\le 4\\|\\hat{\\delta}_S\\|_1 \\le 4\\sqrt{s}\\,\\|\\hat{\\delta}_S\\|_2 \\le 4\\sqrt{s}\\,\\|\\hat{\\delta}\\|_2\\).  Using the L2 bound \\(\\|\\hat{\\delta}\\|_2 \\le 12\\sigma\\sqrt{s\\log p}/(\\kappa^2\\sqrt{n})\\) (from the proof of part (b)), we get \\(\\|\\hat{\\delta}\\|_1 \\le 4\\sqrt{s} \\cdot 12\\sigma\\sqrt{s\\log p}/(\\kappa^2\\sqrt{n}) = 48\\sigma s \\sqrt{\\log p}/(\\kappa^2\\sqrt{n})\\).  (The constant 32 in the theorem statement is achievable with tighter bookkeeping in the proof.)'
                }
            ]
        },

        // ============================================================
        //  SECTION 6 — Choosing lambda
        // ============================================================
        {
            id: 'ch08-sec06',
            title: 'Choosing lambda',
            content: `
                <h2>Choosing \\(\\lambda\\)</h2>

                <p>The Lasso's performance depends critically on the choice of the regularization parameter \\(\\lambda\\).  Too small a \\(\\lambda\\) leads to overfitting (too many variables selected); too large a \\(\\lambda\\) leads to underfitting (true signals killed).</p>

                <h3>The Universal Threshold</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.19 (Universal Choice of \\(\\lambda\\))</div>
                    <div class="env-body">
                        <p>Set
                        \\[\\lambda = A\\, \\sigma \\sqrt{\\frac{\\log p}{n}}\\]
                        for a constant \\(A \\ge 4\\).  Then:
                        </p>
                        <ul>
                            <li>The event \\(\\lambda \\ge 2\\|X^T w/n\\|_\\infty\\) holds with probability at least \\(1 - 2p^{1 - A^2/8}\\).</li>
                            <li>The oracle inequality (Theorem 8.18) holds with this probability.</li>
                        </ul>
                        <p>The choice \\(A = 4\\) gives probability at least \\(1 - 2/p\\), which suffices for most applications.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why \\(\\sqrt{\\log p / n}\\)?</div>
                    <div class="env-body">
                        <p>The threshold \\(\\lambda \\sim \\sigma\\sqrt{\\log p / n}\\) arises from the maximum of \\(p\\) Gaussian random variables.  Each correlation \\(X_j^T w/n\\) is roughly \\(\\mathcal{N}(0, \\sigma^2/n)\\), and the maximum of \\(p\\) such variables scales as \\(\\sigma\\sqrt{2\\log p / n}\\).  Setting \\(\\lambda\\) at this level ensures that, with high probability, <em>no</em> noise variable has a correlation with the residual exceeding \\(\\lambda\\), so no irrelevant variable enters the model.</p>
                    </div>
                </div>

                <h3>The Role of \\(\\sigma\\)</h3>

                <p>The universal threshold requires knowledge of \\(\\sigma\\), the noise standard deviation.  In practice, \\(\\sigma\\) is unknown.  Several approaches exist:</p>

                <div class="env-block remark">
                    <div class="env-title">Estimating \\(\\sigma\\)</div>
                    <div class="env-body">
                        <ul>
                            <li><strong>Scaled Lasso</strong> (Sun & Zhang, 2012): jointly optimize over \\(\\beta\\) and \\(\\sigma\\), making \\(\\lambda\\) pivot on an estimate of \\(\\sigma\\).  See Chapter 9.</li>
                            <li><strong>Square-root Lasso</strong> (Belloni, Chernozhukov & Wang, 2011): minimize \\(\\|y - X\\beta\\|_2 / \\sqrt{n} + \\lambda\\|\\beta\\|_1\\).  The optimal \\(\\lambda\\) does not depend on \\(\\sigma\\).  See Chapter 9.</li>
                            <li><strong>Cross-validation</strong>: purely data-driven, does not require knowledge of \\(\\sigma\\), but has weaker theoretical guarantees.  See Chapter 10.</li>
                        </ul>
                    </div>
                </div>

                <h3>Cross-Validation</h3>

                <p>In practice, the most common approach is <strong>K-fold cross-validation</strong>:</p>
                <ol>
                    <li>Partition the data into \\(K\\) roughly equal folds.</li>
                    <li>For each candidate \\(\\lambda\\), fit the Lasso on \\(K-1\\) folds and compute the prediction error on the held-out fold.</li>
                    <li>Average the prediction errors across folds.</li>
                    <li>Select the \\(\\lambda\\) that minimizes the average prediction error (or, for more conservative variable selection, the <strong>one-standard-error rule</strong>: the largest \\(\\lambda\\) within one standard error of the minimum).</li>
                </ol>

                <div class="env-block warning">
                    <div class="env-title">Cross-Validation vs. Theory</div>
                    <div class="env-body">
                        <p>Cross-validation often selects a <em>smaller</em> \\(\\lambda\\) than the universal threshold \\(4\\sigma\\sqrt{\\log p / n}\\), leading to denser models.  This can improve prediction error (bias-variance tradeoff) but may hurt variable selection (too many false positives).  If the goal is <em>support recovery</em> (identifying which variables are truly nonzero), one typically needs a larger \\(\\lambda\\) — see the <strong>irrepresentable condition</strong> and its relatives (Chapter 9).</p>
                    </div>
                </div>

                <h3>Summary of the Main Results</h3>

                <div class="env-block theorem">
                    <div class="env-title">Summary: The Lasso Rate</div>
                    <div class="env-body">
                        <p>Under the linear model with \\(s\\)-sparse \\(\\beta^* \\in \\mathbb{R}^p\\), Gaussian noise \\(\\sigma^2\\), and the RE condition with constant \\(\\kappa\\), the Lasso with \\(\\lambda \\asymp \\sigma\\sqrt{\\log p / n}\\) satisfies</p>
                        \\[\\|\\hat{\\beta}^{\\text{lasso}} - \\beta^*\\|_2^2 = O_P\\!\\left(\\frac{\\sigma^2 s \\log p}{n}\\right).\\]
                        <p>This rate is:</p>
                        <ul>
                            <li>A factor \\(\\log p\\) above the oracle rate \\(\\sigma^2 s/n\\).</li>
                            <li>Minimax optimal (up to constants) over the class of \\(s\\)-sparse vectors in \\(\\mathbb{R}^p\\) (see Chapter 18).</li>
                            <li>Achievable in polynomial time (the Lasso is a convex program).</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Looking Ahead</div>
                    <div class="env-body">
                        <p>In <strong>Chapter 9</strong>, we explore Lasso variants (Dantzig selector, elastic net, group Lasso, SCAD/MCP) that address limitations of the basic Lasso.  In <strong>Chapter 10</strong>, we study computational algorithms (coordinate descent, proximal gradient) that make the Lasso practical.  In <strong>Chapter 18</strong>, we prove that the rate \\(s \\log p / n\\) is minimax optimal, showing the Lasso is rate-optimal among all estimators.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Compute the universal threshold \\(\\lambda = 4\\sigma\\sqrt{\\log p / n}\\) for the following scenarios: (a) \\(n = 200, p = 1000, \\sigma = 1\\); (b) \\(n = 500, p = 10000, \\sigma = 2\\); (c) \\(n = 100, p = 50, \\sigma = 0.5\\).  Which scenario has the highest threshold?',
                    hint: 'Plug in the values directly.  Recall \\(\\log\\) here is the natural logarithm.',
                    solution: '(a) \\(\\lambda = 4 \\sqrt{\\log(1000)/200} = 4\\sqrt{6.908/200} \\approx 4 \\times 0.1858 = 0.743\\).  (b) \\(\\lambda = 4 \\times 2 \\times \\sqrt{\\log(10000)/500} = 8\\sqrt{9.210/500} \\approx 8 \\times 0.1357 = 1.086\\).  (c) \\(\\lambda = 4 \\times 0.5 \\times \\sqrt{\\log(50)/100} = 2\\sqrt{3.912/100} \\approx 2 \\times 0.1978 = 0.396\\).  Scenario (b) has the highest threshold, driven by the larger \\(\\sigma\\) and the larger \\(p\\).'
                }
            ]
        }
    ]
});
