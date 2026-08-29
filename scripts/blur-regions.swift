// Pixelates rectangular regions of a PNG in place (privacy redaction for
// marketing screenshots). Usage:
//   swift scripts/blur-regions.swift <file.png> l,t,w,h [l,t,w,h ...]
// where l,t,w,h are percentages of image width/height, top-left origin.
import Foundation
import CoreImage

let args = CommandLine.arguments
guard args.count >= 3 else {
    FileHandle.standardError.write("usage: blur-regions.swift <file> l,t,w,h ...\n".data(using: .utf8)!)
    exit(1)
}
let url = URL(fileURLWithPath: args[1])
guard let ci = CIImage(contentsOf: url) else {
    FileHandle.standardError.write("cannot load \(args[1])\n".data(using: .utf8)!)
    exit(1)
}
let W = ci.extent.width
let H = ci.extent.height
var out = ci

for spec in args.dropFirst(2) {
    let p = spec.split(separator: ",").compactMap { Double($0) }
    guard p.count == 4 else { continue }
    let x = p[0] / 100 * W
    let w = p[2] / 100 * W
    let h = p[3] / 100 * H
    let y = H - (p[1] / 100 * H) - h // CIImage origin is bottom-left

    let blur = CIFilter(name: "CIPixellate")!
    blur.setValue(out.clampedToExtent(), forKey: kCIInputImageKey)
    blur.setValue(26, forKey: kCIInputScaleKey)
    blur.setValue(CIVector(x: x + w / 2, y: y + h / 2), forKey: kCIInputCenterKey)
    let region = blur.outputImage!.cropped(to: CGRect(x: x, y: y, width: w, height: h))
    out = region.composited(over: out)
}

let ctx = CIContext()
let cs = CGColorSpace(name: CGColorSpace.sRGB)!
try! ctx.writePNGRepresentation(of: out, to: url, format: .RGBA8, colorSpace: cs)
print("blurred \(args[1])")
