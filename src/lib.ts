import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
export async function rpc<T=any>(fn:string,args:Record<string,any>={}){const {data,error}=await supabase.rpc(fn,args);if(error)throw error;return data as T;}
export const fmt=(n:number)=>new Intl.NumberFormat('en-IN').format(n??0);
export const money=(n:number|null)=>n==null?'—':new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(n);
export const time=(s:string)=>new Date(s).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'});
