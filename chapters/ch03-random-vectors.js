// ================================================================
// Chapter 3 — Random Vectors in High Dimensions
// Theme: "Structure from Randomness"
//   A single random variable concentrates around its mean.
//   A random vector in R^d concentrates on a thin shell, and its
//   covariance matrix governs this geometry.  Random projections
//   exploit this structure: the Johnson-Lindenstrauss lemma shows
//   that n points in R^d can be faithfully embedded into R^k with
//   k = O(log n / eps^2), preserving all pairwise distances.
// ================================================================
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch03',
    number: 3,
    title: 'Random Vectors in High Dimensions',
    subtitle: 'Covariance, random projections, and the Johnson-Lindenstrauss lemma',
    sections: [
        // ============================================================
        //  SECTION 1 — Covariance and Sample Covariance
        // ============================================================
        {
            id: 'ch03-sec01',
            title: 'Covariance and Sample Covariance',
            content: `
                <h2>Covariance and Sample Covariance</h2>

                <p>We now move from scalar random variables to <strong>random vectors</strong> \\(X \\in \\mathbb{R}^d\\).  The fundamental object governing the second-order behavior of \\(X\\) is its <strong>covariance matrix</strong>.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 3.1 (Covariance Matrix)</div>
                    <div class="env-body">
                        <p>Let \\(X \\in \\mathbb{R}^d\\) be a random vector with \\(\\mathbb{E}[X] = \\mu\\).  The <strong>covariance matrix</strong> of \\(X\\) is the \\(d \\times d\\) matrix</p>
                        \\[\\Sigma = \\operatorname{Cov}(X) = \\mathbb{E}\\bigl[(X - \\mu)(X - \\mu)^\\top\\bigr].\\]
                        <p>Equivalently, \\(\\Sigma_{ij} = \\operatorname{Cov}(X_i, X_j) = \\mathbb{E}[(X_i - \\mu_i)(X_j - \\mu_j)]\\).</p>
                    </div>
                </div>

                <p>The covariance matrix is always <strong>symmetric positive semidefinite</strong>: for any \\(v \\in \\mathbb{R}^d\\),</p>
                \\[v^\\top \\Sigma v = \\mathbb{E}\\bigl[(v^\\top(X - \\mu))^2\\bigr] = \\operatorname{Var}(v^\\top X) \\geq 0.\\]
                <p>This means all eigenvalues of \\(\\Sigma\\) are non-negative.  In the case where \\(X\\) is not supported on any proper affine subspace, \\(\\Sigma\\) is strictly <strong>positive definite</strong>.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.2 (Spectral Decomposition of Covariance)</div>
                    <div class="env-body">
                        <p>Since \\(\\Sigma\\) is real symmetric, it has an eigendecomposition</p>
                        \\[\\Sigma = \\sum_{i=1}^{d} \\lambda_i u_i u_i^\\top = U \\Lambda U^\\top\\]
                        <p>where \\(\\lambda_1 \\geq \\lambda_2 \\geq \\cdots \\geq \\lambda_d \\geq 0\\) are the eigenvalues and \\(u_1, \\ldots, u_d\\) form an orthonormal eigenbasis.  Key spectral quantities include:</p>
                        <ul>
                            <li><strong>Trace:</strong> \\(\\operatorname{tr}(\\Sigma) = \\sum_i \\lambda_i = \\mathbb{E}\\|X - \\mu\\|_2^2\\) (total variance)</li>
                            <li><strong>Operator norm:</strong> \\(\\|\\Sigma\\|_{\\mathrm{op}} = \\lambda_1\\) (largest eigenvalue)</li>
                            <li><strong>Effective rank:</strong> \\(r(\\Sigma) = \\operatorname{tr}(\\Sigma)/\\|\\Sigma\\|_{\\mathrm{op}}\\), satisfying \\(1 \\leq r(\\Sigma) \\leq d\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Geometric Picture</div>
                    <div class="env-body">
                        <p>The covariance matrix describes an <strong>ellipsoid</strong> in \\(\\mathbb{R}^d\\).  The eigenvectors \\(u_i\\) are the principal axes; the eigenvalues \\(\\lambda_i\\) are the squared semi-axis lengths.  When \\(X \\sim \\mathcal{N}(0, \\Sigma)\\), the density level sets \\(\\{x : x^\\top \\Sigma^{-1} x = c\\}\\) are exactly these ellipsoids.  The <em>effective rank</em> measures how many directions carry substantial variance: \\(r(\\Sigma) = 1\\) means all variance is along one axis; \\(r(\\Sigma) = d\\) means the distribution is isotropic.</p>
                    </div>
                </div>

                <h3>Sample Covariance Matrix</h3>

                <p>Given i.i.d. observations \\(X_1, \\ldots, X_n \\sim \\text{distribution with mean } \\mu \\text{ and covariance } \\Sigma\\), the natural estimator is:</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 3.3 (Sample Covariance Matrix)</div>
                    <div class="env-body">
                        <p>The <strong>sample covariance matrix</strong> (centered version) is</p>
                        \\[\\hat{\\Sigma}_n = \\frac{1}{n} \\sum_{i=1}^{n} (X_i - \\bar{X})(X_i - \\bar{X})^\\top\\]
                        <p>where \\(\\bar{X} = \\frac{1}{n}\\sum_{i=1}^n X_i\\).  When the mean \\(\\mu\\) is known, we use the simpler estimator</p>
                        \\[\\hat{\\Sigma}_n^0 = \\frac{1}{n} \\sum_{i=1}^{n} X_i X_i^\\top\\]
                        <p>(assuming \\(\\mu = 0\\) for convenience).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (High-Dimensional Regime)</div>
                    <div class="env-body">
                        <p>In classical statistics, \\(d\\) is fixed and \\(n \\to \\infty\\), so \\(\\hat{\\Sigma}_n \\to \\Sigma\\) by the law of large numbers.  In <strong>high-dimensional statistics</strong>, both \\(n\\) and \\(d\\) grow, and the ratio \\(d/n\\) governs the quality of estimation.  When \\(d &gt; n\\), the sample covariance matrix \\(\\hat{\\Sigma}_n\\) is rank-deficient (rank at most \\(n - 1\\)) and is a poor estimator of \\(\\Sigma\\) in operator norm.  This is a central theme of modern random matrix theory (Chapters 5--7).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 3.4 (Isotropic Random Vectors)</div>
                    <div class="env-body">
                        <p>A random vector \\(X \\in \\mathbb{R}^d\\) is called <strong>isotropic</strong> if \\(\\mathbb{E}[X] = 0\\) and \\(\\Sigma = I_d\\).  This means every one-dimensional marginal \\(v^\\top X\\) has unit variance, and all pairs of coordinates are uncorrelated.  Examples:</p>
                        <ul>
                            <li>\\(X \\sim \\mathcal{N}(0, I_d)\\) (standard Gaussian)</li>
                            <li>\\(X\\) uniform on \\(\\sqrt{d} \\cdot S^{d-1}\\) (scaled unit sphere)</li>
                            <li>\\(X\\) with i.i.d. Rademacher entries \\(\\pm 1\\)</li>
                        </ul>
                        <p>For isotropic vectors, \\(\\operatorname{tr}(\\Sigma) = d\\) and \\(r(\\Sigma) = d\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Proposition 3.5 (Unbiasedness of Sample Covariance)</div>
                    <div class="env-body">
                        <p>For \\(\\hat{\\Sigma}_n^0 = \\frac{1}{n}\\sum_{i=1}^n X_i X_i^\\top\\) with \\(\\mathbb{E}[X_i] = 0\\),</p>
                        \\[\\mathbb{E}[\\hat{\\Sigma}_n^0] = \\Sigma.\\]
                        <p>That is, the sample covariance matrix (with known mean) is an unbiased estimator.  The centered version \\(\\hat{\\Sigma}_n\\) satisfies \\(\\mathbb{E}[\\hat{\\Sigma}_n] = \\frac{n-1}{n}\\Sigma\\).</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Let \\(X \\in \\mathbb{R}^d\\) have covariance matrix \\(\\Sigma\\), and let \\(A \\in \\mathbb{R}^{k \\times d}\\) be a fixed matrix.  Show that the covariance of \\(Y = AX\\) is \\(A \\Sigma A^\\top\\).  What happens to the eigenvalues when \\(A\\) is an orthogonal projection?',
                    hint: 'Write out \\(\\operatorname{Cov}(AX) = \\mathbb{E}[A(X - \\mu)(X - \\mu)^\\top A^\\top]\\) and use linearity of expectation.  For the projection part, recall that an orthogonal projection \\(P\\) satisfies \\(P^2 = P = P^\\top\\).',
                    solution: '\\(\\operatorname{Cov}(AX) = \\mathbb{E}[A(X-\\mu)(X-\\mu)^\\top A^\\top] = A\\,\\mathbb{E}[(X-\\mu)(X-\\mu)^\\top]\\,A^\\top = A\\Sigma A^\\top\\).  If \\(A = P\\) is an orthogonal projection of rank \\(k\\), then \\(P\\Sigma P\\) has at most \\(k\\) non-zero eigenvalues.  By interlacing, these eigenvalues are bounded between the largest and smallest eigenvalues of \\(\\Sigma\\).'
                },
                {
                    question: 'Prove that the effective rank satisfies \\(1 \\leq r(\\Sigma) \\leq \\operatorname{rank}(\\Sigma) \\leq d\\).  When is \\(r(\\Sigma) = 1\\)?  When does \\(r(\\Sigma) = d\\)?',
                    hint: 'For the lower bound, note \\(\\lambda_1 \\leq \\sum \\lambda_i\\).  For the upper bound, note \\(\\sum \\lambda_i \\leq \\operatorname{rank}(\\Sigma) \\cdot \\lambda_1\\).',
                    solution: 'We have \\(r(\\Sigma) = \\frac{\\sum \\lambda_i}{\\lambda_1} \\geq \\frac{\\lambda_1}{\\lambda_1} = 1\\) since \\(\\lambda_1 \\geq \\lambda_i\\).  Also \\(r(\\Sigma) = \\frac{\\sum \\lambda_i}{\\lambda_1} \\leq \\frac{\\operatorname{rank}(\\Sigma) \\cdot \\lambda_1}{\\lambda_1} = \\operatorname{rank}(\\Sigma)\\).  Equality \\(r(\\Sigma) = 1\\) iff \\(\\Sigma\\) has rank 1 (all variance along one direction).  Equality \\(r(\\Sigma) = d\\) iff \\(\\lambda_1 = \\cdots = \\lambda_d\\), i.e., \\(\\Sigma = \\lambda I\\) (isotropic up to scale).'
                }
            ]
        },

        // ============================================================
        //  SECTION 2 — Concentration of Quadratic Forms
        // ============================================================
        {
            id: 'ch03-sec02',
            title: 'Concentration of Quadratic Forms',
            content: `
                <h2>Concentration of Quadratic Forms</h2>

                <p>In Chapter 1, we studied concentration of <em>linear</em> functions \\(\\langle a, X \\rangle\\) of sub-Gaussian random vectors.  We now turn to <strong>quadratic forms</strong> \\(X^\\top A X\\), which arise naturally when studying norms, variances, and covariance estimation.  The key tool is the <strong>Hanson-Wright inequality</strong>.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 3.6 (Sub-Gaussian Random Vector)</div>
                    <div class="env-body">
                        <p>A random vector \\(X = (X_1, \\ldots, X_d) \\in \\mathbb{R}^d\\) is <strong>sub-Gaussian</strong> with parameter \\(K\\) if every one-dimensional marginal is sub-Gaussian: for all \\(v \\in S^{d-1}\\),</p>
                        \\[\\|\\langle X, v \\rangle\\|_{\\psi_2} \\leq K.\\]
                        <p>The sub-Gaussian norm of \\(X\\) is \\(\\|X\\|_{\\psi_2} = \\sup_{v \\in S^{d-1}} \\|\\langle X, v \\rangle\\|_{\\psi_2}\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Independent Components)</div>
                    <div class="env-body">
                        <p>If \\(X = (X_1, \\ldots, X_d)\\) has <em>independent</em> sub-Gaussian components with \\(\\|X_i\\|_{\\psi_2} \\leq K\\), then \\(X\\) is a sub-Gaussian random vector with \\(\\|X\\|_{\\psi_2} \\leq CK\\) for an absolute constant \\(C\\).  This follows because \\(\\langle X, v \\rangle = \\sum_i v_i X_i\\) is a sum of independent sub-Gaussians, and its \\(\\psi_2\\)-norm is controlled by \\(K \\|v\\|_2 = K\\).</p>
                    </div>
                </div>

                <h3>The Hanson-Wright Inequality</h3>

                <p>The following fundamental result controls the deviation of a quadratic form \\(X^\\top A X\\) from its mean.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.7 (Hanson-Wright Inequality)</div>
                    <div class="env-body">
                        <p>Let \\(X = (X_1, \\ldots, X_d)\\) be a random vector with independent, mean-zero, sub-Gaussian components satisfying \\(\\|X_i\\|_{\\psi_2} \\leq K\\).  Let \\(A\\) be a \\(d \\times d\\) matrix.  Then for every \\(t \\geq 0\\),</p>
                        \\[\\mathbb{P}\\bigl(|X^\\top A X - \\mathbb{E}[X^\\top A X]| \\geq t\\bigr) \\leq 2 \\exp\\biggl(-c \\min\\biggl(\\frac{t^2}{K^4 \\|A\\|_F^2},\\; \\frac{t}{K^2 \\|A\\|_{\\mathrm{op}}}\\biggr)\\biggr)\\]
                        <p>where \\(c &gt; 0\\) is an absolute constant, \\(\\|A\\|_F = (\\sum_{i,j} A_{ij}^2)^{1/2}\\) is the Frobenius norm, and \\(\\|A\\|_{\\mathrm{op}}\\) is the operator norm.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Two Regimes of Concentration</div>
                    <div class="env-body">
                        <p>The Hanson-Wright bound reveals two distinct regimes:</p>
                        <ul>
                            <li><strong>Sub-Gaussian regime</strong> (small \\(t\\)): When \\(t \\lesssim K^2 \\|A\\|_F^2 / \\|A\\|_{\\mathrm{op}}\\), the tail is <em>sub-Gaussian</em> with rate \\(\\exp(-ct^2/K^4\\|A\\|_F^2)\\).  This regime arises from the collective fluctuation of many small terms.</li>
                            <li><strong>Sub-exponential regime</strong> (large \\(t\\)): When \\(t \\gtrsim K^2 \\|A\\|_F^2/\\|A\\|_{\\mathrm{op}}\\), the tail is <em>sub-exponential</em> with rate \\(\\exp(-ct/K^2\\|A\\|_{\\mathrm{op}})\\).  This regime is governed by the largest eigenvalue of \\(A\\).</li>
                        </ul>
                        <p>The transition between regimes occurs at \\(t^* = K^2 \\|A\\|_F^2/\\|A\\|_{\\mathrm{op}}\\), which equals \\(K^2 \\operatorname{tr}(A^\\top A)/\\|A\\|_{\\mathrm{op}}\\) -- essentially the effective rank of \\(A^\\top A\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>The proof proceeds via the <strong>decoupling technique</strong> and moment generating functions.</p>
                        <p><strong>Step 1 (Decomposition).</strong> Write \\(X^\\top A X = \\sum_{i} A_{ii} X_i^2 + \\sum_{i \\neq j} A_{ij} X_i X_j\\).  The diagonal sum is a linear function of independent sub-exponential variables \\(X_i^2\\); the off-diagonal sum is a <em>chaos</em> of order 2.</p>
                        <p><strong>Step 2 (Decoupling).</strong> For the off-diagonal chaos, introduce an independent copy \\(X'\\) and use the decoupling inequality to bound \\(\\sum_{i \\neq j} A_{ij} X_i X_j\\) by \\(C \\sum_{i,j} A_{ij} X_i X_j'\\), which is a bilinear form in independent vectors.</p>
                        <p><strong>Step 3 (Conditioning + Hoeffding).</strong> Condition on \\(X'\\) and apply the sub-Gaussian Hoeffding bound (Chapter 1) to the resulting linear form in \\(X\\).  Then integrate over \\(X'\\) using another application of the sub-Gaussian bound.</p>
                        <p>The Frobenius norm controls the variance (sub-Gaussian regime) while the operator norm controls the worst-case single-direction deviation (sub-exponential regime).</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 3.8 (Chi-Squared Concentration)</div>
                    <div class="env-body">
                        <p>Let \\(X \\sim \\mathcal{N}(0, I_d)\\) and \\(A = I_d\\).  Then \\(X^\\top A X = \\|X\\|_2^2 \\sim \\chi^2_d\\), with \\(\\mathbb{E}[\\|X\\|_2^2] = d\\).  The Hanson-Wright inequality gives</p>
                        \\[\\mathbb{P}\\bigl(|\\|X\\|_2^2 - d| \\geq t\\bigr) \\leq 2\\exp\\bigl(-c\\min(t^2/d,\\, t)\\bigr).\\]
                        <p>In particular, \\(\\|X\\|_2^2\\) concentrates within \\(\\pm O(\\sqrt{d})\\) of its mean \\(d\\), confirming that \\(\\|X\\|_2 \\approx \\sqrt{d}\\).  This is the <strong>thin shell phenomenon</strong> (previewed in Chapter 0).</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning (Independence is Essential)</div>
                    <div class="env-body">
                        <p>The Hanson-Wright inequality requires <em>independent</em> components of \\(X\\).  For general sub-Gaussian vectors with dependent components, concentration of quadratic forms may fail or require additional structural assumptions (e.g., log-concavity).  The inequality can be extended to vectors with independent sub-Gaussian components after a whitening transformation.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Apply the Hanson-Wright inequality with \\(A = vv^\\top\\) (a rank-1 matrix) for a unit vector \\(v \\in S^{d-1}\\).  Show that you recover a sub-exponential tail for \\((v^\\top X)^2\\).  What are \\(\\|A\\|_F\\) and \\(\\|A\\|_{\\mathrm{op}}\\) in this case?',
                    hint: 'For \\(A = vv^\\top\\) with \\(\\|v\\| = 1\\), compute \\(\\|A\\|_F^2 = \\operatorname{tr}(A^\\top A) = \\operatorname{tr}(vv^\\top vv^\\top)\\) and \\(\\|A\\|_{\\mathrm{op}} = \\|vv^\\top\\|_{\\mathrm{op}}\\).  Note that \\(X^\\top A X = (v^\\top X)^2\\).',
                    solution: 'We have \\(\\|A\\|_F^2 = \\operatorname{tr}(vv^\\top vv^\\top) = \\operatorname{tr}(v(v^\\top v)v^\\top) = \\|v\\|^2 = 1\\), so \\(\\|A\\|_F = 1\\).  Also \\(\\|A\\|_{\\mathrm{op}} = 1\\) (the sole nonzero eigenvalue is 1).  The Hanson-Wright bound gives \\(\\mathbb{P}(|(v^\\top X)^2 - \\mathbb{E}(v^\\top X)^2| \\geq t) \\leq 2\\exp(-c\\min(t^2/K^4, t/K^2))\\).  Since \\(\\|A\\|_F = \\|A\\|_{\\mathrm{op}}\\), the transition occurs at \\(t^* = K^2\\), and the tail is sub-exponential for all \\(t \\geq K^2\\).  This is consistent with \\((v^\\top X)^2\\) being the square of a sub-Gaussian, hence sub-exponential.'
                },
                {
                    question: 'Let \\(X \\in \\mathbb{R}^d\\) have i.i.d. \\(\\mathcal{N}(0,1)\\) entries and let \\(A\\) be a \\(d \\times d\\) symmetric matrix with eigenvalues \\(\\lambda_1 \\geq \\cdots \\geq \\lambda_d\\).  Compute \\(\\mathbb{E}[X^\\top A X]\\) and verify that the Hanson-Wright parameters are \\(\\|A\\|_F^2 = \\sum_i \\lambda_i^2\\) and \\(\\|A\\|_{\\mathrm{op}} = \\max_i |\\lambda_i|\\).',
                    hint: 'Use the spectral decomposition \\(A = U \\Lambda U^\\top\\) and the rotational invariance of the Gaussian: \\(Y = U^\\top X \\sim \\mathcal{N}(0, I_d)\\), so \\(X^\\top A X = Y^\\top \\Lambda Y = \\sum_i \\lambda_i Y_i^2\\).',
                    solution: 'With \\(Y = U^\\top X \\sim \\mathcal{N}(0, I)\\), we get \\(X^\\top A X = \\sum_i \\lambda_i Y_i^2\\).  So \\(\\mathbb{E}[X^\\top A X] = \\sum_i \\lambda_i \\mathbb{E}[Y_i^2] = \\sum_i \\lambda_i = \\operatorname{tr}(A)\\).  For the norms: \\(\\|A\\|_F^2 = \\operatorname{tr}(A^2) = \\sum_i \\lambda_i^2\\) and \\(\\|A\\|_{\\mathrm{op}} = \\max_i |\\lambda_i| = |\\lambda_1|\\).  The effective rank is \\(r(A^\\top A) = \\sum \\lambda_i^2 / \\max \\lambda_i^2\\), which determines the crossover between sub-Gaussian and sub-exponential regimes.'
                }
            ]
        },

        // ============================================================
        //  SECTION 3 — Concentration of Norms
        // ============================================================
        {
            id: 'ch03-sec03',
            title: 'Concentration of Norms',
            content: `
                <h2>Concentration of Norms</h2>

                <p>One of the most striking phenomena in high dimensions is that the Euclidean norm of a random vector concentrates sharply around a <strong>deterministic value</strong>.  Informally: in high dimensions, random vectors of similar length cluster tightly near a <strong>thin spherical shell</strong>.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.9 (Norm Concentration for Sub-Gaussian Vectors)</div>
                    <div class="env-body">
                        <p>Let \\(X \\in \\mathbb{R}^d\\) be a sub-Gaussian random vector with \\(\\|X\\|_{\\psi_2} \\leq K\\), mean zero, and covariance matrix \\(\\Sigma\\).  Then</p>
                        \\[\\mathbb{P}\\Bigl(\\bigl|\\,\\|X\\|_2 - \\sqrt{\\operatorname{tr}(\\Sigma)}\\,\\bigr| \\geq t\\Bigr) \\leq 2\\exp\\biggl(-\\frac{ct^2}{K^4}\\biggr)\\]
                        <p>for all \\(t \\geq 0\\), where \\(c &gt; 0\\) is an absolute constant.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">The Thin Shell</div>
                    <div class="env-body">
                        <p>Since \\(\\operatorname{tr}(\\Sigma) = \\sum_{i=1}^d \\operatorname{Var}(X_i)\\), the norm \\(\\|X\\|_2\\) concentrates around \\(\\sqrt{\\operatorname{tr}(\\Sigma)}\\).  For an isotropic vector (\\(\\Sigma = I_d\\)), this means \\(\\|X\\|_2 \\approx \\sqrt{d}\\) with deviations of order \\(O(1)\\) (not \\(O(\\sqrt{d})\\)).  As \\(d\\) grows, the <strong>relative</strong> fluctuation \\(|\\|X\\|_2 - \\sqrt{d}|/\\sqrt{d}\\) shrinks like \\(1/\\sqrt{d}\\), and the random vector lies in an increasingly thin shell of radius \\(\\sqrt{d}\\) and thickness \\(O(1)\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof of Theorem 3.9</div>
                    <div class="env-body">
                        <p>The proof uses Hanson-Wright to control \\(\\|X\\|_2^2\\), then transfers to \\(\\|X\\|_2\\).</p>
                        <p><strong>Step 1.</strong> Apply Hanson-Wright (Theorem 3.7) with \\(A = I_d\\):</p>
                        \\[\\mathbb{P}\\bigl(|\\|X\\|_2^2 - \\operatorname{tr}(\\Sigma)| \\geq s\\bigr) \\leq 2\\exp\\bigl(-c\\min(s^2/(K^4 d),\\, s/K^2)\\bigr).\\]
                        <p>(Here \\(\\|I\\|_F^2 = d\\) and \\(\\|I\\|_{\\mathrm{op}} = 1\\), and \\(\\mathbb{E}[\\|X\\|_2^2] = \\operatorname{tr}(\\Sigma)\\) when \\(X\\) has independent sub-Gaussian components with appropriate variance.)</p>
                        <p><strong>Step 2.</strong> Use the identity \\(|a - b| = |a^2 - b^2|/(a + b)\\) with \\(a = \\|X\\|_2\\) and \\(b = \\sqrt{\\operatorname{tr}(\\Sigma)}\\):</p>
                        \\[\\bigl|\\|X\\|_2 - \\sqrt{\\operatorname{tr}(\\Sigma)}\\bigr| = \\frac{|\\|X\\|_2^2 - \\operatorname{tr}(\\Sigma)|}{\\|X\\|_2 + \\sqrt{\\operatorname{tr}(\\Sigma)}} \\leq \\frac{|\\|X\\|_2^2 - \\operatorname{tr}(\\Sigma)|}{\\sqrt{\\operatorname{tr}(\\Sigma)}}.\\]
                        <p><strong>Step 3.</strong> Setting \\(s = t\\sqrt{\\operatorname{tr}(\\Sigma)}\\) in the Hanson-Wright bound gives the result (in the sub-Gaussian regime, which dominates for \\(t \\lesssim K^2\\sqrt{d}\\)).</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 3.10 (Standard Gaussian)</div>
                    <div class="env-body">
                        <p>For \\(X \\sim \\mathcal{N}(0, I_d)\\), we have \\(K = O(1)\\) and \\(\\operatorname{tr}(\\Sigma) = d\\).  Theorem 3.9 gives</p>
                        \\[\\mathbb{P}\\bigl(|\\|X\\|_2 - \\sqrt{d}| \\geq t\\bigr) \\leq 2e^{-ct^2}.\\]
                        <p>This is sharp: \\(\\|X\\|_2^2 = \\chi^2_d\\) has standard deviation \\(\\sqrt{2d}\\), so \\(\\|X\\|_2\\) has standard deviation \\(\\approx 1/\\sqrt{2}\\) (by the delta method), independent of \\(d\\).</p>
                    </div>
                </div>

                <h3>Consequences for Pairwise Distances</h3>

                <p>A crucial consequence of norm concentration is that pairwise distances between independent random vectors also concentrate.</p>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 3.11 (Pairwise Distance Concentration)</div>
                    <div class="env-body">
                        <p>Let \\(X_1, \\ldots, X_n\\) be independent, isotropic, sub-Gaussian random vectors in \\(\\mathbb{R}^d\\) with \\(\\|X_i\\|_{\\psi_2} \\leq K\\).  Then for any \\(i \\neq j\\),</p>
                        \\[\\mathbb{P}\\bigl(|\\|X_i - X_j\\|_2 - \\sqrt{2d}| \\geq t\\bigr) \\leq 2e^{-ct^2/K^4}.\\]
                        <p>All \\(\\binom{n}{2}\\) pairwise distances are approximately \\(\\sqrt{2d}\\), so random points in high dimensions are <strong>nearly equidistant</strong>.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Near-Orthogonality)</div>
                    <div class="env-body">
                        <p>By a similar argument, for independent isotropic sub-Gaussian vectors \\(X_i, X_j \\in \\mathbb{R}^d\\), the inner product \\(\\langle X_i, X_j \\rangle\\) concentrates around 0 with sub-Gaussian tails.  Thus random vectors in high dimensions are <strong>nearly orthogonal</strong>.  This near-orthogonality is a key reason why random projections work so well for dimensionality reduction.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Let \\(X \\sim \\mathcal{N}(0, \\Sigma)\\) where \\(\\Sigma\\) has eigenvalues \\(\\lambda_1 \\geq \\cdots \\geq \\lambda_d &gt; 0\\).  Compute \\(\\mathbb{E}[\\|X\\|_2^2]\\) and \\(\\operatorname{Var}(\\|X\\|_2^2)\\).  Show that the relative fluctuation \\(\\operatorname{Var}(\\|X\\|_2^2)/\\mathbb{E}[\\|X\\|_2^2]^2 \\leq 2/r(\\Sigma)\\) where \\(r(\\Sigma)\\) is the effective rank.',
                    hint: 'Write \\(X = U \\Lambda^{1/2} Z\\) with \\(Z \\sim \\mathcal{N}(0, I)\\).  Then \\(\\|X\\|^2 = \\sum \\lambda_i Z_i^2\\), a sum of independent scaled chi-squared variables.',
                    solution: '\\(\\mathbb{E}[\\|X\\|^2] = \\sum \\lambda_i = \\operatorname{tr}(\\Sigma)\\).  Since \\(\\operatorname{Var}(Z_i^2) = 2\\), we get \\(\\operatorname{Var}(\\|X\\|^2) = 2\\sum \\lambda_i^2 = 2\\|\\Sigma\\|_F^2\\).  The relative variance is \\(2\\|\\Sigma\\|_F^2 / (\\operatorname{tr}\\Sigma)^2\\).  By Cauchy-Schwarz, \\(\\|\\Sigma\\|_F^2 = \\sum \\lambda_i^2 \\geq (\\operatorname{tr}\\Sigma)^2/d\\) with equality for isotropic.  Also \\(\\sum \\lambda_i^2 \\leq \\lambda_1 \\sum \\lambda_i = \\|\\Sigma\\|_{\\mathrm{op}} \\operatorname{tr}(\\Sigma)\\), so relative variance \\(\\leq 2\\|\\Sigma\\|_{\\mathrm{op}}/\\operatorname{tr}(\\Sigma) = 2/r(\\Sigma)\\).'
                }
            ]
        },

        // ============================================================
        //  SECTION 4 — Johnson-Lindenstrauss Lemma
        // ============================================================
        {
            id: 'ch03-sec04',
            title: 'Johnson-Lindenstrauss Lemma',
            content: `
                <h2>The Johnson-Lindenstrauss Lemma</h2>

                <p>We arrive at one of the most celebrated results in high-dimensional geometry: the <strong>Johnson-Lindenstrauss (JL) lemma</strong>.  It states that any finite set of points in arbitrarily high dimensions can be embedded into \\(O(\\log n)\\) dimensions while approximately preserving all pairwise distances.  The required target dimension depends on the <em>number of points</em>, not the ambient dimension.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.12 (Johnson-Lindenstrauss Lemma, 1984)</div>
                    <div class="env-body">
                        <p>Let \\(\\varepsilon \\in (0, 1)\\) and let \\(x_1, \\ldots, x_n \\in \\mathbb{R}^d\\) be any \\(n\\) points.  There exists a linear map \\(f: \\mathbb{R}^d \\to \\mathbb{R}^k\\) with</p>
                        \\[k = O\\!\\left(\\frac{\\log n}{\\varepsilon^2}\\right)\\]
                        <p>such that for all \\(i, j \\in \\{1, \\ldots, n\\}\\),</p>
                        \\[(1 - \\varepsilon)\\|x_i - x_j\\|_2^2 \\leq \\|f(x_i) - f(x_j)\\|_2^2 \\leq (1 + \\varepsilon)\\|x_i - x_j\\|_2^2.\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why This is Remarkable</div>
                    <div class="env-body">
                        <p>Consider \\(n = 10^6\\) points in \\(\\mathbb{R}^{10^9}\\) (a billion dimensions).  The JL lemma says we can project them down to \\(k \\approx 20/\\varepsilon^2 \\cdot \\log(10^6) \\approx 280/\\varepsilon^2\\) dimensions while preserving all pairwise distances up to a factor \\(1 \\pm \\varepsilon\\).  With \\(\\varepsilon = 0.1\\), that is about \\(k \\approx 28{,}000\\) -- a compression ratio of 36,000:1.  The proof is nonconstructive in the original statement but becomes <em>algorithmic</em> via random projections.</p>
                    </div>
                </div>

                <h3>Proof via Gaussian Random Projection</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 3.13 (Gaussian Random Projection)</div>
                    <div class="env-body">
                        <p>The <strong>Gaussian random projection</strong> from \\(\\mathbb{R}^d\\) to \\(\\mathbb{R}^k\\) is the map \\(f(x) = \\frac{1}{\\sqrt{k}} \\Pi x\\), where \\(\\Pi\\) is a \\(k \\times d\\) matrix with i.i.d. entries \\(\\Pi_{ij} \\sim \\mathcal{N}(0, 1)\\).</p>
                    </div>
                </div>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 3.14 (Distributional JL)</div>
                    <div class="env-body">
                        <p>Let \\(x \\in \\mathbb{R}^d\\) be a fixed vector with \\(\\|x\\|_2 = 1\\), and let \\(\\Pi\\) be a \\(k \\times d\\) Gaussian random matrix.  Then for any \\(\\varepsilon \\in (0, 1)\\),</p>
                        \\[\\mathbb{P}\\biggl(\\biggl|\\frac{1}{k}\\|\\Pi x\\|_2^2 - 1\\biggr| \\geq \\varepsilon\\biggr) \\leq 2\\exp\\biggl(-\\frac{k\\varepsilon^2}{8}\\biggr).\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof of Lemma 3.14</div>
                    <div class="env-body">
                        <p>Since \\(\\|x\\| = 1\\), the rotational invariance of the Gaussian gives \\(\\Pi x \\sim \\mathcal{N}(0, I_k)\\).  So \\(\\|\\Pi x\\|_2^2 = \\sum_{i=1}^k Z_i^2\\) where \\(Z_i \\sim \\mathcal{N}(0,1)\\) are i.i.d.  We need \\(|\\frac{1}{k}\\sum Z_i^2 - 1| &lt; \\varepsilon\\).</p>
                        <p>Each \\(Z_i^2 - 1\\) is sub-exponential with \\(\\|Z_i^2 - 1\\|_{\\psi_1} \\leq C\\).  By Bernstein's inequality (Theorem 2.8 from Chapter 2):</p>
                        \\[\\mathbb{P}\\biggl(\\biggl|\\frac{1}{k}\\sum_{i=1}^k Z_i^2 - 1\\biggr| \\geq \\varepsilon\\biggr) \\leq 2\\exp\\bigl(-ck\\min(\\varepsilon^2, \\varepsilon)\\bigr).\\]
                        <p>For \\(\\varepsilon \\in (0,1)\\), the minimum is \\(\\varepsilon^2\\), giving the stated bound.</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof of the JL Lemma (Theorem 3.12)</div>
                    <div class="env-body">
                        <p><strong>Step 1.</strong> Fix a pair \\((i,j)\\) and let \\(u = (x_i - x_j)/\\|x_i - x_j\\|_2\\), a unit vector.  By Lemma 3.14,</p>
                        \\[\\mathbb{P}\\bigl(|\\|f(x_i) - f(x_j)\\|_2^2 - \\|x_i - x_j\\|_2^2| \\geq \\varepsilon \\|x_i - x_j\\|_2^2\\bigr) \\leq 2e^{-ck\\varepsilon^2}.\\]
                        <p><strong>Step 2 (Union Bound).</strong> There are \\(\\binom{n}{2} \\leq n^2/2\\) pairs.  We need</p>
                        \\[n^2 \\cdot e^{-ck\\varepsilon^2} \\leq \\delta.\\]
                        <p>Choosing \\(k \\geq \\frac{C(\\log n + \\log(1/\\delta))}{\\varepsilon^2}\\) ensures all pairwise distances are preserved with probability \\(\\geq 1 - \\delta\\).</p>
                        <p>Setting \\(\\delta = 1/n\\) (say) gives \\(k = O(\\log n / \\varepsilon^2)\\).</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-jl-demo"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Optimality)</div>
                    <div class="env-body">
                        <p>The bound \\(k = \\Omega(\\log n / \\varepsilon^2)\\) is <strong>optimal</strong> up to constants.  Alon (2003) showed that for certain point configurations, no embedding into fewer than \\(\\Omega(\\log n / \\varepsilon^2)\\) dimensions can preserve all distances.  The JL lemma is therefore tight.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-jl-demo',
                    title: 'Johnson-Lindenstrauss Demo: Random Projection Distortion',
                    description: 'Generate random points in high dimensions, project to low dimensions via Gaussian random projection. The histogram shows the distortion ratio ||f(xi)-f(xj)||/||xi-xj|| for all pairs; the shaded region marks the (1-eps, 1+eps) band.',
                    setup: function(container, controls) {
                        // Canvas setup
                        var W = 700, H = 420;
                        var viz = new VizEngine(container, { width: W, height: H, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        // Parameters
                        var d = 200, k = 30, nPts = 40, eps = 0.3;

                        var dSlider = VizEngine.createSlider(controls, 'd', 10, 500, d, 10, function(v) { d = Math.round(v); generate(); });
                        var kSlider = VizEngine.createSlider(controls, 'k', 2, 200, k, 1, function(v) { k = Math.round(v); generate(); });
                        var nSlider = VizEngine.createSlider(controls, 'n', 5, 80, nPts, 1, function(v) { nPts = Math.round(v); generate(); });
                        var eSlider = VizEngine.createSlider(controls, '\u03B5', 0.05, 0.9, eps, 0.05, function(v) { eps = v; draw(); });
                        VizEngine.createButton(controls, 'Re-sample', function() { generate(); });

                        // Normal random via Box-Muller
                        function randn() {
                            var u = 0, v = 0;
                            while (u === 0) u = Math.random();
                            while (v === 0) v = Math.random();
                            return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
                        }

                        var points = [];     // n x d
                        var projected = [];  // n x k
                        var origDists = [];  // pairwise original distances
                        var projDists = [];  // pairwise projected distances
                        var ratios = [];     // distortion ratios

                        function generate() {
                            // Generate n random points in R^d
                            points = [];
                            for (var i = 0; i < nPts; i++) {
                                var p = [];
                                for (var j = 0; j < d; j++) p.push(randn());
                                points.push(p);
                            }

                            // Generate k x d Gaussian matrix
                            var Pi = [];
                            for (var i = 0; i < k; i++) {
                                var row = [];
                                for (var j = 0; j < d; j++) row.push(randn());
                                Pi.push(row);
                            }

                            // Project: f(x) = (1/sqrt(k)) * Pi * x
                            var scale = 1.0 / Math.sqrt(k);
                            projected = [];
                            for (var i = 0; i < nPts; i++) {
                                var q = [];
                                for (var r = 0; r < k; r++) {
                                    var s = 0;
                                    for (var c = 0; c < d; c++) s += Pi[r][c] * points[i][c];
                                    q.push(s * scale);
                                }
                                projected.push(q);
                            }

                            // Compute pairwise distances
                            origDists = [];
                            projDists = [];
                            ratios = [];
                            for (var i = 0; i < nPts; i++) {
                                for (var j = i + 1; j < nPts; j++) {
                                    var dOrig = 0, dProj = 0;
                                    for (var c = 0; c < d; c++) {
                                        var diff = points[i][c] - points[j][c];
                                        dOrig += diff * diff;
                                    }
                                    for (var c = 0; c < k; c++) {
                                        var diff = projected[i][c] - projected[j][c];
                                        dProj += diff * diff;
                                    }
                                    dOrig = Math.sqrt(dOrig);
                                    dProj = Math.sqrt(dProj);
                                    if (dOrig > 1e-10) {
                                        origDists.push(dOrig);
                                        projDists.push(dProj);
                                        ratios.push(dProj / dOrig);
                                    }
                                }
                            }
                            draw();
                        }

                        function draw() {
                            viz.clear();

                            if (ratios.length === 0) return;

                            var marginL = 70, marginR = 30, marginT = 50, marginB = 60;
                            var plotW = W - marginL - marginR;
                            var plotH = H - marginT - marginB;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Distortion Ratio ||f(xi)-f(xj)|| / ||xi-xj||', W / 2, 10);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('d=' + d + '  k=' + k + '  n=' + nPts + '  pairs=' + ratios.length, W / 2, 30);

                            // Histogram of ratios
                            var nBins = 40;
                            var rMin = Math.min.apply(null, ratios);
                            var rMax = Math.max.apply(null, ratios);
                            // Ensure range includes [1-eps, 1+eps]
                            var lo = Math.min(rMin - 0.02, 1 - eps - 0.1);
                            var hi = Math.max(rMax + 0.02, 1 + eps + 0.1);
                            var binW = (hi - lo) / nBins;
                            var bins = new Array(nBins).fill(0);
                            for (var i = 0; i < ratios.length; i++) {
                                var b = Math.floor((ratios[i] - lo) / binW);
                                if (b < 0) b = 0;
                                if (b >= nBins) b = nBins - 1;
                                bins[b]++;
                            }
                            var maxCount = Math.max.apply(null, bins);
                            if (maxCount === 0) maxCount = 1;

                            // Draw (1-eps, 1+eps) band
                            var bandL = marginL + ((1 - eps) - lo) / (hi - lo) * plotW;
                            var bandR = marginL + ((1 + eps) - lo) / (hi - lo) * plotW;
                            ctx.fillStyle = 'rgba(63, 185, 160, 0.12)';
                            ctx.fillRect(bandL, marginT, bandR - bandL, plotH);

                            // Draw vertical lines at 1-eps and 1+eps
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            ctx.moveTo(bandL, marginT);
                            ctx.lineTo(bandL, marginT + plotH);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(bandR, marginT);
                            ctx.lineTo(bandR, marginT + plotH);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw vertical line at 1
                            var oneX = marginL + (1 - lo) / (hi - lo) * plotW;
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(oneX, marginT);
                            ctx.lineTo(oneX, marginT + plotH);
                            ctx.stroke();

                            // Labels for bounds
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('1-\u03B5', bandL, marginT - 2);
                            ctx.fillText('1+\u03B5', bandR, marginT - 2);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('1', oneX, marginT - 2);

                            // Draw histogram bars
                            var barW = plotW / nBins;
                            var outsideCount = 0;
                            for (var i = 0; i < nBins; i++) {
                                var binCenter = lo + (i + 0.5) * binW;
                                var barH = (bins[i] / maxCount) * plotH * 0.9;
                                var bx = marginL + i * barW;
                                var by = marginT + plotH - barH;

                                var inside = binCenter >= (1 - eps) && binCenter <= (1 + eps);
                                if (!inside && bins[i] > 0) outsideCount += bins[i];

                                ctx.fillStyle = inside ? 'rgba(88, 166, 255, 0.7)' : 'rgba(248, 81, 73, 0.7)';
                                ctx.fillRect(bx + 1, by, barW - 2, barH);

                                ctx.strokeStyle = inside ? viz.colors.blue : viz.colors.red;
                                ctx.lineWidth = 0.5;
                                ctx.strokeRect(bx + 1, by, barW - 2, barH);
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(marginL, marginT + plotH);
                            ctx.lineTo(marginL + plotW, marginT + plotH);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(marginL, marginT);
                            ctx.lineTo(marginL, marginT + plotH);
                            ctx.stroke();

                            // X-axis ticks
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            var tickStep = 0.1;
                            if (hi - lo > 2) tickStep = 0.2;
                            if (hi - lo > 4) tickStep = 0.5;
                            for (var t = Math.ceil(lo / tickStep) * tickStep; t <= hi; t += tickStep) {
                                var tx = marginL + (t - lo) / (hi - lo) * plotW;
                                ctx.beginPath();
                                ctx.moveTo(tx, marginT + plotH);
                                ctx.lineTo(tx, marginT + plotH + 5);
                                ctx.stroke();
                                ctx.fillText(t.toFixed(1), tx, marginT + plotH + 8);
                            }

                            // Y-axis label
                            ctx.save();
                            ctx.translate(15, marginT + plotH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Count', 0, 0);
                            ctx.restore();

                            // X-axis label
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Distortion ratio', W / 2, H - 8);

                            // Statistics box
                            var mean = 0, variance = 0;
                            for (var i = 0; i < ratios.length; i++) mean += ratios[i];
                            mean /= ratios.length;
                            for (var i = 0; i < ratios.length; i++) variance += (ratios[i] - mean) * (ratios[i] - mean);
                            variance /= ratios.length;
                            var std = Math.sqrt(variance);
                            var pctInside = ((ratios.length - outsideCount) / ratios.length * 100).toFixed(1);

                            ctx.fillStyle = 'rgba(12, 12, 32, 0.85)';
                            ctx.fillRect(W - 210, marginT + 4, 195, 80);
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(W - 210, marginT + 4, 195, 80);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Mean ratio: ' + mean.toFixed(4), W - 200, marginT + 10);
                            ctx.fillText('Std dev: ' + std.toFixed(4), W - 200, marginT + 26);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('In (1\u00B1\u03B5): ' + pctInside + '%', W - 200, marginT + 42);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('JL bound: k \u2265 ' + Math.ceil(8 * Math.log(nPts) / (eps * eps)), W - 200, marginT + 58);

                            // Theoretical bound comparison
                            var kTheory = Math.ceil(8 * Math.log(nPts) / (eps * eps));
                            ctx.fillStyle = k >= kTheory ? viz.colors.green : viz.colors.red;
                            ctx.font = 'bold 11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText(k >= kTheory ? 'k \u2265 JL bound \u2713' : 'k < JL bound \u2717', W - 200, marginT + 74);
                        }

                        generate();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that Lemma 3.14 implies that a single Gaussian random projection preserves the norm of any <em>fixed</em> unit vector with high probability.  Then explain why the union bound over \\(\\binom{n}{2}\\) pairs introduces the \\(\\log n\\) factor in the JL lemma.',
                    hint: 'For a single pair, the failure probability is \\(2e^{-ck\\varepsilon^2}\\).  For all \\(\\binom{n}{2}\\) pairs, sum the failure probabilities.  What \\(k\\) makes this sum small?',
                    solution: 'Lemma 3.14 gives \\(\\mathbb{P}(|\\|f(u)\\|^2 - 1| \\geq \\varepsilon) \\leq 2e^{-ck\\varepsilon^2}\\) for a fixed unit vector \\(u\\).  Applying this to \\(u_{ij} = (x_i - x_j)/\\|x_i - x_j\\|\\) and taking a union bound over all \\(\\binom{n}{2} \\leq n^2\\) pairs: \\(\\mathbb{P}(\\exists (i,j): \\text{distortion} &gt; \\varepsilon) \\leq n^2 \\cdot 2e^{-ck\\varepsilon^2}\\).  Setting this \\(\\leq \\delta\\) and solving: \\(k \\geq \\frac{2\\log n + \\log(2/\\delta)}{c\\varepsilon^2}\\).  The \\(\\log n\\) factor is the "price" of the union bound over \\(n^2\\) pairs.'
                },
                {
                    question: 'The JL lemma preserves <em>distances</em>.  Does it also preserve <em>inner products</em>?  That is, if \\((1-\\varepsilon)\\|x\\|^2 \\leq \\|f(x)\\|^2 \\leq (1+\\varepsilon)\\|x\\|^2\\) for all \\(x \\in \\{x_i - x_j\\}\\) and all \\(x_i\\), can you deduce approximate preservation of \\(\\langle x_i, x_j \\rangle\\)?',
                    hint: 'Use the polarization identity: \\(\\langle x_i, x_j \\rangle = \\frac{1}{2}(\\|x_i\\|^2 + \\|x_j\\|^2 - \\|x_i - x_j\\|^2)\\).',
                    solution: 'By the polarization identity, \\(\\langle f(x_i), f(x_j) \\rangle = \\frac{1}{2}(\\|f(x_i)\\|^2 + \\|f(x_j)\\|^2 - \\|f(x_i) - f(x_j)\\|^2)\\).  If we include \\(x_0 = 0\\) in the point set, then JL preserves \\(\\|x_i\\|^2\\), \\(\\|x_j\\|^2\\), and \\(\\|x_i - x_j\\|^2\\) up to \\(1 \\pm \\varepsilon\\).  Substituting: \\(|\\langle f(x_i), f(x_j) \\rangle - \\langle x_i, x_j \\rangle| \\leq \\varepsilon(\\|x_i\\|^2 + \\|x_j\\|^2 + \\|x_i - x_j\\|^2)/2 \\leq \\varepsilon(\\|x_i\\|^2 + \\|x_j\\|^2 + (\\|x_i\\| + \\|x_j\\|)^2)/2\\).  So inner products are approximately preserved, with additive error depending on the norms.'
                }
            ]
        },

        // ============================================================
        //  SECTION 5 — Random Projections in Practice
        // ============================================================
        {
            id: 'ch03-sec05',
            title: 'Random Projections in Practice',
            content: `
                <h2>Random Projections in Practice</h2>

                <p>The JL lemma is not just a theoretical curiosity -- it is the foundation of powerful algorithms in machine learning, databases, and signal processing.  We discuss practical variants of random projections and their applications.</p>

                <h3>Types of Random Projections</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 3.15 (Random Projection Families)</div>
                    <div class="env-body">
                        <p>A <strong>JL family</strong> is a distribution over linear maps \\(f: \\mathbb{R}^d \\to \\mathbb{R}^k\\) such that the distributional JL property (Lemma 3.14) holds.  Common families:</p>
                        <ol>
                            <li><strong>Gaussian:</strong> \\(\\Pi_{ij} \\sim \\mathcal{N}(0, 1/k)\\).  Simplest to analyze; each entry costs \\(O(1)\\) to generate and multiply.</li>
                            <li><strong>Rademacher (sign random):</strong> \\(\\Pi_{ij} = \\pm 1/\\sqrt{k}\\) with equal probability.  Same JL guarantees; faster to generate.</li>
                            <li><strong>Sparse (Achlioptas, 2003):</strong> \\(\\Pi_{ij} = \\begin{cases} +\\sqrt{3/k} & \\text{w.p. } 1/6 \\\\ 0 & \\text{w.p. } 2/3 \\\\ -\\sqrt{3/k} & \\text{w.p. } 1/6 \\end{cases}\\). Two-thirds of entries are zero, reducing computation to \\(O(dk/3)\\).</li>
                            <li><strong>Very sparse (Li, Hastie, Church, 2006):</strong> \\(\\Pi_{ij} = \\begin{cases} +\\sqrt{s/k} & \\text{w.p. } 1/(2s) \\\\ 0 & \\text{w.p. } 1 - 1/s \\\\ -\\sqrt{s/k} & \\text{w.p. } 1/(2s) \\end{cases}\\) with \\(s = \\sqrt{d}\\) or even \\(s = d/\\log d\\).  Reduces computation to \\(O(dk/s)\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.16 (Sub-Gaussian JL Property)</div>
                    <div class="env-body">
                        <p>All four families above satisfy the distributional JL property: for any fixed unit vector \\(x\\),</p>
                        \\[\\mathbb{P}\\bigl(|\\|\\Pi x\\|_2^2 - \\|x\\|_2^2| \\geq \\varepsilon\\|x\\|_2^2\\bigr) \\leq 2e^{-ck\\varepsilon^2}\\]
                        <p>for \\(\\varepsilon \\in (0, 1)\\).  The proof relies on the fact that any of these random matrices, applied to a fixed vector, produces a sum of independent sub-Gaussian or sub-exponential random variables, to which Bernstein-type bounds apply.</p>
                    </div>
                </div>

                <h3>Computational Aspects</h3>

                <div class="env-block remark">
                    <div class="env-title">Remark (Time Complexity)</div>
                    <div class="env-body">
                        <p>Computing \\(\\Pi x\\) for a single vector \\(x \\in \\mathbb{R}^d\\) costs:</p>
                        <ul>
                            <li><strong>Dense Gaussian/Rademacher:</strong> \\(O(kd)\\) -- a full matrix-vector multiply.</li>
                            <li><strong>Achlioptas sparse:</strong> \\(O(kd/3)\\) -- only 1/3 of entries are nonzero.</li>
                            <li><strong>Very sparse:</strong> \\(O(kd/s)\\) with \\(s = \\sqrt{d}\\), giving \\(O(k\\sqrt{d})\\).</li>
                            <li><strong>Fast JL (Ailon-Chazelle, 2009):</strong> \\(O(d \\log d + k^2)\\) via randomized Hadamard transforms, beating naive multiplication.</li>
                        </ul>
                        <p>For projecting \\(n\\) points, the total cost is multiplied by \\(n\\).</p>
                    </div>
                </div>

                <h3>Applications</h3>

                <h4>Nearest-Neighbor Search</h4>
                <p>Given a database of \\(n\\) points in \\(\\mathbb{R}^d\\) and a query point \\(q\\), we want to find the closest point.  Exact search costs \\(O(nd)\\).  Random projection reduces the dimension to \\(k = O(\\varepsilon^{-2} \\log n)\\), reducing the search cost to \\(O(nk) = O(n \\varepsilon^{-2} \\log n)\\).  More importantly, it enables <strong>locality-sensitive hashing</strong> (LSH) for sub-linear search.</p>

                <h4>Compressed Sensing and Sketching</h4>
                <p>Random projections serve as <strong>measurement matrices</strong> in compressed sensing: if \\(x \\in \\mathbb{R}^d\\) is \\(s\\)-sparse, then \\(O(s \\log(d/s))\\) random measurements suffice to recover \\(x\\) exactly (Chapter 8).  In streaming algorithms, a random projection can maintain a "sketch" of a high-dimensional data stream in low memory.</p>

                <h4>Dimensionality Reduction for Learning</h4>
                <p>Many machine learning algorithms (SVM, k-means, nearest neighbor classifiers) depend only on pairwise distances or inner products.  JL guarantees that projecting features to \\(O(\\log n / \\varepsilon^2)\\) dimensions preserves the relevant geometry, often with <em>negligible loss in classification accuracy</em>.</p>

                <div class="viz-placeholder" data-viz="viz-random-proj"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.17 (Approximate Nearest Neighbor Preservation)</div>
                    <div class="env-body">
                        <p>Let \\(x_1, \\ldots, x_n \\in \\mathbb{R}^d\\) and let \\(f\\) be a JL embedding with distortion \\(\\varepsilon\\).  If \\(x_j\\) is the nearest neighbor of \\(x_i\\) in the original space, then in the projected space, \\(x_j\\) is a \\((1+4\\varepsilon)\\)-approximate nearest neighbor of \\(x_i\\):</p>
                        \\[\\|f(x_i) - f(x_j)\\|_2 \\leq (1 + 4\\varepsilon) \\min_{\\ell \\neq i} \\|f(x_i) - f(x_\\ell)\\|_2.\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Let \\(\\ell^*\\) be the nearest neighbor of \\(f(x_i)\\) in the projected space.  Then:</p>
                        \\[\\|f(x_i) - f(x_j)\\| \\leq \\sqrt{1+\\varepsilon}\\,\\|x_i - x_j\\| \\leq \\sqrt{1+\\varepsilon}\\,\\|x_i - x_{\\ell^*}\\| \\leq \\frac{\\sqrt{1+\\varepsilon}}{\\sqrt{1-\\varepsilon}}\\,\\|f(x_i) - f(x_{\\ell^*})\\|\\]
                        <p>where the first and third inequalities use JL, and the second uses \\(x_j\\) being the true nearest neighbor.  Since \\(\\frac{\\sqrt{1+\\varepsilon}}{\\sqrt{1-\\varepsilon}} \\leq 1 + 4\\varepsilon\\) for small \\(\\varepsilon\\), the result follows.</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Looking Ahead</div>
                    <div class="env-body">
                        <p>In Chapter 4, we will formalize the covering number and metric entropy framework that underlies these arguments.  The JL lemma can be seen as a consequence of a more general principle: random projections preserve the <strong>metric entropy</strong> of finite point sets.  In Chapters 5-7, we will study the sample covariance matrix \\(\\hat{\\Sigma}_n\\) in depth, using random matrix theory to characterize its spectral behavior when \\(d\\) and \\(n\\) grow simultaneously.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-random-proj',
                    title: 'Random Projection: Distance Preservation in 2D',
                    description: 'Points in 2D (or 3D) are projected to 1D (or 2D) via a random direction. Drag points to see how distances change. The bar chart compares original vs. projected pairwise distances.',
                    setup: function(container, controls) {
                        var W = 700, H = 440;
                        var viz = new VizEngine(container, { width: W, height: H, scale: 40, originX: 200, originY: 220 });
                        var ctx = viz.ctx;

                        // Points in 2D
                        var pts = [
                            { x: 1.5, y: 2.0 },
                            { x: -2.0, y: 1.0 },
                            { x: 0.5, y: -1.5 },
                            { x: -1.0, y: -2.0 },
                            { x: 2.5, y: -0.5 },
                            { x: -0.5, y: 2.5 }
                        ];
                        var ptColors = [viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.purple, viz.colors.red, viz.colors.pink];
                        var ptLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

                        // Random projection direction (angle)
                        var theta = Math.random() * Math.PI;

                        // Make points draggable
                        for (var i = 0; i < pts.length; i++) {
                            (function(idx) {
                                viz.addDraggable('pt' + idx, pts[idx].x, pts[idx].y, ptColors[idx], 7, function(nx, ny) {
                                    pts[idx].x = nx;
                                    pts[idx].y = ny;
                                });
                            })(i);
                        }

                        VizEngine.createButton(controls, 'New Direction', function() {
                            theta = Math.random() * Math.PI;
                        });

                        VizEngine.createButton(controls, 'Add Point', function() {
                            if (pts.length >= 10) return;
                            var nx = (Math.random() - 0.5) * 6;
                            var ny = (Math.random() - 0.5) * 6;
                            var colors = [viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.purple, viz.colors.red, viz.colors.pink, viz.colors.teal, viz.colors.yellow, viz.colors.white, '#ff69b4'];
                            var labels = ['A','B','C','D','E','F','G','H','I','J'];
                            var idx = pts.length;
                            pts.push({ x: nx, y: ny });
                            ptColors.push(colors[idx % colors.length]);
                            ptLabels.push(labels[idx % labels.length]);
                            viz.addDraggable('pt' + idx, nx, ny, ptColors[idx], 7, function(mx, my) {
                                pts[idx].x = mx;
                                pts[idx].y = my;
                            });
                        });

                        function draw() {
                            // Sync draggable positions
                            for (var i = 0; i < pts.length; i++) {
                                var dr = viz.draggables[i];
                                if (dr) {
                                    pts[i].x = dr.x;
                                    pts[i].y = dr.y;
                                }
                            }

                            viz.clear();

                            // Left panel: 2D scatter
                            var panelW = 380;

                            // Draw grid and axes for left panel
                            viz.drawGrid();
                            viz.drawAxes();

                            // Projection direction
                            var dirX = Math.cos(theta);
                            var dirY = Math.sin(theta);

                            // Draw projection line
                            viz.drawLine(-5 * dirX, -5 * dirY, 5 * dirX, 5 * dirY, viz.colors.teal + '60', 2, true);

                            // Draw points and their projections
                            var projVals = [];
                            for (var i = 0; i < pts.length; i++) {
                                var p = pts[i];
                                var proj = p.x * dirX + p.y * dirY;
                                projVals.push(proj);

                                // Projection onto line
                                var px = proj * dirX;
                                var py = proj * dirY;

                                // Dashed line from point to projection
                                viz.drawSegment(p.x, p.y, px, py, ptColors[i] + '50', 1, true);

                                // Projected point on line
                                viz.drawPoint(px, py, ptColors[i], '', 4);

                                // Original point
                                viz.drawPoint(p.x, p.y, ptColors[i], ptLabels[i], 6);
                            }

                            viz.drawDraggables();

                            // Right panel: distance comparison bar chart
                            var chartL = 410, chartT = 30, chartW = 260, chartH = H - 60;

                            // Background
                            ctx.fillStyle = 'rgba(20, 20, 46, 0.9)';
                            ctx.fillRect(chartL - 10, chartT - 15, chartW + 20, chartH + 25);
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(chartL - 10, chartT - 15, chartW + 20, chartH + 25);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Pairwise Distances', chartL + chartW / 2, chartT - 12);

                            // Compute pairwise distances
                            var pairs = [];
                            for (var i = 0; i < pts.length; i++) {
                                for (var j = i + 1; j < pts.length; j++) {
                                    var dOrig = Math.sqrt((pts[i].x - pts[j].x) ** 2 + (pts[i].y - pts[j].y) ** 2);
                                    var dProj = Math.abs(projVals[i] - projVals[j]);
                                    pairs.push({ i: i, j: j, orig: dOrig, proj: dProj });
                                }
                            }

                            if (pairs.length === 0) return;

                            var maxDist = 0;
                            for (var p = 0; p < pairs.length; p++) {
                                maxDist = Math.max(maxDist, pairs[p].orig, pairs[p].proj);
                            }
                            if (maxDist < 0.01) maxDist = 1;

                            var barGroupH = Math.min(22, (chartH - 30) / pairs.length);
                            var barH = barGroupH * 0.35;

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '9px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';

                            for (var p = 0; p < pairs.length && p < 20; p++) {
                                var pair = pairs[p];
                                var yBase = chartT + 18 + p * barGroupH;

                                // Label
                                ctx.fillStyle = viz.colors.text;
                                ctx.textAlign = 'right';
                                ctx.fillText(ptLabels[pair.i] + '-' + ptLabels[pair.j], chartL + 24, yBase + barGroupH * 0.35);

                                // Original distance bar
                                var w1 = (pair.orig / maxDist) * (chartW - 40);
                                ctx.fillStyle = viz.colors.blue + '99';
                                ctx.fillRect(chartL + 28, yBase, w1, barH);

                                // Projected distance bar
                                var w2 = (pair.proj / maxDist) * (chartW - 40);
                                ctx.fillStyle = viz.colors.teal + '99';
                                ctx.fillRect(chartL + 28, yBase + barH + 1, w2, barH);

                                // Ratio
                                var ratio = pair.orig > 0.01 ? pair.proj / pair.orig : 0;
                                ctx.fillStyle = ratio > 0.7 ? viz.colors.green : viz.colors.orange;
                                ctx.textAlign = 'left';
                                ctx.font = '8px monospace';
                                var rText = ratio.toFixed(2);
                                ctx.fillText(rText, chartL + 30 + Math.max(w1, w2) + 3, yBase + barGroupH * 0.35);
                            }

                            // Legend
                            var legY = chartT + chartH - 10;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(chartL + 20, legY, 10, 6);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '9px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('2D dist', chartL + 34, legY + 3);

                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillRect(chartL + 90, legY, 10, 6);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('1D proj', chartL + 104, legY + 3);

                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('ratio', chartL + 165, legY + 3);

                            // Direction indicator
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Proj dir: \u03B8=' + (theta * 180 / Math.PI).toFixed(0) + '\u00B0', 10, 10);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'The Achlioptas sparse projection uses entries that are \\(0\\) with probability \\(2/3\\).  Verify that \\(\\mathbb{E}[\\Pi_{ij}] = 0\\) and \\(\\mathbb{E}[\\Pi_{ij}^2] = 1/k\\), matching the Gaussian projection moments.  Why does matching these first two moments suffice for the JL property?',
                    hint: 'Compute the moments directly from the distribution \\(\\Pi_{ij} \\in \\{+\\sqrt{3/k}, 0, -\\sqrt{3/k}\\}\\) with probabilities \\(\\{1/6, 2/3, 1/6\\}\\).  For the second part, recall that the JL proof only uses the sub-Gaussian/sub-exponential property of \\(\\sum_j \\Pi_{ij} x_j\\), which depends on matching the variance.',
                    solution: '\\(\\mathbb{E}[\\Pi_{ij}] = \\frac{1}{6}\\sqrt{3/k} + \\frac{2}{3}\\cdot 0 + \\frac{1}{6}(-\\sqrt{3/k}) = 0\\).  \\(\\mathbb{E}[\\Pi_{ij}^2] = \\frac{1}{6}\\cdot(3/k) + \\frac{2}{3}\\cdot 0 + \\frac{1}{6}\\cdot(3/k) = 1/k\\).  These match the Gaussian projection moments \\(\\mathbb{E}[g/\\sqrt{k}] = 0\\) and \\(\\mathbb{E}[g^2/k] = 1/k\\).  The JL proof via Bernstein inequality only requires that \\(Y_i = (\\sum_j \\Pi_{ij}x_j)^2\\) are independent sub-exponential with the correct mean and bounded \\(\\psi_1\\)-norm.  The mean is fixed by \\(\\mathbb{E}[\\Pi_{ij}^2] = 1/k\\) and \\(\\mathbb{E}[\\Pi_{ij}\\Pi_{ij\'}] = 0\\) for \\(j \\neq j\'\\); the sub-exponential property follows from boundedness of the entries.'
                },
                {
                    question: '(Open-ended) Suppose you have \\(n = 10^5\\) data points in \\(\\mathbb{R}^{10^4}\\) and you want all pairwise distances preserved to within \\(10\\%\\).  (a) What target dimension \\(k\\) does the JL lemma guarantee?  (b) Compare the computational cost of a dense Gaussian projection vs. the Achlioptas sparse projection for projecting all \\(n\\) points.',
                    hint: 'For (a), use \\(k = C \\log n / \\varepsilon^2\\) with \\(\\varepsilon = 0.1\\).  For (b), the cost per point is \\(O(kd)\\) for dense and \\(O(kd/3)\\) for sparse.',
                    solution: '(a) With \\(\\varepsilon = 0.1\\) and \\(n = 10^5\\): \\(k \\geq C \\cdot \\frac{\\log(10^5)}{0.01} = C \\cdot \\frac{5\\ln 10}{0.01} \\approx 1150C\\).  Taking \\(C \\approx 8\\) (from Lemma 3.14), \\(k \\approx 9200\\).  In practice, \\(k \\approx 2000\\text{--}5000\\) often suffices.  (b) Dense: \\(n \\cdot k \\cdot d = 10^5 \\times 9200 \\times 10^4 \\approx 9.2 \\times 10^{12}\\) operations.  Sparse Achlioptas: \\(\\approx 3 \\times 10^{12}\\) operations (factor of 3 savings).  In both cases, the projection is much cheaper than computing all \\(\\binom{n}{2} \\approx 5 \\times 10^9\\) pairwise distances in the original space.'
                }
            ]
        }
    ]
});
