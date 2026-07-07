'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Loader2, Sparkles, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleContinue = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) { setErrors({ email: 'Please enter a valid email' }); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);
    setStep(2);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!password) errs.password = 'Password is required';
    else if (password.length < 4) errs.password = 'Password must be at least 4 characters';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    if (typeof window !== 'undefined') {
      localStorage.setItem('labelflow-auth', JSON.stringify({ email, ts: Date.now() }));
    }
    toast.success('Welcome back!', { description: `Logged in as ${email}` });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground w-full">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-white/15 backdrop-blur flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg">LabelFlow</span>
          </div>
          <div className="space-y-4 max-w-md">
            <h1 className="text-4xl font-bold leading-tight tracking-tight">Enterprise labeling, streamlined.</h1>
            <p className="text-primary-foreground/80 text-base leading-relaxed">Manage products, registrations, and label changes across regions from a single, unified platform trusted by regulated industries.</p>
            <div className="flex items-center gap-6 pt-4 text-sm">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /><span>SOC 2 Type II</span></div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /><span>21 CFR Part 11</span></div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /><span>ISO 27001</span></div>
            </div>
          </div>
          <p className="text-xs text-primary-foreground/60">© 2026 LabelFlow, Inc. All rights reserved.</p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-md animate-fade-in">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">LabelFlow</span>
          </div>

          <div className="rounded-xl border border-border bg-card p-8 shadow-enterprise-md">
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight">{step === 1 ? 'Sign in to LabelFlow' : 'Welcome back'}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {step === 1 ? 'Enter your work email to continue' : email}
              </p>
            </div>

            {step === 1 ? (
              <form onSubmit={handleContinue} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    autoFocus
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className={errors.email ? 'border-danger focus-visible:ring-danger/30' : ''}
                  />
                  {errors.email && <p className="text-xs text-danger">{errors.email}</p>}
                </div>
                <Button type="submit" className="w-full gap-1.5" disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Continue <ArrowRight className="h-4 w-4" /></>}
                </Button>
                <p className="text-xs text-center text-muted-foreground pt-2">
                  Don&apos;t have an account? <a className="text-primary hover:underline font-medium" href="#">Contact your admin</a>
                </p>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoFocus
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className={errors.password ? 'border-danger focus-visible:ring-danger/30 pr-10' : 'pr-10'}
                    />
                    <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center text-muted-foreground hover:text-foreground" aria-label="Toggle password visibility">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-danger">{errors.password}</p>}
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox checked={remember} onCheckedChange={setRemember} id="remember" />
                    <span className="text-sm text-muted-foreground">Remember me</span>
                  </label>
                  <a className="text-sm text-primary hover:underline font-medium" href="#">Forgot password?</a>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Signing in...</> : 'Log in'}
                </Button>
                <button type="button" onClick={() => { setStep(1); setPassword(''); setErrors({}); }} className="w-full text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5">
                  <ArrowLeft className="h-3.5 w-3.5" /> Use a different email
                </button>
              </form>
            )}
          </div>

          <p className="text-xs text-center text-muted-foreground mt-6">By continuing, you agree to our <a className="underline hover:text-foreground" href="#">Terms</a> and <a className="underline hover:text-foreground" href="#">Privacy Policy</a>.</p>
        </div>
      </div>
    </div>
  );
}
