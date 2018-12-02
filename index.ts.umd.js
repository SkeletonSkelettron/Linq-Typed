!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e():"function"==typeof define&&define.amd?define(e):e()}(0,function(){const t=require("timsort");Array.prototype.Add=function(t){n(this).push(t)},Array.prototype.AddRange=function(t){const e=n(this);for(let r=0;r<t.length;r++)e.push(t[r])},Array.prototype.Aggregate=function(t,e){return n(this).reduce(t,e)},Array.prototype.All=function(t){return n(this).every(t)},Array.prototype.Any=function(t){return t?n(this).some(t):n(this).length>0},Array.prototype.Append=function(t){const e=new s;return n(this).ForEach(t=>{e.array.push(t)}),e.array.push(t),e},Array.prototype.Average=function(t){return n(this).Sum(t)/n(this).Count(t)},Array.prototype.Cast=function(){return new s(n(this))},Array.prototype.Concat=function(t){return new s(n(this).concat(n(t)))},Array.prototype.Contains=function(t){return n(this).some(e=>e===t)},Array.prototype.Count=function(t){let e=n(this);return t?e.Where(t).Count():e.length},Array.prototype.DefaultIfEmpty=function(t){let e=n(this);return e.Count()?new s(e):new s([t])},Array.prototype.Distinct=function(){return n(this).Where((t,e,n)=>(r(t)?n.findIndex(e=>o(e,t)):n.IndexOf(t))===e)},Array.prototype.DistinctBy=function(t){const e=n(this).GroupBy(t,t=>t),r=new s([]);for(const t in e)e.hasOwnProperty(t)&&r.array.Add(e[t][0]);return r},Array.prototype.ElementAt=function(t){let e=n(this);if(t<e.Count())return e[t];{console.log();const e="ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source.";throw console.log("ElementAt - "+e+", index: "+t.toString()),new Error(e)}},Array.prototype.ElementAtOrDefault=function(t){return n(this).ElementAt(t)||void 0},Array.prototype.Except=function(t){return n(this).Where(e=>!t.Contains(e))},Array.prototype.FindAll=function(t){let e=[];return n(this).filter(t).forEach(t=>{e.push(t)}),e},Array.prototype.First=function(t){let e=n(this);if(e.Count())return t?e.Where(t).array[0]:e[0];throw new Error("InvalidOperationException: The source sequence is empty.")},Array.prototype.FirstOrDefault=function(t){let e=n(this);return e.Count(t)?e.First(t):void 0},Array.prototype.ForEach=function(t){return n(this).forEach(t)},Array.prototype.GroupBy=function(t,e){return e||(e=(t=>t)),n(this).Aggregate((r,n)=>{const o=t(n),i=r[o],u=e(n);return i?i.push(u):r[o]=[u],r},{})},Array.prototype.GroupJoin=function(t,e,r,o){return n(this).Select((n,i)=>o(n,t.Where(t=>e(n)===r(t))))},Array.prototype.GetRange=function(t,e){let r=new Array;for(let o=0;o<e;o++)r.push(n(this)[t+o]);return new s(r)},Array.prototype.IndexOf=function(t){return n(this).indexOf(t)},Array.prototype.Insert=function(t,e){let r=n(this);if(t<0||t>r.length)throw new Error("Index is out of range.");r.splice(t,0,e)},Array.prototype.InsertRange=function(t,e){let r=n(this);if(t<0||t>r.length)throw new Error("Index is out of range.");for(let n=0;n<e.length;n++)r.splice(t+n,0,e[n])},Array.prototype.Intersect=function(t){return new s(n(this).Where(e=>t.Contains(e)))},Array.prototype.Join=function(t,e,r,o){return new s(n(this).SelectMany(n=>t.Where(t=>r(t)===e(n)).Select(t=>o(n,t))))},Array.prototype.Last=function(t){let e=n(this);if(this.Count())return t?e.Where(t).Last():e[e.Count()-1];throw console.log("Last  - InvalidOperationException: The source sequence is empty."),Error("InvalidOperationException: The source sequence is empty.")},Array.prototype.LastOrDefault=function(t){let e=n(this);return e.Count(t)?e.Last(t):void 0},Array.prototype.Max=function(t){const e=t=>t;let r=n(this),o=t?t(r[0],0,r):e(r[0]);if(t)for(let e=0;e<r.length;e++)o=t(r[e],e,r)>o?o=t(r[e],e,r):o;else for(let t=0;t<r.length;t++)o=e(r[t])>o?o=e(r[t]):o;return o},Array.prototype.MaxBy=function(t){return n(this).OrderByDescending(t).FirstOrDefault()},Array.prototype.Min=function(t){const e=t=>t;let r=n(this),o=t?t(this[0],0,this):e(this[0]);if(t)for(let e=0;e<r.length;e++)o=t(r[e],e,r)<o?o=t(r[e],e,r):o;else for(let t=0;t<r.length;t++)o=e(r[t])<o?o=e(r[t]):o;return o},Array.prototype.MinBy=function(t){return n(this).OrderBy(t).ToArray().FirstOrDefault()},Array.prototype.OfType=function(t){let e,r=n(this);switch(t){case Number:e="number";break;case String:e="string";break;case Boolean:e=typeof!0;break;case Function:e="function";break;default:e=null}return null===e?r.Where(e=>e instanceof t).Cast():r.Where(t=>typeof t===e).Cast()},Array.prototype.OrderBy=function(t,e=i(t,!1)){return new s(n(this),e)},Array.prototype.OrderByDescending=function(t,e=i(t,!0)){return new s(n(this),e)},Array.prototype.Prepend=function(t){const e=new s;return e.array.push(t),n(this).ForEach(t=>{e.array.push(t)}),e},Array.prototype.ThenBy=function(t){return n(this).OrderBy(t)},Array.prototype.ThenByDescending=function(t){return n(this).OrderByDescending(t)},Array.prototype.Remove=function(t){let e=n(this);return-1!==e.IndexOf(t)&&(e.RemoveAt(e.IndexOf(t)),!0)},Array.prototype.RemoveAll=function(t){return n(this).Where(e(t))},Array.prototype.RemoveAt=function(t){return new s(n(this).splice(t,1))},Array.prototype.RemoveRange=function(t,e){return new s(n(this).splice(t,e))},Array.prototype.Reverse=function(){return new s(n(this).reverse())},Array.prototype.Select=function(t){return new s(n(this).map(t))},Array.prototype.SelectMany=function(t){let e=n(this);return e.Aggregate((r,n,o)=>(r.AddRange(e.Select(t).ElementAt(o).ToArray()),r),new Array)},Array.prototype.SequenceEqual=function(t){return!!n(this).reduce((e,r,n)=>t[n]===r?e:void 0)},Array.prototype.Single=function(t){let e=n(this);if(1!==e.Count(t))throw console.log("Single - The collection does not contain exactly one element."),new Error("The collection does not contain exactly one element.");return e.First(t)},Array.prototype.SingleOrDefault=function(t){let e=n(this);return e.Count(t)?e.Single(t):void 0},Array.prototype.Skip=function(t){return new s(n(this).slice(Math.max(0,t)))},Array.prototype.SkipLast=function(t){return new s(n(this).slice(0,Math.max(0,n(this).length-t)))},Array.prototype.SkipWhile=function(t){let e=n(this);return e.Skip(e.Aggregate((r,n)=>t(e.ElementAt(r))?++r:r,0))},Array.prototype.Sum=function(t){let e=n(this);return t?e.Select(t).Sum():e.Aggregate((t,e)=>t+=+e,0)},Array.prototype.Take=function(t){return new s(n(this).slice(0,Math.max(0,t)))},Array.prototype.TakeLast=function(t){return new s(n(this).slice(n(this).length-t,n(this).length))},Array.prototype.TakeWhile=function(t){let e=n(this);return e.Take(e.Aggregate(r=>t(e.ElementAt(r))?++r:r,0))},Array.prototype.ToArray=function(){return n(this)},Array.prototype.ToDictionary=function(t,e){let r=n(this);return new s(r.Aggregate((n,o,i)=>(n[r.Select(t).ElementAt(i).toString()]=e?r.Select(e).ElementAt(i):o,n.Add({Key:r.Select(t).ElementAt(i),Value:e?r.Select(e).ElementAt(i):o}),n),Array()))},Array.prototype.ToList=function(){return new s(this)},Array.prototype.ToLookup=function(t,e){return n(this).GroupBy(t,e)},Array.prototype.Union=function(t){return n(this).Concat(t).Distinct()},Array.prototype.Where=function(t){return new s(n(this).filter(t))},Array.prototype.Zip=function(t,e){let r=n(this);return t.Count()<this.Count()?t.Select((t,n)=>e(r.ElementAt(n),t)):r.Select((r,n)=>e(r,t.ElementAt(n)))};const e=t=>(...e)=>!t(...e),r=t=>"object"==typeof t,n=function(t){return t instanceof s?t.array:t},o=(t,e)=>Object.keys(t).every(n=>r(t[n])?o(e[n],t[n]):e[n]===t[n]),i=(t,e)=>(r,n)=>((t,e,r,n)=>{const o=r(t),i=r(e);return o>i?n?-1:1:o<i?n?1:-1:0})(r,n,t,e),u=(t,e)=>(r,n)=>t(r,n)||e(r,n);class s extends Array{constructor(e,r){super(),this._comparer=r,this.array=[],e&&(this.array=e),this._comparer&&t.sort(this.array,this._comparer)}ThenBy(t){return new s(n(this),u(this._comparer,i(t,!1)))}ThenByDescending(t){return new s(n(this),u(this._comparer,i(t,!0)))}}});
//# sourceMappingURL=index.ts.umd.js.map
