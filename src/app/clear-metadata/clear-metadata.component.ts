import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as piexif from '../piexifjs';
import * as ConvertImage from '../js-convert-images';

@Component({
  selector: 'app-clear-metadata',
  templateUrl: './clear-metadata.component.html',
  styleUrls: ['./clear-metadata.component.scss'],
})
export class ClearMetadataComponent implements OnInit {
  @Input() photoList: Array<string>;
  @Output() cancel = new EventEmitter<boolean>();
  @Output() successClear = new EventEmitter<Array<Blob>>();

  securedString = '            Secured by Cyber Regiment! Glory To Ukraine!';
  zeroth: any = {};
  exif: any = {};
  gps: any = {};
  progressFileNumber: number = 0;
  photosWithClearMetadata: Array<any> = [];

  // ZEROTH
  replaceZerothStrings = [
    'Make',
    'Software',
    'DocumentName',
    'Artist',
    'ProcessingSoftware',
    'ImageDescription',
    'Model',
    'WhitePoint',
    'PrimaryChromaticities',
    'HostComputer',
    'InkNames',
    'TargetPrinter',
    'JPEGTables',
    'YCbCrCoefficients',
    'ReferenceBlackWhite',
    'ImageID',
    'BatteryLevel',
    'ExifTag',
    'InterColorProfile',
    'GPSTag',
    'Copyright',
    'ExposureTime',
    'FlashEnergy',
    'SpatialFrequencyResponse',
    'Noise',
    'FocalPlaneXResolution',
    'FocalPlaneYResolution',
    'SecurityClassification',
    'ImageHistory',
    'ExposureIndex',
    'PrintImageMatching',
    'UniqueCameraModel',
    'BlackLevel',
    'BlackLevelDeltaH',
    'BlackLevelDeltaV',
    'DefaultScale',
    'ColorMatrix1',
    'ColorMatrix2',
    'CameraCalibration1',
    'CameraCalibration2',
    'ReductionMatrix1',
    'ReductionMatrix2',
    'AnalogBalance',
    'AsShotWhiteXY',
    'BaselineExposure',
    'BaselineNoise',
    'BaselineSharpness',
    'BestQualityScale',
    'OriginalRawFileData',
    'AsShotICCProfile',
    'AsShotPreProfileMatrix',
    'CurrentICCProfile',
    'CurrentPreProfileMatrix',
    'LinearResponseLimit',
    'CameraSerialNumber',
    'LensInfo',
    'ChromaBlurRadius',
    'AntiAliasStrength',
    'ShadowScale',
    'RawImageDigest',
    'OriginalRawFileDigest',
    'ProfileHueSatMapData1',
    'ProfileHueSatMapData2',
    'NoiseReductionApplied',
    'ForwardMatrix1',
    'ForwardMatrix2',
    'ProfileLookTableData',
    'OpcodeList1',
    'OpcodeList2',
    'OpcodeList3',
  ];
  // EXIF
  replaceExifStrings = [
    'LensMake',
    'ExposureTime',
    'CameraOwnerName',
    'SceneType',
    'FNumber',
    'SpectralSensitivity',
    'OECF',
    'InteroperabilityTag',
    'ComponentsConfiguration',
    'CompressedBitsPerPixel',
    'ShutterSpeedValue',
    'ApertureValue',
    'BrightnessValue',
    'ExposureBiasValue',
    'MaxApertureValue',
    'SubjectDistance',
    'FocalLength',
    'MakerNote',
    'UserComment',
    'SubSecTime',
    'SubSecTimeOriginal',
    'SubSecTimeDigitized',
    'RelatedSoundFile',
    'FlashEnergy',
    'SpatialFrequencyResponse',
    'FocalPlaneXResolution',
    'FocalPlaneYResolution',
    'ExposureIndex',
    'FileSource',
    'CFAPattern',
    'BodySerialNumber',
    'LensModel',
  ];

  // GPS
  replaceGPSStrings = [
    'GPSLatitudeRef',
    'GPSLatitude',
    'GPSLongitudeRef',
    'GPSLongitude',
    'GPSAltitude',
    'GPSTimeStamp',
    'GPSSatellites',
    'GPSStatus',
    'GPSMeasureMode',
    'GPSDOP',
    'GPSSpeedRef',
    'GPSSpeed',
    'GPSTrackRef',
    'GPSTrack',
    'GPSImgDirectionRef',
    'GPSImgDirection',
    'GPSMapDatum',
    'GPSDestLatitudeRef',
    'GPSDestLatitude',
    'GPSDestLongitudeRef',
    'GPSDestLongitude',
    'GPSDestBearingRef',
    'GPSDestBearing',
    'GPSDestDistanceRef',
    'GPSDestDistance',
    'GPSProcessingMethod',
    'GPSAreaInformation',
    'GPSHPositioningError',
  ];

  constructor() {}

  ngOnInit(): void {
    const converter: any = new ConvertImage.ConvertImage();
    const optionsJpeg = {
      name: `cleared-image-${Date.now()}`,
      download: false,
      width: 1280,
      height: 1280,
      type: 'jpeg',
    };

    let countsImages = 0;
    for (let index = 0; index <= this.photoList.length; index++) {
      const element = this.photoList[index];

      converter
        .convertImageFromUrl(element, optionsJpeg)
        .then(async (jpeg: string) => {
          this.photoList[index] = jpeg;
          countsImages += 1;

          if (countsImages === this.photoList.length) {
            this.clearMetadata();
          }
        });
    }

    this.replaceZerothStrings.forEach((prop: string) => {
      this.zeroth[piexif.ImageIFD[prop]] = this.securedString;
    });

    this.replaceExifStrings.forEach((prop) => {
      this.exif[piexif.ExifIFD[prop]] = this.securedString;
    });

    this.replaceGPSStrings.forEach((prop) => {
      this.gps[piexif.GPSIFD[prop]] = this.securedString;
    });
  }

  cancelClearMetadata() {
    this.cancel.emit(true);
  }

  async saveFile(imgBlob: Blob) {
    // create a new handle
    const newHandle = await (window as any).showSaveFilePicker();
    // create a FileSystemWritableFileStream to write to
    const writableStream = await newHandle.createWritable();
    // write our file
    await writableStream.write(imgBlob);
    // close the file and write the contents to disk.
    await writableStream.close();
  }

  downloadBase64File(contentBase64: string, fileName: string) {
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);

    downloadLink.href = contentBase64;
    downloadLink.target = '_self';
    downloadLink.download = fileName;
    downloadLink.click();
  }

  blobToBase64(blob: Blob | File): Promise<any> {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        return resolve(e.target.result);
      };
      reader.readAsDataURL(blob);
    });
  }

  async clearMetadata() {
    const exifObj = { '0th': this.zeroth, Exif: this.exif, GPS: this.gps };
    const exifbytes = piexif.dump(exifObj);

    for (let index = 0; index < this.photoList.length; index++) {
      let newData = piexif.remove(this.photoList[index]); // Clear ALL metadata
      newData = piexif.insert(exifbytes, this.photoList[index]); // Set secureString
      this.photosWithClearMetadata.push(newData);
      this.progressFileNumber = index + 1;
    }

    await Promise.all(
      this.photosWithClearMetadata.map(async (base64: string) => {
        return this.downloadBase64File(base64, `${Date.now()}.jpeg`);
      })
    );

    this.successClear.emit(this.photosWithClearMetadata);
  }
}
