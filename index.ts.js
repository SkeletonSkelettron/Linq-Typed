const t=require("timsort");Array.prototype.Add=function(t){n(this).push(t)},Array.prototype.AddRange=function(t){const r=n(this);for(let e=0;e<t.length;e++)r.push(t[e])},Array.prototype.Aggregate=function(t,r){return n(this).reduce(t,r)},Array.prototype.All=function(t){return n(this).every(t)},Array.prototype.Any=function(t){return t?n(this).some(t):n(this).length>0},Array.prototype.Append=function(t){const r=new s;return n(this).ForEach(t=>{r.array.push(t)}),r.array.push(t),r},Array.prototype.Average=function(t){return n(this).Sum(t)/n(this).Count(t)},Array.prototype.Cast=function(){return new s(n(this))},Array.prototype.Concat=function(t){return new s(n(this).concat(n(t)))},Array.prototype.Contains=function(t){return n(this).some(r=>r===t)},Array.prototype.Count=function(t){let r=n(this);return t?r.Where(t).Count():r.length},Array.prototype.DefaultIfEmpty=function(t){let r=n(this);return r.Count()?new s(r):new s([t])},Array.prototype.Distinct=function(){return n(this).Where((t,r,n)=>(e(t)?n.findIndex(r=>o(r,t)):n.IndexOf(t))===r)},Array.prototype.DistinctBy=function(t){const r=n(this).GroupBy(t,t=>t),e=new s([]);for(const t in r)r.hasOwnProperty(t)&&e.array.Add(r[t][0]);return e},Array.prototype.ElementAt=function(t){let r=n(this);if(t<r.Count())return r[t];{console.log();const r="ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source.";throw console.log("ElementAt - "+r+", index: "+t.toString()),new Error(r)}},Array.prototype.ElementAtOrDefault=function(t){return n(this).ElementAt(t)||void 0},Array.prototype.Except=function(t){return n(this).Where(r=>!t.Contains(r))},Array.prototype.FindAll=function(t){let r=[];return n(this).filter(t).forEach(t=>{r.push(t)}),r},Array.prototype.First=function(t){let r=n(this);if(r.Count())return t?r.Where(t).array[0]:r[0];throw new Error("InvalidOperationException: The source sequence is empty.")},Array.prototype.FirstOrDefault=function(t){let r=n(this);return r.Count(t)?r.First(t):void 0},Array.prototype.ForEach=function(t){return n(this).forEach(t)},Array.prototype.GroupBy=function(t,r){return r||(r=(t=>t)),n(this).Aggregate((e,n)=>{const o=t(n),i=e[o],u=r(n);return i?i.push(u):e[o]=[u],e},{})},Array.prototype.GroupJoin=function(t,r,e,o){return n(this).Select((n,i)=>o(n,t.Where(t=>r(n)===e(t))))},Array.prototype.GetRange=function(t,r){let e=new Array;for(let o=0;o<r;o++)e.push(n(this)[t+o]);return new s(e)},Array.prototype.IndexOf=function(t){return n(this).indexOf(t)},Array.prototype.Insert=function(t,r){let e=n(this);if(t<0||t>e.length)throw new Error("Index is out of range.");e.splice(t,0,r)},Array.prototype.InsertRange=function(t,r){let e=n(this);if(t<0||t>e.length)throw new Error("Index is out of range.");for(let n=0;n<r.length;n++)e.splice(t+n,0,r[n])},Array.prototype.Intersect=function(t){return new s(n(this).Where(r=>t.Contains(r)))},Array.prototype.Join=function(t,r,e,o){return new s(n(this).SelectMany(n=>t.Where(t=>e(t)===r(n)).Select(t=>o(n,t))))},Array.prototype.Last=function(t){let r=n(this);if(this.Count())return t?r.Where(t).Last():r[r.Count()-1];throw console.log("Last  - InvalidOperationException: The source sequence is empty."),Error("InvalidOperationException: The source sequence is empty.")},Array.prototype.LastOrDefault=function(t){let r=n(this);return r.Count(t)?r.Last(t):void 0},Array.prototype.Max=function(t){const r=t=>t;let e=n(this),o=t?t(e[0],0,e):r(e[0]);if(t)for(let r=0;r<e.length;r++)o=t(e[r],r,e)>o?o=t(e[r],r,e):o;else for(let t=0;t<e.length;t++)o=r(e[t])>o?o=r(e[t]):o;return o},Array.prototype.MaxBy=function(t){return n(this).OrderByDescending(t).FirstOrDefault()},Array.prototype.Min=function(t){const r=t=>t;let e=n(this),o=t?t(this[0],0,this):r(this[0]);if(t)for(let r=0;r<e.length;r++)o=t(e[r],r,e)<o?o=t(e[r],r,e):o;else for(let t=0;t<e.length;t++)o=r(e[t])<o?o=r(e[t]):o;return o},Array.prototype.MinBy=function(t){return n(this).OrderBy(t).ToArray().FirstOrDefault()},Array.prototype.OfType=function(t){let r,e=n(this);switch(t){case Number:r="number";break;case String:r="string";break;case Boolean:r=typeof!0;break;case Function:r="function";break;default:r=null}return null===r?e.Where(r=>r instanceof t).Cast():e.Where(t=>typeof t===r).Cast()},Array.prototype.OrderBy=function(t,r=i(t,!1)){return new s(n(this),r)},Array.prototype.OrderByDescending=function(t,r=i(t,!0)){return new s(n(this),r)},Array.prototype.Prepend=function(t){const r=new s;return r.array.push(t),n(this).ForEach(t=>{r.array.push(t)}),r},Array.prototype.ThenBy=function(t){return n(this).OrderBy(t)},Array.prototype.ThenByDescending=function(t){return n(this).OrderByDescending(t)},Array.prototype.Remove=function(t){let r=n(this);return-1!==r.IndexOf(t)&&(r.RemoveAt(r.IndexOf(t)),!0)},Array.prototype.RemoveAll=function(t){return n(this).Where(r(t))},Array.prototype.RemoveAt=function(t){return new s(n(this).splice(t,1))},Array.prototype.RemoveRange=function(t,r){return new s(n(this).splice(t,r))},Array.prototype.Reverse=function(){return new s(n(this).reverse())},Array.prototype.Select=function(t){return new s(n(this).map(t))},Array.prototype.SelectMany=function(t){let r=n(this);return r.Aggregate((e,n,o)=>(e.AddRange(r.Select(t).ElementAt(o).ToArray()),e),new Array)},Array.prototype.SequenceEqual=function(t){return!!n(this).reduce((r,e,n)=>t[n]===e?r:void 0)},Array.prototype.Single=function(t){let r=n(this);if(1!==r.Count(t))throw console.log("Single - The collection does not contain exactly one element."),new Error("The collection does not contain exactly one element.");return r.First(t)},Array.prototype.SingleOrDefault=function(t){let r=n(this);return r.Count(t)?r.Single(t):void 0},Array.prototype.Skip=function(t){return new s(n(this).slice(Math.max(0,t)))},Array.prototype.SkipLast=function(t){return new s(n(this).slice(0,Math.max(0,n(this).length-t)))},Array.prototype.SkipWhile=function(t){let r=n(this);return r.Skip(r.Aggregate((e,n)=>t(r.ElementAt(e))?++e:e,0))},Array.prototype.Sum=function(t){let r=n(this);return t?r.Select(t).Sum():r.Aggregate((t,r)=>t+=+r,0)},Array.prototype.Take=function(t){return new s(n(this).slice(0,Math.max(0,t)))},Array.prototype.TakeLast=function(t){return new s(n(this).slice(n(this).length-t,n(this).length))},Array.prototype.TakeWhile=function(t){let r=n(this);return r.Take(r.Aggregate(e=>t(r.ElementAt(e))?++e:e,0))},Array.prototype.ToArray=function(){return n(this)},Array.prototype.ToDictionary=function(t,r){let e=n(this);return new s(e.Aggregate((n,o,i)=>(n[e.Select(t).ElementAt(i).toString()]=r?e.Select(r).ElementAt(i):o,n.Add({Key:e.Select(t).ElementAt(i),Value:r?e.Select(r).ElementAt(i):o}),n),Array()))},Array.prototype.ToList=function(){return new s(this)},Array.prototype.ToLookup=function(t,r){return n(this).GroupBy(t,r)},Array.prototype.Union=function(t){return n(this).Concat(t).Distinct()},Array.prototype.Where=function(t){return new s(n(this).filter(t))},Array.prototype.Zip=function(t,r){let e=n(this);return t.Count()<this.Count()?t.Select((t,n)=>r(e.ElementAt(n),t)):e.Select((e,n)=>r(e,t.ElementAt(n)))};const r=t=>(...r)=>!t(...r),e=t=>"object"==typeof t,n=function(t){return t instanceof s?t.array:t},o=(t,r)=>Object.keys(t).every(n=>e(t[n])?o(r[n],t[n]):r[n]===t[n]),i=(t,r)=>(e,n)=>((t,r,e,n)=>{const o=e(t),i=e(r);return o>i?n?-1:1:o<i?n?1:-1:0})(e,n,t,r),u=(t,r)=>(e,n)=>t(e,n)||r(e,n);class s extends Array{constructor(r,e){super(),this._comparer=e,this.array=[],r&&(this.array=r),this._comparer&&t.sort(this.array,this._comparer)}ThenBy(t){return new s(n(this),u(this._comparer,i(t,!1)))}ThenByDescending(t){return new s(n(this),u(this._comparer,i(t,!0)))}}
//# sourceMappingURL=index.ts.js.map
