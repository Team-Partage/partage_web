#!/bin/sh

# 상위 디렉토리로 이동
cd ../ || { echo "Failed to change directory"; exit 1; }

# output 디렉토리 생성 (이미 존재하면 무시)
mkdir -p output

# partage_web의 모든 파일과 디렉토리를 output으로 복사
cp -R ./partage_web/* ./output

echo "Script executed successfully."
