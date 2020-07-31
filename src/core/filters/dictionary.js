import {
  taskTypeEnum,
  companyRoleEnum,
  companyRoleActiveEnum,
  companyStatusEnum,
  landUseEnum,
  taskStageEnum,
  equipmentOwnerEnum,
  verificationMethodEnum,
  ownerEnum,
  fileTypeEnum,
  supervisionStageEnum
} from "@/api/enum";

export function taskTypeFilter(code) {
  if (!code) return "未分配";
  return taskTypeEnum[code] || "";
}

export function companyRoleFilter(code) {
  return companyRoleEnum[code] || "";
}

export function companyRoleActiveFilter(code) {
  return companyRoleActiveEnum[code] || "";
}

export function companyStatusFilter(code) {
  return companyStatusEnum[code] || "";
}

export function landUseFilter(code) {
  return landUseEnum[code] || "";
}

export function taskStageFilter(code) {
  return taskStageEnum[code] || "";
}

export function equipmentOwnerFilter(code) {
  return equipmentOwnerEnum[code] || "";
}

export function verificationMethodFilter(code) {
  return verificationMethodEnum[code] || "";
}

export function deviceOwnerFilter(code) {
  return ownerEnum[code] || "";
}

export function fileTypeFilter(code) {
  return fileTypeEnum[code] || "";
}

export function supervisionStageFilter(code) {
  return supervisionStageEnum[code] || "";
}

//补充0
export function padZeroFilter(num, n) {
  return (Array(n).join(0) + num).slice(-n);
}
