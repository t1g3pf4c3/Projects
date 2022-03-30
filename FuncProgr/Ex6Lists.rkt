#lang racket
(require math/number-theory)
(define (first _list )
    (car _list)
)

(define (second _list )
    (car (cdr _list))
)

(define (third _list )
    (car (cdr (cdr _list)))
)
(first '(5 6 7 8))
(second '(5 6 7 8))
(third '(5 6 7 8))

(define (cmp3 _list1 _list2)
 (cond ((and (equal? (first _list1) (first _list2) )  (equal? (second _list1) (second _list2) ) (equal? (third _list1) (third _list2) ) )
   "equal")
)
)
(cmp3 '(5 6 7 8) '(5 6 7 8))


(define list_ '(1 2 3 4 5 6 7 8 9 10))

(filter odd? list_)
(filter even? list_)
(filter (and even? (divides?  3)) list_)

