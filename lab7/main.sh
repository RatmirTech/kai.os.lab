#!/bin/ksh

usage() {
    echo "Использование: $0 <путь_к_каталогу>"
    exit 1
}

if [ $# -ne 1 ]; then
    echo "Ошибка: Требуется указать один аргумент - путь к каталогу."
    usage
fi

target_dir="$1"

if [ ! -d "$target_dir" ]; then
    echo "Ошибка: '$target_dir' не является существующим каталогом."
    exit 1
fi

if [ ! -r "$target_dir" ]; then
    echo "Ошибка: Каталог '$target_dir' недоступен для чтения."
    exit 1
fi

echo "Подкаталоги в '$target_dir', доступные для выполнения (поиск в текущем каталоге $target_dir):"
find "$target_dir" -mindepth 1 -maxdepth 1 -type d -exec test -x {} \; -exec basename {} \;